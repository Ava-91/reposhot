export const layouts = {
  landscape: {
    label: "Landscape",
    width: 1200,
    height: 675,
    aspectRatio: "16 / 9",
  },

  square: {
    label: "Square",
    width: 1080,
    height: 1080,
    aspectRatio: "1 / 1",
  },
} as const;

export type LayoutName = keyof typeof layouts;

export const defaultLayout: LayoutName = "landscape";