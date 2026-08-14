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
- Repository topics with compact overflow handling
- Graceful handling of missing optional metadata
- Clear errors for invalid or nonexistent repositories
- Helpful messaging for GitHub API rate limits

### Customization

- Multiple visual themes, layouts, and reusable templates
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

RepoShot has automated coverage for deterministic behavior, including URL parsing, unusual repository names, long metadata, missing optional metadata, large counters, malformed topics, deterministic PNG options, nonexistent repositories, rate limits, and generic GitHub API failures.

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

The generated image is a PNG using the selected layout dimensions. Filenames are deterministic and based on the repository owner and name.

Example:

```text
reposhot-Ava-91-reposhot.png
```

See [`docs/PNG_EXPORT.md`](docs/PNG_EXPORT.md).

---

## 🗺️ Project status

RepoShot has moved beyond the original Next.js starter through its core workflow, customization, export and sharing, API caching, automated quality checks, UX polish, edge-case testing, and release-preparation phases.

The repository's GitHub Issues remain the source of truth for future improvements.

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
