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

interface GitHubRepositoryResponse {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  stargazers_count: number;
  forks_count: number;
  subscribers_count: number;
  open_issues_count: number;
  license: {
    spdx_id: string | null;
  } | null;
  owner: {
    login: string;
    avatar_url: string;
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

  const data = (await response.json()) as GitHubRepositoryResponse;

  return {
    name: data.name,
    fullName: data.full_name,
    description: data.description,
    htmlUrl: data.html_url,
    homepage: data.homepage,
    language: data.language,
    topics: Array.isArray(data.topics) ? data.topics : [],
    stars: data.stargazers_count,
    forks: data.forks_count,
    watchers: data.subscribers_count,
    openIssues: data.open_issues_count,
    license: data.license?.spdx_id ?? null,
    owner: {
      login: data.owner.login,
      avatarUrl: data.owner.avatar_url,
    },
  };
}