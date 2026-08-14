"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { MetadataVisibility } from "@/components/MetadataControls";
import { RepositoryData } from "@/lib/github";
import { downloadElementAsPng } from "@/lib/export";
import { layouts, LayoutName } from "@/lib/layouts";
import { themes, ThemeName } from "@/lib/themes";

interface RepositoryPreviewProps {
  repository: RepositoryData;
  theme: ThemeName;
  layout: LayoutName;
  metadata: MetadataVisibility;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "bg-yellow-400", TypeScript: "bg-blue-400", Python: "bg-green-400", Java: "bg-orange-400",
    "C++": "bg-pink-400", C: "bg-sky-400", CSharp: "bg-purple-400", Go: "bg-cyan-400", Rust: "bg-orange-500",
    PHP: "bg-indigo-400", Ruby: "bg-red-400", Swift: "bg-orange-300", Kotlin: "bg-violet-400",
  };
  return colors[language] ?? "bg-zinc-400";
}

export default function RepositoryPreview({ repository, theme: themeName, layout: layoutName, metadata }: RepositoryPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const theme = themes[themeName];
  const layout = layouts[layoutName];
  const visibleTopics = repository.topics.slice(0, 4);
  const remainingTopicCount = Math.max(repository.topics.length - visibleTopics.length, 0);

  async function handleDownload() {
    if (!previewRef.current || downloading) return;
    setDownloading(true);
    setDownloadError("");

    try {
      await downloadElementAsPng(previewRef.current, {
        width: layout.width,
        height: layout.height,
        filename: `reposhot-${repository.owner.login}-${repository.name}.png`,
      });
    } catch {
      setDownloadError("Couldn't generate the image. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  const languageColor = repository.language ? getLanguageColor(repository.language) : "bg-zinc-400";
  const stats = [
    metadata.language && repository.language ? { label: "Language", value: repository.language, language: true } : null,
    metadata.stars ? { label: "Stars", value: `★ ${formatNumber(repository.stars)}` } : null,
    metadata.forks ? { label: "Forks", value: formatNumber(repository.forks) } : null,
    metadata.openIssues ? { label: "Open issues", value: formatNumber(repository.openIssues) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; language?: boolean }>;

  return (
    <div className="w-full" aria-label="RepoShot preview and export">
      <div className="mb-4 flex justify-end px-1">
        <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-500">
          {layout.width} × {layout.height}
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
        <div
          ref={previewRef}
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: layout.aspectRatio, background: theme.backgroundGradient, color: theme.foreground }}
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ backgroundImage: theme.grid, backgroundSize: "32px 32px" }} />
          <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl" style={{ background: theme.glowPrimary }} />
          <div aria-hidden="true" className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-3xl" style={{ background: theme.glowSecondary }} />

          <div className="relative flex h-full min-w-0 flex-col justify-center p-[5.5%]">
            <div className="flex min-w-0 items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ring-1" style={{ background: theme.card, color: theme.foreground, boxShadow: `0 0 0 1px ${theme.border}` }}>
                  R
                </div>
                <span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs" style={{ color: theme.subtle }}>RepoShot</span>
              </div>
              <div className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[9px] font-medium sm:px-3 sm:text-[10px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.badgeText }}>
                <svg aria-hidden="true" className="h-3 w-3 sm:h-3.5 sm:w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.35-3.88-1.35-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0 1 12 6.04c.97 0 1.94.13 2.85.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" /></svg>
                GitHub
              </div>
            </div>

            <div className={`mt-[6%] grid min-h-0 gap-4 sm:gap-6 ${metadata.owner ? "grid-cols-[auto_minmax(0,1fr)]" : "grid-cols-1"}`}>
              {metadata.owner && <Image src={repository.owner.avatarUrl} alt={`${repository.owner.login}'s avatar`} width={88} height={88} className="h-[clamp(52px,8vw,88px)] w-[clamp(52px,8vw,88px)] shrink-0 rounded-2xl border object-cover shadow-xl" style={{ borderColor: theme.border }} />}
              <div className="min-w-0">
                {metadata.owner && <p className="truncate text-[10px] font-medium sm:text-xs" style={{ color: theme.accent }}>{repository.owner.login}</p>}
                <h3 className="mt-1 break-words text-xl font-bold tracking-tight sm:text-3xl" style={{ color: theme.foreground }}>{repository.name}</h3>
                {metadata.description && <p className="mt-2 line-clamp-3 max-w-3xl text-xs leading-5 sm:text-sm sm:leading-6" style={{ color: theme.muted }}>{repository.description || "No description provided."}</p>}
                {repository.topics.length > 0 && <div className="mt-3 flex min-w-0 flex-wrap items-center gap-1.5 overflow-hidden">{visibleTopics.map((topic) => <span key={topic} className="max-w-28 truncate rounded-full px-2 py-1 text-[8px] font-medium sm:max-w-36 sm:text-[9px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.badgeText }}>{topic}</span>)}{remainingTopicCount > 0 && <span className="shrink-0 rounded-full px-2 py-1 text-[8px] font-medium sm:text-[9px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.subtle }}>+{remainingTopicCount}</span>}</div>}
              </div>
            </div>

            {stats.length > 0 && <div className="mt-[4%] grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">{stats.map((stat) => <div key={stat.label} className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3" style={{ background: theme.card, border: `1px solid ${theme.border}` }}><p className="text-[9px] uppercase tracking-wider sm:text-[10px]" style={{ color: theme.statLabel }}>{stat.label}</p><p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold sm:text-sm" style={{ color: theme.statValue }}>{stat.language && <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${languageColor}`} />}<span className="truncate">{stat.value}</span></p></div>)}</div>}

            <div className="mt-3 flex min-w-0 items-center justify-between gap-3 border-t pt-3" style={{ borderColor: theme.border }}>
              <div className="flex min-w-0 items-center gap-2">{repository.license && <span className="shrink-0 rounded-full px-2 py-1 text-[9px] font-medium sm:text-[10px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.subtle }}>{repository.license}</span>}<span className="truncate text-[9px] sm:text-[10px]" style={{ color: theme.footer }}>Public repository</span></div>
              <span className="min-w-0 shrink text-right text-[9px] sm:text-[10px]" style={{ color: theme.footer }}>github.com/{repository.fullName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <button type="button" onClick={handleDownload} disabled={downloading} aria-busy={downloading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 disabled:cursor-not-allowed disabled:opacity-60">
          {downloading ? <><span aria-hidden="true" className="motion-safe:animate-spin h-4 w-4 rounded-full border-2 border-white/30 border-t-white" />Generating PNG...</> : <><svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></svg>Download PNG</>}
        </button>

        {downloadError && (
          <div role="alert" aria-live="assertive" className="flex flex-col items-center gap-2 text-center">
            <p className="text-xs text-red-400">{downloadError}</p>
            <button type="button" onClick={handleDownload} disabled={downloading} className="min-h-9 rounded-lg border border-red-400/30 px-3 text-xs font-medium text-red-300 transition hover:bg-red-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60 disabled:opacity-60">Try again</button>
          </div>
        )}
      </div>
    </div>
  );
}
