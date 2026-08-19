import { MetadataVisibility } from "@/components/MetadataControls";
import { LayoutName } from "@/lib/layouts";
import { TemplateName } from "@/lib/templates";
import { ThemeName } from "@/lib/themes";

export interface PresetConfig { owner: string; repo: string; theme: ThemeName; layout: LayoutName; template: TemplateName; metadata: MetadataVisibility; }
const MAX_TEXT_LENGTH = 80;
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const SAFE_REPOSITORY_PART = /^[A-Za-z0-9_.-]{1,100}$/;
function cleanText(value: unknown): string { return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, MAX_TEXT_LENGTH) : ""; }
function encodeBase64Url(value: string): string { const bytes = new TextEncoder().encode(value); let binary = ""; for (const byte of bytes) binary += String.fromCharCode(byte); return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, ""); }
function decodeBase64Url(value: string): string { const normalized = value.replace(/-/g, "+").replace(/_/g, "/"); const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4); return new TextDecoder().decode(Uint8Array.from(atob(padded), (char) => char.charCodeAt(0))); }
function isOption<T extends string>(value: unknown, options: readonly T[]): value is T { return typeof value === "string" && options.includes(value as T); }
export function encodePreset(config: PresetConfig): string { return encodeBase64Url(JSON.stringify(config)); }
export function decodePreset(value: string, themes: readonly string[], layouts: readonly string[], templates: readonly string[]): PresetConfig | null {
  try {
    const parsed = JSON.parse(decodeBase64Url(value)) as Partial<PresetConfig>;
    if (!SAFE_REPOSITORY_PART.test(parsed.owner ?? "") || !SAFE_REPOSITORY_PART.test(parsed.repo ?? "")) return null;
    if (!isOption(parsed.theme, themes) || !isOption(parsed.layout, layouts) || !isOption(parsed.template, templates)) return null;
    if (!parsed.metadata || typeof parsed.metadata !== "object") return null;
    const metadata = parsed.metadata as Partial<MetadataVisibility>;
    const booleans = ["description", "language", "stars", "forks", "openIssues", "owner", "showGithubUrl"] as const;
    if (booleans.some((key) => typeof metadata[key] !== "boolean")) return null;
    return { owner: parsed.owner!, repo: parsed.repo!, theme: parsed.theme!, layout: parsed.layout!, template: parsed.template!, metadata: {
      description: metadata.description!, language: metadata.language!, stars: metadata.stars!, forks: metadata.forks!, openIssues: metadata.openIssues!, owner: metadata.owner!,
      subtitle: cleanText(metadata.subtitle), footerText: cleanText(metadata.footerText), showGithubUrl: metadata.showGithubUrl!,
      accentColor: typeof metadata.accentColor === "string" && HEX_COLOR.test(metadata.accentColor) ? metadata.accentColor : "",
      showVibe: metadata.showVibe === true,
    }};
  } catch { return null; }
}
