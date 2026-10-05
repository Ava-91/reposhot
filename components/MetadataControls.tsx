"use client";

export interface MetadataVisibility { description: boolean; language: boolean; stars: boolean; forks: boolean; openIssues: boolean; owner: boolean; subtitle: string; footerText: string; showGithubUrl: boolean; accentColor: string; showVibe: boolean; adaptiveLayout: boolean; }
type BooleanMetadataKey = keyof Pick<MetadataVisibility, "description" | "language" | "stars" | "forks" | "openIssues" | "owner" | "showGithubUrl" | "showVibe" | "adaptiveLayout">;
interface MetadataControlsProps { value: MetadataVisibility; onChange: (value: MetadataVisibility) => void; }
const options: Array<{ key: BooleanMetadataKey; label: string }> = [
  { key: "description", label: "Description" }, { key: "language", label: "Language" }, { key: "stars", label: "Stars" }, { key: "forks", label: "Forks" },
  { key: "openIssues", label: "Open issues" }, { key: "owner", label: "Owner / avatar" }, { key: "showVibe", label: "Repository vibe" }, { key: "adaptiveLayout", label: "Auto layout" }, { key: "showGithubUrl", label: "GitHub URL" },
];
export default function MetadataControls({ value, onChange }: MetadataControlsProps) {
  function toggle(key: BooleanMetadataKey) { onChange({ ...value, [key]: !value[key] }); }
  function updateText(key: "subtitle" | "footerText", nextValue: string) { onChange({ ...value, [key]: nextValue }); }
  return <fieldset className="border-y border-white/10">
    <legend className="px-1 py-4 font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">Content & details</legend>
    <div className="divide-y divide-white/[0.06]">
      <details className="group">
        <summary className="cursor-pointer list-none px-1 py-3 text-xs font-medium text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"><span className="mr-2 text-zinc-600">01</span>Appearance <span className="float-right text-zinc-600 group-open:rotate-90">›</span></summary>
        <div className="grid gap-3 border-t border-white/[0.06] px-1 py-3 sm:grid-cols-2">
          <label className="flex min-h-10 items-center justify-between gap-2 text-xs text-zinc-400"><span>Accent color</span><input type="color" value={value.accentColor || "#60a5fa"} onChange={(event) => onChange({ ...value, accentColor: event.target.value })} aria-label="Custom accent color" className="h-8 w-10 cursor-pointer border border-white/10 bg-transparent p-0.5" /></label>
          <label className="flex min-h-10 cursor-pointer items-center gap-2 text-xs text-zinc-400"><input type="checkbox" checked={value.adaptiveLayout} onChange={() => toggle("adaptiveLayout")} className="h-4 w-4 accent-emerald-300" /><span>Auto layout</span></label>
        </div>
      </details>
      <details className="group">
        <summary className="cursor-pointer list-none px-1 py-3 text-xs font-medium text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"><span className="mr-2 text-zinc-600">02</span>Content <span className="float-right text-zinc-600 group-open:rotate-90">›</span></summary>
        <div className="grid grid-cols-1 gap-1.5 border-t border-white/[0.06] px-1 py-3 min-[360px]:grid-cols-2 sm:grid-cols-3">
          {options.filter(({ key }) => ["description","language","stars","forks","openIssues","owner"].includes(key)).map(({ key, label }) => <label key={key} className="flex min-h-10 cursor-pointer items-center gap-2 px-2 py-2 text-xs text-zinc-300 hover:bg-white/5"><input type="checkbox" checked={value[key]} onChange={() => toggle(key)} className="h-4 w-4 accent-emerald-300" /><span>{label}</span></label>)}
          <label className="flex min-h-10 cursor-pointer items-center gap-2 px-2 py-2 text-xs text-zinc-300 hover:bg-white/5"><input type="checkbox" checked={value.showVibe} onChange={() => toggle("showVibe")} className="h-4 w-4 accent-emerald-300" /><span>Repository vibe</span></label>
        </div>
      </details>
      <details className="group">
        <summary className="cursor-pointer list-none px-1 py-3 text-xs font-medium text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"><span className="mr-2 text-zinc-600">03</span>Details <span className="float-right text-zinc-600 group-open:rotate-90">›</span></summary>
        <div className="border-t border-white/[0.06] px-1 py-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1.5 text-xs text-zinc-400"><span>Custom subtitle</span><input value={value.subtitle} onChange={(event) => updateText("subtitle", event.target.value)} maxLength={80} placeholder="Optional tagline" className="min-h-10 border border-white/10 bg-zinc-950/60 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50" /></label>
            <label className="grid gap-1.5 text-xs text-zinc-400"><span>Custom footer</span><input value={value.footerText} onChange={(event) => updateText("footerText", event.target.value)} maxLength={80} placeholder="Optional footer text" className="min-h-10 border border-white/10 bg-zinc-950/60 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-emerald-300/50" /></label>
          </div>
          <label className="mt-3 flex min-h-10 cursor-pointer items-center gap-2 px-2 py-2 text-xs text-zinc-400"><input type="checkbox" checked={value.showGithubUrl} onChange={() => toggle("showGithubUrl")} className="h-4 w-4 accent-emerald-300" /><span>GitHub URL</span></label>
        </div>
      </details>
    </div>
  </fieldset>;
}
