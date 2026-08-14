"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { MetadataVisibility } from "@/components/MetadataControls";
import TemplateSelector from "@/components/TemplateSelector";
import { RepositoryData } from "@/lib/github";
import { downloadElementAsPng } from "@/lib/export";
import { createExportOptions } from "@/lib/export-options";
import { layouts, LayoutName } from "@/lib/layouts";
import { templates, TemplateName } from "@/lib/templates";
import { themes, ThemeName } from "@/lib/themes";

interface RepositoryPreviewProps {
  repository: RepositoryData;
  theme: ThemeName;
  layout: LayoutName;
  metadata: MetadataVisibility;
  template: TemplateName;
  onTemplateChange: (template: TemplateName) => void;
  onShare: () => void;
}

function formatNumber(value: number): string { return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(value); }
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = { JavaScript: "bg-yellow-400", TypeScript: "bg-blue-400", Python: "bg-green-400", Java: "bg-orange-400", "C++": "bg-pink-400", C: "bg-sky-400", CSharp: "bg-purple-400", Go: "bg-cyan-400", Rust: "bg-orange-500", PHP: "bg-indigo-400", Ruby: "bg-red-400", Swift: "bg-orange-300", Kotlin: "bg-violet-400" };
  return colors[language] ?? "bg-zinc-400";
}
function safeText(value: string, fallback: string): string { const normalized = value.replace(/[\u0000-\u001f\u007f]/g, "").trim(); return normalized || fallback; }

