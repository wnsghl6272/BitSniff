import { useParams, Link } from "react-router-dom"
import { ArrowRight, Clock, Database, HardDrive, Loader2, Bitcoin, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import { formatInTimeZone } from 'date-fns-tz'
import { TransactionDetailProps } from '../types/props'
import { TransactionDetails } from '../types/business'
import { Decimal } from '@prisma/client/runtime/library'

const TIMEZONE = 'Australia/Sydney';
const API_BASE_URL = 'http://localhost:5001';

export default function TransactionDetail({ hash: propHash }: TransactionDetailProps) {
  const { hash: paramHash } = useParams();
  const hash = propHash || paramHash;
  const [transaction, setTransaction] = useState<TransactionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/transaction/${hash}`);
        if (!response.ok) {
          throw new Error('Transaction not found');
        }
        const data = await response.json();
        setTransaction(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch transaction');
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [hash]);

  const formatValue = (value: string | Decimal | undefined, network: 'bitcoin' | 'ethereum') => {
    if (!value) return `0 ${network === 'ethereum' ? 'ETH' : 'BTC'}`;
    const numValue = typeof value === 'string' ? parseFloat(value) : parseFloat(value.toString());
    const divisor = network === 'ethereum' ? 1e18 : 1e8;
    return `${(numValue / divisor).toFixed(8)} ${network === 'ethereum' ? 'ETH' : 'BTC'}`;
  };

  const formatTime = (timestamp: string) => {
    return formatInTimeZone(
      new Date(timestamp),
      TIMEZONE,
      "d MMM yyyy, h:mm a"  // Format: "11 May 2024, 4:55 PM"
    );
  };

  if (loading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !transaction) {
    return (
      <div className="container py-10">
        <div className="rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p>{error || 'Transaction not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
      <div className="grid gap-6">
        {/* Transaction Overview Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                {transaction.network === 'bitcoin' ? (
                  <Bitcoin className="h-5 w-5" />
                ) : (
                  <Wallet className="h-5 w-5" />
                )}
                <span className="capitalize">{transaction.network}</span> Transaction
              </h2>
              <span className="font-mono text-sm">{transaction.hash}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="ml-2">{formatTime(transaction.timestamp)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Database className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Block:</span>
                  <span className="ml-2">#{transaction.blockNumber}</span>
                </div>
                <div className="flex items-center text-sm">
                  <HardDrive className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Network:</span>
                  <span className="ml-2 capitalize">{transaction.network}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                    {transaction.status} ({transaction.confirmations} confirmations)
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Value:</span>
                  <span className="ml-2">{formatValue(transaction.value, transaction.network)}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="ml-2">
                    {transaction.network === 'bitcoin'
                      ? formatValue(transaction.fee!, 'bitcoin')
                      : formatValue(transaction.gasFee!, 'ethereum')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction Flow Card */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Transaction Flow</h2>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex-1 space-y-1">
              <p className="font-medium">From</p>
              <Link 
                to={`/wallet/${transaction.fromAddress}`}
                className="font-mono text-sm truncate text-primary hover:underline"
              >
                {transaction.fromAddress}
              </Link>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 space-y-1">
              <p className="font-medium">To</p>
              <Link
                to={`/wallet/${transaction.toAddress}`}
                className="font-mono text-sm truncate text-primary hover:underline"
              >
                {transaction.toAddress}
              </Link>
            </div>
          </div>
        </div>

        {/* Network Specific Details */}
        {transaction.network === 'ethereum' && (
          <div className="rounded-lg border bg-card p-6">
            <h2 className="text-lg font-semibold mb-4">Ethereum Details</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Gas Price:</span>
                <span className="ml-2">{formatValue(transaction.gasPrice!, 'ethereum')} ETH</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Gas Used:</span>
                <span className="ml-2">{transaction.gasUsed}</span>
              </div>
            </div>
            {transaction.input && transaction.input !== '0x' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Input Data</h3>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                  {transaction.input}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* Raw Data Card */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Raw Transaction Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(transaction.rawData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
} 