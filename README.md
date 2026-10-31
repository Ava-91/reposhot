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

## Preview

![RepoShot generated card preview](https://raw.githubusercontent.com/Ava-91/reposhot/main/public/opengraph-image.svg)

The image above is the project’s generated social/card preview; the live editor can produce customized PNG cards from any public repository.

## What is RepoShot?

RepoShot is a focused web app for creating presentation-ready visuals from public GitHub repositories.

Paste a repository URL, let RepoShot fetch its public metadata, customize the card, and export a PNG. No GitHub login is required.

It is useful for README showcases, portfolios, project announcements, documentation, presentations, and giving a repository a visual identity.

## Try it

**[Open RepoShot →](https://reposhot.vercel.app/)**

The hosted version is the easiest way to try the app. A local development setup is also available below.

---

## ✨ Features

### Repository cards

- Public GitHub repository URL validation
- Repository name, owner, avatar, description, language, stars, forks, and open issues
- Repository topics with compact overflow handling and drag-to-reorder controls
- Keyboard-accessible topic reordering
- Graceful handling of missing optional metadata
- Clear errors for invalid or nonexistent repositories
- Helpful messaging for GitHub API rate limits

### Customization

- Multiple visual themes and five templates: Editorial, Signal, Mono, Terminal, and Portfolio
- Landscape (16:9), square (1:1), portrait (4:5), and story (9:16), and bounded custom-size export layouts
- Content-aware adaptive layout for dense repository metadata
- Metadata visibility controls
- Custom subtitle and footer text
- Accent color customization
- Shareable preset URLs that restore the selected configuration

### Export & sharing

- PNG export
- Deterministic image dimensions and filenames
- Download success and error feedback
- Responsive preview workflow
- Reduced-motion support

### Engineering

- Next.js App Router
- TypeScript
- Tailwind CSS
- GitHub REST API
- 60-second repository caching
- In-flight request deduplication
- Upstream request timeouts and a bounded retry for transient failures
- Payload validation before repository data reaches the UI
- Independent Battle requests with cancellation and stale-response protection
- Automated lint, typecheck, test, and production-build checks

---

## 🖼️ How it works

```text
GitHub repository URL
        ↓
Validate URL
        ↓
Fetch public GitHub metadata
        ↓
Choose theme, layout, template & metadata
        ↓
Preview RepoShot
        ↓
Download PNG or share the preset URL
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

The URL parser intentionally rejects HTTP GitHub URLs, other hosts, repository subpages, embedded credentials, and incomplete repository URLs.

Private repositories and authenticated GitHub accounts are outside the current scope.

For API details and rate-limit behavior, see [`docs/GITHUB_API.md`](docs/GITHUB_API.md).

---

## 🚀 Local development

### Requirements

- Node.js 24 or a compatible current Node.js release
- npm
- Git
- a modern browser

### Setup

```bash
git clone https://github.com/Ava-91/reposhot.git
cd reposhot
npm install
npm run dev
```

Then open `http://localhost:3000`.

### Quality checks

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

The same core checks run in GitHub Actions CI. See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for the full development and troubleshooting guide.

---

## 🧪 Testing

RepoShot has automated coverage for deterministic behavior, including URL parsing, repository payload validation, adaptive layout decisions, battle scoring and ties, unusual repository names, long metadata, missing optional metadata, large counters, malformed topics, deterministic PNG options, nonexistent repositories, rate limits, and generic GitHub API failures. Browser tests cover card generation, Battle mode, stale requests, accessibility, and export layouts.

The manual release matrix covers browser PNG export, narrow/mobile layouts, and runtime remote-avatar failures.

See [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md).

---

## 🧱 Project structure

```text
reposhot/
├── app/              # Next.js pages, metadata, and global styles
├── components/       # Interactive UI and editor components
├── docs/             # Development, API, export, testing, and release docs
├── lib/              # GitHub, presets, themes, layouts, templates, and export logic
├── public/           # Static assets
├── tests/             # Core automated tests
├── .github/           # CI and repository automation
├── CHANGELOG.md
├── CONTRIBUTING.md
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

Repository requests are cached for 60 seconds, and simultaneous requests for the same repository are deduplicated. If GitHub returns a rate-limit response, RepoShot surfaces a specific retry-oriented message and uses `Retry-After` information when GitHub provides it.

See [`docs/GITHUB_API.md`](docs/GITHUB_API.md) for implementation details.

---

## 📦 Export details

The generated image is a PNG using the selected layout dimensions: 1200 × 675 (16:9), 1080 × 1080 (1:1), 1080 × 1350 (4:5), 1080 × 1920 (9:16), or a custom size from 320–2400 px wide and 320–3200 px tall. Filenames are deterministic and based on the repository owner and name.

Example:

```text
reposhot-Ava-91-reposhot.png
```

See [`docs/PNG_EXPORT.md`](docs/PNG_EXPORT.md).

---

## 🗺️ Project status

The current project version is **0.1.0**, with the core public-repository-to-PNG workflow, customization, preset sharing, API caching, and automated quality checks in place.

RepoShot is an actively maintained early release rather than a finished, feature-complete product. Future improvements and known follow-up work are tracked in the [GitHub Issues](https://github.com/Ava-91/reposhot/issues). The release checklist and required CI checks are documented in [`docs/RELEASE.md`](docs/RELEASE.md).

---

## 🤝 Contributing

Issues, bug reports, and focused improvements are welcome.

Please read [`CONTRIBUTING.md`](CONTRIBUTING.md) before opening a pull request. It covers the development workflow, branch and PR conventions, commit messages, quality checks, issue reports, and the pre-PR checklist.

---

## 📚 Documentation

- [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) — setup, scripts, architecture, troubleshooting, and development workflow
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — contribution and pull-request guidelines
- [`docs/GITHUB_API.md`](docs/GITHUB_API.md) — API requests, caching, and rate limits
- [`docs/PNG_EXPORT.md`](docs/PNG_EXPORT.md) — PNG generation behavior
- [`docs/TEST_MATRIX.md`](docs/TEST_MATRIX.md) — automated and manual edge-case coverage
- [`docs/RELEASE.md`](docs/RELEASE.md) — release checklist and supported input
- [`CHANGELOG.md`](CHANGELOG.md) — release history

---

## 📄 License

RepoShot is released under the MIT License. See [`LICENSE`](LICENSE) for the full license text.

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
