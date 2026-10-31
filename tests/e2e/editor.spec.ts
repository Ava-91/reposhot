import { test, expect } from "@playwright/test";

test("loads the RepoShot editor and exposes accessible mode tabs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("tab", { name: "Repo Card" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Repository Battle" })).toBeVisible();
  await expect(page.getByRole("tab", { name: "Repo Wrapped" })).toBeVisible();
});

test("switches between editor modes", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Repo Wrapped" }).click();
  await expect(page.getByRole("tab", { name: "Repo Wrapped" })).toHaveAttribute("aria-selected", "true");
  await page.getByRole("tab", { name: "Repository Battle" }).click();
  await expect(page.getByRole("tab", { name: "Repository Battle" })).toHaveAttribute("aria-selected", "true");
});

test("battle mode renders two uniquely labelled repository inputs", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "Repository Battle" }).click();
  const first = page.getByRole("textbox", { name: "Repository A" });
  const second = page.getByRole("textbox", { name: "Repository B" });
  await expect(first).toBeVisible();
  await expect(second).toBeVisible();
  await expect(first).not.toHaveAttribute("id", await second.getAttribute("id"));
});

test("layout options include landscape, square, and portrait exports", async ({ page }) => {
  await page.route("**/api/repository**", async (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({ name: "demo", fullName: "sample/demo", description: "Demo", htmlUrl: "https://github.com/sample/demo", homepage: null, language: "TypeScript", topics: [], stars: 1, forks: 0, watchers: 0, openIssues: 0, license: "MIT", createdAt: "2024-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z", pushedAt: "2025-01-01T00:00:00Z", owner: { login: "sample", avatarUrl: "" } }),
  }));
  await page.goto("/");
  await page.getByRole("textbox", { name: "Repository URL" }).fill("https://github.com/sample/demo");
  await page.getByRole("button", { name: /Generate preview/ }).click();
  await expect(page.getByRole("button", { name: /Landscape/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Square/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Portrait/ })).toBeVisible();
});
