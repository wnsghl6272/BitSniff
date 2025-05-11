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
  return new Date(formatInTimeZone(new Date(date), TIMEZONE, 'yyyy-MM-dd HH:mm:ss'));
}

// Helper function to format time to Australian timezone string
function formatAustralianTime(date: Date): string {
  return formatInTimeZone(
    date,
    TIMEZONE,
    "d MMM yyyy, h:mm a"  // Format: "11 May 2024, 4:55 PM"
  );
}

// Helper function for delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Axios 에러 타입 정의
interface AxiosError {
  code?: string;
  response?: {
    status: number;
    data: any;
  };
  message: string;
}

// 재시도 로직을 위한 유틸리티 함수 수정
const axiosWithRetry = async (url: string, config: any, retries = 3, delay = 2000) => {
  try {
    return await axios.get(url, {
      ...config,
      timeout: 30000, // 30초로 타임아웃 증가
    });
  } catch (error: unknown) {
    if (retries === 0) throw error;
    
    const axiosError = error as AxiosError;
    if (axiosError.code === 'ECONNABORTED' || axiosError.response?.status === 402) {
      console.log(`Request failed, retrying... (${retries} attempts left)`);
      console.log(`Error: ${axiosError.message}`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return axiosWithRetry(url, config, retries - 1, delay);
    }
    
    throw error;
  }
};

// validateStatus 타입 정의
const isSuccessStatus = (status: number): boolean => status === 200;

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

// Constants for transaction fetching
const FETCH_INTERVAL = 60 * 1000; // 1 minute
const TRANSACTION_BATCH_SIZE = 10; // 한 번에 처리할 트랜잭션 수
const MAX_STORED_TRANSACTIONS = 20; // 각 네트워크당 최대 표시할 트랜잭션 수

// Add tracking for last processed block
let lastProcessedBitcoinBlock: number | null = null;

// API 호출 설정
const API_CONFIG = {
  headers: {
    'Accept': 'application/json'
  },
  validateStatus: isSuccessStatus,
  timeout: 30000
};

// Function to fetch and process Bitcoin block transactions
async function fetchBitcoinBlockTransactions(blockHeight: number) {
  try {
    console.log(`Fetching Bitcoin block ${blockHeight} details...`);
    
    // Get block details
    const blockResponse = await axiosWithRetry(
      `https://api.blockchair.com/bitcoin/dashboards/block/${blockHeight}`,
      API_CONFIG
    );

    if (!blockResponse.data?.data?.[blockHeight]) {
      console.log(`No data found for block ${blockHeight}`);
      return;
    }

    const blockData = blockResponse.data.data[blockHeight];
    const transactions = blockData.transactions;

    console.log(`Found ${transactions.length} transactions in block ${blockHeight}`);

    // Process each transaction in the block
    for (const txHash of transactions.slice(0, TRANSACTION_BATCH_SIZE)) {
      try {
        // Check if transaction already exists
        const existingTx = await prisma.bitcoinTransaction.findUnique({
          where: { hash: txHash }
        });

        if (existingTx) {
          console.log(`Transaction ${txHash} already exists, skipping...`);
          continue;
        }

        // Fetch detailed transaction information
        const txResponse = await axiosWithRetry(
          `https://api.blockchair.com/bitcoin/dashboards/transaction/${txHash}`,
          API_CONFIG
        );

        const txData = txResponse.data.data[txHash];
        if (!txData) {
          console.log(`No data found for transaction ${txHash}`);
          continue;
        }

        const timestamp = toAustralianTime(blockData.time);
        
        const transaction = {
          hash: txHash,
          blockNumber: BigInt(blockHeight),
          timestamp: timestamp,
          value: txData.transaction.output_total.toString(),
          fee: txData.transaction.fee.toString(),
          fromAddress: txData.inputs?.[0]?.recipient || txData.inputs?.[0]?.address || 'Unknown',
          toAddress: txData.outputs?.[0]?.recipient || txData.outputs?.[0]?.address || 'Unknown'
        };

        const savedTx = await prisma.bitcoinTransaction.create({
          data: transaction
        });

        console.log(`Saved new Bitcoin transaction: ${txHash} from block ${blockHeight}`);

        // Broadcast the new transaction
        const broadcastData = {
          type: 'transaction_update',
          network: 'bitcoin',
          transaction: {
            ...transaction,
            id: savedTx.id,
            blockNumber: transaction.blockNumber.toString(),
            displayId: savedTx.id,
            timestamp: formatAustralianTime(transaction.timestamp)
          }
        };

        broadcastUpdate(broadcastData);
        await delay(1000); // Reduced delay since we're processing fewer transactions
      } catch (err) {
        console.error(`Error processing transaction ${txHash} from block ${blockHeight}:`, err);
      }
    }
  } catch (err) {
    console.error(`Error processing block ${blockHeight}:`, err);
  }
}

// Function to fetch and store transactions
async function fetchAndStoreTransactions() {
  try {
    console.log('Starting transaction fetch at:', new Date().toISOString());

    // 비트코인과 이더리움 트랜잭션을 병렬로 처리
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

          // Process new blocks
          const nextBlockHeight = lastProcessedBitcoinBlock + 1;
          if (nextBlockHeight <= latestBlockHeight) {
            await fetchBitcoinBlockTransactions(nextBlockHeight);
            lastProcessedBitcoinBlock = nextBlockHeight;
            console.log(`Updated last processed Bitcoin block to ${lastProcessedBitcoinBlock}`);
          } else {
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
                s: 'time(desc)'  // 시간 기준 내림차순
              }
            }
          );

          console.log('Ethereum API Response:', {
            status: ethereumResponse.status,
            dataLength: ethereumResponse.data.data?.length || 0,
            firstTx: ethereumResponse.data.data?.[0]?.hash
          });

          if (ethereumResponse.data.data && Array.isArray(ethereumResponse.data.data)) {
            for (const tx of ethereumResponse.data.data) {
              try {
                const txTime = toAustralianTime(tx.time);

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

                console.log(`Processing new Ethereum transaction: ${tx.hash}, time: ${formatAustralianTime(txTime)}`);

                const txData = {
                  hash: tx.hash,
                  blockNumber: BigInt(tx.block_id),
                  timestamp: txTime,
                  value: tx.value.toString(),
                  gasFee: new Decimal(tx.gas_used).mul(tx.gas_price).toString(),
                  gasPrice: tx.gas_price.toString(),
                  gasUsed: tx.gas_used.toString(),
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
                    timestamp: formatAustralianTime(txData.timestamp)
                  }
                };

                console.log('Broadcasting Ethereum transaction update:', broadcastData);
                broadcastUpdate(broadcastData);

                await delay(2000);
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
  
  // 트랜잭션 업데이트인 경우 최신 ID 포함
  if (data.type === 'transaction_update') {
    data.transaction.displayId = data.transaction.id;
  }

  clientSet.forEach(client => {
    try {
      client.write(`data: ${JSON.stringify(data)}\n\n`);
    } catch (error) {
      console.error('Error sending SSE update:', error);
      clientSet.delete(client);
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
        network: 'bitcoin' as const
      })));

      // Then add Ethereum transactions
      transactions.push(...ethereumTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        gasUsed: tx.gasUsed.toString(),
        network: 'ethereum' as const
      })));

      // Sort combined transactions by ID in descending order
      transactions.sort((a, b) => b.id - a.id);
    } else if (network === 'bitcoin') {
      const bitcoinTx = await prisma.bitcoinTransaction.findMany({
        orderBy: { id: 'desc' },
        take: MAX_STORED_TRANSACTIONS
      });
      
      transactions.push(...bitcoinTx.map((tx) => ({
        ...tx,
        blockNumber: tx.blockNumber.toString(),
        network: 'bitcoin' as const
      })));
    } else if (network === 'ethereum') {
      const ethereumTx = await prisma.ethereumTransaction.findMany({
        orderBy: { id: 'desc' },
        take: MAX_STORED_TRANSACTIONS
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

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { broadcastUpdate }; 