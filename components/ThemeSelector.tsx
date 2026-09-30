"use client";

import { ThemeName, themes } from "@/lib/themes";

interface ThemeSelectorProps { value: ThemeName; onChange: (theme: ThemeName) => void; }
const themeOptions: ThemeName[] = ["dark", "light"];

export default function ThemeSelector({ value, onChange }: ThemeSelectorProps) {
  return (
    <div className="flex items-center border border-white/10 bg-[#101216]" aria-label="Screenshot theme" role="group">
      {themeOptions.map((themeName) => {
        const theme = themes[themeName];
        const selected = value === themeName;
        return <button key={themeName} type="button" onClick={() => onChange(themeName)} aria-pressed={selected} aria-label={theme.name + (selected ? ", selected" : "")} className={`min-h-10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.12em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${selected ? "bg-white/10 text-white" : "text-zinc-400 hover:text-zinc-300"}`}>
          {theme.name}
        </button>;
      })}
    </div>
  );
}
