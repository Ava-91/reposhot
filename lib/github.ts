import {
  GitHubRepositoryPayload,
  mapGitHubRepository,
  RepositoryData,
} from "@/lib/repository-mapper";

export type { RepositoryData } from "@/lib/repository-mapper";

export async function getRepository(
  owner: string,
  repo: string,
): Promise<RepositoryData> {
  const response = await fetch(
    `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Repository not found.");
    }

    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit reached. Please try again later.",
      );
    }

    throw new Error("Unable to fetch repository information.");
  }

  const data = (await response.json()) as GitHubRepositoryPayload;
  return mapGitHubRepository(data);
}
