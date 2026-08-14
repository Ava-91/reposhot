# Changelog

All notable changes to RepoShot are documented here.

## [0.1.0] — 2026-08-14

### Added

- GitHub repository URL parsing and repository metadata fetching.
- Repository preview cards with multiple themes, layouts, and templates.
- Metadata visibility controls and custom text options.
- PNG export with deterministic filenames.
- Shareable preset URLs for restoring repository, theme, layout, template, and metadata settings.
- Repository/API caching and in-flight request deduplication.
- Clear handling for invalid repositories and GitHub API rate limits.
- Branding, Open Graph, Twitter/X metadata, favicon, and social preview assets.
- Responsive UX polish, reduced-motion support, and export feedback.
- Automated core tests and an edge-case test matrix.

### Release notes

RepoShot 0.1.0 is the first public MVP release. The application is deployed at https://reposhot.vercel.app/ and is designed to turn public GitHub repository metadata into shareable PNG cards.

Known limitations and API behavior are documented in `docs/GITHUB_API.md`, `docs/PNG_EXPORT.md`, and `docs/TEST_MATRIX.md`.
