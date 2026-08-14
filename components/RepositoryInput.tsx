"use client";

import { FormEvent, useState } from "react";

export interface Repository {
  owner: string;
  repo: string;
}

interface RepositoryInputProps {
  onSubmit: (repository: Repository) => void;
}

function parseGitHubUrl(value: string): Repository | null {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return null;
  }

  try {
    const url = new URL(trimmedValue);

    if (url.protocol !== "https:" || url.hostname !== "github.com") {
      return null;
    }

    const parts = url.pathname.split("/").filter(Boolean);

    if (parts.length !== 2) {
      return null;
    }

    const [owner, repo] = parts;

    if (!owner || !repo) {
      return null;
    }

    return {
      owner,
      repo,
    };
  } catch {
    return null;
  }
}

export default function RepositoryInput({
  onSubmit,
}: RepositoryInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const repository = parseGitHubUrl(value);

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

    if (error) {
      setError("");
    }
  }

  return (
    <section className="w-full max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div
          className={`rounded-2xl border bg-white/[0.04] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl transition ${
            error
              ? "border-red-400/40"
              : "border-white/10 focus-within:border-blue-400/40"
          }`}
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="flex min-h-12 flex-1 items-center rounded-xl border border-white/5 bg-black/20 px-4 text-left">
              <svg
                aria-hidden="true"
                className="mr-3 h-5 w-5 shrink-0 text-zinc-500"
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
                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600 sm:text-base"
              />
            </label>

            <button
              type="submit"
              className="min-h-12 rounded-xl bg-blue-500 px-6 text-sm font-semibold text-white transition hover:bg-blue-400 active:scale-[0.98] sm:shrink-0"
            >
              Generate Shot
            </button>
          </div>
        </div>

        {error ? (
          <p
            id="repository-error"
            role="alert"
            className="mt-3 text-sm text-red-400"
          >
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