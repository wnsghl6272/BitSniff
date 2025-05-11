import express, { Router } from 'express';
import cors from 'cors';
import type { Response, Request, RequestHandler } from 'express';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { formatInTimeZone } from 'date-fns-tz';
import { Decimal } from '@prisma/client/runtime/library';
import { prisma } from '../lib/prisma.js';

// Import separated modules
import { corsConfig } from './config/cors.js';
import { clients, broadcastUpdate } from './utils/clientManager.js';
import { fetchAndStoreBlockchairStats } from './utils/statsProcessor.js';
import { formatAustralianTime } from './utils/timeUtils.js';

const TIMEZONE = 'Australia/Sydney';
const app = express();
const router = Router();

// CORS configuration
app.use(corsConfig);
app.use(express.json());

// Helper function to convert UTC to Australian time
function toAustralianTime(date: string | Date): Date {
  const inputDate = new Date(date);
  // Convert to Australian timezone
  const auDate = formatInTimeZone(inputDate, TIMEZONE, "yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
  return new Date(auDate);
}

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Axios error type declaration
interface AxiosError {
  code?: string;
  response?: {
    status: number;
    data: any;
  };
  message: string;
}

// Utility function for retry logic
const axiosWithRetry = async (url: string, config: any, retries = 3, delay = 2000) => {
  try {
    return await axios.get(url, {
      ...config,
      timeout: 30000,
    });
  } catch (error: unknown) {
    if (retries === 0) throw error;
    
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED' || axiosError.response?.status === 402) {
      await new Promise(resolve => setTimeout(resolve, delay));
      return axiosWithRetry(url, config, retries - 1, delay);
    }
    
    throw error;
  }
};

// validateStatus type definition
const isSuccessStatus = (status: number): boolean => status === 200;

interface BlockchairStatsData {
  [key: string]: any;
}

interface BlockchairApiResponse {
  data: BlockchairStatsData;
}

// Helper function to compare stats and identify changes
function compareStats(oldData: any, newData: any): Record<string, boolean> {
  const changes: Record<string, boolean> = {};
  
  if (!oldData || !newData) {
    return changes;
  }

  // Compare each field
  for (const key in newData) {
    if (JSON.stringify(oldData[key]) !== JSON.stringify(newData[key])) {
      changes[key] = true;
    }
  }

  return changes;
}

// Constants for transaction fetching
const FETCH_INTERVAL = 60 * 1000; // 1 minute
const TRANSACTION_BATCH_SIZE = 5; // Number of transactions to process at once
const MAX_STORED_TRANSACTIONS = 50; // Maximum number of transactions to display per network
const API_DELAY = 5000; // Delay between API calls (5 seconds)

// Add tracking for last processed block
let lastProcessedBitcoinBlock: number | null = null;

// API call settings
const API_CONFIG = {
  headers: {
    'Accept': 'application/json'
  },
  validateStatus: (status: number) => status === 200 || status === 402, // Allow 402 error
  timeout: 30000
};

