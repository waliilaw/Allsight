// manages user-defined alert triggers

export class SignalManager {
  private triggers: any[] = [];

  check(prices: any[], opportunities: any[]): any[] {
    const fired = [];

    // stub: would check user-configured triggers
    // e.g., "alert me if prob changes by >10%"
    // or "alert me if arb edge > 5%"

    return fired;
  }

  addTrigger(trigger: any) {
    this.triggers.push(trigger);
  }
}
