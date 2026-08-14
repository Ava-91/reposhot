"use client";

export interface MetadataVisibility {
  description: boolean;
  language: boolean;
  stars: boolean;
  forks: boolean;
  openIssues: boolean;
  owner: boolean;
}

interface MetadataControlsProps {
  value: MetadataVisibility;
  onChange: (value: MetadataVisibility) => void;
}

const options: Array<{ key: keyof MetadataVisibility; label: string }> = [
  { key: "description", label: "Description" },
  { key: "language", label: "Language" },
  { key: "stars", label: "Stars" },
  { key: "forks", label: "Forks" },
  { key: "openIssues", label: "Open issues" },
  { key: "owner", label: "Owner / avatar" },
];

export default function MetadataControls({ value, onChange }: MetadataControlsProps) {
  function toggle(key: keyof MetadataVisibility) {
    onChange({ ...value, [key]: !value[key] });
  }

  return (
    <fieldset className="rounded-xl border border-white/10 bg-white/3 p-3">
      <legend className="px-1 text-xs font-medium text-zinc-500">Metadata</legend>

      <div className="grid grid-cols-1 gap-1.5 min-[360px]:grid-cols-2 sm:grid-cols-3">
        {options.map(({ key, label }) => (
          <label
            key={key}
            className="flex min-h-10 cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs text-zinc-300 transition hover:bg-white/5 focus-within:bg-white/5"
          >
            <input
              type="checkbox"
              checked={value[key]}
              onChange={() => toggle(key)}
              className="h-4 w-4 shrink-0 rounded border-white/20 bg-zinc-900 accent-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