// Function to fetch and process Bitcoin block transactions
async function fetchBitcoinBlockTransactions(blockHeight: number) {
  try {
    const response = await axiosWithRetry(
      'https://api.blockchair.com/bitcoin/transactions',
      {
        ...API_CONFIG,
        params: {
          q: `block_id(${blockHeight})`,
          limit: TRANSACTION_BATCH_SIZE,
          s: 'time(desc)'
        }
      },
      3,
      10000
    );

    if (response.status === 402) {
      return;
    }

    if (!response.data?.data || !Array.isArray(response.data.data)) {
      return;
    }

    const transactions = response.data.data;

    for (const tx of transactions) {
      try {
        const existingTx = await prisma.bitcoinTransaction.findFirst({
          where: {
            AND: [
              { hash: tx.hash },
              { blockNumber: BigInt(blockHeight) }
            ]
          }
        });

        if (existingTx) {
          continue;
        }

        const txDetailResponse = await axiosWithRetry(
          `https://api.blockchair.com/bitcoin/dashboards/transaction/${tx.hash}`,
          API_CONFIG,
          3,
          10000
        );

        if (txDetailResponse.status === 402) {
          continue;
        }

        const txDetail = txDetailResponse.data?.data?.[tx.hash];
        if (!txDetail) {
          continue;
        }

        const timestamp = toAustralianTime(tx.time);
        
        const transaction = {
          hash: tx.hash,
          blockNumber: BigInt(blockHeight),
          timestamp: timestamp,
          value: tx.output_total.toString(),
          fee: tx.fee.toString(),
          fromAddress: txDetail.inputs?.[0]?.recipient || txDetail.inputs?.[0]?.address || 'Unknown',
          toAddress: txDetail.outputs?.[0]?.recipient || txDetail.outputs?.[0]?.address || 'Unknown'
        };

        const savedTx = await prisma.bitcoinTransaction.create({
          data: transaction
        });

        const broadcastData = {
          type: 'transaction_update',
          network: 'bitcoin',
          transaction: {
            ...transaction,
            id: savedTx.id,
            blockNumber: transaction.blockNumber.toString(),
            displayId: savedTx.id,
            timestamp: formatAustralianTime(timestamp)
          }
        };

        broadcastUpdate(broadcastData);
        await delay(API_DELAY);
      } catch (err) {
        console.error(`Error processing Bitcoin transaction ${tx.hash}:`, err);
      }
    }
  } catch (error) {
    console.error(`Error processing Bitcoin block ${blockHeight}:`, error);
  }
}

