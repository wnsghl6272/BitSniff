// API Error Interface
export interface AxiosError {
  code?: string;
  response?: {
    status: number;
    data: any;
  };
  message: string;
}

// Blockchair API Response Interface
export interface BlockchairStatsData {
  [key: string]: any;
}

export interface BlockchairApiResponse {
  data: BlockchairStatsData;
}

// Wallet API Interface
export interface WalletParams {
  network: string;
  address: string;
} 