import type { RepositoryData } from "@/lib/repository-mapper";

export type { RepositoryData } from "@/lib/repository-mapper";

export async function getRepository(
  owner: string,
  repo: string,
  signal?: AbortSignal,
): Promise<RepositoryData> {
  const response = await fetch(
    `/api/repository?owner=${encodeURIComponent(owner)}&repo=${encodeURIComponent(repo)}`,
    { signal, headers: { Accept: "application/json" } },
  );
  const payload = (await response.json().catch(() => ({}))) as RepositoryData | { error?: string };
  if (!response.ok) {
    throw new Error("error" in payload && payload.error ? payload.error : "Unable to fetch repository information.");
  }
  return payload as RepositoryData;
}