// Function to fetch and store transactions
async function fetchAndStoreTransactions() {
  try {
    console.log('Starting transaction fetch at:', new Date().toISOString());

    // Process Bitcoin and Ethereum transactions in parallel
    await Promise.all([
      // Bitcoin transactions
      (async () => {
        try {
          console.log('Fetching recent Bitcoin blocks...');

          // Get latest block info
          const statsResponse = await axiosWithRetry(
            'https://api.blockchair.com/bitcoin/stats',
            API_CONFIG
          );

          if (!statsResponse.data?.data?.best_block_height) {
            console.log('Could not get latest block height');
            return;
          }

          const latestBlockHeight = statsResponse.data.data.best_block_height;

          // If we haven't processed any blocks yet, get the latest block height from our database
          if (lastProcessedBitcoinBlock === null) {
            const latestTx = await prisma.bitcoinTransaction.findFirst({
              orderBy: { blockNumber: 'desc' }
            });
            lastProcessedBitcoinBlock = latestTx ? Number(latestTx.blockNumber) : latestBlockHeight - 1;
          }

          // Improved block processing logic - process multiple blocks at once
          const currentBlock: number = lastProcessedBitcoinBlock || latestBlockHeight - 1;
          const blocksToProcess = Math.min(5, latestBlockHeight - currentBlock);
          console.log(`Processing ${blocksToProcess} Bitcoin blocks...`);
          
          for (let i = 0; i < blocksToProcess; i++) {
            const nextBlockHeight: number = currentBlock + i + 1;
            if (nextBlockHeight <= latestBlockHeight) {
              await fetchBitcoinBlockTransactions(nextBlockHeight);
              lastProcessedBitcoinBlock = nextBlockHeight;
              console.log(`Updated last processed Bitcoin block to ${lastProcessedBitcoinBlock}`);
            }
          }

          if (blocksToProcess === 0) {
            console.log('No new Bitcoin blocks to process');
          }
        } catch (error) {
          console.error('Error fetching Bitcoin transactions:', error);
        }
      })(),

      // Ethereum transactions
      (async () => {
        try {
          console.log('Fetching recent Ethereum transactions...');

          const ethereumResponse = await axiosWithRetry(
            'https://api.blockchair.com/ethereum/transactions',
            {
              ...API_CONFIG,
              params: {
                limit: TRANSACTION_BATCH_SIZE,
                s: 'time(desc)'  // Sort by time in descending order
              }
            },
            3,    // Retry 3 times
            10000 // Retry every 10 seconds
          );

          // If API limit is reached
          if (ethereumResponse.status === 402) {
            console.log('API limit reached for Ethereum transactions, will retry later');
            return;
          }

          if (ethereumResponse.data.data && Array.isArray(ethereumResponse.data.data)) {
            for (const tx of ethereumResponse.data.data) {
              try {
                // Check for duplicate before processing
                const existingTx = await prisma.ethereumTransaction.findUnique({
                  where: { hash: tx.hash }
                });

                if (existingTx) {
                  console.log(`Skipping duplicate Ethereum transaction: ${tx.hash}`);
                  continue;
                }

                if (!tx || !tx.hash || tx.type === 'synthetic_coinbase') {
                  console.log('Skipping invalid Ethereum transaction:', tx);
                  continue;
                }

                const timestamp = toAustralianTime(tx.time);

                const txData = {
                  hash: tx.hash,
                  blockNumber: BigInt(tx.block_id),
                  timestamp: timestamp,
                  value: tx.value?.toString() || '0',
                  gasFee: tx.gas_used && tx.gas_price 
                    ? new Decimal(tx.gas_used).mul(tx.gas_price).toString()
                    : '0',
                  gasPrice: tx.gas_price?.toString() || '0',
                  gasUsed: tx.gas_used?.toString() || '0',
                  fromAddress: tx.sender || 'Unknown',
                  toAddress: tx.recipient || 'Unknown'
                };

                const savedTx = await prisma.ethereumTransaction.create({
                  data: txData
                });

                const broadcastData = {
                  type: 'transaction_update',
                  network: 'ethereum',
                  transaction: {
                    ...txData,
                    id: savedTx.id,
                    blockNumber: txData.blockNumber.toString(),
                    displayId: savedTx.id,
                    timestamp: formatAustralianTime(timestamp)
                  }
                };

                broadcastUpdate(broadcastData);
                await delay(API_DELAY);
              } catch (err) {
                console.error(`Error processing Ethereum transaction: ${tx.hash}`, err);
              }
            }
          }
        } catch (error) {
          console.error('Error fetching Ethereum transactions:', error);
        }
      })()
    ]);

  } catch (error) {
    console.error('Error in fetchAndStoreTransactions:', error);
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

// Start periodic transaction fetching
setInterval(async () => {
  console.log('Fetching new transactions...');
  await fetchAndStoreTransactions();
}, FETCH_INTERVAL);

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
app.get('/events/stats', (req: Request, res: Response) => {
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
app.get('/events/transactions', (req: Request, res: Response) => {
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

interface BlockchairEthereumTransaction {
  hash: string;
  block_id: number;
  time: string;
  type?: string;
  value: string;
  gas_used: string;
  gas_price: string;
  sender: string;
  recipient: string;
}

interface BaseTransaction {
  id: number;
  hash: string;
  blockNumber: string;
  timestamp: Date | string;
  value: Decimal;
  fromAddress: string;
  toAddress: string;
  createdAt: Date;
  serverTimestamp?: string;
  isNew?: boolean;
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

// Update transactions endpoint to fetch latest transactions by ID
app.get('/api/transactions/latest', async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const network = (req.query.network as string) || 'all';

    let transactions: Transaction[] = [];

    // Fetch transactions based on network
    if (network === 'all') {
      // For 'all' network, fetch Bitcoin first then Ethereum
      const bitcoinTx = await prisma.bitcoinTransaction.findMany({
        orderBy: { timestamp: 'desc' },
        take: MAX_STORED_TRANSACTIONS
      });
      
      const ethereumTx = await prisma.ethereumTransaction.findMany({
        orderBy: { timestamp: 'desc' },
        take: MAX_STORED_TRANSACTIONS
      });

      // Add Bitcoin transactions first
      transactions.push(...bitcoinTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        timestamp: tx.timestamp,
        displayTimestamp: formatAustralianTime(tx.timestamp),
        network: 'bitcoin' as const,
        serverTimestamp: tx.createdAt.toISOString()
      })));

      // Then add Ethereum transactions
      transactions.push(...ethereumTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        timestamp: tx.timestamp,
        displayTimestamp: formatAustralianTime(tx.timestamp),
        gasUsed: tx.gasUsed.toString(),
        network: 'ethereum' as const,
        serverTimestamp: tx.createdAt.toISOString()
      })));

      // Sort combined transactions by server timestamp in descending order
      transactions.sort((a, b) => {
        const timeA = a.serverTimestamp || a.createdAt.toISOString();
        const timeB = b.serverTimestamp || b.createdAt.toISOString();
        return new Date(timeB).getTime() - new Date(timeA).getTime();
      });
    } else if (network === 'bitcoin') {
      const bitcoinTx = await prisma.bitcoinTransaction.findMany({
        orderBy: { timestamp: 'desc' },
        take: MAX_STORED_TRANSACTIONS
      });
      
      transactions.push(...bitcoinTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        timestamp: tx.timestamp,
        displayTimestamp: formatAustralianTime(tx.timestamp),
        network: 'bitcoin' as const,
        serverTimestamp: tx.createdAt.toISOString()
      })));
    } else if (network === 'ethereum') {
      const ethereumTx = await prisma.ethereumTransaction.findMany({
        orderBy: { timestamp: 'desc' },
        take: MAX_STORED_TRANSACTIONS
      });

      transactions.push(...ethereumTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        timestamp: tx.timestamp,
        displayTimestamp: formatAustralianTime(tx.timestamp),
        gasUsed: tx.gasUsed.toString(),
        network: 'ethereum' as const,
        serverTimestamp: tx.createdAt.toISOString()
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

    // 재시도 로직과 긴 타임아웃을 적용한 API 호출
    const apiResponse = await axiosWithRetry(
      `https://api.blockchair.com/${network}/dashboards/address/${address}`,
      {
        params: network === 'ethereum' ? { erc_20: 'true', limit: 10 } : { limit: 10 },
        headers: {
          'Accept': 'application/json'
        },
        validateStatus: isSuccessStatus,
        timeout: 30000 // 30초로 증가
      },
      3,    // 3번 재시도
      5000  // 5초 간격으로 재시도
    );

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

    // Cache the response
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
        data: formattedData
      }
    });

    res.setHeader('Content-Type', 'application/json');
    res.json(formattedData);

  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.error(`Error fetching ${network} wallet data:`, error);
    
    // 더 자세한 에러 메시지 제공
    if (axiosError.code === 'ECONNABORTED') {
      res.status(503).json({ 
        error: 'The request timed out. Please try again later.',
        details: 'The blockchain API is taking longer than usual to respond.'
      });
    } else {
      res.status(500).json({ 
        error: 'Failed to fetch wallet data. Please try again later.',
        details: axiosError.message
      });
    }
  }
};

