"use client";

import { useState } from "react";
import { copyElementAsPng, downloadElementAsPng } from "@/lib/export";
type PngExportOptions = { width: number; height: number; filename: string };

export function usePngExport() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function download(element: HTMLElement | null, options: PngExportOptions) {
    if (!element || busy) return;
    setBusy(true);
    setDone(false);
    setError("");
    try {
      await downloadElementAsPng(element, options);
      setDone(true);
      window.setTimeout(() => setDone(false), 2200);
    } catch {
      setError("Couldn't generate the image. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function copy(element: HTMLElement | null, options: PngExportOptions) { if (!element || busy) return; setBusy(true); setCopied(false); setError(""); try { await copyElementAsPng(element, options); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch (caught) { setError(caught instanceof Error ? caught.message : "Couldn’t copy the image. Please try downloading it instead."); } finally { setBusy(false); } }

  return { busy, done, copied, error, download, copy, setError };
}
