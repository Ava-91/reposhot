"use client";

import { FormEvent, useState } from "react";
import { parseGitHubRepositoryUrl, RepositoryReference } from "@/lib/github-url";

export type Repository = RepositoryReference;
interface RepositoryInputProps { onSubmit: (repository: Repository) => void; disabled?: boolean; label?: string; }

export default function RepositoryInput({ onSubmit, disabled = false, label = "Repository URL" }: RepositoryInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;
    const repository = parseGitHubRepositoryUrl(value);
    if (!repository) { setError("Enter a valid public GitHub repository URL, such as https://github.com/owner/repository."); return; }
    setError("");
    onSubmit(repository);
  }
  function handleChange(newValue: string) { setValue(newValue); if (error) setError(""); }
  return (
    <section className="reposhot-fade-up reposhot-fade-up-delay w-full">
      <form onSubmit={handleSubmit} aria-busy={disabled}>
        {label && <label htmlFor="repository-url" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{label}</label>}
        <div className={"border-y bg-[#0e1013] transition-colors " + (error ? "border-red-400/60" : "border-white/10 focus-within:border-emerald-300/70")}>
          <div className="flex flex-col sm:flex-row">
            <label className="flex min-h-14 flex-1 items-center px-1 sm:px-4">
              <span className="mr-3 font-mono text-sm font-bold text-emerald-300" aria-hidden="true">&gt;</span><span className="mr-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600" aria-hidden="true">git</span>
              <input id="repository-url" type="url" value={value} onChange={(event) => handleChange(event.target.value)} placeholder="https://github.com/owner/repository" aria-label={label} aria-invalid={Boolean(error)} aria-describedby={error ? "repository-error" : undefined} disabled={disabled} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-white outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base" />
            </label>
            <button type="submit" disabled={disabled} className="min-h-12 border-l border-white/10 bg-emerald-400 px-6 text-sm font-bold text-[#07110d] transition hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-200/70 disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-14">{disabled ? "Fetching…" : "Generate preview →"}</button>
          </div>
        </div>
        {error ? <p id="repository-error" role="alert" className="mt-3 text-sm text-red-400">{error}</p> : <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-600">public repositories · PNG export</p>}
      </form>
    </section>
  );
}
