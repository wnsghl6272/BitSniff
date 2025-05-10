import { useParams } from "react-router-dom"
import { ArrowRight, Clock, Database, HardDrive } from "lucide-react"

export default function TransactionDetail() {
  const { hash } = useParams()

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>
      <div className="grid gap-6">
        {/* Transaction Overview Card */}
        <div className="rounded-lg border bg-card p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transaction Hash</h2>
              <span className="font-mono text-sm">{hash}</span>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Clock className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Timestamp:</span>
                  <span className="ml-2">2024-05-10 12:34:56</span>
                </div>
                <div className="flex items-center text-sm">
                  <Database className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Block:</span>
                  <span className="ml-2">#16502394</span>
                </div>
                <div className="flex items-center text-sm">
                  <HardDrive className="mr-2 h-4 w-4" />
                  <span className="text-muted-foreground">Network:</span>
                  <span className="ml-2">Bitcoin</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-100 text-green-700">
                    Confirmed
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Value:</span>
                  <span className="ml-2">0.5 BTC</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Fee:</span>
                  <span className="ml-2">0.0001 BTC</span>
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
              <p className="font-mono text-sm truncate">bc1q...wxyz</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="flex-1 space-y-1">
              <p className="font-medium">To</p>
              <p className="font-mono text-sm truncate">bc1q...abcd</p>
            </div>
          </div>
        </div>

        {/* Raw Data Card */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Raw Transaction Data</h2>
          <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify({
              version: 1,
              locktime: 0,
              vin: [{ sequence: 4294967295 }],
              vout: [{ value: 0.5, n: 0 }],
            }, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
} 