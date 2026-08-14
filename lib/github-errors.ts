export function getGitHubRequestError(status: number, headers: Pick<Headers, "get">): Error {
  if (status === 404) {
    return new Error("Repository not found.");
  }

  if (status === 403 || status === 429) {
    const remaining = headers.get("x-ratelimit-remaining");
    const retryAfter = headers.get("retry-after");
    const retryMessage = retryAfter ? ` Try again in about ${retryAfter} seconds.` : " Please try again later.";

    return new Error(
      remaining === "0"
        ? `GitHub API rate limit reached.${retryMessage}`
        : "GitHub temporarily rejected the request. Please try again later.",
    );
  }

  return new Error("Unable to fetch repository information.");
}
