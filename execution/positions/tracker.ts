// tracks positions across platforms

export class PositionTracker {
  private positions: Map<string, any[]> = new Map();

  async record(execution: any) {
    const userId = execution.userId;
    const positions = this.positions.get(userId) || [];
    positions.push(execution);
    this.positions.set(userId, positions);
  }

  getByUser(userId: string) {
    return this.positions.get(userId) || [];
  }

  getTotalExposure(userId: string) {
    const positions = this.getByUser(userId);
    // calculate net exposure across all platforms
    return positions.reduce((sum, p) => sum + p.amount, 0);
  }
}
