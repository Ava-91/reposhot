"use client";

import { templates, TemplateName } from "@/lib/templates";

interface TemplateSelectorProps { value: TemplateName; onChange: (value: TemplateName) => void; }

export default function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return (
    <fieldset className="border-y border-white/10 py-3">
      <legend className="px-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">Export template</legend>
      <div className="mt-2 grid gap-px bg-white/10 sm:grid-cols-3">
        {(Object.keys(templates) as TemplateName[]).map((name) => {
          const template = templates[name];
          const selected = value === name;
          return <button key={name} type="button" aria-pressed={selected} onClick={() => onChange(name)} className={`min-h-16 bg-[#101216] px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70 ${selected ? "border-l-2 border-emerald-300" : "hover:bg-[#15181d]"}`}>
            <span className="block text-xs font-semibold text-zinc-200">{template.label}</span>
            <span className="mt-1 block text-[10px] leading-4 text-zinc-400">{template.description}</span>
          </button>;
        })}
      </div>
    </fieldset>
  );
}
