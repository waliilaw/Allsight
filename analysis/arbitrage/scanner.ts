// scans for arbitrage opportunities across platforms

export class ArbitrageScanner {
  scan(priceData: any[]): any[] {
    const opportunities = [];

    // compare all pairs of markets
    for (let i = 0; i < priceData.length; i++) {
      for (let j = i + 1; j < priceData.length; j++) {
        const opp = this.checkPair(priceData[i], priceData[j]);
        if (opp) opportunities.push(opp);
      }
    }

    return opportunities;
  }

  private checkPair(p1: any, p2: any) {
    // check if we can bet opposite sides and guarantee profit
    const prob1 = p1.impliedProb[0];
    const prob2 = p2.impliedProb[0];
    
    // simple two-way arb check
    if (prob1 + prob2 < 1) {
      return {
        type: 'arbitrage',
        markets: [p1.marketId, p2.marketId],
        platforms: [p1.platform, p2.platform],
        edge: 1 - (prob1 + prob2),
        detected: Date.now(),
      };
    }

    return null;
  }
}
