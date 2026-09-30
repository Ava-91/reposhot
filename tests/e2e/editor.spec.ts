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
