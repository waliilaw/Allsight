import { PolymarketAdapter } from './adapters/polymarket';
import { KalshiAdapter } from './adapters/kalshi';
import { BetfairAdapter } from './adapters/betfair';
import { MessageQueue } from './queue/kafka';

// main ingestion orchestrator
// pulls data from all platform adapters and pushes to message queue

class IngestionService {
  private queue: MessageQueue;
  private adapters: Map<string, any>;

  constructor() {
    this.queue = new MessageQueue();
    this.adapters = new Map([
      ['polymarket', new PolymarketAdapter()],
      ['kalshi', new KalshiAdapter()],
      ['betfair', new BetfairAdapter()],
    ]);
  }

  async start() {
    console.log('ingestion service starting...');
    
    for (const [platform, adapter] of this.adapters) {
      adapter.on('market', (data: any) => {
        this.queue.publish('market.raw', { platform, ...data });
      });
      
      await adapter.connect();
    }
  }

  async stop() {
    for (const adapter of this.adapters.values()) {
      await adapter.disconnect();
    }
    await this.queue.disconnect();
  }
}

export { IngestionService };
