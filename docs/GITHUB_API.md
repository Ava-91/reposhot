# GitHub API usage

RepoShot reads public repository metadata through the Next.js Route Handler at `/api/repository`. The browser does not call the GitHub REST API directly.

## Request flow

1. The client sends an owner and repository name to `/api/repository`.
2. The route validates both path components before making an upstream request.
3. The route checks its short-lived in-memory cache and an in-flight request map.
4. On a cache miss, it requests `https://api.github.com/repos/{owner}/{repo}`.
5. The response is validated and mapped into the smaller `RepositoryData` shape before being returned to the client.

## Caching and concurrency

The route caches successful repository responses for 60 seconds and deduplicates concurrent requests for the same repository. The cache is process-local to a running server instance; it is not a distributed cache shared across multiple serverless instances. The cache has a maximum entry count and removes expired entries when it grows beyond that limit.

The route sends `Cache-Control: private, max-age=30` for successful responses. Upstream fetches use an eight-second timeout and retry once for transient network errors or 5xx responses. Rate-limit responses are not retried automatically.

## Errors and rate limits

- `400`: invalid owner or repository input.
- `404`: repository not found.
- `429`: GitHub rate limit or temporary API rejection.
- `503`: upstream timeout or temporary GitHub availability issue.
- Other upstream failures return a generic API error.

When GitHub reports an exhausted rate limit, RepoShot uses `Retry-After` when available to give the user a more useful message.

## Privacy and authentication

RepoShot currently supports public repositories only. It does not ask for a GitHub password or personal access token, and no GitHub credential is stored in the browser. The public API rate limit therefore still applies.

## Client request lifecycle

The editor uses separate controllers for the two Battle inputs. Replacing a request or switching modes aborts the previous browser request, and request IDs prevent late responses from overwriting newer UI state.
