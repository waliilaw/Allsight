import { EventEmitter } from 'events';

// betfair adapter stub
export class BetfairAdapter extends EventEmitter {
  async connect() {
    console.log('betfair adapter connected');
  }

  async disconnect() {
    console.log('betfair adapter disconnected');
  }
}
