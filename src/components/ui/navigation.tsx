import { Link } from "react-router-dom"

export function Navigation() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold">BitSniff</span>
        </Link>
      </div>
    </nav>
  )
} 