"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

import { RepositoryData } from "@/lib/github";
import { layouts, LayoutName } from "@/lib/layouts";
import { themes, ThemeName } from "@/lib/themes";

interface RepositoryPreviewProps {
  repository: RepositoryData;
  theme: ThemeName;
  layout: LayoutName;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-400",
    Python: "bg-green-400",
    Java: "bg-orange-400",
    "C++": "bg-pink-400",
    C: "bg-sky-400",
    CSharp: "bg-purple-400",
    Go: "bg-cyan-400",
    Rust: "bg-orange-500",
    PHP: "bg-indigo-400",
    Ruby: "bg-red-400",
    Swift: "bg-orange-300",
    Kotlin: "bg-violet-400",
  };

  return colors[language] ?? "bg-zinc-400";
}

export default function RepositoryPreview({
  repository,
  theme: themeName,
  layout: layoutName,
}: RepositoryPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  const theme = themes[themeName];
  const layout = layouts[layoutName];

  async function handleDownload() {
    if (!previewRef.current || downloading) {
      return;
    }

    setDownloading(true);
    setDownloadError("");

    try {
      const dataUrl = await toPng(previewRef.current, {
        width: layout.width,
        height: layout.height,
        pixelRatio: 1,
        cacheBust: true,
      });

      const link = document.createElement("a");

      link.download = `reposhot-${repository.owner.login}-${repository.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setDownloadError("Couldn't generate the image. Please try again.");
    } finally {
      setDownloading(false);
    }
  }

  const languageColor = repository.language
    ? getLanguageColor(repository.language)
    : "bg-zinc-400";

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end px-1">
        <span className="rounded-full border border-white/10 bg-white/3 px-3 py-1 text-xs text-zinc-500">
          {layout.width} × {layout.height}
        </span>
      </div>

      <div className="w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
        <div
          ref={previewRef}
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: layout.aspectRatio,
            background: theme.backgroundGradient,
            color: theme.foreground,
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage: theme.grid,
              backgroundSize: "32px 32px",
            }}
          />

          <div
            aria-hidden="true"
            className="absolute -right-24 -top-32 h-96 w-96 rounded-full blur-3xl"
            style={{
              background: theme.glowPrimary,
            }}
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-40 left-1/4 h-80 w-80 rounded-full blur-3xl"
            style={{
              background: theme.glowSecondary,
            }}
          />

          <div className="relative flex h-full min-w-0 flex-col justify-center p-[5.5%]">
            <div className="flex min-w-0 items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ring-1"
                  style={{
                    background: theme.card,
                    color: theme.foreground,
                    boxShadow: `0 0 0 1px ${theme.border}`,
                  }}
                >
                  R
                </div>

                <span
                  className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs"
                  style={{ color: theme.subtle }}
                >
                  RepoShot
                </span>
              </div>

              <div
                className="flex shrink-0 items-center gap-2 rounded-full px-2.5 py-1 text-[9px] font-medium sm:px-3 sm:text-[10px]"
                style={{
                  background: theme.badge,
                  border: `1px solid ${theme.border}`,
                  color: theme.badgeText,
                }}
              >
                <svg
                  aria-hidden="true"
                  className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.35-3.88-1.35-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0 1 12 6.04c.97 0 1.94.13 2.85.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                </svg>

                GitHub
              </div>
            </div>

            <div className="mt-[6%] grid min-h-0 grid-cols-[auto_minmax(0,1fr)] gap-4 sm:gap-6">
              <Image
                src={repository.owner.avatarUrl}
                alt={`${repository.owner.login}'s avatar`}
                width={88}
                height={88}
                className="h-[clamp(52px,8vw,88px)] w-[clamp(52px,8vw,88px)] shrink-0 rounded-2xl border object-cover shadow-xl"
                style={{
                  borderColor: theme.border,
                }}
              />

              <div className="min-w-0">
                <p
                  className="truncate text-[10px] font-medium sm:text-xs"
                  style={{ color: theme.accent }}
                >
                  {repository.owner.login}
                </p>

                <h3
                  className="mt-1 truncate text-xl font-bold tracking-tight sm:text-3xl"
                  style={{ color: theme.foreground }}
                >
                  {repository.name}
                </h3>

                <p
                  className="mt-2 line-clamp-3 max-w-3xl text-xs leading-5 sm:text-sm sm:leading-6"
                  style={{ color: theme.muted }}
                >
                  {repository.description || "No description provided."}
                </p>
              </div>
            </div>

            <div className="mt-[4%] grid min-w-0 grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
              {repository.language && (
                <div
                  className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                  style={{
                    background: theme.card,
                    border: `1px solid ${theme.border}`,
                  }}
                >
                  <p
                    className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                    style={{ color: theme.statLabel }}
                  >
                    Language
                  </p>

                  <p
                    className="mt-1 flex min-w-0 items-center gap-1.5 truncate text-xs font-semibold sm:text-sm"
                    style={{ color: theme.statValue }}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 shrink-0 rounded-full ${languageColor}`}
                    />

                    <span className="truncate">{repository.language}</span>
                  </p>
                </div>
              )}

              <div
                className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <p
                  className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                  style={{ color: theme.statLabel }}
                >
                  Stars
                </p>

                <p
                  className="mt-1 truncate text-xs font-semibold sm:text-sm"
                  style={{ color: theme.statValue }}
                >
                  ★ {formatNumber(repository.stars)}
                </p>
              </div>

              <div
                className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <p
                  className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                  style={{ color: theme.statLabel }}
                >
                  Forks
                </p>

                <p
                  className="mt-1 truncate text-xs font-semibold sm:text-sm"
                  style={{ color: theme.statValue }}
                >
                  {formatNumber(repository.forks)}
                </p>
              </div>

              <div
                className="min-w-0 rounded-xl px-3 py-2.5 sm:px-4 sm:py-3"
                style={{
                  background: theme.card,
                  border: `1px solid ${theme.border}`,
                }}
              >
                <p
                  className="text-[9px] uppercase tracking-wider sm:text-[10px]"
                  style={{ color: theme.statLabel }}
                >
                  Open issues
                </p>

                <p
                  className="mt-1 truncate text-xs font-semibold sm:text-sm"
                  style={{ color: theme.statValue }}
                >
                  {formatNumber(repository.openIssues)}
                </p>
              </div>
            </div>

            <div
              className="mt-3 flex min-w-0 items-center justify-between gap-3 border-t pt-3"
              style={{
                borderColor: theme.border,
              }}
            >
              <div className="flex min-w-0 items-center gap-2">
                {repository.license && (
                  <span
                    className="shrink-0 rounded-full px-2 py-1 text-[9px] font-medium sm:text-[10px]"
                    style={{
                      background: theme.badge,
                      border: `1px solid ${theme.border}`,
                      color: theme.subtle,
                    }}
                  >
                    {repository.license}
                  </span>
                )}

                <span
                  className="truncate text-[9px] sm:text-[10px]"
                  style={{ color: theme.footer }}
                >
                  Public repository
                </span>
              </div>

              <span
                className="min-w-0 shrink text-right text-[9px] sm:text-[10px]"
                style={{ color: theme.footer }}
              >
                github.com/{repository.fullName}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={downloading}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white shadow-lg shadow-blue-500/10 transition hover:bg-blue-400 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {downloading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />

              Generating PNG...
            </>
          ) : (
            <>
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14"
                />
              </svg>

              Download PNG
            </>
          )}
        </button>

        {downloadError && (
          <p role="alert" className="text-xs text-red-400">
            {downloadError}
          </p>
        )}
      </div>
    </div>
  );
}
