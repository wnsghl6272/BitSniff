import express, { Router } from 'express';
import cors from 'cors';
import type { Response, Request, RequestHandler } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { formatInTimeZone } from 'date-fns-tz';
import { Decimal } from '@prisma/client/runtime/library';

const TIMEZONE = 'Australia/Sydney';
const app = express();
const router = Router();
const prisma = new PrismaClient();

// CORS configuration
app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Store connected clients for different event types
const clients = {
  transactions: new Set<Response>(),
  stats: new Set<Response>()
};

// Helper function to convert UTC to Australian time
function toAustralianTime(date: string | Date): Date {
  // API returns UTC time, so we need to convert it to Australian time
  const utcDate = new Date(date);
  // Add timezone offset for Sydney (typically UTC+10 or UTC+11)
  return new Date(utcDate.getTime() + (10 * 60 * 60 * 1000)); // Adding 10 hours for Sydney
}

// Helper function to format time to Australian timezone string
function formatAustralianTime(date: Date): string {
  // Add timezone offset for Sydney
  const sydneyDate = new Date(date.getTime() + (10 * 60 * 60 * 1000));
  return formatInTimeZone(sydneyDate, TIMEZONE, 'MMM d, yyyy, HH:mm:ss');
}

// Function to fetch and store Blockchair stats
async function fetchAndStoreBlockchairStats() {
  try {
    // Fetch Bitcoin stats
    const bitcoinResponse = await axios.get('https://api.blockchair.com/bitcoin/stats');
    const bitcoinStats = bitcoinResponse.data;
    
    await prisma.blockchairStats.create({
      data: {
        timestamp: formatAustralianTime(new Date()),
        network: 'bitcoin',
        data: bitcoinStats
      }
    });

    // Fetch Ethereum stats
    const ethereumResponse = await axios.get('https://api.blockchair.com/ethereum/stats');
    const ethereumStats = ethereumResponse.data;
    
    await prisma.blockchairStats.create({
      data: {
        timestamp: formatAustralianTime(new Date()),
        network: 'ethereum',
        data: ethereumStats
      }
    });

    // Broadcast update to connected clients with the correct data structure
    const updateData = {
      type: 'stats_update',
      bitcoin: { data: bitcoinStats.data },
      ethereum: { data: ethereumStats.data },
      timestamp: formatAustralianTime(new Date())
    };

    console.log('Broadcasting stats update:', JSON.stringify(updateData, null, 2));
    broadcastUpdate(updateData);

  } catch (error) {
    console.error('Error fetching Blockchair stats:', error);
  }
}

fetchAndStoreBlockchairStats();

// Update interval to 60 seconds for stats
setInterval(fetchAndStoreBlockchairStats, 60 * 1000);

