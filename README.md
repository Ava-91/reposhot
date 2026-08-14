# RepoShot

<p align="center">
  <img src="https://raw.githubusercontent.com/Ava-91/reposhot/main/public/opengraph-image.svg" alt="RepoShot — beautiful GitHub repository cards" width="900">
</p>

<p align="center">
  <strong>Turn a GitHub repository into a polished, shareable PNG card.</strong>
</p>

<p align="center">
  <a href="https://reposhot.vercel.app/">Live demo</a> ·
  <a href="https://github.com/Ava-91/reposhot/issues">Issues</a> ·
  <a href="https://github.com/Ava-91/reposhot/releases">Releases</a>
</p>

<p align="center">
  <img src="https://img.shields.io/github/actions/workflow/status/Ava-91/reposhot/ci.yml?label=CI" alt="CI status">
  <img src="https://img.shields.io/github/commit-activity/t/Ava-91/reposhot?label=commits" alt="Commit activity">
  <img src="https://img.shields.io/github/languages/top/Ava-91/reposhot" alt="Top language">
  <img src="https://img.shields.io/github/stars/Ava-91/reposhot?style=flat" alt="GitHub stars">
</p>

---

## What is RepoShot?

RepoShot is a small, focused web app for creating presentation-ready visuals from public GitHub repositories.

Paste a repository URL, let RepoShot fetch its public metadata, customize the card, and export a PNG. No GitHub login is required.

It is useful for:

- README project showcases
- portfolios and personal websites
- social posts and project announcements
- documentation and presentations
- quickly giving a repository a visual identity

## Try it

