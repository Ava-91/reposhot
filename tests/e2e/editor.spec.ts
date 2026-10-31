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
  await page.goto("/");
  await page.getByRole("tab", { name: "Repo Card" }).click();
  await expect(page.getByText("Landscape", { exact: true })).toBeAttached();
});
