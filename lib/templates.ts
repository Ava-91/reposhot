export const templates = {
  classic: { label: "Classic", description: "The balanced RepoShot card.", accent: "#60a5fa", cardOpacity: 0.18, radius: "1.5rem" },
  spotlight: { label: "Spotlight", description: "A bolder card with a stronger repository focus.", accent: "#a78bfa", cardOpacity: 0.24, radius: "2rem" },
  minimal: { label: "Minimal", description: "A clean, restrained presentation for sharing.", accent: "#34d399", cardOpacity: 0.1, radius: "1rem" },
} as const;

export type TemplateName = keyof typeof templates;
export const defaultTemplate: TemplateName = "classic";
