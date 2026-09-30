import assert from "node:assert/strict";
import test from "node:test";
import { parseGitHubRepositoryUrl } from "../lib/github-url.ts";

test("parses a valid GitHub repository URL", () => { assert.deepEqual(parseGitHubRepositoryUrl(" https://github.com/Ava-91/reposhot "), { owner: "Ava-91", repo: "reposhot" }); });
test("parses repository names with punctuation and underscores", () => { assert.deepEqual(parseGitHubRepositoryUrl("https://github.com/octo-org/project_name.js"), { owner: "octo-org", repo: "project_name.js" }); });
test("rejects invalid GitHub repository URLs", () => { for (const value of ["", "reposhot", "http://github.com/Ava-91/reposhot", "https://gitlab.com/Ava-91/reposhot", "https://github.com/Ava-91/reposhot/issues", "https://github.com/Ava-91", "https://user:password@github.com/Ava-91/reposhot"]) assert.equal(parseGitHubRepositoryUrl(value), null, value); });
