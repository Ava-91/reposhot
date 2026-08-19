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
  return <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3"><legend className="px-1 text-xs font-medium text-zinc-500">Metadata & customization</legend>
    <div className="grid grid-cols-1 gap-1.5 min-[360px]:grid-cols-2 sm:grid-cols-4">{options.map(({ key, label }) => <label key={key} className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs text-zinc-300 transition hover:bg-white/5 focus-within:bg-white/5"><input type="checkbox" checked={value[key]} onChange={() => toggle(key)} className="h-4 w-4 shrink-0 rounded border-white/20 bg-zinc-900 accent-blue-500" /><span>{label}</span></label>)}</div>
    <div className="mt-3 grid gap-3 sm:grid-cols-2"><label className="grid gap-1.5 text-xs text-zinc-400"><span>Custom subtitle</span><input value={value.subtitle} onChange={(event) => updateText("subtitle", event.target.value)} maxLength={80} placeholder="Optional tagline" className="min-h-10 rounded-lg border border-white/10 bg-zinc-950/60 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-blue-400/50" /></label><label className="grid gap-1.5 text-xs text-zinc-400"><span>Custom footer</span><input value={value.footerText} onChange={(event) => updateText("footerText", event.target.value)} maxLength={80} placeholder="Optional footer text" className="min-h-10 rounded-lg border border-white/10 bg-zinc-950/60 px-3 text-sm text-zinc-200 outline-none placeholder:text-zinc-600 focus:border-blue-400/50" /></label></div>
    <div className="mt-3"><label className="flex min-h-10 items-center gap-2 rounded-lg px-2 py-2 text-xs text-zinc-400"><span>Accent</span><input type="color" value={value.accentColor || "#60a5fa"} onChange={(event) => onChange({ ...value, accentColor: event.target.value })} aria-label="Custom accent color" className="h-8 w-10 cursor-pointer rounded border border-white/10 bg-transparent p-0.5" /></label></div>
  </fieldset>;
}
