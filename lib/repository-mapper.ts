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
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  owner: { login: string; avatarUrl: string };
}

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
  created_at: string;
  updated_at: string;
  pushed_at?: string | null;
  owner: { login: string; avatar_url?: string | null };
}

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function isDate(value: unknown): value is string {
  return typeof value === "string" && Number.isFinite(Date.parse(value));
}

export function isGitHubRepositoryPayload(value: unknown): value is GitHubRepositoryPayload {
  if (!value || typeof value !== "object") return false;
  const data = value as Record<string, unknown>;
  const owner = data.owner as Record<string, unknown> | null;
  const license = data.license as Record<string, unknown> | null;
  return typeof data.name === "string"
    && typeof data.full_name === "string"
    && (data.description === null || typeof data.description === "string")
    && typeof data.html_url === "string"
    && (data.homepage === null || typeof data.homepage === "string")
    && (data.language === null || typeof data.language === "string")
    && (data.topics === undefined || (Array.isArray(data.topics) && data.topics.every((topic) => typeof topic === "string")))
    && isNonNegativeNumber(data.stargazers_count)
    && isNonNegativeNumber(data.forks_count)
    && isNonNegativeNumber(data.subscribers_count)
    && isNonNegativeNumber(data.open_issues_count)
    && (data.license === null || Boolean(license && (license.spdx_id === null || typeof license.spdx_id === "string")))
    && isDate(data.created_at)
    && isDate(data.updated_at)
    && (data.pushed_at === undefined || data.pushed_at === null || isDate(data.pushed_at))
    && Boolean(owner && typeof owner.login === "string")
    && (!owner || owner.avatar_url === undefined || owner.avatar_url === null || typeof owner.avatar_url === "string");
}

export function mapGitHubRepository(data: GitHubRepositoryPayload): RepositoryData {
  if (!isGitHubRepositoryPayload(data)) {
    throw new Error("GitHub returned repository data in an unexpected format.");
  }

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
    createdAt: data.created_at,
    updatedAt: data.updated_at,
    pushedAt: data.pushed_at ?? null,
    owner: {
      login: data.owner.login,
      avatarUrl: data.owner.avatar_url ?? "",
    },
  };
}
