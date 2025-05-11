import { Decimal } from '@prisma/client/runtime/library';

// Base Transaction Interface
export interface BaseTransaction {
  id: number;
  hash: string;
  blockNumber: string;
  timestamp: Date | string;
  value: Decimal | string;
  fromAddress: string;
  toAddress: string;
  createdAt?: Date;
  serverTimestamp?: string;
  isNew?: boolean;
}

// Bitcoin Transaction Interface
export interface BitcoinTransaction extends BaseTransaction {
  fee: Decimal | string;
  network: 'bitcoin';
}

// Ethereum Transaction Interface
export interface EthereumTransaction extends BaseTransaction {
  gasFee: Decimal | string;
  gasPrice: Decimal | string;
  gasUsed: string;
  network: 'ethereum';
}

// Union type for transactions
export type Transaction = BitcoinTransaction | EthereumTransaction;

// Transaction Response Interface
export interface TransactionResponse {
  transactions: Transaction[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Blockchair API Interfaces
export interface BlockchairInput {
  recipient: string;
  address: string;
}

export interface BlockchairOutput {
  recipient: string;
  address: string;
}

export interface BlockchairTransaction {
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

export interface BlockchairEthereumTransaction {
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

// Blockchair Stats Interfaces
export interface BlockchairStats {
  bitcoin: {
    data: {
      blocks: number;
      transactions: number;
      transactions_24h: number;
      mempool_transactions: number;
      difficulty: number;
      hashrate_24h: string;
      average_transaction_fee_24h: number | string;
      median_transaction_fee_24h: number;
      market_price_usd: number;
      market_cap_usd: number;
      volume_24h: number;
      outputs: number;
      average_block_size_24h: number;
      median_time: number;
      suggested_transaction_fee_per_byte_sat: number;
      next_block_fee_per_byte_sat: number;
    };
    changes?: Record<string, boolean>;
  };
  ethereum: {
    data: {
      blocks: number;
      transactions: number;
      transactions_24h: number;
      mempool_transactions: number;
      difficulty: number;
      countdowns: Array<{
        event: string;
        eth_needed: number;
        eth_staked: number;
      }>;
      average_transaction_fee_24h: string | number;
      median_transaction_fee_24h: number;
      market_price_usd: number;
      market_cap_usd: number;
      volume_24h: number;
      calls: number;
      average_gas_price_24h: number;
      base_fee_per_gas: number;
      hashrate_24h: string;
    };
    changes?: Record<string, boolean>;
  };
}

// Transaction Detail Interface
export interface TransactionDetails {
  id: number;
  hash: string;
  blockNumber: string;
  timestamp: string;
  value: string | Decimal;
  network: 'bitcoin' | 'ethereum';
  status: string;
  fromAddress: string;
  toAddress: string;
  fee?: string | Decimal;
  gasFee?: string | Decimal;
  gasPrice?: string | Decimal;
  gasUsed?: string;
  inputs?: any[];
  outputs?: any[];
  input?: string;
  confirmations: number;
  rawData: any;
}

// Wallet Data Interface
export interface WalletData {
  address: {
    balance: string;
    balance_usd?: number;
    received: string;
    received_usd?: number;
    spent: string;
    spent_usd?: number;
    first_seen_receiving?: string;
    last_seen_receiving?: string;
    first_seen_spending?: string;
    last_seen_spending?: string;
  };
  calls_stats?: {
    total_calls?: number;
    total_transactions?: number;
  };
  layer_2?: {
    erc_20?: {
      [key: string]: {
        balance: string;
        token_name: string;
        token_symbol: string;
        token_decimals: number;
      };
    };
  };
}

// Table Transaction Interface
export interface TableTransaction {
  hash: string;
  blockNumber: string;
  timestamp: string;
  value: string;
  fromAddress: string;
  toAddress: string;
  network: 'bitcoin' | 'ethereum';
  fee?: string;
  gasFee?: string;
  displayId: string;
}

// Modal Transaction Interface
export interface ModalTransaction {
  hash: string;
  network: 'bitcoin' | 'ethereum';
  timestamp: string;
  from: string;
  to: string;
  value: bigint;
  fee: bigint;
  status: 'confirmed' | 'pending';
  blockNumber?: number;
  gasPrice?: bigint;
  gasLimit?: bigint;
  nonce?: number;
  input?: string;
  rawData?: any; // Full JSON data from the API
} 