import { PricingEngine } from '../pricing/engine';
import { ArbitrageScanner } from '../arbitrage/scanner';
import { RiskScorer } from '../risk/scorer';
import { SignalManager } from '../signals/manager';

// analysis service
// calculates implied probabilities, detects arbitrage, scores risk

class AnalysisService {
  private pricing: PricingEngine;
  private arbitrage: ArbitrageScanner;
  private risk: RiskScorer;
  private signals: SignalManager;

  constructor() {
    this.pricing = new PricingEngine();
    this.arbitrage = new ArbitrageScanner();
    this.risk = new RiskScorer();
    this.signals = new SignalManager();
  }

  async analyze(marketGroup: any[]) {
    // calculate implied probabilities
    const prices = marketGroup.map(m => this.pricing.calculate(m));
    
    // scan for arbitrage opportunities
    const opportunities = this.arbitrage.scan(prices);
    
    // score settlement risk
    const risks = marketGroup.map(m => this.risk.score(m));
    
    // check signal triggers
    const triggered = this.signals.check(prices, opportunities);

    return { prices, opportunities, risks, triggered };
  }
}

export { AnalysisService };
