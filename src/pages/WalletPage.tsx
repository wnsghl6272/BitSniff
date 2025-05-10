import { useEffect, useState } from "react";
import { useParams, useLoaderData, LoaderFunctionArgs } from "react-router-dom";
import axios from "axios";
import { formatEther } from "viem";
import { formatDistance } from "date-fns";

interface WalletData {
  address: string;
  network: 'bitcoin' | 'ethereum';
  balance: bigint;
  totalReceived: bigint;
  totalSent: bigint;
  transactionCount: number;
  firstSeen: string;
  lastSeen: string;
  tokens?: {
    symbol: string;
    name: string;
    balance: string;
    contractAddress: string;
  }[];
  transactions?: {
    hash: string;
    timestamp: string;
    value: string;
    from: string;
    to: string;
    type: 'in' | 'out';
  }[];
  rawData?: any;
}

// Loader function to fetch wallet data
export async function loader({ params }: LoaderFunctionArgs) {
  const { address } = params;
  if (!address) throw new Error('Address is required');

  try {
    // First try to get from local storage
    const cached = localStorage.getItem(`wallet_${address}`);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      // Use cache if it's less than 5 minutes old
      if (Date.now() - timestamp < 5 * 60 * 1000) {
        return { data };
      }
    }

    // Try Ethereum address first
    try {
      const ethResponse = await axios.get(`https://api.blockchair.com/ethereum/dashboards/address/${address}`, {
        params: {
          erc_20: 'true',
          limit: 10
        }
      });
      
      const data = ethResponse.data.data[address];
      if (!data) {
        throw new Error('Address not found');
      }
      
      const walletData = {
        address,
        network: 'ethereum',
        balance: data.address.balance,
        totalReceived: data.address.received,
        totalSent: data.address.spent,
        transactionCount: data.address.transaction_count,
        firstSeen: new Date(data.address.first_seen_receiving * 1000).toISOString(),
        lastSeen: new Date(data.address.last_seen_receiving * 1000).toISOString(),
        tokens: data.layer_2?.erc_20?.map((token: any) => ({
          symbol: token.symbol,
          name: token.name,
          balance: token.balance,
          contractAddress: token.address
        })),
        transactions: data.calls?.map((tx: any) => ({
          hash: tx.transaction_hash,
          timestamp: new Date(tx.time * 1000).toISOString(),
          value: tx.value,
          from: tx.sender,
          to: tx.recipient,
          type: tx.sender.toLowerCase() === address.toLowerCase() ? 'out' : 'in'
        })),
        rawData: data
      };

      // Store in local storage with timestamp
      localStorage.setItem(`wallet_${address}`, JSON.stringify({
        data: walletData,
        timestamp: Date.now()
      }));

      return { data: walletData };
    } catch (err) {
      // If not found or error, try Bitcoin address
      const btcResponse = await axios.get(`https://api.blockchair.com/bitcoin/dashboards/address/${address}`, {
        params: {
          limit: 10
        }
      });
      
      const data = btcResponse.data.data[address];
      if (!data) {
        throw new Error('Address not found');
      }
      
      const walletData = {
        address,
        network: 'bitcoin',
        balance: data.address.balance,
        totalReceived: data.address.received,
        totalSent: data.address.spent,
        transactionCount: data.address.transaction_count,
        firstSeen: new Date(data.address.first_seen_receiving * 1000).toISOString(),
        lastSeen: new Date(data.address.last_seen_receiving * 1000).toISOString(),
        transactions: data.transactions?.map((tx: any) => ({
          hash: tx.hash,
          timestamp: new Date(tx.time * 1000).toISOString(),
          value: tx.value,
          from: tx.sender || address,
          to: tx.recipient || 'Unknown',
          type: (tx.sender || address) === address ? 'out' : 'in'
        })),
        rawData: data
      };

      // Store in local storage with timestamp
      localStorage.setItem(`wallet_${address}`, JSON.stringify({
        data: walletData,
        timestamp: Date.now()
      }));

      return { data: walletData };
    }
  } catch (err) {
    console.error('Error fetching wallet data:', err);
    throw new Error('Failed to fetch wallet data. Please check the address and try again.');
  }
}

export function WalletPage() {
  const { data } = useLoaderData() as { data: WalletData };
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-destructive/10 text-destructive p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Wallet Details</h1>
            <p className="text-sm text-muted-foreground font-mono">{data.address}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Network</p>
            <p className="font-medium capitalize">{data.network}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Balance</h3>
          <p className="text-2xl font-bold">
            {data.network === 'ethereum'
              ? `${formatEther(BigInt(data.balance))} ETH`
              : `${Number(data.balance) / 1e8} BTC`}
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Received</h3>
          <p className="text-2xl font-bold">
            {data.network === 'ethereum'
              ? `${formatEther(BigInt(data.totalReceived))} ETH`
              : `${Number(data.totalReceived) / 1e8} BTC`}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Total Sent</h3>
          <p className="text-2xl font-bold">
            {data.network === 'ethereum'
              ? `${formatEther(BigInt(data.totalSent))} ETH`
              : `${Number(data.totalSent) / 1e8} BTC`}
          </p>
        </div>

        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-sm font-medium text-muted-foreground">Transactions</h3>
          <p className="text-2xl font-bold">{data.transactionCount}</p>
        </div>
      </div>

      {data.tokens && data.tokens.length > 0 && (
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">Token Holdings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.tokens.map((token) => (
              <div key={token.contractAddress} className="p-4 bg-muted rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{token.symbol}</h3>
                    <p className="text-sm text-muted-foreground">{token.name}</p>
                  </div>
                  <p className="font-mono">{token.balance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {data.transactions?.slice(0, 10).map((tx) => (
            <div key={tx.hash} className="p-4 bg-muted rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-mono text-sm">{tx.hash}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDistance(new Date(tx.timestamp), new Date(), { addSuffix: true })}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${tx.type === 'in' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'in' ? '+' : '-'}
                    {data.network === 'ethereum'
                      ? `${formatEther(BigInt(tx.value))} ETH`
                      : `${Number(tx.value) / 1e8} BTC`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-bold mb-4">Activity</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">First Seen</h3>
            <p className="font-medium">
              {new Date(data.firstSeen).toLocaleDateString()} 
              {new Date(data.firstSeen).toLocaleTimeString()}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Seen</h3>
            <p className="font-medium">
              {new Date(data.lastSeen).toLocaleDateString()} 
              {new Date(data.lastSeen).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 