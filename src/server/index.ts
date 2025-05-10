import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import type { Response, Request } from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

// Store connected clients
const clients = new Set<Response>();

// SSE endpoint for real-time transaction updates
app.get('/api/transactions/stream', (req: Request, res: Response) => {
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Send initial message
  res.write('data: {"type": "connected"}\n\n');

  // Add client to the set
  clients.add(res);

  // Remove client when connection is closed
  req.on('close', () => {
    clients.delete(res);
  });
});

// Helper function to broadcast updates to all connected clients
const broadcastUpdate = (data: any) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(data)}\n\n`);
  });
};

// Example endpoint to get latest transactions
app.get('/api/transactions/latest', async (req: Request, res: Response) => {
  try {
    const [bitcoinTx, ethereumTx] = await Promise.all([
      prisma.bitcoinTransaction.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
      }),
      prisma.ethereumTransaction.findMany({
        take: 10,
        orderBy: { timestamp: 'desc' },
      }),
    ]);

    res.json({ bitcoin: bitcoinTx, ethereum: ethereumTx });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { broadcastUpdate }; 