app.get('/api/wallet/:network/:address', getWalletData);

// Add transaction detail endpoint
app.get('/api/transaction/:hash', async (req: Request, res: Response) => {
  try {
    const { hash } = req.params;

    // Try to find transaction in both Bitcoin and Ethereum tables
    const [bitcoinTx, ethereumTx] = await Promise.all([
      prisma.bitcoinTransaction.findUnique({
        where: { hash }
      }),
      prisma.ethereumTransaction.findUnique({
        where: { hash }
      })
    ]);

    if (!bitcoinTx && !ethereumTx) {
      res.status(404).json({ error: 'Transaction not found' });
      return;
    }

    const network = bitcoinTx ? 'bitcoin' : 'ethereum';
    
    // Get additional transaction details from Blockchair
    const txResponse = await axiosWithRetry(
      `https://api.blockchair.com/${network}/dashboards/transaction/${hash}`,
      API_CONFIG
    );

    if (!txResponse.data?.data?.[hash]) {
      res.status(404).json({ error: 'Transaction details not found' });
      return;
    }

    const txData = txResponse.data.data[hash];
    
    // Format response based on network
    if (bitcoinTx) {
      const response = {
        ...bitcoinTx,
        network,
        blockNumber: bitcoinTx.blockNumber.toString(),
        timestamp: formatAustralianTime(bitcoinTx.timestamp),
        status: 'confirmed',
        value: bitcoinTx.value.toString(),
        fee: bitcoinTx.fee.toString(),
        inputs: txData.inputs,
        outputs: txData.outputs,
        confirmations: txData.transaction?.confirmations || 0,
        rawData: txData
      };
      res.json(response);
    } else if (ethereumTx) {
      const response = {
        ...ethereumTx,
        network,
        blockNumber: ethereumTx.blockNumber.toString(),
        timestamp: formatAustralianTime(ethereumTx.timestamp),
        status: 'confirmed',
        value: ethereumTx.value.toString(),
        gasFee: ethereumTx.gasFee.toString(),
        gasPrice: ethereumTx.gasPrice.toString(),
        gasUsed: ethereumTx.gasUsed.toString(),
        confirmations: txData.transaction?.confirmations || 0,
        input: txData.transaction?.input || '0x',
        rawData: txData
      };
      res.json(response);
    }
  } catch (error) {
    console.error('Error fetching transaction details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Utility function to convert BigInt values to strings
function serializeBigInt(obj: any): any {
  if (obj === null || obj === undefined) {
    return obj;
  }
  
  if (typeof obj === 'bigint') {
    return obj.toString();
  }
  
  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt);
  }
  
  if (typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeBigInt(value)])
    );
  }
  
  return obj;
}

