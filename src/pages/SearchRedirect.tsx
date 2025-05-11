import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import TransactionDetail from './TransactionDetail';
import WalletPage from '../components/WalletPage';

// Helper function to determine the type of input
const determineInputType = (input: string): 'transaction' | 'wallet' | 'unknown' => {
  // Ethereum transaction hash pattern (0x followed by 64 hexadecimal characters)
  const txPattern = /^0x[a-fA-F0-9]{64}$/;
  
  // Ethereum address pattern (0x followed by 40 hexadecimal characters)
  const addressPattern = /^0x[a-fA-F0-9]{40}$/;
  
  // Bitcoin transaction hash pattern (64 hexadecimal characters)
  const btcTxPattern = /^[a-fA-F0-9]{64}$/;
  
  // Bitcoin address patterns (different formats)
  const btcAddressPattern = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z02-9]{11,71}$/;

  if (txPattern.test(input) || btcTxPattern.test(input)) {
    return 'transaction';
  } else if (addressPattern.test(input) || btcAddressPattern.test(input)) {
    return 'wallet';
  }
  
  return 'unknown';
};

export default function SearchRedirect() {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get('q');
  const [contentType, setContentType] = useState<'transaction' | 'wallet' | 'unknown' | null>(null);

  useEffect(() => {
    if (!query) {
      setContentType(null);
      setIsLoading(false);
      return;
    }

    const inputType = determineInputType(query);
    setContentType(inputType);
    setIsLoading(false);
  }, [query]);

  if (isLoading) {
    return (
      <div className="container py-10 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!query) {
    return (
      <div className="container py-10">
        <div className="rounded-lg border bg-card p-6">
          <h1 className="text-2xl font-bold text-red-500 mb-2">Error</h1>
          <p>No search query provided</p>
        </div>
      </div>
    );
  }

  switch (contentType) {
    case 'transaction':
      return <TransactionDetail hash={query} />;
    case 'wallet':
      return <WalletPage address={query} />;
    default:
      return (
        <div className="container py-10">
          <div className="rounded-lg border bg-card p-6">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Invalid Input</h1>
            <p>The provided input does not match any known format</p>
          </div>
        </div>
      );
  }
} 