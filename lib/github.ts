import {
  GitHubRepositoryPayload,
  mapGitHubRepository,
  RepositoryData,
} from "@/lib/repository-mapper";

export type { RepositoryData } from "@/lib/repository-mapper";

const CACHE_TTL_MS = 60_000;

type CacheEntry = {
  value: RepositoryData;
  expiresAt: number;
};

const repositoryCache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<RepositoryData>>();

function getCacheKey(owner: string, repo: string): string {
  return `${owner.toLowerCase()}/${repo.toLowerCase()}`;
}

async function fetchRepository(owner: string, repo: string): Promise<RepositoryData> {
  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 60 },
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found.");
    }

    if (response.status === 403 || response.status === 429) {
      const remaining = response.headers.get("x-ratelimit-remaining");
      const retryAfter = response.headers.get("retry-after");
      const retryMessage = retryAfter ? ` Try again in about ${retryAfter} seconds.` : " Please try again later.";
      throw new Error(
        remaining === "0"
          ? `GitHub API rate limit reached.${retryMessage}`
          : "GitHub temporarily rejected the request. Please try again later.",
      );
    }

    throw new Error("Unable to fetch repository information.");
  }

  const data = (await response.json()) as GitHubRepositoryPayload;
  return mapGitHubRepository(data);
}

export async function getRepository(owner: string, repo: string): Promise<RepositoryData> {
  const key = getCacheKey(owner, repo);
  const cached = repositoryCache.get(key);

  if (cached && cached.expiresAt > Date.now()) {
    return cached.value;
  }

  const existingRequest = inFlightRequests.get(key);
  if (existingRequest) {
    return existingRequest;
  }

  const request = fetchRepository(owner, repo)
    .then((value) => {
      repositoryCache.set(key, { value, expiresAt: Date.now() + CACHE_TTL_MS });
      return value;
    })
    .finally(() => {
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, request);
  return request;
}

export function clearRepositoryCache(): void {
  repositoryCache.clear();
}
