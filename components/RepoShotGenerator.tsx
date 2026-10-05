"use client";

import { useEffect } from "react";
import LayoutSelector from "@/components/LayoutSelector";
import MetadataControls from "@/components/MetadataControls";
import RepositoryBattle from "@/components/RepositoryBattle";
import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import RepositoryWrapped from "@/components/RepositoryWrapped";
import ThemeSelector from "@/components/ThemeSelector";
import { useRepoShotGenerator } from "@/components/useRepoShotGenerator";

export default function RepoShotGenerator() {
  const { mode, repository, secondRepository, loading, error, shareStatus, theme, layout, template, metadata, setTheme, setLayout, setTemplate, setMetadata, loadRepository, switchMode, handleShare, clearError } = useRepoShotGenerator();
  useEffect(() => { const onKeyDown = (event: KeyboardEvent) => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement || event.target instanceof HTMLSelectElement) return; if (event.key === "/" ) { event.preventDefault(); document.getElementById("repository-url")?.focus(); } else if (event.key === "1") switchMode("card"); else if (event.key === "2") switchMode("battle"); else if (event.key === "3") switchMode("wrapped"); else if (event.key === "Escape" && error) clearError(); }; window.addEventListener("keydown", onKeyDown); return () => window.removeEventListener("keydown", onKeyDown); }, [error, clearError, switchMode]);
  const showEditor = Boolean(repository && !loading && !error && mode === "card");
  return (
    <section className="flex w-full flex-col items-center">
      <div className="mb-6 grid w-full max-w-2xl grid-cols-3 border-y border-white/10" role="tablist" aria-label="RepoShot mode">
        {(["card", "battle", "wrapped"] as const).map((value) => (
          <button key={value} type="button" role="tab" aria-selected={mode === value} onClick={() => switchMode(value)}
            className={"min-h-12 border-r border-white/10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition last:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 focus-visible:ring-inset " + (mode === value ? "bg-white/[0.07] text-white" : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-300")}>
            {value === "card" ? "Repo Card" : value === "battle" ? "Repository Battle" : "Repo Wrapped"}
          </button>
        ))}
      </div>
      <div className="w-full max-w-2xl"><RepositoryInput onSubmit={(ref) => void loadRepository(ref)} onExample={() => void loadRepository({ owner: "vercel", repo: "next.js" })} disabled={loading} label={mode === "battle" ? "Repository A" : undefined} /></div>
      {mode === "battle" && <><div className="my-2 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600" aria-hidden="true">vs</div><div className="w-full max-w-2xl"><RepositoryInput onSubmit={(ref) => void loadRepository(ref, true)} disabled={loading} label="Repository B" /></div></>}
      {loading && <div role="status" aria-live="polite" className="mt-6 font-mono text-xs text-zinc-500">Fetching repository information…</div>}
      {error && !loading && <div role="alert" className="mt-6 w-full max-w-2xl border-l-2 border-red-400 bg-red-400/[0.04] px-4 py-3 text-sm text-red-300">{error}</div>}
      {mode === "battle" && repository && secondRepository && !loading && !error && <section className="mt-10 w-full" aria-label="Repository battle result"><RepositoryBattle left={repository} right={secondRepository} /></section>}
      {mode === "wrapped" && repository && !loading && !error && <section className="mt-10 w-full" aria-label="Repository Wrapped result"><RepositoryWrapped repository={repository} /></section>}
      {repository && showEditor && <section className="mt-10 w-full" aria-label="Repository preview editor">
        <div className="mb-5">
          <div className="mb-4 border-y border-white/10 py-4"><h2 className="font-mono text-xs uppercase tracking-[0.14em] text-white">Preview</h2><p className="mt-1 text-xs text-zinc-500">Your shareable image is ready. Refine it below if you want.</p></div>
          <RepositoryPreview repository={repository} theme={theme} layout={layout} metadata={metadata} template={template} onTemplateChange={setTemplate} onShare={handleShare} shareStatus={shareStatus} />
          {shareStatus && <p role="status" className="mt-3 text-center font-mono text-xs text-zinc-500">{shareStatus}</p>}
        </div>
        <details className="border-y border-white/10" open>
          <summary className="cursor-pointer list-none px-1 py-4 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70">Customize preview</summary>
          <div className="border-t border-white/[0.06] py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">Theme</p></div><ThemeSelector value={theme} onChange={setTheme} /></div>
            <div className="mt-4 flex flex-col gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">Layout</span><LayoutSelector value={layout} onChange={setLayout} /></div>
            <div className="mt-4"><MetadataControls value={metadata} onChange={setMetadata} /></div>
          </div>
        </details>
      </section>}
      {!loading && !error && !repository && <div className="mt-8 w-full max-w-2xl border-y border-dashed border-white/10 px-1 py-8 text-left"><p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-300">Ready when you are.</p><p className="mt-2 text-sm leading-6 text-zinc-500">Paste a public GitHub repository URL above to generate a {mode === "battle" ? "comparison" : mode === "wrapped" ? "Wrapped summary" : "preview"}.</p></div>}
    </section>
  );
}
