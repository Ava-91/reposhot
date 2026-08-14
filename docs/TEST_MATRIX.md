# RepoShot test matrix

RepoShot uses automated core tests for deterministic parsing, repository-data mapping, export naming, and GitHub API error handling. Browser-only cases remain manual release checks.

| Scenario | Coverage | Expected result |
| --- | --- | --- |
| Valid GitHub repository URL | Automated | Owner/repository pair is parsed |
| Unusual repository names | Automated | Punctuation and underscores are preserved |
| Invalid/nonexistent URL shape | Automated | Input is rejected before API access |
| Very long name/description | Automated | Data is preserved for UI truncation/wrapping |
| No description/language/topics/license | Automated | Optional fields remain null/empty |
| Many topics | Automated | Full metadata is retained; preview limits visible chips |
| Very large star/fork/open-issue counts | Automated | Safe integer values are preserved |
| Missing avatar URL | Automated | Empty avatar source is represented without throwing |
| GitHub 404 response | Automated | User-facing "Repository not found." error |
| GitHub 403/429 rate limit | Automated | Rate-limit error includes retry guidance when supplied |
| Mobile viewport | Manual | Layout remains usable at narrow widths |
| PNG export in supported browsers | Manual | PNG downloads with the selected dimensions |
| Missing remote avatar at runtime | Manual | Browser should show the avatar fallback/alt state |

## Release smoke test

Before a release, run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build`. Then verify the live app with a normal repository, a long-metadata repository, an invalid repository, a narrow viewport, and a PNG export.
