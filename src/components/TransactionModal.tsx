import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatEther } from "viem";
import { Badge } from "@/components/ui/badge";
import { formatDistance } from "date-fns";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ModalTransaction } from '../types/business';
import { TransactionModalProps } from '../types/props';

export function TransactionModal({ isOpen, onClose, transaction }: TransactionModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Transaction Details
            <Badge variant={transaction.status === 'confirmed' ? 'default' : 'secondary'}>
              {transaction.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="json">JSON Data</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Hash</h3>
                <p className="text-sm font-mono break-all">{transaction.hash}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Time</h3>
                <p className="text-sm">
                  {formatDistance(new Date(transaction.timestamp), new Date(), { addSuffix: true })}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">From</h3>
                <Link 
                  to={`/wallet/${transaction.fromAddress}`}
                  className="text-sm font-mono break-all text-primary hover:underline"
                >
                  {transaction.fromAddress}
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">To</h3>
                <Link
                  to={`/wallet/${transaction.toAddress}`}
                  className="text-sm font-mono break-all text-primary hover:underline"
                >
                  {transaction.toAddress}
                </Link>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Value</h3>
                <p className="text-sm">
                  {transaction.network === 'ethereum' 
                    ? `${formatEther(transaction.value)} ETH`
                    : `${Number(transaction.value) / 1e8} BTC`}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">Fee</h3>
                <p className="text-sm">
                  {transaction.network === 'ethereum'
                    ? `${formatEther(transaction.gasFee || '0')} ETH`
                    : `${Number(transaction.fee || '0') / 1e8} BTC`}
                </p>
              </div>
              {transaction.blockNumber && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Block</h3>
                  <p className="text-sm">{transaction.blockNumber}</p>
                </div>
              )}
            </div>
            
            {transaction.network === 'ethereum' && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Gas Price</h4>
                    <p className="text-sm">{transaction.gasPrice ? formatEther(transaction.gasPrice) : 'N/A'} ETH</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Gas Limit</h4>
                    <p className="text-sm">{transaction.gasLimit?.toString() ?? 'N/A'}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">Nonce</h4>
                    <p className="text-sm">{transaction.nonce ?? 'N/A'}</p>
                  </div>
                </div>
                {transaction.input && transaction.input !== '0x' && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">Input Data</h4>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-xs">
                      {transaction.input}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          <TabsContent value="json">
            <div className="bg-muted rounded-lg p-4">
              <pre className="overflow-x-auto text-xs">
                {JSON.stringify(transaction.rawData || transaction, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
} 