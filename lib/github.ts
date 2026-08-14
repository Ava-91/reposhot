import { mapGitHubRepository, GitHubRepositoryPayload } from "@/lib/repository-mapper";

export interface RepositoryData {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  license: string | null;
  owner: {
    login: string;
    avatarUrl: string;
  };
}

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
