"use client";

import { useState } from "react";

import LayoutSelector from "@/components/LayoutSelector";
import MetadataControls, {
  MetadataVisibility,
} from "@/components/MetadataControls";
import RepositoryInput from "@/components/RepositoryInput";
import RepositoryPreview from "@/components/RepositoryPreview";
import ThemeSelector from "@/components/ThemeSelector";
import { getRepository, RepositoryData } from "@/lib/github";
import { defaultLayout, LayoutName } from "@/lib/layouts";
import { defaultTheme, ThemeName } from "@/lib/themes";

const defaultMetadataVisibility: MetadataVisibility = {
  description: true,
  language: true,
  stars: true,
  forks: true,
  openIssues: true,
  owner: true,
};

export default function RepoShotGenerator() {
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [layout, setLayout] = useState<LayoutName>(defaultLayout);
  const [metadata, setMetadata] = useState<MetadataVisibility>(
    defaultMetadataVisibility,
  );

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
        <section className="mt-10 w-full">
          <div className="mb-4 flex flex-col gap-4 px-1">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-sm font-semibold text-zinc-200">
                  Preview
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Your RepoShot preview.
                </p>
              </div>

              <ThemeSelector value={theme} onChange={setTheme} />
            </div>

            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-medium text-zinc-500">
                Layout
              </span>

              <LayoutSelector value={layout} onChange={setLayout} />
            </div>

            <MetadataControls value={metadata} onChange={setMetadata} />
          </div>

          <RepositoryPreview
            repository={repository}
            theme={theme}
            layout={layout}
            metadata={metadata}
          />
        </section>
      )}
    </section>
  );
}
