import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Bitcoin, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface Transaction {
  hash: string;
  network: 'bitcoin' | 'ethereum';
  blockNumber: number;
  timestamp: string;
  value: string;
  fromAddress: string;
  toAddress: string;
  fee?: string;
  gasFee?: string;
}

export default function BlockNumber() {
  const { blockNumber } = useParams<{ blockNumber: string }>();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlockTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`http://localhost:5001/api/block/${blockNumber}`);
        setTransactions(response.data.transactions);
      } catch (err) {
        console.error('Error fetching block transactions:', err);
        if (axios.isAxiosError(err)) {
          // 서버에서 보낸 상세 에러 메시지가 있으면 그것을 사용
          const errorMessage = err.response?.data?.details || err.response?.data?.error || err.message;
          setError(`Failed to fetch transactions: ${errorMessage}`);
        } else {
          setError('An unexpected error occurred while fetching transactions');
        }
      } finally {
        setLoading(false);
      }
    };

    if (blockNumber) {
      fetchBlockTransactions();
    }
  }, [blockNumber]);

  const formatValue = (value: string, network: 'bitcoin' | 'ethereum') => {
    const numValue = parseFloat(value);
    return `${(numValue / (network === 'bitcoin' ? 1e8 : 1e18)).toFixed(8)} ${network === 'bitcoin' ? 'BTC' : 'ETH'}`;
  };

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-2">Loading block transactions...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-8">
        <div className="rounded-lg border bg-destructive/10 p-4">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error</h2>
          <p className="text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Block #{blockNumber} Transactions</h1>
      
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Network</TableHead>
              <TableHead>Transaction Hash</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Fee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No transactions found for this block
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((tx) => (
                <TableRow key={tx.hash}>
                  <TableCell>
                    {tx.network === 'bitcoin' ? (
                      <Bitcoin className="h-4 w-4" />
                    ) : (
                      <Wallet className="h-4 w-4" />
                    )}
                  </TableCell>
                  <TableCell className="font-mono">
                    <Link to={`/tx/${tx.hash}`} className="text-primary hover:underline">
                      {shortenAddress(tx.hash)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {new Date(tx.timestamp).toLocaleString('en-AU', {
                      timeZone: 'Australia/Sydney'
                    })}
                  </TableCell>
                  <TableCell>{formatValue(tx.value, tx.network)}</TableCell>
                  <TableCell className="font-mono">
                    <Link to={`/wallet/${tx.fromAddress}`} className="hover:underline">
                      {shortenAddress(tx.fromAddress)}
                    </Link>
                  </TableCell>
                  <TableCell className="font-mono">
                    <Link to={`/wallet/${tx.toAddress}`} className="hover:underline">
                      {shortenAddress(tx.toAddress)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {tx.network === 'bitcoin'
                      ? tx.fee && formatValue(tx.fee, 'bitcoin')
                      : tx.gasFee && formatValue(tx.gasFee, 'ethereum')}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
} 