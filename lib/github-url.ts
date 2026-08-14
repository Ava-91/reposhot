export interface RepositoryReference {
  owner: string;
  repo: string;
}

export function parseGitHubRepositoryUrl(value: string): RepositoryReference | null {
  const trimmedValue = value.trim();
  if (!trimmedValue) return null;

  try {
    const url = new URL(trimmedValue);
    if (
      url.protocol !== "https:" ||
      url.hostname.toLowerCase() !== "github.com" ||
      url.username ||
      url.password
    ) {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);
    if (parts.length !== 2) return null;

    const [owner, repo] = parts;
    if (!owner || !repo) return null;

    return { owner, repo };
  } catch {
    return null;
  }
}
