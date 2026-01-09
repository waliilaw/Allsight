// scores settlement risk for markets

export class RiskScorer {
  score(market: any): number {
    let score = 100; // start at low risk

    // penalize missing resolution source
    if (!market.source) score -= 30;

    // penalize ambiguous resolution criteria
    if (!market.resolution || market.resolution.length < 50) score -= 20;

    // penalize far future deadlines (more uncertainty)
    if (market.deadline) {
      const daysUntil = (market.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
      if (daysUntil > 180) score -= 15;
    }

    return Math.max(0, Math.min(100, score));
  }
}
