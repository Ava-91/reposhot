# Release checklist

## RepoShot 0.1.0

- Production deployment: `https://reposhot.vercel.app/`
- Package version: `0.1.0`
- Default branch: `main`
- Framework: Next.js 16.2.10
- Runtime target: Node.js 24-compatible

## Verification

The repository CI workflow runs:

1. `npm run lint`
2. `npm run typecheck`
3. `npm test`
4. `npm run build`

The release should only be considered publishable when all four checks pass on `main`.

## Supported input

RepoShot accepts HTTPS GitHub repository URLs in the form:

`https://github.com/<owner>/<repository>`

Repository pages, issues, pull requests, GitLab URLs, HTTP URLs, and credential-bearing URLs are rejected by the parser.

## GitHub API behavior

RepoShot requests public repository metadata from GitHub's REST API. Successful responses are cached for 60 seconds and concurrent requests for the same repository are deduplicated. A 404 produces a repository-not-found message. GitHub 403/429 rate-limit responses surface retry guidance when GitHub provides it.

See `docs/GITHUB_API.md` for implementation details and `docs/TEST_MATRIX.md` for the release smoke-test matrix.

## Release hygiene

Before publishing a release, review dependency/security alerts in GitHub and run `npm audit` locally. The repository does not commit credentials or GitHub tokens; the public API endpoint is used for public repository metadata.
