// webhook delivery system for alerts

export class WebhookManager {
  async send(url: string, payload: any) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      return response.ok;
    } catch (error) {
      console.error('webhook failed:', error);
      return false;
    }
  }
}
