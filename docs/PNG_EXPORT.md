# PNG Export

RepoShot exports the repository card with [`html-to-image`](https://github.com/bubkoo/html-to-image).

## How export works

1. The preview card is stored in a `ref`.
2. Only that card element is passed to `toPng`, so editor controls are excluded.
3. The selected layout's width and height are passed explicitly.
4. The cloned export element is given the same deterministic pixel dimensions.
5. The currently rendered theme, layout, metadata visibility, and topics are captured automatically because the export targets the visible card.
6. The generated PNG is downloaded with the filename `reposhot-owner-repository.png`.

Export failures are caught and shown below the button instead of throwing an unhandled browser error.

## Output sizes

The supported layouts define their output dimensions in `lib/layouts.ts`:

- Landscape: 1200 × 675 px
- Square: 1080 × 1080 px

The export uses `pixelRatio: 1`, so the generated PNG dimensions remain deterministic and match the selected layout.
