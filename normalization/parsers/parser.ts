// extracts structured data from raw market objects

export class MarketParser {
  parse(rawMarket: any) {
    return {
      id: this.generateId(rawMarket),
      platform: rawMarket.platform,
      question: this.normalizeQuestion(rawMarket.question),
      outcomes: this.normalizeOutcomes(rawMarket.outcomes),
      deadline: this.parseDeadline(rawMarket),
      resolution: this.parseResolutionCriteria(rawMarket),
      source: this.extractSource(rawMarket),
      raw: rawMarket,
    };
  }

  private generateId(market: any): string {
    return `${market.platform}:${market.id}`;
  }

  private normalizeQuestion(question: string): string {
    return question.trim().toLowerCase();
  }

  private normalizeOutcomes(outcomes: any): string[] {
    return Array.isArray(outcomes) ? outcomes : ['yes', 'no'];
  }

  private parseDeadline(market: any): Date | null {
    // extract deadline from various field names
    const deadlineField = market.endDate || market.deadline || market.closeTime;
    return deadlineField ? new Date(deadlineField) : null;
  }

  private parseResolutionCriteria(market: any): string {
    return market.rules || market.description || '';
  }

  private extractSource(market: any): string | null {
    return market.resolutionSource || market.source || null;
  }
}
