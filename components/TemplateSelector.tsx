"use client";

import { templates, TemplateName } from "@/lib/templates";

interface TemplateSelectorProps { value: TemplateName; onChange: (value: TemplateName) => void; }

export default function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  return <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
    <legend className="px-1 text-xs font-medium text-zinc-500">Template</legend>
    <div className="grid gap-2 sm:grid-cols-3">
      {(Object.keys(templates) as TemplateName[]).map((name) => {
        const template = templates[name];
        const selected = value === name;
        return <button key={name} type="button" aria-pressed={selected} onClick={() => onChange(name)} className={`min-h-16 rounded-xl border px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 ${selected ? "border-blue-400/60 bg-blue-400/10" : "border-white/10 bg-white/[0.02] hover:bg-white/5"}`}>
          <span className="block text-xs font-semibold text-zinc-200">{template.label}</span>
          <span className="mt-1 block text-[10px] leading-4 text-zinc-500">{template.description}</span>
        </button>;
      })}
    </div>
  </fieldset>;
}