export default function RepositoryPreview({ repository, theme: themeName, layout: layoutName, metadata, template: templateName, onTemplateChange, onShare }: RepositoryPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");
  const theme = themes[themeName];
  const layout = layouts[layoutName];
  const template = templates[templateName];
  const visibleTopics = repository.topics.slice(0, 4);
  const remainingTopicCount = Math.max(repository.topics.length - visibleTopics.length, 0);
  const accent = metadata.accentColor || theme.accent || template.accent;
  const subtitle = metadata.subtitle.trim();
  const footerText = safeText(metadata.footerText, "Public repository");

  async function handleDownload() {
    if (!previewRef.current || downloading) return;
    setDownloading(true); setDownloadError("");
    try { await downloadElementAsPng(previewRef.current, createExportOptions(layout.width, layout.height, repository.owner.login, repository.name)); }
    catch { setDownloadError("Couldn't generate the image. Please try again."); }
    finally { setDownloading(false); }
  }

  const languageColor = repository.language ? getLanguageColor(repository.language) : "bg-zinc-400";
  const stats = [
    metadata.language && repository.language ? { label: "Language", value: repository.language, language: true } : null,
    metadata.stars ? { label: "Stars", value: `★ ${formatNumber(repository.stars)}` } : null,
    metadata.forks ? { label: "Forks", value: formatNumber(repository.forks) } : null,
    metadata.openIssues ? { label: "Open issues", value: formatNumber(repository.openIssues) } : null,
  ].filter(Boolean) as Array<{ label: string; value: string; language?: boolean }>;

  return <div className="w-full" aria-label="RepoShot preview and export">
    <div className="mb-4"><TemplateSelector value={templateName} onChange={onTemplateChange} /></div>
    <div className="mb-4 flex justify-end px-1"><span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-500">{template.label} · {layout.width} × {layout.height}</span></div>
    <div className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
      <div ref={previewRef} className="relative w-full overflow-hidden" style={{ aspectRatio: layout.aspectRatio, background: theme.backgroundGradient, color: theme.foreground }}>
        <div aria-hidden="true" className="absolute inset-0 opacity-70" style={{ backgroundImage: theme.grid, backgroundSize: "32px 32px" }} />
        <div aria-hidden="true" className="absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl" style={{ background: accent, opacity: template.cardOpacity }} />
        <div aria-hidden="true" className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-3xl" style={{ background: theme.glowSecondary, opacity: template.cardOpacity }} />
        <div className="relative flex h-full min-w-0 flex-col justify-center p-[5.5%]" style={{ borderRadius: template.radius }}>
          <div className="flex min-w-0 items-center justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ring-1" style={{ background: theme.card, color: accent, boxShadow: `0 0 0 1px ${theme.border}` }}>R</div><span className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs" style={{ color: theme.subtle }}>RepoShot</span></div><div className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[9px] font-medium sm:px-3 sm:text-[10px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.badgeText }}>GitHub</div></div>
          <div className={`mt-[6%] grid min-h-0 gap-4 sm:gap-6 ${metadata.owner ? "grid-cols-[auto_minmax(0,1fr)]" : "grid-cols-1"}`}>
            {metadata.owner && <Image src={repository.owner.avatarUrl} alt={`${repository.owner.login}'s avatar`} width={88} height={88} className="h-[clamp(52px,8vw,88px)] w-[clamp(52px,8vw,88px)] shrink-0 rounded-2xl border object-cover shadow-xl" style={{ borderColor: theme.border }} />}
            <div className="min-w-0">{metadata.owner && <p className="truncate text-[10px] font-medium sm:text-xs" style={{ color: accent }}>{repository.owner.login}</p>}<h3 className="mt-1 break-words text-xl font-bold tracking-tight sm:text-3xl" style={{ color: theme.foreground }}>{repository.name}</h3>{subtitle && <p className="mt-1 line-clamp-2 max-w-3xl text-xs font-medium leading-5 sm:text-sm" style={{ color: accent }}>{subtitle}</p>}{metadata.description && <p className="mt-2 line-clamp-3 max-w-3xl text-xs leading-5 sm:text-sm sm:leading-6" style={{ color: theme.muted }}>{repository.description || "No description provided."}</p>}{repository.topics.length > 0 && <div className="mt-3 flex min-w-0 flex-wrap items-center gap-1.5 overflow-hidden">{visibleTopics.map((topic) => <span key={topic} className="max-w-28 truncate rounded-full px-2 py-1 text-[8px] font-medium sm:max-w-36 sm:text-[9px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.badgeText }}>{topic}</span>)}{remainingTopicCount > 0 && <span className="shrink-0 rounded-full px-2 py-1 text-[8px] font-medium sm:text-[9px]" style={{ background: theme.badge, border: `1px solid ${theme.border}`, color: theme.subtle }}>+{remainingTopicCount}</span>}</div>}</div>
          </div>
          {stats.length > 0 && <div className="mt-[4%] grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">{stats.map((stat) => <div key={stat.label} className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3" style={{ background: theme.card, border: `1px solid ${theme.border}` }}><p className="text-[9px] uppercase tracking-wider sm:text-[10px]" style={{ color: theme.statLabel }}>{stat.label}</p><p className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold sm:text-sm" style={{ color: theme.statValue }}>{stat.language && <span aria-hidden="true" className={`h-2 w-2 shrink-0 rounded-full ${languageColor}`} />}<span className="truncate">{stat.value}</span></p></div>)}</div>}
          <div className="mt-3 flex min-w-0 items-center justify-between gap-3 border-t pt-3" style={{ borderColor: theme.border }}><span className="truncate text-[9px] sm:text-[10px]" style={{ color: theme.footer }}>{footerText}</span>{metadata.showGithubUrl && <span className="min-w-0 shrink truncate text-right text-[9px] sm:text-[10px]" style={{ color: theme.footer }}>github.com/{repository.fullName}</span>}</div>
        </div>
      </div>
    </div>
    <div className="mt-5 flex flex-wrap items-center justify-center gap-3"><button type="button" onClick={handleDownload} disabled={downloading} aria-busy={downloading} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold text-white shadow-lg transition hover:opacity-90 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 disabled:cursor-not-allowed disabled:opacity-60" style={{ background: accent }}>{downloading ? <>Generating PNG...</> : <>Download PNG</>}</button><button type="button" onClick={onShare} className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-semibold text-zinc-200 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70">Copy share link</button></div>
    {downloadError && <div role="alert" aria-live="assertive" className="mt-3 flex flex-col items-center gap-2 text-center"><p className="text-xs text-red-400">{downloadError}</p><button type="button" onClick={handleDownload} disabled={downloading} className="min-h-9 rounded-lg border border-red-400/30 px-3 text-xs font-medium text-red-300">Try again</button></div>}
  </div>;
}
