"use client";

import { useRef, useState } from "react";
import type { RepositoryData } from "@/lib/repository-mapper";
import { downloadElementAsPng } from "@/lib/export";
import { createExportOptions } from "@/lib/export-options";

function format(value: number) { return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function age(date: string) { const days = Math.max(0, Math.floor((Date.now() - Date.parse(date)) / 86_400_000)); return days >= 365 ? `${Math.floor(days / 365)}y` : `${Math.max(1, Math.floor(days / 30))}mo`; }

const metrics = [
  ["Stars", (r: RepositoryData) => r.stars],
  ["Forks", (r: RepositoryData) => r.forks],
  ["Open issues", (r: RepositoryData) => r.openIssues],
] as const;

export default function RepositoryBattle({ left, right }: { left: RepositoryData; right: RepositoryData }) {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  async function download() {
    if (!ref.current || busy) return;
    setBusy(true); setError("");
    try { await downloadElementAsPng(ref.current, createExportOptions(1200, 900, left.owner.login, `${left.name}-vs-${right.name}`)); setDone(true); window.setTimeout(() => setDone(false), 2200); }
    catch { setError("Couldn't generate the comparison image. Please try again."); }
    finally { setBusy(false); }
  }
  return <div className="w-full">
    <div ref={ref} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d10] p-7 text-white shadow-2xl sm:p-10" style={{ aspectRatio: "4 / 3" }}>
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" /><div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">RepoShot · Repository Battle</span><span className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-zinc-400">VS</span></div>
        <div className="mt-8 grid min-h-0 flex-1 grid-cols-2 gap-3 sm:gap-6">
          {[left, right].map((repo, index) => <article key={repo.fullName} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.035] p-4 sm:p-6">
            <p className="truncate text-xs font-medium text-blue-300">{repo.owner.login}</p><h2 className="mt-1 break-words text-lg font-bold sm:text-2xl">{repo.name}</h2><p className="mt-2 line-clamp-3 text-xs leading-5 text-zinc-500 sm:text-sm">{repo.description || "No description provided."}</p>
            <div className="mt-5 space-y-2">{metrics.map(([label, get]) => { const a = get(left); const b = get(right); const value = get(repo); const winner = a === b ? false : index === 0 ? a > b : b > a; return <div key={label} className="rounded-xl border border-white/5 bg-black/20 p-3"><div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-zinc-600"><span>{label}</span>{winner && <span className="text-emerald-400">winner</span>}</div><p className="mt-1 text-sm font-semibold sm:text-base">{format(value)}</p></div>; })}</div>
            <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] text-zinc-500"><span>Language: {repo.language || "—"}</span><span>Age: {age(repo.createdAt)}</span></div>
          </article>)}
        </div>
      </div>
    </div>
    <div className="mt-5 flex flex-wrap justify-center gap-3"><button type="button" onClick={download} disabled={busy} className="min-h-11 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:opacity-60">{busy ? "Generating PNG..." : done ? "✓ PNG downloaded" : "Download PNG"}</button></div>
    {error && <p role="alert" className="mt-3 text-center text-xs text-red-400">{error}</p>}
  </div>;
}
