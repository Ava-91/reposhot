"use client";
import LayoutSelector from "@/components/LayoutSelector";
import MetadataControls from "@/components/MetadataControls";
import RepositoryBattle from "@/components/RepositoryBattle";
import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import RepositoryWrapped from "@/components/RepositoryWrapped";
import ThemeSelector from "@/components/ThemeSelector";
import { useRepoShotGenerator } from "@/components/useRepoShotGenerator";

export default function RepoShotGenerator() {
  const { mode, repository, secondRepository, loading, error, shareStatus, theme, layout, template, metadata, setTheme, setLayout, setTemplate, setMetadata, loadRepository, switchMode, handleShare } = useRepoShotGenerator();
  const showEditor = Boolean(repository && !loading && !error && mode === "card");

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mb-6 grid w-full max-w-2xl grid-cols-3 border-y border-white/10 bg-[#0f1115]" role="tablist" aria-label="RepoShot mode">
        {(["card", "battle", "wrapped"] as const).map((value) => (
          <button key={value} type="button" role="tab" aria-selected={mode === value} onClick={() => switchMode(value)} className={`min-h-12 border-r border-white/10 px-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] transition last:border-r-0 ${mode === value ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-zinc-300"}`}>
            {value === "card" ? "Repo Card" : value === "battle" ? "Repository Battle" : "Repo Wrapped"}
          </button>
        ))}
      </div>

      <div className="w-full max-w-2xl"><RepositoryInput onSubmit={(ref) => void loadRepository(ref)} disabled={loading} /></div>
      {mode === "battle" && <div className="mt-3 w-full max-w-2xl"><RepositoryInput onSubmit={(ref) => void loadRepository(ref, true)} disabled={loading} /></div>}
      {loading && <div role="status" aria-live="polite" className="mt-6 font-mono text-xs text-zinc-400">Fetching repository information…</div>}
      {error && !loading && <div role="alert" className="mt-6 w-full max-w-2xl border-l-2 border-red-400 bg-red-400/5 px-4 py-3 text-sm text-red-400">{error}</div>}

      {mode === "battle" && repository && secondRepository && !loading && !error && <section className="mt-10 w-full"><RepositoryBattle left={repository} right={secondRepository} /></section>}
      {mode === "wrapped" && repository && !loading && !error && <section className="mt-10 w-full"><RepositoryWrapped repository={repository} /></section>}

      {repository && showEditor && <section className="mt-10 w-full" aria-label="Repository preview editor">
        <div className="mb-5 border-y border-white/10 py-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div><h2 className="font-mono text-xs uppercase tracking-[0.14em] text-white">Preview</h2><p className="mt-1 text-xs text-zinc-400">Configure the image, then export it.</p></div>
            <ThemeSelector value={theme} onChange={setTheme} />
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-400">Layout</span><LayoutSelector value={layout} onChange={setLayout} /></div>
          <MetadataControls value={metadata} onChange={setMetadata} />
        </div>
        <RepositoryPreview repository={repository} theme={theme} layout={layout} metadata={metadata} template={template} onTemplateChange={setTemplate} onShare={handleShare} />
        {shareStatus && <p role="status" className="mt-3 text-center font-mono text-xs text-zinc-400">{shareStatus}</p>}
      </section>}

      {!loading && !error && !repository && <div className="mt-8 w-full max-w-2xl border-y border-dashed border-white/10 px-6 py-8 text-left"><p className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-300">Ready when you are.</p><p className="mt-2 text-sm text-zinc-400">Paste a public GitHub repository URL above to generate a {mode === "battle" ? "comparison" : mode === "wrapped" ? "Wrapped summary" : "preview"}.</p></div>}
    </section>
  );
}
