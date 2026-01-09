import { WebSocketServer as WSServer } from 'ws';

// websocket server for live price streams

export class WebSocketServer {
  private wss: WSServer;

  constructor() {
    this.wss = new WSServer({ port: 3001 });
    
    this.wss.on('connection', (ws) => {
      console.log('client connected');
      
      ws.on('message', (message) => {
        this.handleMessage(ws, message);
      });

      ws.on('close', () => {
        console.log('client disconnected');
      });
    });
  }

  private handleMessage(ws: any, message: any) {
    const data = JSON.parse(message.toString());
    
    if (data.type === 'subscribe') {
      // subscribe to market updates
      console.log('subscribing to:', data.markets);
    }
  }

  broadcast(data: any) {
    this.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify(data));
      }
    });
  }
}
