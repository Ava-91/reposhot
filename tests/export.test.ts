import assert from "node:assert/strict";
import test from "node:test";
import { createExportOptions } from "../lib/export-options.ts";

test("prepares deterministic PNG export options", () => { assert.deepEqual(createExportOptions(1200, 675, "Ava-91", "reposhot"), { width: 1200, height: 675, filename: "reposhot-Ava-91-reposhot.png" }); assert.deepEqual(createExportOptions(1080, 1350, "Ava-91", "reposhot-wrapped"), { width: 1080, height: 1350, filename: "reposhot-wrapped-Ava-91-reposhot-wrapped.png" }); });
