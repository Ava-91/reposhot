"use client";

import { useState } from "react";
import { layouts, LayoutName } from "@/lib/layouts";

interface LayoutSelectorProps {
  value: LayoutName;
  onChange: (layout: LayoutName) => void;
  customWidth: number;
  customHeight: number;
  onCustomWidthChange: (width: number) => void;
  onCustomHeightChange: (height: number) => void;
}

export default function LayoutSelector({
  value, onChange, customWidth, customHeight, onCustomWidthChange, onCustomHeightChange,
}: LayoutSelectorProps) {
  const [widthDraft, setWidthDraft] = useState(String(customWidth));
  const [heightDraft, setHeightDraft] = useState(String(customHeight));

  const commitWidth = () => {
    const next = Math.max(320, Math.min(2400, Number(widthDraft) || 320));
    setWidthDraft(String(next));
    onCustomWidthChange(next);
  };
  const commitHeight = () => {
    const next = Math.max(320, Math.min(3200, Number(heightDraft) || 320));
    setHeightDraft(String(next));
    onCustomHeightChange(next);
  };

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto" aria-label="Screenshot layout" role="group">
      <div className="flex w-full flex-wrap items-center gap-2">
        {Object.entries(layouts).map(([name, layout]) => {
          const layoutName = name as LayoutName;
          const selected = value === layoutName;
          const displayWidth = layoutName === "custom" ? customWidth : layout.width;
          const displayHeight = layoutName === "custom" ? customHeight : layout.height;
          return (
            <button
              key={layoutName}
              type="button"
              onClick={() => onChange(layoutName)}
              aria-pressed={selected}
              aria-label={`${layout.label}, ${displayWidth} by ${displayHeight} pixels${selected ? ", selected" : ""}`}
              className={`min-h-11 rounded-xl border px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 ${
                selected ? "border-blue-400/40 bg-blue-400/10 text-blue-300" : "border-white/10 bg-white/3 text-zinc-400 hover:bg-white/6 hover:text-zinc-200"
              }`}
            >
              <span className="block text-xs font-semibold">{layout.label}</span>
              <span className="mt-0.5 block text-[10px] text-zinc-500">{displayWidth} × {displayHeight}</span>
            </button>
          );
        })}
      </div>
      {value === "custom" && (
        <div className="grid grid-cols-2 gap-3 border border-white/10 bg-white/[0.025] p-3">
          <label className="grid gap-1 text-xs text-zinc-400">
            Width (320–2400 px)
            <input aria-label="Custom export width" type="number" min={320} max={2400} step={10} value={widthDraft} onChange={(event) => setWidthDraft(event.target.value)} onBlur={commitWidth} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }} className="min-h-10 border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-200" />
          </label>
          <label className="grid gap-1 text-xs text-zinc-400">
            Height (320–3200 px)
            <input aria-label="Custom export height" type="number" min={320} max={3200} step={10} value={heightDraft} onChange={(event) => setHeightDraft(event.target.value)} onBlur={commitHeight} onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }} className="min-h-10 border border-white/10 bg-zinc-950 px-3 text-sm text-zinc-200" />
          </label>
        </div>
      )}
    </div>
  );
}
