import type { Response } from 'express';

// Store connected clients for different event types
export const clients = {
  transactions: new Set<Response>(),
  stats: new Set<Response>()
};

// Broadcast update to all connected clients
export const broadcastUpdate = (data: any) => {
  const message = `data: ${JSON.stringify(data)}\n\n`;
  
  // Broadcast to stats clients
  clients.stats.forEach(client => {
    client.write(message);
  });
  
  // Broadcast to transaction clients
  clients.transactions.forEach(client => {
    client.write(message);
  });
}; 