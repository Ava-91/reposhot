"use client";

import { ThemeName, themes } from "@/lib/themes";

interface ThemeSelectorProps {
  value: ThemeName;
  onChange: (theme: ThemeName) => void;
}

const themeOptions: ThemeName[] = ["dark", "light"];

export default function ThemeSelector({
  value,
  onChange,
}: ThemeSelectorProps) {
  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/3 p-1"
      aria-label="Screenshot theme"
    >
      {themeOptions.map((themeName) => {
        const theme = themes[themeName];
        const selected = value === themeName;

        return (
          <button
            key={themeName}
            type="button"
            onClick={() => onChange(themeName)}
            aria-pressed={selected}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition ${
              selected
                ? "bg-white/10 text-white shadow-sm"
                : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300"
            }`}
          >
            <span
              aria-hidden="true"
              className={`h-3 w-3 rounded-full border ${
                selected ? "border-white/30" : "border-white/10"
              }`}
              style={{
                backgroundColor:
                  themeName === "dark" ? "#18181b" : "#f8fafc",
              }}
            />

            {theme.name}
          </button>
        );
      })}
    </div>
  );
}