**[Open RepoShot →](https://reposhot.vercel.app/)**

The hosted version is the easiest way to try the app. A local development setup is also available below.

---

## ✨ Features

### Repository cards

- Public GitHub repository URL validation
- Repository name, owner, avatar, description, language, stars, forks, and open issues
- Repository topics with compact overflow handling
- Graceful handling of missing optional metadata
- Clear errors for invalid or nonexistent repositories
- Helpful messaging for GitHub API rate limits

### Customization

- Multiple visual themes
- Multiple card layouts
- Reusable screenshot templates
- Metadata visibility controls
- Custom subtitle and footer text
- Accent color customization
- Shareable preset URLs that restore the selected configuration

### Export & sharing

- PNG export
- Deterministic image dimensions and filenames
- Download success and error feedback
- Shareable configuration links
- Responsive preview workflow
- Reduced-motion support

### Engineering

- Next.js App Router
- TypeScript
- Tailwind CSS
- GitHub REST API
- 60-second repository caching
- In-flight request deduplication
- Automated lint, typecheck, test, and production-build checks

---

## 🖼️ How it works

```text
┌─────────────────────────┐
│ GitHub repository URL   │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Validate repository URL │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Fetch public metadata   │
│ from GitHub             │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Choose theme, layout,   │
│ template & metadata     │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Preview the RepoShot    │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│ Download PNG / share    │
│ the preset URL          │
└─────────────────────────┘
```

---

## 📌 Supported repositories

RepoShot currently targets **public GitHub repositories**.

Accepted repository URLs use this form:

```text
https://github.com/<owner>/<repository>
```

Examples:

```text
https://github.com/Ava-91/reposhot
https://github.com/facebook/react
https://github.com/microsoft/TypeScript
```

The URL parser intentionally rejects:

- HTTP GitHub URLs
- GitLab or other hosts
- repository subpages such as issues or pull requests
- URLs containing embedded credentials
- incomplete repository URLs

Private repositories and authenticated GitHub accounts are outside the current scope.

For API details and rate-limit behavior, see [`docs/GITHUB_API.md`](docs/GITHUB_API.md).

---

## 🚀 Local development

### Requirements

- Node.js 24 or a compatible current Node.js release
- npm
- a modern browser

### Setup

```bash
git clone https://github.com/Ava-91/reposhot.git
cd reposhot
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

### Production build

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

The same quality commands are executed by the GitHub Actions CI workflow.

---

## 🧪 Testing

RepoShot has automated coverage for the deterministic parts of the application, including:

- valid and invalid GitHub repository URLs
- unusual repository names
- long repository names and descriptions
- missing descriptions, languages, topics, licenses, and avatars
- large repository counters
- malformed topic payloads
- deterministic PNG export options
- nonexistent repositories
- GitHub rate-limit responses
- generic GitHub API failures

The manual release matrix covers browser PNG export, narrow/mobile layouts, and runtime remote-avatar failures.

See [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md).

Run the checks locally:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

---

## 🧱 Project structure

```text
reposhot/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── favicon.ico
├── components/
│   ├── Hero.tsx
│   ├── LayoutSelector.tsx
│   ├── MetadataControls.tsx
│   ├── RepoShotGenerator.tsx
│   ├── RepositoryInput.tsx
│   ├── RepositoryPreview.tsx
│   ├── TemplateSelector.tsx
│   └── ThemeSelector.tsx
├── docs/
│   ├── GITHUB_API.md
│   ├── PNG_EXPORT.md
│   ├── RELEASE.md
│   └── TEST_MATRIX.md
├── lib/
│   ├── export-options.ts
│   ├── export.ts
│   ├── github-errors.ts
│   ├── github-url.ts
│   ├── github.ts
│   ├── layouts.ts
│   ├── preset.ts
│   ├── repository-mapper.ts
│   ├── templates.ts
│   └── themes.ts
├── public/
│   └── opengraph-image.svg
├── tests/
│   └── core.test.ts
├── CHANGELOG.md
├── package.json
└── README.md
```

---

## 🛠️ Tech stack

| Technology | Role |
| --- | --- |
| **Next.js** | React framework and application runtime |
| **React** | UI and interactive client components |
| **TypeScript** | Type-safe application code |
| **Tailwind CSS** | UI styling and responsive design |
| **GitHub REST API** | Public repository metadata |
| **html-to-image** | Client-side PNG generation |
| **Node.js test runner** | Core automated tests |
| **GitHub Actions** | Continuous integration |

---

## 🔐 API, caching & privacy

RepoShot only needs public repository metadata for its current workflow. It does not ask for a GitHub password or personal access token.

Repository requests are cached for 60 seconds, and simultaneous requests for the same repository are deduplicated. This reduces unnecessary GitHub API traffic while keeping the UI responsive.

If GitHub returns a rate-limit response, RepoShot surfaces a specific message and uses `Retry-After` information when GitHub provides it.

See [`docs/GITHUB_API.md`](docs/GITHUB_API.md) for more detail.

---

## 📦 Export details

The generated image is a PNG using the selected layout dimensions. Filenames are deterministic and based on the repository owner and name.

Example:

```text
reposhot-Ava-91-reposhot.png
```

See [`docs/PNG_EXPORT.md`](docs/PNG_EXPORT.md).

---

## 🗺️ Project status

RepoShot has moved beyond the original Next.js starter and through its MVP implementation phases:

- **Core workflow** — complete
- **Customization** — complete
- **Export and sharing** — complete
- **API caching and error handling** — complete
- **Automated quality checks** — complete
- **UX and branding polish** — complete
- **Edge-case test matrix** — complete
- **Release preparation** — complete

The repository's GitHub Issues remain the source of truth for future improvements.

---

## 🤝 Contributing

Issues, bug reports, and focused improvements are welcome.

Before opening a change:

1. Check existing issues and pull requests.
2. Keep changes focused and explain the user-facing impact.
3. Run lint, typecheck, tests, and a production build.
4. Include screenshots or reproduction steps for UI changes when useful.

For bug reports, include the expected behavior, actual behavior, reproduction steps, browser/OS information, and the repository URL involved when relevant.

---

## 📚 Documentation

- [`docs/GITHUB_API.md`](docs/GITHUB_API.md) — API requests, caching, and rate limits
- [`docs/PNG_EXPORT.md`](docs/PNG_EXPORT.md) — PNG generation behavior
- [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md) — automated and manual edge-case coverage
- [`docs/RELEASE.md`](docs/RELEASE.md) — release checklist and supported input
- [`CHANGELOG.md`](CHANGELOG.md) — release history

---

## 📄 License

No license has been added to the repository yet. Until a license is published, the source should not be assumed to grant permission to reuse, modify, or redistribute it.

---

## 👤 Author

Built by **[Ava-91](https://github.com/Ava-91)**.

If RepoShot is useful to you, consider giving the repository a ⭐.

<p align="center">
  <br>
  <strong>Paste a repository. Make it look good. Share it.</strong>
  <br><br>
  <a href="https://reposhot.vercel.app/">Try RepoShot →</a>
</p>
