"use client";

import { useState } from "react";

import { getRepository, RepositoryData } from "@/lib/github";
import RepositoryInput from "@/components/RepositoryInput";

export default function RepoShotGenerator() {
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRepositorySubmit({
    owner,
    repo,
  }: {
    owner: string;
    repo: string;
  }) {
    setLoading(true);
    setError("");
    setRepository(null);

    try {
      const data = await getRepository(owner, repo);

      setRepository(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching the repository.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex w-full flex-col items-center">
      <RepositoryInput onSubmit={handleRepositorySubmit} />

      {loading && (
        <div
          role="status"
          className="mt-6 flex items-center gap-3 text-sm text-zinc-400"
        >
          <span
            aria-hidden="true"
            className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-700 border-t-blue-400"
          />

          Fetching repository information...
        </div>
      )}

      {error && !loading && (
        <div
          role="alert"
          className="mt-6 w-full max-w-2xl rounded-xl border border-red-400/20 bg-red-400/[0.05] px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {repository && !loading && !error && (
        <div className="mt-6 w-full max-w-2xl rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-start gap-4">
            <img
              src={repository.owner.avatarUrl}
              alt={`${repository.owner.login}'s avatar`}
              className="h-12 w-12 rounded-xl border border-white/10"
            />

            <div className="min-w-0 flex-1">
              <h2 className="truncate text-base font-semibold text-white">
                {repository.name}
              </h2>

              <p className="mt-1 truncate text-sm text-zinc-500">
                {repository.fullName}
              </p>
            </div>
          </div>

          {repository.description && (
            <p className="mt-4 text-sm leading-6 text-zinc-400">
              {repository.description}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {repository.language && (
              <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
                {repository.language}
              </span>
            )}

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
              ⭐ {repository.stars}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
              🍴 {repository.forks}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-400">
              Issues {repository.openIssues}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}