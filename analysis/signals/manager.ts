// manages user-defined alert triggers

export class SignalManager {
  private triggers: any[] = [];

  check(_prices: any[], _opportunities: any[]): any[] {
    const fired: any[] = [];

    // stub: would check user-configured triggers
    // e.g., "alert me if prob changes by >10%"
    // or "alert me if arb edge > 5%"

    return fired;
  }

  addTrigger(trigger: any) {
    this.triggers.push(trigger);
  }
}
