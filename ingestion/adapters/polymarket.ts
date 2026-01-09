import axios from 'axios';
import { EventEmitter } from 'events';

// polymarket data adapter
// fetches markets and order book data from polymarket api

export class PolymarketAdapter extends EventEmitter {
  private baseUrl = 'https://gamma-api.polymarket.com';
  private ws: any;

  async connect() {
    console.log('polymarket adapter connected');
    // start polling or websocket connection
    this.startPolling();
  }

  async disconnect() {
    console.log('polymarket adapter disconnected');
    if (this.ws) this.ws.close();
  }

  private async startPolling() {
    // fetch markets every 10 seconds
    setInterval(async () => {
      try {
        const markets = await this.fetchMarkets();
        markets.forEach((market: any) => {
          this.emit('market', this.normalizeMarket(market));
        });
      } catch (error) {
        console.error('polymarket fetch error:', error);
      }
    }, 10000);
  }

  private async fetchMarkets() {
    const response = await axios.get(`${this.baseUrl}/markets`);
    return response.data;
  }

  private normalizeMarket(raw: any) {
    return {
      id: raw.id,
      question: raw.question,
      outcomes: raw.outcomes,
      prices: raw.prices,
      volume: raw.volume,
      timestamp: Date.now(),
    };
  }
}
