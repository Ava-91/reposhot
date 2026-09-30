import type { RepositoryData } from "@/lib/repository-mapper";

export type RepositoryVibe = "Alive" | "Questionable" | "Archaeological artifact";
export interface RepositoryVibeResult { label: RepositoryVibe; text: string; score: number; signals: { activity: number; community: number; maintenance: number; issuePressure: number; age: number }; }

const DAY = 86_400_000;

export function getRepositoryVibe(repository: RepositoryData, now = Date.now()): RepositoryVibeResult {
  const lastActivity = repository.pushedAt ? Date.parse(repository.pushedAt) : Date.parse(repository.updatedAt);
  const days = Number.isFinite(lastActivity) ? Math.max(0, (now - lastActivity) / DAY) : Infinity;
  const activity = days <= 7 ? 100 : days <= 30 ? 85 : days <= 90 ? 65 : days <= 180 ? 40 : days <= 730 ? 15 : 0;
  const community = Math.min(100, Math.round(Math.log10(repository.stars + repository.forks + 1) * 28));
  const maintenance = days <= 30 ? 100 : days <= 180 ? 65 : days <= 730 ? 30 : 0;
  const issuePressure = Math.max(0, 100 - Math.min(repository.openIssues, 50) * 2);
  const ageDays = Math.max(0, (now - Date.parse(repository.createdAt)) / DAY);
  const age = ageDays < 90 ? 80 : ageDays < 365 * 2 ? 55 : 30;
  const score = Math.round(activity * 0.35 + community * 0.2 + maintenance * 0.2 + issuePressure * 0.15 + age * 0.1);

  if (days > 730) return { label: "Archaeological artifact", text: "The commit dust has settled.", score, signals: { activity, community, maintenance, issuePressure, age } };
  if (repository.stars === 0 && repository.forks === 0) return { label: "Questionable", text: "Nobody has discovered this yet.", score, signals: { activity, community, maintenance, issuePressure, age } };
  if (score >= 60) return { label: "Alive", text: "Fresh signals. The lights are on.", score, signals: { activity, community, maintenance, issuePressure, age } };
  return { label: "Questionable", text: "Still around, just a little mysterious.", score, signals: { activity, community, maintenance, issuePressure, age } };
}
