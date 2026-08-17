import assert from "node:assert/strict";
import test from "node:test";

import { getGitHubRequestError } from "../lib/github-errors.ts";
import { parseGitHubRepositoryUrl } from "../lib/github-url.ts";
import { mapGitHubRepository } from "../lib/repository-mapper.ts";
import { createExportOptions } from "../lib/export-options.ts";
import { getLanguageColor } from "../lib/language-colors.ts";

const baseRepository = {
  name: "reposhot",
  full_name: "Ava-91/reposhot",
  description: "GitHub repository screenshot generator",
  html_url: "https://github.com/Ava-91/reposhot",
  homepage: "https://reposhot.example",
  language: "TypeScript",
  topics: ["github", "screenshots"],
  stargazers_count: 12,
  forks_count: 3,
  subscribers_count: 7,
  open_issues_count: 2,
  license: { spdx_id: "MIT" },
  owner: { login: "Ava-91", avatar_url: "https://example.com/avatar.png" },
};

test("parses a valid GitHub repository URL", () => {
  assert.deepEqual(parseGitHubRepositoryUrl(" https://github.com/Ava-91/reposhot "), {
    owner: "Ava-91",
    repo: "reposhot",
  });
});

test("parses repository names with punctuation and underscores", () => {
  assert.deepEqual(parseGitHubRepositoryUrl("https://github.com/octo-org/project_name.js"), {
    owner: "octo-org",
    repo: "project_name.js",
  });
});

test("rejects invalid GitHub repository URLs", () => {
  const invalidUrls = [
    "",
    "reposhot",
    "http://github.com/Ava-91/reposhot",
    "https://gitlab.com/Ava-91/reposhot",
    "https://github.com/Ava-91/reposhot/issues",
    "https://github.com/Ava-91",
    "https://user:password@github.com/Ava-91/reposhot",
  ];

  for (const value of invalidUrls) {
    assert.equal(parseGitHubRepositoryUrl(value), null, value);
  }
});

test("maps complete repository metadata", () => {
  const repository = mapGitHubRepository(baseRepository);

  assert.equal(repository.name, "reposhot");
  assert.equal(repository.fullName, "Ava-91/reposhot");
  assert.equal(repository.stars, 12);
  assert.equal(repository.watchers, 7);
  assert.deepEqual(repository.topics, ["github", "screenshots"]);
  assert.equal(repository.license, "MIT");
});

test("preserves long descriptions, many topics, and very large counters", () => {
  const repository = mapGitHubRepository({
    ...baseRepository,
    name: "a".repeat(100),
    description: "description ".repeat(500),
    topics: Array.from({ length: 50 }, (_, index) => `topic-${index}`),
    stargazers_count: Number.MAX_SAFE_INTEGER,
    forks_count: 987_654_321,
    subscribers_count: 123_456_789,
    open_issues_count: 4_294_967_295,
  });

  assert.equal(repository.name.length, 100);
  assert.equal(repository.description?.length, 6000);
  assert.equal(repository.topics.length, 50);
  assert.equal(repository.stars, Number.MAX_SAFE_INTEGER);
  assert.equal(repository.openIssues, 4_294_967_295);
});

test("handles missing optional repository metadata", () => {
  const repository = mapGitHubRepository({
    ...baseRepository,
    description: null,
    homepage: null,
    language: null,
    topics: [],
    license: null,
    owner: { login: "Ava-91", avatar_url: null },
  });

  assert.equal(repository.description, null);
  assert.equal(repository.homepage, null);
  assert.equal(repository.language, null);
  assert.deepEqual(repository.topics, []);
  assert.equal(repository.license, null);
  assert.equal(repository.owner.avatarUrl, "");
});

test("treats malformed topic payloads as an empty topic list", () => {
  const repository = mapGitHubRepository({
    ...baseRepository,
    topics: undefined,
  });

  assert.deepEqual(repository.topics, []);
});

test("prepares deterministic PNG export options", () => {
  assert.deepEqual(createExportOptions(1200, 675, "Ava-91", "reposhot"), {
    width: 1200,
    height: 675,
    filename: "reposhot-Ava-91-reposhot.png",
  });
});

test("uses GitHub-compatible language colors", () => {
  assert.equal(getLanguageColor("C#"), "#178600");
  assert.equal(getLanguageColor("TypeScript"), "#3178c6");
  assert.equal(getLanguageColor("Rust"), "#dea584");
  assert.equal(getLanguageColor("UnknownLanguage"), "#a1a1aa");
});

test("reports a missing repository clearly", () => {
  assert.equal(getGitHubRequestError(404, new Headers()).message, "Repository not found.");
});

test("reports GitHub rate limiting with retry information", () => {
  const headers = new Headers({
    "x-ratelimit-remaining": "0",
    "retry-after": "30",
  });

  assert.equal(
    getGitHubRequestError(429, headers).message,
    "GitHub API rate limit reached. Try again in about 30 seconds.",
  );
});

test("handles rejected GitHub requests without rate-limit headers", () => {
  assert.equal(
    getGitHubRequestError(500, new Headers()).message,
    "Unable to fetch repository information.",
  );
});
