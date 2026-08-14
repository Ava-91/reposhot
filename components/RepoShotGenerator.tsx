"use client";

import { useState } from "react";

import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import { getRepository, RepositoryData } from "@/lib/github";

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
          className="mt-6 w-full max-w-2xl rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      {repository && !loading && !error && (
        <RepositoryPreview repository={repository} />
      )}
    </section>
  );
}