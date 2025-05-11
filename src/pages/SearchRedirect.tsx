import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import TransactionDetail from './TransactionDetail';
import WalletPage from '../components/WalletPage';
import { Button } from '../components/ui/button';

// Helper function to determine the type of input
const determineInputType = (input: string): 'transaction' | 'wallet' | 'block' | 'unknown' => {
  // Block number pattern (only digits)
  const blockPattern = /^\d+$/;
  
  // Ethereum transaction hash pattern (0x followed by 64 hexadecimal characters)
  const txPattern = /^0x[a-fA-F0-9]{64}$/;
  
  // Ethereum address pattern (0x followed by 40 hexadecimal characters)
  const addressPattern = /^0x[a-fA-F0-9]{40}$/;
  
  // Bitcoin transaction hash pattern (64 hexadecimal characters)
  const btcTxPattern = /^[a-fA-F0-9]{64}$/;
  
  // Bitcoin address patterns (different formats)
  const btcAddressPattern = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[ac-hj-np-z02-9]{11,71}$/;

  if (blockPattern.test(input)) {
    return 'block';
  } else if (txPattern.test(input) || btcTxPattern.test(input)) {
    return 'transaction';
  } else if (addressPattern.test(input) || btcAddressPattern.test(input)) {
    return 'wallet';
  }
  
  return 'unknown';
};

export default function SearchRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const query = searchParams.get('q');
  const [contentType, setContentType] = useState<'transaction' | 'wallet' | 'block' | 'unknown' | null>(null);

  useEffect(() => {
    if (!query) {
      setContentType(null);
      setIsLoading(false);
      return;
    }

    const inputType = determineInputType(query);
    setContentType(inputType);
    
    // If it's a block number, redirect to the block page
    if (inputType === 'block') {
      navigate(`/block/${query}`);
      return;
    }

    setIsLoading(false);
  }, [query, navigate]);

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
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="mt-4 flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Go Back
          </Button>
        </div>
      </div>
    );
  }

  switch (contentType) {
    case 'transaction':
      return <TransactionDetail hash={query} />;
    case 'wallet':
      return <WalletPage address={query} />;
    case 'block':
      // This case won't be reached because we redirect in useEffect
      return null;
    default:
      return (
        <div className="container py-10">
          <div className="rounded-lg border bg-card p-6">
            <h1 className="text-2xl font-bold text-red-500 mb-2">Invalid Input</h1>
            <p>The provided input does not match any known format</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Valid formats:
              <ul className="list-disc list-inside mt-2">
                <li>Block number (e.g., "12345")</li>
                <li>Ethereum transaction (0x followed by 64 hex characters)</li>
                <li>Bitcoin transaction (64 hex characters)</li>
                <li>Ethereum address (0x followed by 40 hex characters)</li>
                <li>Bitcoin address (starts with 1, 3, or bc1)</li>
              </ul>
            </p>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="mt-4 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      );
  }
} 