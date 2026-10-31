export const templates = {
  classic: { label: "Editorial", description: "Quiet type, strong hierarchy, built for clean project sharing.", accent: "#60a5fa", cardOpacity: 0.16, radius: "0.75rem" },
  spotlight: { label: "Signal", description: "Higher contrast and stronger focus for a repository that needs attention.", accent: "#a78bfa", cardOpacity: 0.22, radius: "1rem" },
  minimal: { label: "Mono", description: "The stripped-back version: less decoration, more repository.", accent: "#34d399", cardOpacity: 0.08, radius: "0.35rem" },
  terminal: { label: "Terminal", description: "A code-first treatment with compact, monospaced presentation.", accent: "#4ade80", cardOpacity: 0.12, radius: "0.4rem" },
  portfolio: { label: "Portfolio", description: "A more spacious showcase for project identity and description.", accent: "#f0abfc", cardOpacity: 0.18, radius: "1.25rem" },
} as const;

export type TemplateName = keyof typeof templates;
export const defaultTemplate: TemplateName = "classic";
