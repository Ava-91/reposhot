"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getRepository, type RepositoryData } from "@/lib/github";
import { defaultLayout, layouts, type LayoutName } from "@/lib/layouts";
import { decodePreset, encodePreset } from "@/lib/preset";
import { defaultTemplate, templates, type TemplateName } from "@/lib/templates";
import { defaultTheme, themes, type ThemeName } from "@/lib/themes";
import type { MetadataVisibility } from "@/components/MetadataControls";

export type Mode = "card" | "battle" | "wrapped";
export const defaultMetadataVisibility: MetadataVisibility = { description: true, language: true, stars: true, forks: true, openIssues: true, owner: true, subtitle: "", footerText: "", showGithubUrl: true, accentColor: "", showVibe: false, adaptiveLayout: true };

type RepositorySlot = "primary" | "secondary";

export function useRepoShotGenerator() {
  const [mode, setMode] = useState<Mode>("card");
  const [repository, setRepository] = useState<RepositoryData | null>(null);
  const [secondRepository, setSecondRepository] = useState<RepositoryData | null>(null);
  const [lastRepository, setLastRepository] = useState<{ owner: string; repo: string } | null>(null);
  const [loadingPrimary, setLoadingPrimary] = useState(false);
  const [loadingSecondary, setLoadingSecondary] = useState(false);
  const [error, setError] = useState("");
  const [shareStatus, setShareStatus] = useState("");
  const [theme, setTheme] = useState<ThemeName>(defaultTheme);
  const [layout, setLayout] = useState<LayoutName>(defaultLayout);
  const [template, setTemplate] = useState<TemplateName>(defaultTemplate);
  const [metadata, setMetadata] = useState<MetadataVisibility>(defaultMetadataVisibility);
  const controllers = useRef<Record<RepositorySlot, AbortController | null>>({ primary: null, secondary: null });
  const requestIds = useRef<Record<RepositorySlot, number>>({ primary: 0, secondary: 0 });

  function abortSlot(slot: RepositorySlot) {
    controllers.current[slot]?.abort();
    controllers.current[slot] = null;
    requestIds.current[slot] += 1;
  }

  const loadRepository = useCallback(async (ref: { owner: string; repo: string }, secondary = false) => {
    const slot: RepositorySlot = secondary ? "secondary" : "primary";
    abortSlot(slot);
    const requestId = requestIds.current[slot];
    const controller = new AbortController();
    controllers.current[slot] = controller;
    if (secondary) {
      setLoadingSecondary(true);
      setSecondRepository(null);
    } else {
      setLoadingPrimary(true);
      setRepository(null);
      setLastRepository(ref);
    }
    setError("");

    try {
      const data = await getRepository(ref.owner, ref.repo, controller.signal);
      if (requestIds.current[slot] !== requestId || controller.signal.aborted) return;
      if (secondary) setSecondRepository(data);
      else setRepository(data);
    } catch (caught) {
      if (controller.signal.aborted || requestIds.current[slot] !== requestId) return;
      setError(caught instanceof Error ? caught.message : "Something went wrong while fetching the repository.");
    } finally {
      if (requestIds.current[slot] === requestId) {
        if (secondary) setLoadingSecondary(false);
        else setLoadingPrimary(false);
        controllers.current[slot] = null;
      }
    }
  }, []);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("preset");
    if (!value) return;
    const preset = decodePreset(value, Object.keys(themes), Object.keys(layouts), Object.keys(templates));
    if (!preset) {
      queueMicrotask(() => setError("That RepoShot preset is invalid."));
      return;
    }
    queueMicrotask(() => {
      setTheme(preset.theme);
      setLayout(preset.layout);
      setTemplate(preset.template);
      setMetadata(preset.metadata);
      void loadRepository({ owner: preset.owner, repo: preset.repo });
    });
  }, [loadRepository]);

  useEffect(() => () => {
    controllers.current.primary?.abort();
    controllers.current.secondary?.abort();
  }, []);

  function switchMode(next: Mode) {
    abortSlot("primary");
    abortSlot("secondary");
    setLoadingPrimary(false);
    setLoadingSecondary(false);
    setMode(next);
    setSecondRepository(null);
    setError("");
  }

  function clearError() { setError(""); }

  async function handleShare() {
    if (!lastRepository) return;
    const preset = encodePreset({ owner: lastRepository.owner, repo: lastRepository.repo, theme, layout, template, metadata });
    const url = new URL(window.location.href);
    url.search = `?preset=${preset}`;
    try {
      await navigator.clipboard.writeText(url.toString());
      setShareStatus("Share link copied!");
      window.setTimeout(() => setShareStatus(""), 2500);
    } catch {
      setShareStatus("Clipboard unavailable. Copy the link from your browser address bar.");
      window.history.replaceState(null, "", url);
    }
  }

  return {
    mode, repository, secondRepository,
    loading: loadingPrimary || loadingSecondary,
    loadingPrimary, loadingSecondary,
    error, shareStatus, theme, layout, template, metadata,
    setTheme, setLayout, setTemplate, setMetadata, loadRepository,
    switchMode, handleShare, clearError,
  };
}
