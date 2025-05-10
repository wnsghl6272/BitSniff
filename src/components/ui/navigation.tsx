import { Link } from "react-router-dom"
import { Button } from "./button"
import { Bitcoin, Wallet, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "./sheet"

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">BitSniff</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              to="/transactions"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Transactions
            </Link>
            <Link
              to="/blocks"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Blocks
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                to="/bitcoin"
                className="transition-colors hover:text-foreground/80 text-foreground flex items-center"
              >
                <Bitcoin className="h-4 w-4 mr-1" />
                Bitcoin
              </Link>
              <Link
                to="/ethereum"
                className="transition-colors hover:text-foreground/80 text-foreground flex items-center"
              >
                <Wallet className="h-4 w-4 mr-1" />
                Ethereum
              </Link>
            </div>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-lg font-bold"
              >
                BitSniff
              </Link>
              <Link
                to="/transactions"
                className="text-sm"
              >
                Transactions
              </Link>
              <Link
                to="/blocks"
                className="text-sm"
              >
                Blocks
              </Link>
              <Link
                to="/bitcoin"
                className="text-sm flex items-center"
              >
                <Bitcoin className="h-4 w-4 mr-1" />
                Bitcoin
              </Link>
              <Link
                to="/ethereum"
                className="text-sm flex items-center"
              >
                <Wallet className="h-4 w-4 mr-1" />
                Ethereum
              </Link>
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex-1" />
        <div className="flex items-center">
          <nav className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="hidden md:inline-flex">
              Sign In
            </Button>
            <Button size="sm" className="hidden md:inline-flex">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </nav>
  )
} 