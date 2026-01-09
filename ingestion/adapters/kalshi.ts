import { EventEmitter } from 'events';

// kalshi adapter stub
export class KalshiAdapter extends EventEmitter {
  async connect() {
    console.log('kalshi adapter connected');
  }

  async disconnect() {
    console.log('kalshi adapter disconnected');
  }
}
