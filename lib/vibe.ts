import type { RepositoryData } from "@/lib/repository-mapper";

export type RepositoryVibe = "Alive" | "Questionable" | "Archaeological artifact";

const DAY = 86_400_000;

export function getRepositoryVibe(repository: RepositoryData, now = Date.now()): { label: RepositoryVibe; text: string } {
  const lastActivity = repository.pushedAt ? Date.parse(repository.pushedAt) : Date.parse(repository.updatedAt);
  const daysSinceActivity = Number.isFinite(lastActivity) ? Math.max(0, (now - lastActivity) / DAY) : Infinity;

  if (repository.stars >= 100 && daysSinceActivity <= 30) return { label: "Alive", text: "This thing is alive." };
  if (repository.openIssues >= 25 && daysSinceActivity > 180) return { label: "Questionable", text: "A few issues are waiting for their main-character moment." };
  if (daysSinceActivity > 730) return { label: "Archaeological artifact", text: "The commit dust has settled." };
  if (repository.stars === 0 && repository.forks === 0) return { label: "Questionable", text: "Nobody has discovered this yet." };
  if (daysSinceActivity <= 90) return { label: "Alive", text: "Fresh commits. The lights are on." };
  return { label: "Questionable", text: "Still around, just a little mysterious." };
}
