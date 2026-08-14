"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";

import { RepositoryData } from "@/lib/github";

interface RepositoryPreviewProps {
  repository: RepositoryData;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export default function RepositoryPreview({
  repository,
}: RepositoryPreviewProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState("");

  async function handleDownload() {
    if (!previewRef.current || downloading) {
      return;
    }

    setDownloading(true);
    setDownloadError("");

    try {
      const dataUrl = await toPng(previewRef.current, {
        width: 1200,
        height: 675,
        pixelRatio: 1,
        cacheBust: true,
      });

      const link = document.createElement("a");

      link.download = `reposhot-${repository.owner.login}-${repository.name}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      setDownloadError(
        "Couldn't generate the image. Please try again.",
      );
    } finally {
      setDownloading(false);
    }
  }

  return (
    <section className="mt-10 w-full">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h2 className="text-sm font-semibold text-zinc-200">
            Preview
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Your RepoShot preview.
          </p>
        </div>

        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-zinc-500">
          1200 × 675
        </span>
      </div>

      <div
        ref={previewRef}
        className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/40"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-32 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl"
        />

        <div className="relative flex h-full flex-col justify-between p-7 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="flex min-w-0 items-center gap-4">
              <Image
                src={repository.owner.avatarUrl}
                alt={`${repository.owner.login}'s avatar`}
                width={64}
                height={64}
                className="h-14 w-14 rounded-2xl border border-white/10 object-cover shadow-lg sm:h-16 sm:w-16"
              />

              <div className="min-w-0">
                <p className="text-sm font-medium text-zinc-500">
                  {repository.owner.login}
                </p>

                <h3 className="mt-1 truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {repository.name}
                </h3>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-zinc-400 sm:flex">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.35-3.88-1.35-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.18-3.07-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.17A10.9 10.9 0 0 1 12 6.04c.97 0 1.94.13 2.85.38 2.18-1.48 3.14-1.17 3.14-1.17.62 1.58.23 2.75.11 3.04.73.8 1.18 1.82 1.18 3.07 0 4.41-2.69 5.39-5.25 5.67.41.36.78 1.08.78 2.18v3.24c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>

              GitHub
            </div>
          </div>

          <div className="max-w-3xl">
            <p className="line-clamp-3 text-base leading-7 text-zinc-300 sm:text-lg sm:leading-8">
              {repository.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {repository.language && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-400" />
                  {repository.language}
                </span>
              )}

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                ★ {formatNumber(repository.stars)}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                🍴 {formatNumber(repository.forks)}
              </span>

              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                Issues {formatNumber(repository.openIssues)}
              </span>

              {repository.license && (
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300">
                  {repository.license}
                </span>
              )}
            </div>

            <div className="max-w-full truncate text-xs text-zinc-600">
              github.com/{repository.fullName}
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
          <p
            role="alert"
            className="text-xs text-red-400"
          >
            {downloadError}
          </p>
        )}
      </div>
    </section>
  );
}