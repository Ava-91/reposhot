# RepoShot

> Create beautiful, shareable screenshots for your GitHub repositories.

RepoShot is a web app for turning GitHub repository information into polished, customizable visuals that you can use in your README, portfolio, social media, documentation, or project showcase.

🚧 **RepoShot is currently in development.**

---

## ✨ What is RepoShot?

GitHub repositories contain a lot of useful information, but sometimes you just want to show a project visually.

RepoShot aims to make that simple:

```text
GitHub repository
       ↓
   RepoShot
       ↓
Repository metadata
       ↓
Beautiful preview
       ↓
Customize
       ↓
Download as PNG
```

Instead of manually taking and editing screenshots of a repository, RepoShot will generate a consistent, presentation-ready image from a GitHub repository URL.

---

## 🎯 Planned Features

### Repository information

- [ ] Paste a public GitHub repository URL
- [ ] Fetch repository information from GitHub
- [ ] Display repository name and owner
- [ ] Display repository description
- [ ] Display primary programming language
- [ ] Display stars, forks, and issues
- [ ] Display repository topics
- [ ] Display repository/avatar information

### Customization

- [ ] Light and dark themes
- [ ] Multiple screenshot layouts
- [ ] Multiple output sizes
- [ ] Toggle individual metadata fields
- [ ] Custom text options
- [ ] Multiple visual templates

### Export

- [ ] Live preview
- [ ] PNG export
- [ ] Deterministic output dimensions
- [ ] Appropriate generated filenames

### Developer experience

- [ ] Responsive design
- [ ] Keyboard accessibility
- [ ] Loading and error states
- [ ] GitHub API rate-limit handling
- [ ] Automated quality checks
- [ ] Automated tests

> Features are being implemented incrementally. The checklist above represents the project's roadmap, not necessarily the current functionality.

---

## 🖼️ Preview

> Screenshots will be added as the first version of RepoShot is implemented.

<!-- Add screenshots/GIFs here once the UI exists. -->

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- npm

You can check your installed versions with:

```bash
node --version
npm --version
```

### 1. Clone the repository

```bash
git clone https://github.com/Ava-91/reposhot.git
```

### 2. Enter the project directory

```bash
cd reposhot
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🧑‍💻 Development

RepoShot is being developed incrementally.

The project uses GitHub Issues to track development from the initial project cleanup through the first public release.

| Phase | Focus |
|---|---|
| Phase 0 | Project foundation |
| Phase 1 | Core RepoShot MVP |
| Phase 2 | Customization |
| Phase 3 | Export and UX |
| Phase 4 | Testing and engineering quality |
| Phase 5 | Optional advanced features |
| Phase 6 | Polish and first release |

See the repository's **Issues** section for the current implementation plan.

---

## 🛠️ Tech Stack

RepoShot is built with modern web technologies:

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **GitHub API**

Additional libraries may be introduced as the project develops.

---

## 📁 Project Structure

The project uses the Next.js App Router.

```text
reposhot/
├── app/
│   ├── components/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
├── package.json
├── tsconfig.json
└── README.md
```

The structure may change as RepoShot grows.

---

## 🔗 How It Will Work

The intended workflow is:

### 1. Enter a repository

Paste a public GitHub repository URL into RepoShot.

For example:

```text
https://github.com/Ava-91/MusicPlayer
```

### 2. Fetch repository information

RepoShot retrieves the repository's public metadata from GitHub.

### 3. Generate a preview

The information is transformed into a RepoShot card.

### 4. Customize it

Choose the visual options you want, such as:

- Theme
- Layout
- Metadata
- Template

### 5. Export

Download the finished RepoShot as a PNG image.

---

## 📌 Supported Repositories

The initial version is intended to support **public GitHub repositories**.

Private repositories and authenticated GitHub accounts are not currently part of the MVP.

Repository URLs are expected to follow the standard format:

```text
https://github.com/<owner>/<repository>
```

Support for additional URL formats may be added later.

---

## ⚠️ Current Limitations

RepoShot is still under active development.

At the moment:

- The project is not yet feature-complete.
- The final screenshot design is still being developed.
- GitHub metadata fetching is still being implemented.
- PNG export is still planned.
- Customization features are still planned.
- The public release has not been made yet.

The README will be updated as these features become available.

---

## 🗺️ Roadmap

The current roadmap is tracked through GitHub Issues.

### Phase 0 — Foundation

- [ ] Rewrite and establish project documentation
- [ ] Define the MVP
- [ ] Clean up the starter project

### Phase 1 — MVP

- [ ] Design the landing page
- [ ] Add GitHub repository URL validation
- [ ] Fetch repository metadata
- [ ] Build the repository screenshot card
- [ ] Connect the complete preview workflow

### Phase 2 — Customization

- [ ] Add themes
- [ ] Add layout and size options
- [ ] Add metadata visibility controls
- [ ] Add topics and language information

### Phase 3 — Export

- [ ] Add PNG export
- [ ] Add loading, empty, and error states
- [ ] Improve accessibility and responsive behavior

### Phase 4 — Quality

- [ ] Add CI
- [ ] Add automated tests
- [ ] Improve GitHub API usage and caching

### Phase 5 — Expansion

- [ ] Custom text
- [ ] Additional templates
- [ ] Shareable presets

### Phase 6 — Release

- [ ] Final branding and metadata
- [ ] UX polish
- [ ] Edge-case testing
- [ ] First public release

---

## 🤝 Contributing

RepoShot is currently primarily developed by **Ava-91**.

Contributions may be opened in the future as the project becomes more mature.

If you find a bug or have an idea, opening an issue is welcome.

Before contributing code, please check the existing issues to avoid duplicating ongoing work.

---

## 🐛 Reporting Issues

Found a bug or have a feature idea?

Please open a GitHub Issue and include as much useful information as possible.

For bugs, it is especially helpful to include:

- What you expected to happen
- What actually happened
- Steps to reproduce the problem
- Browser and operating system
- Repository URL used, if relevant
- Screenshots or error messages

---

## 🔐 Privacy

RepoShot is intended to work with **public GitHub repository information**.

The project does not need access to a user's private GitHub repositories for its initial functionality.

RepoShot should never require users to provide their GitHub password or personal access token simply to generate a screenshot of a public repository.

---

## 📜 License

A license will be added before the first public release.

Until a license is added, the repository should not be assumed to grant permission to reuse, modify, or redistribute the source code.

---

## 👤 Author

Built by **Ava-91**.

GitHub: https://github.com/Ava-91

---

## ⭐ Project Status

**RepoShot is an active work in progress.**

The project started as an experiment and is now being rebuilt into a complete GitHub repository screenshot generator.

The goal isn't to build an unnecessarily complicated platform.

The goal is simple:

> **Paste a GitHub repository. Make it look good. Share it.**

---

<p align="center">
  Made with ❤️ and TypeScript
</p>
