import { TableTransaction, ModalTransaction } from './business';
import { VariantProps } from 'class-variance-authority';
import * as React from 'react';

// Transaction Modal Props
export interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: ModalTransaction;
}

// Transaction Table Props
export interface TransactionTableProps {
  transactions: TableTransaction[];
  onTransactionClick: (transaction: TableTransaction) => void;
}

// Wallet Page Props
export interface WalletPageProps {
  address?: string;  // Optional because it can also come from useParams
}

// Transaction Detail Props
export interface TransactionDetailProps {
  hash?: string;  // Optional because it can also come from useParams
}

// Input Props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Button Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<any> {
  asChild?: boolean;
} 