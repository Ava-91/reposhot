# PNG Export

RepoShot exports the repository card with [`html-to-image`](https://github.com/bubkoo/html-to-image).

## How export works

1. The preview card is stored in a `ref`.
2. Only that card element is passed to `toPng`, so editor controls are excluded.
3. The effective layout's width and height are passed explicitly.
4. The cloned export element is given the same deterministic pixel dimensions.
5. The currently rendered theme, template, metadata visibility, and reordered topic chips are captured automatically because the export targets the visible card.
6. The generated PNG is downloaded with a deterministic owner/repository filename.

Export failures are caught and shown below the button instead of throwing an unhandled browser error.

## Output sizes

The supported layouts are defined in `lib/layouts.ts`:

- Landscape: 1200 × 675 px (16:9)
- Square: 1080 × 1080 px (1:1)
- Portrait: 1080 × 1350 px (4:5)
- Story: 1080 × 1920 px (9:16)

The export uses `pixelRatio: 1`, so the generated PNG dimensions match the selected effective layout.

## Adaptive layout

When Auto layout is enabled, RepoShot uses a deterministic content-density heuristic to choose a square layout for dense repository content. Otherwise, the selected layout is preserved. Disable Auto layout to keep the selected dimensions regardless of metadata density.

## Editing before export

Topic chips can be reordered by dragging them in the preview. Keyboard users can focus a topic and use the left and right arrow keys to change its position. The visible order is the order captured in the PNG.
