import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link } from '@mui/material';
import { formatInTimeZone } from 'date-fns-tz';
import { TableTransaction } from '../types/business';
import { TransactionTableProps } from '../types/props';

const TIMEZONE = 'Australia/Sydney';

const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onTransactionClick }) => {
  const navigate = useNavigate();

  const handleAddressClick = (address: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/wallet/${address}`);
  };

  const formatValue = (transaction: TableTransaction) => {
    const value = parseFloat(transaction.value);
    const divisor = transaction.network === 'ethereum' ? 1e18 : 1e8;
    return `${(value / divisor).toFixed(8)} ${transaction.network === 'ethereum' ? 'ETH' : 'BTC'}`;
  };

  const formatFee = (transaction: TableTransaction) => {
    if (transaction.network === 'ethereum' && transaction.gasFee) {
      return `${(parseFloat(transaction.gasFee) / 1e18).toFixed(8)} ETH`;
    }
    if (transaction.network === 'bitcoin' && transaction.fee) {
      return `${(parseFloat(transaction.fee) / 1e8).toFixed(8)} BTC`;
    }
    return 'N/A';
  };

  const formatTime = (timestamp: string) => {
    return formatInTimeZone(
      new Date(timestamp),
      TIMEZONE,
      "d MMM yyyy, h:mm a"  // Format: "11 May 2024, 4:55 PM"
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Hash</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>From</TableCell>
            <TableCell>To</TableCell>
            <TableCell align="right">Value</TableCell>
            <TableCell align="right">Fee</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow 
              key={tx.hash} 
              hover 
              onClick={() => onTransactionClick(tx)}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{tx.displayId}</TableCell>
              <TableCell>
                <Link 
                  component="button"
                  variant="body2"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    onTransactionClick(tx);
                  }}
                >
                  {`${tx.hash.slice(0, 8)}...${tx.hash.slice(-8)}`}
                </Link>
              </TableCell>
              <TableCell>
                {formatTime(tx.timestamp)}
              </TableCell>
              <TableCell>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddressClick(tx.fromAddress, e)}
                >
                  {tx.fromAddress.includes(' ') 
                    ? tx.fromAddress 
                    : `${tx.fromAddress.slice(0, 6)}...${tx.fromAddress.slice(-4)}`}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  component="button"
                  variant="body2"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleAddressClick(tx.toAddress, e)}
                >
                  {tx.toAddress.includes(' ')
                    ? tx.toAddress
                    : `${tx.toAddress.slice(0, 6)}...${tx.toAddress.slice(-4)}`}
                </Link>
              </TableCell>
              <TableCell align="right">{formatValue(tx)}</TableCell>
              <TableCell align="right">{formatFee(tx)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable; 