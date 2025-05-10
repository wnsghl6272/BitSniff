import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Box, CircularProgress, Alert } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

interface WalletData {
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

const API_BASE_URL = 'http://localhost:5001';

const WalletPage: React.FC = () => {
  const { address } = useParams<{ address: string }>();
  const [walletData, setWalletData] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [network, setNetwork] = useState<'bitcoin' | 'ethereum' | null>(null);

  useEffect(() => {
    const fetchWalletData = async () => {
      if (!address) {
        setError('Address is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Try Ethereum first
        try {
          const ethResponse = await axios.get(`${API_BASE_URL}/api/wallet/ethereum/${address}`, {
            headers: { 'Accept': 'application/json' }
          });
          setWalletData(ethResponse.data);
          setNetwork('ethereum');
          return;
        } catch (err) {
          // If not found, try Bitcoin
          const btcResponse = await axios.get(`${API_BASE_URL}/api/wallet/bitcoin/${address}`, {
            headers: { 'Accept': 'application/json' }
          });
          setWalletData(btcResponse.data);
          setNetwork('bitcoin');
        }
      } catch (err) {
        console.error('Error fetching wallet data:', err);
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 404) {
            setError('Address not found on any network');
          } else if (err.response?.status === 429) {
            setError('Too many requests. Please try again later.');
          } else {
            setError(err.response?.data?.error || 'Failed to fetch wallet data');
          }
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWalletData();
  }, [address]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!walletData) {
    return (
      <Alert severity="info" sx={{ mt: 2 }}>
        No wallet data found
      </Alert>
    );
  }

  const formatValue = (value: string | undefined, usdValue?: number) => {
    if (!value) return 'N/A';
    const amount = parseFloat(value) / (network === 'ethereum' ? 1e18 : 1e8);
    return `${amount.toFixed(8)} ${network === 'ethereum' ? 'ETH' : 'BTC'}${
      usdValue ? ` ($${usdValue.toLocaleString()})` : ''
    }`;
  };

  const formatDate = (date: string | undefined) => {
    if (!date) return 'N/A';
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Wallet Details
      </Typography>
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        {network && network.charAt(0).toUpperCase() + network.slice(1)} Address: {address}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Balance</Typography>
              <Typography>
                {formatValue(walletData.address.balance, walletData.address.balance_usd)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Transaction Summary</Typography>
              <Typography>
                Received: {formatValue(walletData.address.received, walletData.address.received_usd)}
              </Typography>
              <Typography>
                Spent: {formatValue(walletData.address.spent, walletData.address.spent_usd)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Transaction Statistics</Typography>
              <Typography>
                Total Transactions: {walletData.calls_stats?.total_transactions || 0}
              </Typography>
              <Typography>
                Total Contract Calls: {walletData.calls_stats?.total_calls || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Address Age</Typography>
              <Typography>
                First Activity: {formatDate(walletData.address.first_seen_receiving)}
              </Typography>
              <Typography>
                Last Activity: {formatDate(walletData.address.last_seen_receiving)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Market Value (USD)</Typography>
              <Typography>
                Balance: ${walletData.address.balance_usd?.toLocaleString() || 'N/A'}
              </Typography>
              <Typography>
                Total Received: ${walletData.address.received_usd?.toLocaleString() || 'N/A'}
              </Typography>
              <Typography>
                Total Spent: ${walletData.address.spent_usd?.toLocaleString() || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Network Activity</Typography>
              <Typography>
                Network: {network?.toUpperCase() || 'Unknown'}
              </Typography>
              <Typography>
                Active: {walletData.address.last_seen_receiving ? 'Yes' : 'No'}
              </Typography>
              <Typography>
                Last Seen: {formatDate(walletData.address.last_seen_receiving)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ gridColumn: 'span 12' }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Activity Timeline</Typography>
              <Grid container spacing={2}>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <Typography variant="subtitle2">First Transaction:</Typography>
                  <Typography>
                    {formatDate(walletData.address.first_seen_receiving)}
                  </Typography>
                </Grid>
                <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
                  <Typography variant="subtitle2">Latest Transaction:</Typography>
                  <Typography>
                    {formatDate(walletData.address.last_seen_receiving)}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {network === 'ethereum' && walletData.layer_2?.erc_20 && (
          <Grid sx={{ gridColumn: 'span 12' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Token Holdings</Typography>
                <Grid container spacing={2}>
                  {Object.entries(walletData.layer_2.erc_20).map(([tokenAddress, token]) => (
                    <Grid sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4' } }} key={tokenAddress}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="subtitle2">{token.token_name} ({token.token_symbol})</Typography>
                          <Typography>
                            {(parseFloat(token.balance) / Math.pow(10, token.token_decimals)).toFixed(4)}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default WalletPage; 