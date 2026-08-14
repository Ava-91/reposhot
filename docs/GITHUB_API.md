# GitHub API usage

RepoShot uses a small in-memory cache with a 60-second TTL for repository metadata. Requests for the same repository that are already in flight share one promise, preventing duplicate concurrent GitHub API calls.

The fetch also uses Next.js `revalidate: 60`, so deployed instances can reuse the response briefly instead of requesting GitHub for every interaction. The cache is intentionally short-lived so repository stars, forks, topics, and other metadata do not remain stale for long.

When GitHub returns a 403/429 rate-limit response, RepoShot distinguishes an exhausted rate limit from a temporary rejection and shows a retry-oriented message. No GitHub token or secret is stored in the browser or exposed to users.
