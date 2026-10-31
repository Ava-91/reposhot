import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getBattleScore } from "../lib/battle-score.ts";

describe("repository battle scoring", () => {
  it("counts individual metric wins instead of netting them", () => {
    const score = getBattleScore(
      { stars: 100, forks: 20, openIssues: 10 },
      { stars: 90, forks: 30, openIssues: 20 },
    );
    assert.deepEqual(score, { leftWins: 2, rightWins: 1, ties: 0, winner: "left" });
  });

  it("treats fewer open issues as the preferred result", () => {
    const score = getBattleScore(
      { stars: 10, forks: 2, openIssues: 1 },
      { stars: 10, forks: 2, openIssues: 4 },
    );
    assert.deepEqual(score, { leftWins: 1, rightWins: 0, ties: 2, winner: "left" });
  });

  it("reports a draw when wins are equal", () => {
    const score = getBattleScore(
      { stars: 100, forks: 2, openIssues: 4 },
      { stars: 50, forks: 8, openIssues: 1 },
    );
    assert.equal(score.winner, null);
    assert.equal(score.leftWins, score.rightWins);
  });
});
