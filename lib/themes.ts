export type ThemeName = "dark" | "light";

export interface ThemeTokens {
  name: string;
  background: string;
  backgroundGradient: string;
  grid: string;
  glowPrimary: string;
  glowSecondary: string;

  foreground: string;
  muted: string;
  subtle: string;

  border: string;
  card: string;
  cardHover: string;

  accent: string;
  accentText: string;

  badge: string;
  badgeText: string;

  statLabel: string;
  statValue: string;

  footer: string;
}

export const themes: Record<ThemeName, ThemeTokens> = {
  dark: {
    name: "Dark",

    background: "#0b0f16",
    backgroundGradient:
      "linear-gradient(135deg, #0b0f16 0%, #111827 55%, #0b0f16 100%)",

    grid:
      "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",

    glowPrimary: "rgba(59, 130, 246, 0.15)",
    glowSecondary: "rgba(139, 92, 246, 0.10)",

    foreground: "#ffffff",
    muted: "#a1a1aa",
    subtle: "#71717a",

    border: "rgba(255, 255, 255, 0.10)",
    card: "rgba(255, 255, 255, 0.045)",
    cardHover: "rgba(255, 255, 255, 0.07)",

    accent: "#60a5fa",
    accentText: "#bfdbfe",

    badge: "rgba(255, 255, 255, 0.04)",
    badgeText: "#a1a1aa",

    statLabel: "#71717a",
    statValue: "#e4e4e7",

    footer: "#52525b",
  },

  light: {
    name: "Light",

    background: "#f5f7fb",
    backgroundGradient:
      "linear-gradient(135deg, #f8fafc 0%, #eef2ff 55%, #f8fafc 100%)",

    grid:
      "linear-gradient(rgba(15,23,42,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.045) 1px, transparent 1px)",

    glowPrimary: "rgba(59, 130, 246, 0.10)",
    glowSecondary: "rgba(139, 92, 246, 0.08)",

    foreground: "#111827",
    muted: "#4b5563",
    subtle: "#6b7280",

    border: "rgba(15, 23, 42, 0.10)",
    card: "rgba(255, 255, 255, 0.72)",
    cardHover: "rgba(255, 255, 255, 0.90)",

    accent: "#2563eb",
    accentText: "#1d4ed8",

    badge: "rgba(255, 255, 255, 0.72)",
    badgeText: "#4b5563",

    statLabel: "#6b7280",
    statValue: "#1f2937",

    footer: "#6b7280",
  },
};

export const defaultTheme: ThemeName = "dark";