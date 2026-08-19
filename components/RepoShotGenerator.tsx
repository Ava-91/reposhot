"use client";

import { useEffect, useState } from "react";
import LayoutSelector from "@/components/LayoutSelector";
import MetadataControls, { MetadataVisibility } from "@/components/MetadataControls";
import RepositoryBattle from "@/components/RepositoryBattle";
import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import RepositoryWrapped from "@/components/RepositoryWrapped";
import ThemeSelector from "@/components/ThemeSelector";
import { getRepository, RepositoryData } from "@/lib/github";
import { defaultLayout, layouts, LayoutName } from "@/lib/layouts";
import { decodePreset, encodePreset } from "@/lib/preset";
import { defaultTemplate, templates, TemplateName } from "@/lib/templates";
import { defaultTheme, themes, ThemeName } from "@/lib/themes";

const defaultMetadataVisibility: MetadataVisibility = { description: true, language: true, stars: true, forks: true, openIssues: true, owner: true, subtitle: "", footerText: "", showGithubUrl: true, accentColor: "", showVibe: false };
type Mode = "card" | "battle" | "wrapped";

export default function RepoShotGenerator() {
  const [mode, setMode] = useState<Mode>("card");
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [secondRepository, setSecondRepository] = useState<RepositoryData | null>(null);
  const [lastRepository, setLastRepository] = useState<{ owner: string; repo: string } | null>(null);
  const [loading, setLoading] = useState(false); const [error, setError] = useState(""); const [shareStatus, setShareStatus] = useState("");
  const [theme, setTheme] = useState<ThemeName>(defaultTheme); const [layout, setLayout] = useState<LayoutName>(defaultLayout); const [template, setTemplate] = useState<TemplateName>(defaultTemplate); const [metadata, setMetadata] = useState<MetadataVisibility>(defaultMetadataVisibility);

  async function loadRepository({ owner, repo }: { owner: string; repo: string }, secondary = false) {
    setLoading(true); setError("");
    if (!secondary) { setRepository(null); setLastRepository({ owner, repo }); } else setSecondRepository(null);
    try { const data = await getRepository(owner, repo); secondary ? setSecondRepository(data) : setRepository(data); }
    catch (caught) { setError(caught instanceof Error ? caught.message : "Something went wrong while fetching the repository."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const presetValue = new URLSearchParams(window.location.search).get("preset"); if (!presetValue) return;
    const preset = decodePreset(presetValue, Object.keys(themes), Object.keys(layouts), Object.keys(templates));
    if (!preset) { queueMicrotask(() => setError("That RepoShot preset is invalid.")); return; }
    queueMicrotask(() => { setTheme(preset.theme); setLayout(preset.layout); setTemplate(preset.template); setMetadata(preset.metadata); void loadRepository({ owner: preset.owner, repo: preset.repo }); window.history.replaceState(null, "", window.location.pathname); });
  }, []);

  async function handleShare() {
    if (!lastRepository) return;
    const preset = encodePreset({ owner: lastRepository.owner, repo: lastRepository.repo, theme, layout, template, metadata }); const url = new URL(window.location.href); url.search = `?preset=${preset}`;
    try { await navigator.clipboard.writeText(url.toString()); setShareStatus("Share link copied!"); window.setTimeout(() => setShareStatus(""), 2500); } catch { setShareStatus("Clipboard unavailable. Copy the link from your browser address bar."); window.history.replaceState(null, "", url); }
  }
  const showEditor = repository && !loading && !error && mode === "card";
  return <section className="flex w-full flex-col items-center">
    <div className="mb-6 grid w-full max-w-2xl grid-cols-3 gap-2 rounded-2xl border border-white/10 bg-white/[0.025] p-1" role="tablist" aria-label="RepoShot mode"><button type="button" role="tab" aria-selected={mode === "card"} onClick={() => { setMode("card"); setSecondRepository(null); }} className={`min-h-11 rounded-xl text-xs font-semibold transition ${mode === "card" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>Repo Card</button><button type="button" role="tab" aria-selected={mode === "battle"} onClick={() => { setMode("battle"); setSecondRepository(null); }} className={`min-h-11 rounded-xl text-xs font-semibold transition ${mode === "battle" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>Repository Battle</button><button type="button" role="tab" aria-selected={mode === "wrapped"} onClick={() => { setMode("wrapped"); setSecondRepository(null); }} className={`min-h-11 rounded-xl text-xs font-semibold transition ${mode === "wrapped" ? "bg-white/10 text-white" : "text-zinc-500 hover:text-zinc-300"}`}>Repo Wrapped</button></div>
    <div className="w-full max-w-2xl"><RepositoryInput onSubmit={(repo) => void loadRepository(repo)} disabled={loading} /></div>
    {mode === "battle" && <div className="mt-3 w-full max-w-2xl"><RepositoryInput onSubmit={(repo) => void loadRepository(repo, true)} disabled={loading} /></div>}
    {loading && <div role="status" aria-live="polite" className="mt-6 text-sm text-zinc-400">Fetching repository information...</div>}
    {error && !loading && <div role="alert" className="mt-6 w-full max-w-2xl rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400">{error}</div>}
    {mode === "battle" && repository && secondRepository && !loading && !error && <section className="mt-10 w-full"><RepositoryBattle left={repository} right={secondRepository} /></section>}
    {mode === "wrapped" && repository && !loading && !error && <section className="mt-10 w-full"><RepositoryWrapped repository={repository} /></section>}
    {showEditor && <section className="mt-10 w-full" aria-label="Repository preview editor"><div className="mb-4 flex flex-col gap-4 px-1"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-sm font-semibold text-zinc-200">Preview</h2><p className="mt-1 text-xs text-zinc-500">Your RepoShot preview.</p></div><ThemeSelector value={theme} onChange={setTheme} /></div><div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs font-medium text-zinc-500">Layout</span><LayoutSelector value={layout} onChange={setLayout} /></div><MetadataControls value={metadata} onChange={setMetadata} /></div><RepositoryPreview repository={repository} theme={theme} layout={layout} metadata={metadata} template={template} onTemplateChange={setTemplate} onShare={handleShare} />{shareStatus && <p role="status" className="mt-3 text-center text-xs text-zinc-400">{shareStatus}</p>}</section>}
    {!loading && !error && !repository && <div className="mt-8 w-full max-w-2xl rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-8 text-center"><p className="text-sm font-medium text-zinc-300">Ready for a RepoShot?</p><p className="mt-1 text-xs text-zinc-500">Paste a public GitHub repository URL above to generate a {mode === "battle" ? "comparison" : mode === "wrapped" ? "Wrapped summary" : "preview"}.</p></div>}
  </section>;
}
