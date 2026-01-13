import { Router } from '../router/router';
import { Executor } from '../executor/executor';
import { PositionTracker } from '../positions/tracker';

// execution service
// routes orders to optimal platform and manages positions

class ExecutionService {
  private router: Router;
  private executor: Executor;
  private positions: PositionTracker;

  constructor() {
    this.router = new Router();
    this.executor = new Executor();
    this.positions = new PositionTracker();
  }

  async execute(order: any) {
    // select optimal platform
    const route = this.router.selectPlatform(order);
    
    // execute order
    const result = await this.executor.placeOrder(route);
    
    // track position
    await this.positions.record(result);

    return result;
  }

  async getPositions(userId: string) {
    return this.positions.getByUser(userId);
  }
}

export { ExecutionService };
