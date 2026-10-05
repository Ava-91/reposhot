import type { RepositoryData } from "@/lib/repository-mapper";

export type RepositoryVibe = "Serious" | "Experimental" | "Polished" | "Chaotic";
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

  const chaoticSignal = Math.min(100, Math.round((100 - issuePressure) * 0.7 + (activity > 0 ? 20 : 0)));
  const experimentalSignal = Math.min(100, Math.round((100 - community) * 0.55 + (ageDays < 365 ? 30 : 5)));
  const polishedSignal = Math.min(100, Math.round(issuePressure * 0.5 + maintenance * 0.3 + community * 0.2));
  const seriousSignal = Math.min(100, Math.round(community * 0.45 + age * 0.25 + maintenance * 0.3));
  const signals = { activity, community, maintenance, issuePressure, age };

  if (chaoticSignal >= 70 && chaoticSignal >= polishedSignal) return { label: "Chaotic", text: "Lots of moving parts. Delightfully unfinished.", score, signals };
  if (experimentalSignal >= 65 && experimentalSignal >= seriousSignal) return { label: "Experimental", text: "Feels like someone is trying something new.", score, signals };
  if (polishedSignal >= seriousSignal) return { label: "Polished", text: "The rough edges seem mostly under control.", score, signals };
  return { label: "Serious", text: "A project with a more deliberate, established feel.", score, signals };
}
