"use client";

import { FormEvent, useState } from "react";

import {
  parseGitHubRepositoryUrl,
  RepositoryReference,
} from "@/lib/github-url";

export type Repository = RepositoryReference;

interface RepositoryInputProps {
  onSubmit: (repository: Repository) => void;
  disabled?: boolean;
}

export default function RepositoryInput({
  onSubmit,
  disabled = false,
}: RepositoryInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (disabled) return;

    const repository = parseGitHubRepositoryUrl(value);
    if (!repository) {
      setError(
        "Enter a valid public GitHub repository URL, such as https://github.com/owner/repository.",
      );
      return;
    }

    setError("");
    onSubmit(repository);
  }

  function handleChange(newValue: string) {
    setValue(newValue);
    if (error) setError("");
  }

  return (
    <section className="reposhot-fade-up reposhot-fade-up-delay w-full max-w-2xl">
      <form onSubmit={handleSubmit} aria-busy={disabled}>
        <div
          className={`rounded-2xl border bg-white/4 p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition duration-200 ${
            error
              ? "border-red-400/40"
              : "border-white/10 focus-within:border-blue-400/40 hover:border-white/15"
          }`}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-h-12 flex-1 items-center rounded-xl border border-white/5 bg-black/20 px-4 text-left transition-colors duration-200 focus-within:border-white/10">
              <svg
                aria-hidden="true"
                className="mr-3 h-5 w-5 shrink-0 text-zinc-500 transition-colors duration-200 group-focus-within:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6.5 17 3a4.243 4.243 0 0 1 6 6l-3.5 3.5M10.5 17.5 7 21a4.243 4.243 0 0 1-6-6l3.5-3.5m2-2 9-9m-6 15 9-9"
                />
              </svg>

              <input
                type="url"
                value={value}
                onChange={(event) => handleChange(event.target.value)}
                placeholder="https://github.com/owner/repository"
                aria-label="GitHub repository URL"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? "repository-error" : undefined}
                disabled={disabled}
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
              />
            </label>

            <button
              type="submit"
              disabled={disabled}
              className="min-h-12 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white transition duration-200 hover:-translate-y-px hover:bg-blue-400 hover:shadow-lg hover:shadow-blue-500/20 active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:shrink-0"
            >
              {disabled ? "Generating..." : "Generate Shot"}
            </button>
          </div>
        </div>

        {error ? (
          <p id="repository-error" role="alert" className="mt-3 text-sm text-red-400">
            {error}
          </p>
        ) : (
          <p className="mt-3 text-xs text-zinc-600">
            Public GitHub repositories · PNG export
          </p>
        )}
      </form>
    </section>
  );
}
