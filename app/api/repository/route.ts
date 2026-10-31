import { NextRequest, NextResponse } from "next/server";
import { mapGitHubRepository, type GitHubRepositoryPayload } from "@/lib/repository-mapper";

export const runtime = "nodejs";

const CACHE_TTL_MS = 60_000;
const REQUEST_TIMEOUT_MS = 8_000;
const cache = new Map<string, { value: ReturnType<typeof mapGitHubRepository>; expiresAt: number }>();
const inFlight = new Map<string, Promise<ReturnType<typeof mapGitHubRepository>>>();
const REPOSITORY_PART = /^[A-Za-z0-9_.-]{1,100}$/;

async function fetchRepository(owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    {
      headers: { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const remaining = response.headers.get("x-ratelimit-remaining");
    const retryAfter = response.headers.get("retry-after");
    if (response.status === 404) throw Object.assign(new Error("Repository not found."), { status: 404 });
    if (response.status === 403 || response.status === 429) {
      const message = remaining === "0"
        ? `GitHub API rate limit reached.${retryAfter ? ` Try again in about ${retryAfter} seconds.` : " Please try again later."}`
        : "GitHub temporarily rejected the request. Please try again later.";
      throw Object.assign(new Error(message), { status: 429 });
    }
    if (response.status >= 500) throw Object.assign(new Error("GitHub is temporarily unavailable. Please try again."), { status: 503 });
    throw Object.assign(new Error("Unable to fetch repository information."), { status: 502 });
  }

  return mapGitHubRepository((await response.json()) as GitHubRepositoryPayload);
}

export async function GET(request: NextRequest) {
  const owner = request.nextUrl.searchParams.get("owner")?.trim() ?? "";
  const repo = request.nextUrl.searchParams.get("repo")?.trim() ?? "";
  if (!REPOSITORY_PART.test(owner) || !REPOSITORY_PART.test(repo) || owner === "." || owner === ".." || repo === "." || repo === "..") {
    return NextResponse.json({ error: "Enter a valid GitHub owner and repository name." }, { status: 400 });
  }

  const key = `${owner.toLowerCase()}/${repo.toLowerCase()}`;
  const cached = cache.get(key);
  if (cached && cached.expiresAt > Date.now()) {
    return NextResponse.json(cached.value, { headers: { "Cache-Control": "private, max-age=30" } });
  }

  let requestPromise = inFlight.get(key);
  if (!requestPromise) {
    requestPromise = fetchRepository(owner, repo)
      .then((value) => {
        cache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
        return value;
      })
      .finally(() => inFlight.delete(key));
    inFlight.set(key, requestPromise);
  }

  try {
    return NextResponse.json(await requestPromise, { headers: { "Cache-Control": "private, max-age=30" } });
  } catch (error) {
    const status = error instanceof Error && "status" in error ? Number(error.status) : 503;
    const message = error instanceof Error && error.name === "TimeoutError"
      ? "GitHub took too long to respond. Please try again."
      : error instanceof Error ? error.message : "Something went wrong while fetching the repository.";
    return NextResponse.json({ error: message }, { status });
  }
}
