# Contributing to RepoShot

Thanks for taking an interest in RepoShot! Contributions are welcome when they make the project clearer, more reliable, more accessible, or more useful.

## Before you start

1. Search existing issues and pull requests so the work is not duplicated.
2. For a substantial change, open or comment on an issue first so the intended scope is clear.
3. Keep pull requests focused. Avoid mixing unrelated refactors with a feature or fix.
4. Never commit secrets, GitHub tokens, generated credentials, or private repository data.

## Development setup

Requirements:

- Node.js 24 or a compatible current Node.js release
- npm
- Git
- a modern browser

Set up the repository with:

```bash
git clone https://github.com/Ava-91/reposhot.git
cd reposhot
npm install
npm run dev
```

See [`docs/DEVELOPMENT.md`](docs/DEVELOPMENT.md) for the full development guide, project structure, scripts, and troubleshooting information.

## Branch workflow

Create a focused branch from `main`:

```bash
git switch main
git pull origin main
git switch -c feat/short-description
```

Use a branch name that describes the work, for example:

- `feat/shareable-presets`
- `fix/github-rate-limit`
- `docs/development-guide`
- `test/repository-parser`

Do not develop directly on `main` for changes intended for a pull request.

## Making changes

- Prefer small, understandable changes over broad rewrites.
- Preserve existing behavior unless the issue explicitly changes it.
- Keep UI changes accessible and responsive.
- Add or update tests when behavior changes.
- Update documentation when user-facing behavior or development workflows change.
- Avoid adding dependencies unless they solve a real project need.

## Quality checks

Run the complete local quality gate before opening a pull request:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit
```

All checks should pass. A warning is not automatically a failure, but investigate warnings that indicate unsupported or conflicting dependency versions.

Do not use `npm audit fix --force` as a shortcut for dependency problems. Check the supported dependency graph and CI results first.

## Commit messages

RepoShot uses short Conventional Commit-style messages:

```text
<type>: <imperative description>
```

Common types:

- `feat` — new user-facing functionality
- `fix` — bug fix
- `docs` — documentation-only changes
- `test` — tests or test infrastructure
- `refactor` — behavior-preserving code restructuring
- `perf` — performance improvements
- `chore` — maintenance and tooling

Examples:

```text
feat: add repository preset sharing
fix: handle missing repository metadata

docs: expand development guide

test: cover malformed topic payloads
```

Keep the subject concise and describe the actual change.

## Opening an issue

### Bug reports

Include:

- what you expected to happen
- what actually happened
- clear reproduction steps
- the repository URL involved, when relevant
- browser and operating-system information for UI issues
- relevant console or CI output
- screenshots or recordings when they make the problem easier to understand

Remove secrets and private information before posting logs.

### Feature requests

Explain:

- the problem the feature solves
- the intended user experience
- why the change fits RepoShot
- any constraints or alternatives you considered

## Pull requests

A good pull request should:

1. Explain what changed and why.
2. Reference the relevant issue with `Closes #<number>` when appropriate.
3. Keep unrelated changes out of the diff.
4. Include screenshots or recordings for meaningful UI changes.
5. Mention any behavior, dependency, or documentation changes reviewers should know about.

Example description:

```markdown
## Summary

- Add a new repository card template.
- Preserve existing templates and presets.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run build`
- `npm audit`

Closes #123
```

## Pre-PR checklist

Before requesting review, confirm:

- [ ] The change is focused on the intended issue.
- [ ] Existing issues and PRs were checked for duplicates.
- [ ] Tests were added or updated when appropriate.
- [ ] `npm run lint` passes.
- [ ] `npm run typecheck` passes.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] `npm audit` reports no known vulnerabilities.
- [ ] Documentation was updated when needed.
- [ ] UI changes were checked at narrow and desktop widths.
- [ ] Accessibility was considered for interactive changes.
- [ ] No secrets or generated private data were committed.
- [ ] The commit messages clearly describe the changes.

## Review and CI

GitHub Actions runs the repository quality checks for changes pushed to `main` and for pull requests. Please fix CI failures before asking for a final review.

Review feedback should be handled with focused follow-up commits. If a change becomes substantially different from the original scope, explain the change in the pull request rather than silently expanding it.

## Thank you

Whether you submit a bug report, documentation improvement, test, or feature, thank you for helping make RepoShot better.
