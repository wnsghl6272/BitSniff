import { Button } from "../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Search } from "lucide-react"
import { Input } from "../components/ui/input"
import { Link } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Bitcoin, Wallet } from "lucide-react"

export default function Home() {
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
            <div className="w-full max-w-2xl flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-8"
                  placeholder="Search by address, transaction hash, or block number..."
                  type="search"
                />
              </div>
              <Button>Search</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Transactions Section */}
      <section className="py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold tracking-tight mb-6">Latest Transactions</h2>
          <Tabs defaultValue="bitcoin" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="bitcoin" className="flex items-center gap-2">
                <Bitcoin className="h-4 w-4" />
                Bitcoin
              </TabsTrigger>
              <TabsTrigger value="ethereum" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Ethereum
              </TabsTrigger>
            </TabsList>
            <TabsContent value="bitcoin">
              <div className="rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hash</TableHead>
                      <TableHead>Block</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Fee</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">
                        <Link to="/tx/0x1234...5678" className="text-primary hover:underline">
                          0x1234...5678
                        </Link>
                      </TableCell>
                      <TableCell>16502394</TableCell>
                      <TableCell>2 mins ago</TableCell>
                      <TableCell>0.5 BTC</TableCell>
                      <TableCell>0.0001 BTC</TableCell>
                      <TableCell className="font-mono">bc1q...wxyz</TableCell>
                      <TableCell className="font-mono">bc1q...abcd</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="ethereum">
              <div className="rounded-lg border bg-card">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hash</TableHead>
                      <TableHead>Block</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Gas Fee</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-mono">
                        <Link to="/tx/0xabcd...efgh" className="text-primary hover:underline">
                          0xabcd...efgh
                        </Link>
                      </TableCell>
                      <TableCell>18934521</TableCell>
                      <TableCell>1 min ago</TableCell>
                      <TableCell>1.2 ETH</TableCell>
                      <TableCell>0.002 ETH</TableCell>
                      <TableCell className="font-mono">0x123...789</TableCell>
                      <TableCell className="font-mono">0x456...012</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Total Transactions</h3>
              <p className="text-2xl font-bold">1,234,567</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Average Block Time</h3>
              <p className="text-2xl font-bold">10 minutes</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Network Hashrate</h3>
              <p className="text-2xl font-bold">157 EH/s</p>
            </div>
            <div className="rounded-lg border bg-card p-6">
              <h3 className="text-sm font-medium text-muted-foreground">Active Wallets</h3>
              <p className="text-2xl font-bold">892,345</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 