import assert from "node:assert/strict";
import test from "node:test";

import { parseGitHubRepositoryUrl } from "../lib/github-url";
import { mapGitHubRepository } from "../lib/repository-mapper";
import { createExportOptions } from "../lib/export-options";

test("parses a valid GitHub repository URL", () => {
  assert.deepEqual(parseGitHubRepositoryUrl(" https://github.com/Ava-91/reposhot "), {
    owner: "Ava-91",
    repo: "reposhot",
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
  const repository = mapGitHubRepository({
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
  });

  assert.equal(repository.name, "reposhot");
  assert.equal(repository.fullName, "Ava-91/reposhot");
  assert.equal(repository.stars, 12);
  assert.equal(repository.watchers, 7);
  assert.deepEqual(repository.topics, ["github", "screenshots"]);
  assert.equal(repository.license, "MIT");
});

test("handles missing optional repository metadata", () => {
  const repository = mapGitHubRepository({
    name: "minimal",
    full_name: "Ava-91/minimal",
    description: null,
    html_url: "https://github.com/Ava-91/minimal",
    homepage: null,
    language: null,
    topics: [],
    stargazers_count: 0,
    forks_count: 0,
    subscribers_count: 0,
    open_issues_count: 0,
    license: null,
    owner: { login: "Ava-91", avatar_url: "https://example.com/avatar.png" },
  });

  assert.equal(repository.description, null);
  assert.equal(repository.homepage, null);
  assert.equal(repository.language, null);
  assert.deepEqual(repository.topics, []);
  assert.equal(repository.license, null);
});

test("prepares deterministic PNG export options", () => {
  assert.deepEqual(createExportOptions(1200, 675, "Ava-91", "reposhot"), {
    width: 1200,
    height: 675,
    filename: "reposhot-Ava-91-reposhot.png",
  });
});