// Get transactions by block number
app.get('/api/block/:blockNumber', async (req: Request, res: Response) => {
  try {
    console.log('Received request for block:', req.params.blockNumber);
    const blockNumber = BigInt(req.params.blockNumber);
    console.log('Converted block number to BigInt:', blockNumber.toString());
    
    // Fetch both Bitcoin and Ethereum transactions for the block number
    const [bitcoinTxs, ethereumTxs] = await Promise.all([
      prisma.bitcoinTransaction.findMany({
        where: {
          blockNumber
        }
      }),
      prisma.ethereumTransaction.findMany({
        where: {
          blockNumber
        }
      })
    ]);

    // Transform and combine the transactions
    const transactions = [
      ...bitcoinTxs.map(tx => ({
        ...serializeBigInt(tx),
        network: 'bitcoin' as const
      })),
      ...ethereumTxs.map(tx => ({
        ...serializeBigInt(tx),
        network: 'ethereum' as const
      }))
    ];

    // Sort transactions by timestamp
    transactions.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    console.log('Total transactions found:', transactions.length);
    res.json({ transactions });
  } catch (error) {
    console.error('Detailed error in /api/block/:blockNumber:', error);
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    res.status(500).json({ 
      error: 'Failed to fetch block transactions',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Get latest block numbers
app.get('/api/latest-blocks', async (req: Request, res: Response) => {
  try {
    const [latestBitcoinBlock, latestEthereumBlock] = await Promise.all([
      prisma.bitcoinTransaction.findFirst({
        orderBy: {
          blockNumber: 'desc'
        },
        select: {
          blockNumber: true
        }
      }),
      prisma.ethereumTransaction.findFirst({
        orderBy: {
          blockNumber: 'desc'
        },
        select: {
          blockNumber: true
        }
      })
    ]);

    res.json({
      bitcoin: latestBitcoinBlock?.blockNumber.toString(),
      ethereum: latestEthereumBlock?.blockNumber.toString()
    });
  } catch (error) {
    console.error('Error fetching latest blocks:', error);
    res.status(500).json({ error: 'Failed to fetch latest blocks' });
  }
});

// Initialize stats fetching
fetchAndStoreBlockchairStats();
setInterval(fetchAndStoreBlockchairStats, 60 * 1000);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 