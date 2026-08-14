# RepoShot development guide

This guide covers the local workflow for developing, testing, and troubleshooting RepoShot.

## Prerequisites

- Node.js 24 or a compatible current Node.js release
- npm
- Git
- A modern browser

Check your versions with:

```bash
node --version
npm --version
git --version
```

RepoShot currently uses Next.js 16.3, React 19, TypeScript 6, and ESLint 9. Prefer the versions declared in `package.json` and install from the lockfile rather than upgrading individual tooling packages without checking CI.

## First-time setup

```bash
git clone https://github.com/Ava-91/reposhot.git
cd reposhot
npm install
npm run dev
```

Open `http://localhost:3000` in your browser.

For a production-style local run:

```bash
npm run build
npm start
```

## npm scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Next.js development server. |
| `npm run build` | Create an optimized production build. |
| `npm start` | Serve the production build locally. |
| `npm run lint` | Run ESLint. |
| `npm run typecheck` | Run TypeScript without emitting files. |
| `npm test` | Run the Node.js core test suite. |

Before submitting a change, run the full quality gate:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

## Project structure

```text
reposhot/
├── app/              # Next.js App Router pages, metadata, and global styles
├── components/       # Interactive UI and RepoShot editor components
├── docs/             # Project, API, export, testing, and release documentation
├── lib/              # URL parsing, GitHub API, mapping, presets, themes, layouts, templates, export helpers
├── public/            # Static assets used by the application
├── tests/             # Core deterministic tests
├── .github/            # CI and repository automation
├── CHANGELOG.md
├── CONTRIBUTING.md
├── package.json
└── README.md
```

## Repository input and GitHub data

RepoShot accepts public repository URLs in the form:

```text
https://github.com/<owner>/<repository>
```

The parser intentionally rejects other hosts, HTTP URLs, repository subpages, embedded credentials, and incomplete paths. RepoShot does not currently authenticate users or access private repositories.

The GitHub API layer retrieves public repository metadata and applies short-lived caching plus in-flight request deduplication. See [`GITHUB_API.md`](GITHUB_API.md) for the API and rate-limit behavior.

## Templates, layouts, and presets

The editor separates presentation choices into three concepts:

- **Themes** define the visual styling and accent treatment.
- **Layouts** define the card dimensions and structural arrangement.
- **Templates** provide reusable combinations of presentation choices.

Metadata controls determine which repository information appears on the generated card. Custom text can be used for the subtitle and footer where supported.

Preset URLs encode the repository and editor configuration so a generated configuration can be shared and restored. Invalid preset data is rejected rather than silently applying an unsafe or unknown configuration.

## PNG export

PNG generation happens in the browser. Export options are kept deterministic so the same card configuration uses predictable dimensions and filenames. See [`PNG_EXPORT.md`](PNG_EXPORT.md) for implementation details and [`TEST_MATRIX.md`](TEST_MATRIX.md) for edge cases.

## Troubleshooting

### `npm install` reports peer-dependency warnings

Do not immediately use `npm install --force` or `npm audit fix --force`. Check the versions in `package.json` first and let the lockfile resolve the supported dependency graph.

If dependencies have become inconsistent locally, try:

```bash
rm -rf node_modules
npm ci
```

On Windows PowerShell, the equivalent cleanup is:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

### `npm run lint` fails after a dependency update

Run:

```bash
npm install
npm run lint
npm run typecheck
```

If the failure is caused by a major-version compatibility change, inspect the dependency versions before changing application code. CI is the final source of truth for the supported toolchain.

### GitHub reports a rate limit

The app displays a retry-oriented error when GitHub rate-limits a request. Wait for the indicated retry window instead of repeatedly refreshing. See [`GITHUB_API.md`](GITHUB_API.md).

### A repository is rejected

Make sure the input is a public GitHub repository URL, not an issue, pull request, settings page, or another GitHub subpage. The accepted form is:

```text
https://github.com/owner/repository
```

### PNG export behaves differently in a browser

Browser image export depends on browser rendering and remote image loading. Test the current build in a modern browser and check the browser console for blocked or failed remote assets. See [`PNG_EXPORT.md`](PNG_EXPORT.md).

## Development workflow

1. Read the relevant issue before changing code.
2. Keep the change focused on that issue.
3. Update documentation when behavior or user-facing workflows change.
4. Run the quality gate locally.
5. Use a clear conventional commit message.
6. Push the change and wait for CI before considering it complete.

For contribution and pull-request rules, see [`CONTRIBUTING.md`](../CONTRIBUTING.md).