// Function to fetch and store transaction data
async function fetchAndStoreTransactions() {
  try {
    // Calculate time range in UTC
    const now = Math.floor(Date.now() / 1000);
    const tenMinutesAgo = now - 600; // 10 minutes in seconds

    // Format the date in YYYY-MM-DD HH:MM:SS format
    const date = new Date(tenMinutesAgo * 1000);
    const timeStr = date.toISOString()
      .replace('T', ' ')
      .split('.')[0];

    // Construct the query with time range from 10 minutes ago to now
    const query = `time(${timeStr}..${new Date(now * 1000).toISOString().replace('T', ' ').split('.')[0]})`;

    // Fetch Bitcoin transactions
    const bitcoinResponse = await axios.get('https://api.blockchair.com/bitcoin/transactions', {
      params: {
        q: query,
        limit: 100,
        s: 'time(desc)'
      }
    });

    // Store Bitcoin transactions
    if (bitcoinResponse.data.data && Array.isArray(bitcoinResponse.data.data)) {
      console.log(`Processing ${bitcoinResponse.data.data.length} Bitcoin transactions`);
      for (const tx of bitcoinResponse.data.data) {
        try {
          // Fetch detailed transaction info to get addresses
          console.log(`Fetching details for tx ${tx.hash}`);
          const txDetailResponse = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/transaction/${tx.hash}`);
          const txDetail = txDetailResponse.data.data[tx.hash];
          
          if (!txDetail) {
            console.error(`No detail data found for tx ${tx.hash}`);
            continue;
          }

          console.log(`Transaction ${tx.hash} details:`, {
            fromAddress: txDetail?.inputs?.[0]?.recipient,
            toAddress: txDetail?.outputs?.[0]?.recipient
          });

          await prisma.bitcoinTransaction.upsert({
            where: { hash: tx.hash },
            update: {
              blockNumber: BigInt(tx.block_id),
              timestamp: toAustralianTime(tx.time),
              value: tx.output_total.toString(),
              fee: tx.fee.toString(),
              fromAddress: txDetail?.inputs?.[0]?.recipient || 'Unknown',
              toAddress: txDetail?.outputs?.[0]?.recipient || 'Unknown'
            },
            create: {
              hash: tx.hash,
              blockNumber: BigInt(tx.block_id),
              timestamp: toAustralianTime(tx.time),
              value: tx.output_total.toString(),
              fee: tx.fee.toString(),
              fromAddress: txDetail?.inputs?.[0]?.recipient || 'Unknown',
              toAddress: txDetail?.outputs?.[0]?.recipient || 'Unknown'
            }
          });
          console.log(`Successfully stored tx ${tx.hash}`);
        } catch (err: any) {
          console.error('Error processing Bitcoin transaction:', tx.hash, err);
          if (err?.response) {
            console.error('Error response:', err.response?.status, err.response?.data);
          }
        }
      }
    }

    // Fetch Ethereum transactions
    const ethereumResponse = await axios.get('https://api.blockchair.com/ethereum/transactions', {
      params: {
        q: query,
        limit: 100,
        s: 'time(desc)'
      }
    });

    // Store Ethereum transactions
    if (ethereumResponse.data.data && Array.isArray(ethereumResponse.data.data)) {
      for (const tx of ethereumResponse.data.data) {
        try {
          if (!tx.hash || tx.type === 'synthetic_coinbase') {
            continue;
          }

          const valueInEther = (BigInt(tx.value || 0) / BigInt(1e18)).toString();
          const gasUsed = BigInt(tx.gas_used || 0);
          const gasPrice = BigInt(tx.gas_price || 0);
          const gasFeeInWei = gasUsed * gasPrice;
          const gasFeeInEther = (gasFeeInWei / BigInt(1e18)).toString();

          await prisma.ethereumTransaction.upsert({
            where: { hash: tx.hash },
            update: {
              blockNumber: BigInt(tx.block_id || 0),
              timestamp: toAustralianTime(tx.time),
              value: valueInEther,
              gasFee: gasFeeInEther,
              gasPrice: tx.gas_price?.toString() || '0',
              gasUsed: gasUsed,
              fromAddress: tx.sender || 'Unknown',
              toAddress: tx.recipient || 'Unknown'
            },
            create: {
              hash: tx.hash,
              blockNumber: BigInt(tx.block_id || 0),
              timestamp: toAustralianTime(tx.time),
              value: valueInEther,
              gasFee: gasFeeInEther,
              gasPrice: tx.gas_price?.toString() || '0',
              gasUsed: gasUsed,
              fromAddress: tx.sender || 'Unknown',
              toAddress: tx.recipient || 'Unknown'
            }
          });
        } catch (err) {
          console.error('Error storing Ethereum transaction:', err);
        }
      }
    }

    // Broadcast update to connected clients
    broadcastUpdate({
      type: 'transactions_update',
      timestamp: formatAustralianTime(new Date())
    });

  } catch (error) {
    console.error('Error fetching transactions:', error);
  }
}

// Function to initialize latest transactions on server start
async function initializeLatestTransactions() {
  try {
    console.log('Initializing latest transactions from database...');
    
    // Get latest 50 Bitcoin transactions
    const bitcoinTx = await prisma.bitcoinTransaction.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });
    
    // Get latest 50 Ethereum transactions
    const ethereumTx = await prisma.ethereumTransaction.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50
    });

    // Broadcast initial transactions to connected clients
    broadcastUpdate({
      type: 'transactions_update',
      timestamp: formatAustralianTime(new Date())
    });

    console.log(`Initialized with ${bitcoinTx.length} Bitcoin and ${ethereumTx.length} Ethereum transactions`);
  } catch (error) {
    console.error('Error initializing latest transactions:', error);
  }
}

// Initialize when server starts
initializeLatestTransactions();

// Initial fetch from Blockchair API
fetchAndStoreTransactions();

// Fetch transactions every minute
setInterval(fetchAndStoreTransactions, 60 * 1000);

// Endpoint to get latest stats
app.get('/api/stats/latest', async (req: Request, res: Response) => {
  try {
    const [bitcoinStats, ethereumStats] = await Promise.all([
      prisma.blockchairStats.findFirst({
        where: { network: 'bitcoin' },
        orderBy: { timestamp: 'desc' }
      }),
      prisma.blockchairStats.findFirst({
        where: { network: 'ethereum' },
        orderBy: { timestamp: 'desc' }
      })
    ]);

    res.json({
      bitcoin: bitcoinStats?.data || null,
      ethereum: ethereumStats?.data || null
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// SSE endpoint for real-time stats updates
app.get('/api/stats/stream', (req: Request, res: Response) => {
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Send initial message
  res.write('data: {"type": "connected"}\n\n');

  // Add client to the stats set
  clients.stats.add(res);

  // Remove client when connection is closed
  req.on('close', () => {
    clients.stats.delete(res);
  });
});

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

  // Add client to the transactions set
  clients.transactions.add(res);

  // Remove client when connection is closed
  req.on('close', () => {
    clients.transactions.delete(res);
  });
});

// Update broadcastUpdate function to handle different event types
const broadcastUpdate = (data: any) => {
  const clientSet = data.type === 'stats_update' ? clients.stats : clients.transactions;
  
  console.log(`Broadcasting to ${clientSet.size} clients for type: ${data.type}`);
  
  // Ensure data structure matches frontend expectations
  const serializedData = {
    ...data,
    bitcoin: data.type === 'stats_update' 
      ? { data: data.bitcoin.data }
      : Array.isArray(data.bitcoin) 
        ? data.bitcoin.map((tx: any) => ({
            ...tx,
            blockNumber: tx.block_id?.toString(),
            value: tx.output_total?.toString(),
            fee: tx.fee?.toString()
          }))
        : data.bitcoin,
    ethereum: data.type === 'stats_update'
      ? { data: data.ethereum.data }
      : Array.isArray(data.ethereum)
        ? data.ethereum.map((tx: any) => ({
            ...tx,
            blockNumber: tx.block_id?.toString(),
            value: tx.value?.toString(),
            gasPrice: tx.gas_price?.toString(),
            gasUsed: tx.gas_limit?.toString(),
            gasFee: tx.gas_price && tx.gas_limit 
              ? (BigInt(tx.gas_price) * BigInt(tx.gas_limit)).toString()
              : '0'
          }))
        : data.ethereum
  };

  clientSet.forEach(client => {
    try {
      client.write(`data: ${JSON.stringify(serializedData)}\n\n`);
    } catch (error) {
      console.error('Error sending SSE update:', error);
      clients.stats.delete(client);
    }
  });
};

// Define transaction types
interface BlockchairInput {
  recipient: string;
  address: string;
}

interface BlockchairOutput {
  recipient: string;
  address: string;
}

interface BlockchairTransaction {
  hash: string;
  block_id: number;
  time: string;
  output_total: number;
  fee: number;
  input_count: number;
  output_count: number;
  inputs?: BlockchairInput[];
  outputs?: BlockchairOutput[];
}

interface BaseTransaction {
  id: number;
  hash: string;
  blockNumber: string;
  timestamp: Date;
  value: Decimal;
  fromAddress: string;
  toAddress: string;
  createdAt: Date;
}

interface BitcoinTransaction extends BaseTransaction {
  fee: Decimal;
}

interface EthereumTransaction extends BaseTransaction {
  gasFee: Decimal;
  gasPrice: Decimal;
  gasUsed: string;
}

type Transaction = (BitcoinTransaction & { network: 'bitcoin' }) | (EthereumTransaction & { network: 'ethereum' });

// Update transactions endpoint to support pagination and sorting
app.get('/api/transactions/latest', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const sortBy = (req.query.sortBy as string) || 'timestamp';
    const sortOrder = (req.query.sortOrder as string) === 'asc' ? 'asc' : 'desc';
    const network = (req.query.network as string) || 'all';

    let transactions: Transaction[] = [];

    // Fetch transactions based on network
    if (network === 'all') {
      // For 'all' network, fetch Bitcoin first then Ethereum
      const bitcoinTx = await prisma.bitcoinTransaction.findMany({
        orderBy: { [sortBy]: sortOrder },
        take: 50
      });
      
      const ethereumTx = await prisma.ethereumTransaction.findMany({
        orderBy: { [sortBy]: sortOrder },
        take: 50
      });

      // Add Bitcoin transactions first
      transactions.push(...bitcoinTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        network: 'bitcoin' as const
      })));

      // Then add Ethereum transactions
      transactions.push(...ethereumTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        gasUsed: tx.gasUsed.toString(),
        network: 'ethereum' as const
      })));
    } else if (network === 'bitcoin') {
      const bitcoinTx = await prisma.bitcoinTransaction.findMany({
        orderBy: { [sortBy]: sortOrder },
        take: 50
      });
      
      transactions.push(...bitcoinTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        network: 'bitcoin' as const
      })));
    } else if (network === 'ethereum') {
      const ethereumTx = await prisma.ethereumTransaction.findMany({
        orderBy: { [sortBy]: sortOrder },
        take: 50
      });

      transactions.push(...ethereumTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        gasUsed: tx.gasUsed.toString(),
        network: 'ethereum' as const
      })));
    }

    // Calculate pagination
    const total = transactions.length;
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, total);
    const paginatedTransactions = transactions.slice(startIndex, endIndex);

    res.json({
      transactions: paginatedTransactions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Wallet routes
interface WalletParams {
  network: string;
  address: string;
}

const getWalletData = async (req: Request<WalletParams>, res: Response): Promise<void> => {
  const { network, address } = req.params;
  
  try {
    // Validate network parameter
    if (network !== 'bitcoin' && network !== 'ethereum') {
      res.status(400).json({ error: 'Invalid network. Must be "bitcoin" or "ethereum".' });
      return;
    }

    // Validate address format
    if (!address || address.length < 26 || address.length > 42) {
      res.status(400).json({ error: 'Invalid address format' });
      return;
    }

    // Try to get cached data first
    const cachedWallet = await prisma.wallet.findFirst({
      where: {
        address,
        network,
        updatedAt: {
          // Only use cache if it's less than 5 minutes old
          gt: new Date(Date.now() - 5 * 60 * 1000)
        }
      }
    });

    if (cachedWallet) {
      res.setHeader('Content-Type', 'application/json');
      res.json(cachedWallet.data);
      return;
    }

    // If not cached or cache expired, fetch from Blockchair
    const apiResponse = await axios.get(`https://api.blockchair.com/${network}/dashboards/address/${address}`, {
      params: network === 'ethereum' ? { erc_20: 'true', limit: 10 } : { limit: 10 },
      headers: {
        'Accept': 'application/json'
      },
      validateStatus: (status) => status === 200,
      timeout: 10000 // 10 second timeout
    });

    // Validate API response
    if (!apiResponse.data || typeof apiResponse.data !== 'object') {
      throw new Error('Invalid API response format');
    }

    const addressData = apiResponse.data.data?.[address];
    if (!addressData) {
      res.status(404).json({ error: 'Address not found' });
      return;
    }

    // Process and format the data
    const formattedData = {
      address,
      network,
      balance: addressData.address?.balance || '0',
      totalTransactions: addressData.address?.transaction_count || 0,
      lastSeen: addressData.address?.first_seen_receiving || null,
      ...addressData
    };

    // Store in database
    await prisma.wallet.upsert({
      where: {
        address_network: {
          address,
          network
        }
      },
      update: {
        data: formattedData,
        updatedAt: new Date()
      },
      create: {
        address,
        network,
        data: formattedData,
        updatedAt: new Date()
      }
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(formattedData);
  } catch (error) {
    console.error(`Error fetching ${network} wallet data:`, error);
    
    // Handle specific error cases
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        res.status(404).json({ error: 'Address not found' });
        return;
      }
      if (error.response?.status === 402) {
        res.status(429).json({ error: 'API rate limit exceeded' });
        return;
      }
      if (error.response?.status === 429) {
        res.status(429).json({ error: 'Too many requests' });
        return;
      }
      if (error.code === 'ECONNABORTED') {
        res.status(504).json({ error: 'Request timeout' });
        return;
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch wallet data',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

app.get('/api/wallet/:network/:address', getWalletData);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { broadcastUpdate }; 