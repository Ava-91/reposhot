"use client";

import { useRef } from "react";
import type { RepositoryData } from "@/lib/repository-mapper";
import { usePngExport } from "@/components/usePngExport";
import { createExportOptions } from "@/lib/export-options";

function compact(value: number) { return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function age(createdAt: string) { const days = Math.max(0, Math.floor((Date.now() - Date.parse(createdAt)) / 86_400_000)); return days >= 365 ? `${Math.floor(days / 365)} years` : `${Math.max(1, Math.floor(days / 30))} months`; }
function activityLabel(pushedAt: string | null) { if (!pushedAt) return "No recent activity"; const days = Math.floor((Date.now() - Date.parse(pushedAt)) / 86_400_000); return days <= 7 ? "Active this week" : days <= 30 ? "Active this month" : days <= 180 ? "Active this season" : "Taking a break"; }

export default function RepositoryWrapped({ repository }: { repository: RepositoryData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { busy: downloading, done: downloadComplete, error: downloadError, download: exportPng } = usePngExport();



  const cards = [
    ["Stars", compact(repository.stars)], ["Forks", compact(repository.forks)], ["Open issues", compact(repository.openIssues)],
    ["Repository age", age(repository.createdAt)], ["Primary language", repository.language || "Unknown"], ["Activity", activityLabel(repository.pushedAt)],
  ];
  function download() { void exportPng(ref.current, createExportOptions(1080, 1350, repository.owner.login, `${repository.name}-wrapped`)); }

  return <div className="w-full">
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] p-7 text-white shadow-2xl sm:p-10" style={{ aspectRatio: "4 / 5" }}>
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-fuchsia-500/15 blur-3xl" /><div className="absolute -bottom-28 -left-24 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl" />
      <div className="relative flex h-full flex-col"><span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">RepoShot · Repository Wrapped</span>
        <div className="mt-10"><p className="text-sm font-medium text-blue-300">{repository.owner.login}</p><h1 className="mt-1 break-words text-4xl font-black tracking-tight sm:text-6xl">{repository.name}</h1><p className="mt-4 line-clamp-4 text-sm leading-6 text-zinc-400">{repository.description || "A public GitHub repository with a story to tell."}</p></div>
        <div className="mt-8 space-y-3"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-600">The story so far</p><div className="grid grid-cols-2 gap-3">{cards.map(([label, value], index) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-[10px] uppercase tracking-wider text-zinc-600">{index + 1}. {label}</p><p className="mt-2 break-words text-lg font-bold sm:text-xl">{value}</p></div>)}</div></div>
        <div className="mt-auto border-t border-white/10 pt-5"><p className="text-sm font-semibold text-zinc-200">{repository.topics.length ? `Top topics: ${repository.topics.slice(0, 4).join(" · ")}` : "No topics added yet."}</p><p className="mt-2 text-xs text-zinc-600">A six-chapter snapshot of this repository: what it is, how old it is, how much activity it has seen, and what the community looks like.</p></div>
      </div>
    </div>
    <div className="mt-5 flex justify-center"><button type="button" onClick={download} disabled={downloading} className="min-h-11 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60">{downloading ? "Generating PNG..." : downloadComplete ? "✓ PNG downloaded" : "Download PNG"}</button></div>
    {downloadError && <p role="alert" className="mt-3 text-center text-xs text-red-400">{downloadError}</p>}
  </div>;
}
