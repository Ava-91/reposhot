export const templates = {
  classic: { label: "Editorial", description: "Quiet type, strong hierarchy, built for clean project sharing.", accent: "#60a5fa", cardOpacity: 0.16, radius: "0.75rem" },
  spotlight: { label: "Signal", description: "Higher contrast and stronger focus for a repository that needs attention.", accent: "#a78bfa", cardOpacity: 0.22, radius: "1rem" },
  minimal: { label: "Mono", description: "The stripped-back version: less decoration, more repository.", accent: "#34d399", cardOpacity: 0.08, radius: "0.35rem" },
} as const;

export type TemplateName = keyof typeof templates;
export const defaultTemplate: TemplateName = "classic";
