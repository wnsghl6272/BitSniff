import { Button } from "../components/ui/button.js"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table.js"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input.js"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs.js"
import { Bitcoin, Wallet } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"

interface BlockchairStats {
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
  };
}

interface Transaction {
  id: number;
  hash: string;
  blockNumber: string;
  timestamp: Date;
  value: string;
  fee: string;
  fromAddress: string;
  toAddress: string;
  network: 'bitcoin' | 'ethereum';
}

interface EthereumTransaction extends Omit<Transaction, 'fee'> {
  gasFee: string;
  gasPrice: string;
  gasUsed: string;
}

interface TransactionResponse {
  transactions: (Transaction | EthereumTransaction)[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// Add helper function for safe number formatting
const formatNumber = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null) return '0';
  return typeof value === 'string' ? parseFloat(value).toLocaleString() : value.toLocaleString();
};

export default function Home() {
  const [stats, setStats] = useState<BlockchairStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<TransactionResponse | null>(null);
  const [txLoading, setTxLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [network, setNetwork] = useState<'all' | 'bitcoin' | 'ethereum'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setSearchQuery(query);
      handleSearch(query);
    }
  }, [searchParams]);

  const handleSearch = (query: string) => {
    // Update URL with search query
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    handleSearch(searchQuery);
  };

  // Function to fetch transactions with filters
  const fetchTransactions = async (
    page: number,
    sortField: string = sortBy,
    order: 'asc' | 'desc' = sortOrder,
    selectedNetwork: 'all' | 'bitcoin' | 'ethereum' = network
  ) => {
    try {
      setTxLoading(true);
      const response = await axios.get('http://localhost:5001/api/transactions/latest', {
        params: {
          page,
          limit: 10,
          sortBy: sortField,
          sortOrder: order,
          network: selectedNetwork
        }
      });
      setTransactions(response.data);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setTxLoading(false);
    }
  };

  // Handle sort change
  const handleSort = (field: string) => {
    const newOrder = field === sortBy && sortOrder === 'desc' ? 'asc' : 'desc';
    setSortBy(field);
    setSortOrder(newOrder);
    fetchTransactions(currentPage, field, newOrder);
  };

  // Handle network change
  const handleNetworkChange = (newNetwork: 'all' | 'bitcoin' | 'ethereum') => {
    setNetwork(newNetwork);
    setCurrentPage(1);
    fetchTransactions(1, sortBy, sortOrder, newNetwork);
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    fetchTransactions(newPage, sortBy, sortOrder, network);
  };

  // Effect for initial setup and SSE connections
  useEffect(() => {
    const fetchInitialStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/stats/latest');
        console.log('Initial stats:', response.data);
        setStats(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    // Set up SSE connection for stats
    const statsEventSource = new EventSource('http://localhost:5001/api/stats/stream');
    
    statsEventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received SSE update:', data);
        
        if (data.type === 'stats_update') {
          console.log('Updating stats with:', data);
          setStats({
            bitcoin: data.bitcoin,
            ethereum: data.ethereum
          });
          setLastUpdate(new Date());
          setError(null);
        }
      } catch (err) {
        console.error('Error parsing stats SSE data:', err);
      }
    };

    statsEventSource.onerror = (error) => {
      console.error('Stats SSE connection error:', error);
      setError('Real-time connection lost');
      // Try to reconnect after 5 seconds
      setTimeout(() => {
        statsEventSource.close();
        new EventSource('http://localhost:5001/api/stats/stream');
      }, 5000);
    };

    // Set up SSE for transaction updates
    const txEventSource = new EventSource('http://localhost:5001/api/transactions/stream');
    
    txEventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'transaction_update') {
          // Update transactions immediately when new one arrives
          setTransactions(prevTransactions => {
            if (!prevTransactions) return prevTransactions;
            
            const newTransaction = data.transaction;
            const updatedTransactions = [newTransaction, ...prevTransactions.transactions.slice(0, -1)];
            
            return {
              ...prevTransactions,
              transactions: updatedTransactions
            };
          });
          
          setLastUpdate(new Date());
        } else if (data.type === 'transactions_update') {
          // Refresh the whole list when bulk update received
          fetchTransactions(currentPage, sortBy, sortOrder, network);
        }
      } catch (err) {
        console.error('Error parsing transaction SSE data:', err);
      }
    };

    txEventSource.onerror = (error) => {
      console.error('Transaction SSE connection error:', error);
      // Try to reconnect after 5 seconds
      setTimeout(() => {
        txEventSource.close();
        new EventSource('http://localhost:5001/api/transactions/stream');
      }, 5000);
    };

    // Initial fetch
    fetchInitialStats();
    fetchTransactions(1);

    // Set up auto-refresh interval (backup for SSE)
    const refreshInterval = setInterval(() => {
      fetchTransactions(currentPage, sortBy, sortOrder, network);
    }, 60000); // Refresh every minute as backup

    // Cleanup
    return () => {
      statsEventSource.close();
      txEventSource.close();
      clearInterval(refreshInterval);
    };
  }, []);

  // 시간 포맷팅 함수
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  };

  // 주소 축약 함수
  const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const AddressLink = ({ address, network }: { address: string, network: 'bitcoin' | 'ethereum' }) => (
    <Link 
      to={`/wallet/${address}`}
      className="hover:underline text-primary font-mono"
      title={address}
    >
      {shortenAddress(address)}
    </Link>
  );

  // 값 포맷팅 함수 (BTC/ETH)
  const formatValue = (value: string, currency: 'BTC' | 'ETH') => {
    return `${parseFloat(value).toFixed(6)} ${currency}`;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
              Track Any Blockchain Transaction
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Real-time tracking for BTC & ETH transactions. Search by address, transaction hash, or block number.
            </p>
            <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search by address, transaction hash, or block number..."
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit">Search</Button>
            </form>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Network Stats</h2>
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdate.toLocaleString('en-AU', { 
                timeZone: 'Australia/Sydney',
                dateStyle: 'medium',
                timeStyle: 'medium'
              })}
            </p>
          </div>
          {loading ? (
            <div className="text-center">Loading stats...</div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : stats ? (
            <div className="space-y-8">
              {/* Bitcoin Stats */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Bitcoin className="h-5 w-5" />
                  Bitcoin Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Row 1 */}
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Market Price (USD)</h4>
                    <p className="text-2xl font-bold">${formatNumber(stats.bitcoin?.data?.market_price_usd)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Market Cap: ${formatNumber(stats.bitcoin?.data?.market_cap_usd)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Network Hashrate (24h)</h4>
                    <p className="text-2xl font-bold">{stats.bitcoin?.data?.hashrate_24h || '0 H/s'}</p>
                    <p className="text-sm text-muted-foreground mt-1">Difficulty: {formatNumber(stats.bitcoin?.data?.difficulty)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Mempool Size</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.bitcoin?.data?.mempool_transactions)} tx</p>
                    <p className="text-sm text-muted-foreground mt-1">Blocks: {formatNumber(stats.bitcoin?.data?.blocks)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Transactions (24h)</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.bitcoin?.data?.transactions_24h)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Volume: ${formatNumber(stats.bitcoin?.data?.volume_24h)}</p>
                  </div>
                  {/* Row 2 */}
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Average Transaction Fee (24h)</h4>
                    <p className="text-2xl font-bold">
                      ${typeof stats.bitcoin?.data?.average_transaction_fee_24h === 'string' 
                        ? parseFloat(stats.bitcoin.data.average_transaction_fee_24h || '0').toFixed(2)
                        : (stats.bitcoin?.data?.average_transaction_fee_24h || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Median: ${formatNumber(stats.bitcoin?.data?.median_transaction_fee_24h)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Transactions</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.bitcoin?.data?.transactions)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Outputs: {formatNumber(stats.bitcoin?.data?.outputs)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Average Block Size (24h)</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.bitcoin?.data?.average_block_size_24h)} bytes</p>
                    <p className="text-sm text-muted-foreground mt-1">Median Time: {formatNumber(stats.bitcoin?.data?.median_time)} sec</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Suggested Transaction Fee</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.bitcoin?.data?.suggested_transaction_fee_per_byte_sat)} sat/byte</p>
                    <p className="text-sm text-muted-foreground mt-1">Next Block Fee: {formatNumber(stats.bitcoin?.data?.next_block_fee_per_byte_sat)} sat/byte</p>
                  </div>
                </div>
              </div>

              {/* Ethereum Stats */}
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Ethereum Stats
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Row 1 */}
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Market Price (USD)</h4>
                    <p className="text-2xl font-bold">${formatNumber(stats.ethereum?.data?.market_price_usd)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Market Cap: ${formatNumber(stats.ethereum?.data?.market_cap_usd)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Total ETH Staked</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.countdowns?.[0]?.eth_staked)} ETH</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Value: ${formatNumber((stats.ethereum?.data?.countdowns?.[0]?.eth_staked || 0) * (stats.ethereum?.data?.market_price_usd || 0))}
                    </p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Mempool Size</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.mempool_transactions)} tx</p>
                    <p className="text-sm text-muted-foreground mt-1">Blocks: {formatNumber(stats.ethereum?.data?.blocks)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Transactions (24h)</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.transactions_24h)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Volume: ${formatNumber(stats.ethereum?.data?.volume_24h)}</p>
                  </div>
                  {/* Row 2 */}
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Average Gas Price (24h)</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.average_gas_price_24h)} Gwei</p>
                    <p className="text-sm text-muted-foreground mt-1">Base Fee: {formatNumber(stats.ethereum?.data?.base_fee_per_gas)} Gwei</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Network Difficulty</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.difficulty)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Hash Rate: {formatNumber(stats.ethereum?.data?.hashrate_24h)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Total Transactions</h4>
                    <p className="text-2xl font-bold">{formatNumber(stats.ethereum?.data?.transactions)}</p>
                    <p className="text-sm text-muted-foreground mt-1">Calls: {formatNumber(stats.ethereum?.data?.calls)}</p>
                  </div>
                  <div className="rounded-lg border bg-card p-6">
                    <h4 className="text-sm font-medium text-muted-foreground">Average Transaction Fee (24h)</h4>
                    <p className="text-2xl font-bold">
                      ${typeof stats.ethereum?.data?.average_transaction_fee_24h === 'string'
                        ? parseFloat(stats.ethereum.data.average_transaction_fee_24h || '0').toFixed(2)
                        : (stats.ethereum?.data?.average_transaction_fee_24h || 0).toFixed(2)}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Median: ${formatNumber(stats.ethereum?.data?.median_transaction_fee_24h)}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {/* Latest Transactions Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Latest Transactions</h2>
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-4">
              <Button
                variant={network === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleNetworkChange('all')}
                className="flex items-center gap-2"
              >
                All Networks
              </Button>
              <Button
                variant={network === 'bitcoin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleNetworkChange('bitcoin')}
                className="flex items-center gap-2"
              >
                <Bitcoin className="h-4 w-4" />
                Bitcoin
              </Button>
              <Button
                variant={network === 'ethereum' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleNetworkChange('ethereum')}
                className="flex items-center gap-2"
              >
                <Wallet className="h-4 w-4" />
                Ethereum
              </Button>
            </div>
          </div>

          <div className="rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('network')}>
                      Network {sortBy === 'network' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('hash')}>
                      Hash {sortBy === 'hash' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('blockNumber')}>
                      Block {sortBy === 'blockNumber' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('timestamp')}>
                      Time {sortBy === 'timestamp' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('value')}>
                      Value {sortBy === 'value' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>
                    <button className="flex items-center" onClick={() => handleSort('fee')}>
                      Fee {sortBy === 'fee' && (sortOrder === 'desc' ? '↓' : '↑')}
                    </button>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {txLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">Loading transactions...</TableCell>
                  </TableRow>
                ) : !transactions?.transactions.length ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center">No transactions found</TableCell>
                  </TableRow>
                ) : (
                  transactions.transactions.map((tx) => (
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
                      <TableCell>{tx.blockNumber}</TableCell>
                      <TableCell>{formatTime(tx.timestamp)}</TableCell>
                      <TableCell>{formatValue(tx.value, tx.network === 'bitcoin' ? 'BTC' : 'ETH')}</TableCell>
                      <TableCell className="font-mono">
                        <AddressLink address={tx.fromAddress} network={tx.network} />
                      </TableCell>
                      <TableCell className="font-mono">
                        <AddressLink address={tx.toAddress} network={tx.network} />
                      </TableCell>
                      <TableCell>
                        {tx.network === 'bitcoin'
                          ? formatValue((tx as Transaction).fee, 'BTC')
                          : formatValue((tx as EthereumTransaction).gasFee, 'ETH')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {transactions && transactions.pagination.totalPages > 1 && (
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {transactions.pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === transactions.pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">
                  Total {transactions.pagination.total} transactions
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
} 