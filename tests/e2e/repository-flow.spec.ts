import { test, expect } from "@playwright/test";

function repositoryPayload(name: string) {
  return {
    name,
    fullName: `sample/${name}`,
    description: "A sample repository for editor integration tests.",
    htmlUrl: `https://github.com/sample/${name}`,
    homepage: null,
    language: "TypeScript",
    topics: ["nextjs", "testing", "open-source"],
    stars: 120,
    forks: 24,
    watchers: 12,
    openIssues: 3,
    license: "MIT",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2025-01-01T00:00:00Z",
    pushedAt: "2025-01-01T00:00:00Z",
    owner: { login: "sample", avatarUrl: "" },
  };
}

test("generates a card through the server repository endpoint", async ({ page }) => {
  await page.route("**/api/repository**", async (route) => {
    const name = new URL(route.request().url()).searchParams.get("repo") ?? "demo";
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(repositoryPayload(name)) });
  });

  await page.goto("/");
  await page.getByRole("textbox", { name: "Repository URL" }).fill("https://github.com/sample/demo");
  await page.getByRole("button", { name: /Generate preview/ }).click();
  await expect(page.getByRole("region", { name: "Repository preview editor" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "demo" })).toBeVisible();
});

test("loads both repositories independently in battle mode", async ({ page }) => {
  await page.route("**/api/repository**", async (route) => {
    const name = new URL(route.request().url()).searchParams.get("repo") ?? "demo";
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(repositoryPayload(name)) });
  });

  await page.goto("/");
  await page.getByRole("tab", { name: "Repository Battle" }).click();
  await page.getByRole("textbox", { name: "Repository A" }).fill("https://github.com/sample/alpha");
  await page.getByRole("button", { name: /Generate preview/ }).nth(0).click();
  await page.getByRole("textbox", { name: "Repository B" }).fill("https://github.com/sample/beta");
  await page.getByRole("button", { name: /Generate preview/ }).nth(1).click();
  await expect(page.getByRole("region", { name: "Repository battle result" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "alpha" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "beta" })).toBeVisible();
});

test("does not show a stale card after switching modes during a request", async ({ page }) => {
  await page.route("**/api/repository**", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(repositoryPayload("stale")) });
  });

  await page.goto("/");
  await page.getByRole("textbox", { name: "Repository URL" }).fill("https://github.com/sample/stale");
  await page.getByRole("button", { name: /Generate preview/ }).click();
  await page.getByRole("tab", { name: "Repo Wrapped" }).click();
  await expect(page.getByRole("region", { name: "Repository preview editor" })).toHaveCount(0);
});
