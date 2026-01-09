// calculates implied probability from market prices

export class PricingEngine {
  calculate(market: any) {
    const { prices, outcomes } = market;
    
    // convert odds to implied probabilities
    const implied = this.oddsToProb(prices);
    
    // normalize to remove vig/overround
    const normalized = this.normalize(implied);

    return {
      marketId: market.id,
      platform: market.platform,
      outcomes,
      prices,
      impliedProb: normalized,
      timestamp: Date.now(),
    };
  }

  private oddsToProb(prices: any): number[] {
    // stub: convert various price formats to probabilities
    // handles american odds, decimal odds, percentage, etc
    return Array.isArray(prices) ? prices : [prices, 1 - prices];
  }

  private normalize(probs: number[]): number[] {
    const sum = probs.reduce((a, b) => a + b, 0);
    return probs.map(p => p / sum);
  }
}
