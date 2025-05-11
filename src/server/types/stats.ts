export interface AxiosError {
  code?: string;
  response?: {
    status: number;
    data: any;
  };
  message: string;
}

export interface BlockchairStatsData {
  [key: string]: any;
}

export interface BlockchairApiResponse {
  data: BlockchairStatsData;
}

export interface StatsChanges {
  [key: string]: boolean;
}

export interface StatsUpdate {
  type: 'stats_update';
  bitcoin: {
    data: BlockchairStatsData;
    changes: StatsChanges;
  };
  ethereum: {
    data: BlockchairStatsData;
    changes: StatsChanges;
  };
  timestamp: string;
} 