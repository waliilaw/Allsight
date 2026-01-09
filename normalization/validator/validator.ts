// validates rules and flags conflicts

export class RuleValidator {
  validate(market: any, matches: any[]) {
    const conflicts = [];

    for (const match of matches) {
      if (this.hasDeadlineMismatch(market, match)) {
        conflicts.push({ type: 'deadline', markets: [market.id, match.id] });
      }
      
      if (this.hasResolutionMismatch(market, match)) {
        conflicts.push({ type: 'resolution', markets: [market.id, match.id] });
      }
    }

    return {
      valid: conflicts.length === 0,
      conflicts,
    };
  }

  private hasDeadlineMismatch(m1: any, m2: any): boolean {
    if (!m1.deadline || !m2.deadline) return false;
    const diff = Math.abs(m1.deadline.getTime() - m2.deadline.getTime());
    return diff > 3600000; // more than 1 hour difference
  }

  private hasResolutionMismatch(m1: any, m2: any): boolean {
    // stub: would do deeper analysis of resolution criteria
    return false;
  }
}
