import { RepositoryData } from "@/lib/github";

export interface GitHubRepositoryPayload {
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
  license: { spdx_id: string | null } | null;
  owner: { login: string; avatar_url: string };
}

export function mapGitHubRepository(data: GitHubRepositoryPayload): RepositoryData {
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
