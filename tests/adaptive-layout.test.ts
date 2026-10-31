import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getEffectiveLayout } from "../lib/adaptive-layout.ts";

const baseRepository = {
  name: "demo", fullName: "owner/demo", description: "A small demo", htmlUrl: "https://github.com/owner/demo",
  homepage: null, language: "TypeScript", topics: ["nextjs"], stars: 10, forks: 2, watchers: 1,
  openIssues: 1, license: "MIT", createdAt: "2024-01-01T00:00:00Z", updatedAt: "2024-02-01T00:00:00Z",
  pushedAt: "2024-02-01T00:00:00Z", owner: { login: "owner", avatarUrl: "" },
};
const metadata = {
  description: true, language: true, stars: true, forks: true, openIssues: true, owner: true,
  subtitle: "", footerText: "", showGithubUrl: true, accentColor: "", showVibe: false, adaptiveLayout: true,
};

describe("adaptive layout", () => {
  it("keeps a sparse repository in its selected landscape layout", () => {
    assert.equal(getEffectiveLayout("landscape", metadata, baseRepository), "landscape");
  });

  it("chooses square for dense repository content", () => {
    const dense = { ...baseRepository, description: "A".repeat(400), topics: ["a", "b", "c", "d", "e", "f"] };
    assert.equal(getEffectiveLayout("landscape", metadata, dense), "square");
  });

  it("respects the selected layout when auto layout is disabled", () => {
    assert.equal(getEffectiveLayout("portrait", { ...metadata, adaptiveLayout: false }, baseRepository), "portrait");
  });
});
