"use client";

import { useEffect, useState } from "react";

import LayoutSelector from "@/components/LayoutSelector";
import MetadataControls, { MetadataVisibility } from "@/components/MetadataControls";
import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import ThemeSelector from "@/components/ThemeSelector";
import { getRepository, RepositoryData } from "@/lib/github";
import { defaultLayout, layouts, LayoutName } from "@/lib/layouts";
import { decodePreset, encodePreset } from "@/lib/preset";
import { defaultTemplate, templates, TemplateName } from "@/lib/templates";
import { defaultTheme, themes, ThemeName } from "@/lib/themes";

const defaultMetadataVisibility: MetadataVisibility = {
  description: true, language: true, stars: true, forks: true, openIssues: true, owner: true,
  subtitle: "", footerText: "", showGithubUrl: true, accentColor: "",
};

export default function RepoShotGenerator() {
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [lastRepository, setLastRepository] = useState<{ owner: string; repo: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [layout, setLayout] = useState<LayoutName>(defaultLayout);
  const [template, setTemplate] = useState<TemplateName>(defaultTemplate);
  const [metadata, setMetadata] = useState<MetadataVisibility>(defaultMetadataVisibility);

  async function handleRepositorySubmit({ owner, repo }: { owner: string; repo: string }) {
    setLoading(true); setError(""); setRepository(null); setLastRepository({ owner, repo });
    try { setRepository(await getRepository(owner, repo)); }
    catch (error) { setError(error instanceof Error ? error.message : "Something went wrong while fetching the repository."); }
    finally { setLoading(false); }
  }

  useEffect(() => {
    const presetValue = new URLSearchParams(window.location.search).get("preset");
    if (!presetValue) return;
    const preset = decodePreset(presetValue, Object.keys(themes), Object.keys(layouts), Object.keys(templates));
    if (!preset) { setError("That RepoShot preset is invalid."); return; }
    setTheme(preset.theme); setLayout(preset.layout); setTemplate(preset.template); setMetadata(preset.metadata);
    void handleRepositorySubmit({ owner: preset.owner, repo: preset.repo });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  function handleRetry() { if (lastRepository && !loading) void handleRepositorySubmit(lastRepository); }

  async function handleShare() {
    if (!lastRepository) return;
    const preset = encodePreset({ owner: lastRepository.owner, repo: lastRepository.repo, theme, layout, template, metadata });
    const url = new URL(window.location.href);
    url.search = `?preset=${preset}`;
    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus("Share link copied!");
      window.setTimeout(() => setShareStatus(""), 2500);
    } catch {
      setShareStatus("Clipboard unavailable. Copy the link from your browser address bar after opening the preset.");
      window.history.replaceState(null, "", url);
    }
  }

  return (
    <section className="flex w-full flex-col items-center">
      <RepositoryInput onSubmit={handleRepositorySubmit} disabled={loading} />
      {!loading && !error && !repository && <div className="mt-8 w-full max-w-2xl rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-8 text-center"><p className="text-sm font-medium text-zinc-300">Ready for a RepoShot?</p><p className="mt-1 text-xs text-zinc-500">Paste a public GitHub repository URL above to generate your preview.</p></div>}
      {loading && <div role="status" aria-live="polite" className="mt-6 flex items-center gap-3 text-sm text-zinc-400"><span aria-hidden="true" className="motion-safe:animate-spin h-4 w-4 rounded-full border-2 border-zinc-700 border-t-blue-400" />Fetching repository information...</div>}
      {error && !loading && <div role="alert" aria-live="assertive" className="mt-6 flex w-full max-w-2xl flex-col gap-3 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400 sm:flex-row sm:items-center sm:justify-between"><p>{error}</p>{lastRepository && <button type="button" onClick={handleRetry} className="min-h-10 shrink-0 rounded-lg border border-red-400/30 px-4 text-xs font-semibold text-red-300">Try again</button>}</div>}
      {repository && !loading && !error && <section className="mt-10 w-full" aria-label="Repository preview editor">
        <div className="mb-4 flex flex-col gap-4 px-1">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-sm font-semibold text-zinc-200">Preview</h2><p className="mt-1 text-xs text-zinc-500">Your RepoShot preview.</p></div><ThemeSelector value={theme} onChange={setTheme} /></div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><span className="text-xs font-medium text-zinc-500">Layout</span><LayoutSelector value={layout} onChange={setLayout} /></div>
          <MetadataControls value={metadata} onChange={setMetadata} />
        </div>
        <RepositoryPreview repository={repository} theme={theme} layout={layout} metadata={metadata} template={template} onTemplateChange={setTemplate} onShare={handleShare} />
        {shareStatus && <p role="status" aria-live="polite" className="mt-3 text-center text-xs text-zinc-400">{shareStatus}</p>}
      </section>}
    </section>
  );
}
