"use client";

import { useState } from "react";
import { downloadElementAsPng } from "@/lib/export";
import type { PngExportOptions } from "@/lib/export";

export function usePngExport() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

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

  return { busy, done, error, download, setError };
}
