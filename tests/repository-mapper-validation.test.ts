import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { isGitHubRepositoryPayload, mapGitHubRepository } from "../lib/repository-mapper.ts";

const validPayload = {
  name: "demo", full_name: "owner/demo", description: null,
  html_url: "https://github.com/owner/demo", homepage: null, language: "TypeScript",
  topics: ["nextjs"], stargazers_count: 10, forks_count: 2, subscribers_count: 3,
  open_issues_count: 1, license: { spdx_id: "MIT" },
  created_at: "2024-01-01T00:00:00Z", updated_at: "2024-02-01T00:00:00Z",
  pushed_at: "2024-02-01T00:00:00Z",
  owner: { login: "owner", avatar_url: "https://avatars.githubusercontent.com/u/1" },
};

describe("GitHub repository payload validation", () => {
  it("accepts a complete public repository response", () => {
    assert.equal(isGitHubRepositoryPayload(validPayload), true);
    assert.equal(mapGitHubRepository(validPayload).fullName, "owner/demo");
  });

  it("rejects malformed counters and timestamps", () => {
    assert.equal(isGitHubRepositoryPayload({ ...validPayload, stargazers_count: -1 }), false);
    assert.equal(isGitHubRepositoryPayload({ ...validPayload, created_at: "not-a-date" }), false);
  });

  it("rejects malformed owner and topic data", () => {
    assert.equal(isGitHubRepositoryPayload({ ...validPayload, owner: null }), false);
    assert.equal(isGitHubRepositoryPayload({ ...validPayload, topics: [1] }), false);
  });

  it("throws rather than mapping malformed API data", () => {
    assert.throws(() => mapGitHubRepository({ ...validPayload, forks_count: Number.NaN }), /unexpected format/i);
  });
});
