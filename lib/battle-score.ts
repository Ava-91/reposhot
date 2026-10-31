export interface BattleMetrics {
  stars: number;
  forks: number;
  openIssues: number;
}

export interface BattleScore {
  leftWins: number;
  rightWins: number;
  ties: number;
  winner: "left" | "right" | null;
}

export function getBattleScore(left: BattleMetrics, right: BattleMetrics): BattleScore {
  const comparisons: Array<[number, number, boolean]> = [
    [left.stars, right.stars, true],
    [left.forks, right.forks, true],
    [left.openIssues, right.openIssues, false],
  ];
  const leftWins = comparisons.filter(([a, b, higherIsBetter]) => higherIsBetter ? a > b : a < b).length;
  const rightWins = comparisons.filter(([a, b, higherIsBetter]) => higherIsBetter ? b > a : b < a).length;
  return {
    leftWins,
    rightWins,
    ties: comparisons.length - leftWins - rightWins,
    winner: leftWins === rightWins ? null : leftWins > rightWins ? "left" : "right",
  };
}
