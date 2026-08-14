"use client";

import { layouts, LayoutName } from "@/lib/layouts";

interface LayoutSelectorProps {
  value: LayoutName;
  onChange: (layout: LayoutName) => void;
}

export default function LayoutSelector({
  value,
  onChange,
}: LayoutSelectorProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      aria-label="Screenshot layout"
      role="group"
    >
      {Object.entries(layouts).map(([name, layout]) => {
        const layoutName = name as LayoutName;
        const selected = value === layoutName;

        return (
          <button
            key={layoutName}
            type="button"
            onClick={() => onChange(layoutName)}
            aria-pressed={selected}
            className={`rounded-xl border px-3 py-2 text-left transition ${
              selected
                ? "border-blue-400/40 bg-blue-400/10 text-blue-300"
                : "border-white/10 bg-white/3 text-zinc-400 hover:bg-white/6 hover:text-zinc-200"
            }`}
          >
            <span className="block text-xs font-semibold">
              {layout.label}
            </span>

            <span className="mt-0.5 block text-[10px] text-zinc-500">
              {layout.width} × {layout.height}
            </span>
          </button>
        );
      })}
    </div>
  );
}