type EventCallback = (data: any) => void;

export class TransactionStream {
  private eventSource: EventSource | null = null;
  private callbacks: Map<string, EventCallback[]> = new Map();

  constructor(private baseUrl: string = 'http://localhost:5000') {}

  connect() {
    if (this.eventSource) {
      this.disconnect();
    }

    this.eventSource = new EventSource(`${this.baseUrl}/api/transactions/stream`);

    this.eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.notifyCallbacks('message', data);
      } catch (error) {
        console.error('Error parsing SSE data:', error);
      }
    };

    this.eventSource.onerror = (error) => {
      console.error('SSE connection error:', error);
      this.notifyCallbacks('error', error);
      this.reconnect();
    };
  }

  private reconnect() {
    setTimeout(() => {
      console.log('Attempting to reconnect...');
      this.connect();
    }, 5000);
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }
  }

  on(event: string, callback: EventCallback) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event)?.push(callback);
  }

  off(event: string, callback: EventCallback) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  private notifyCallbacks(event: string, data: any) {
    const callbacks = this.callbacks.get(event);
    if (callbacks) {
      callbacks.forEach(callback => callback(data));
    }
  }
} 