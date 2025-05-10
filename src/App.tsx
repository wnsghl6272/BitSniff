import { Outlet } from 'react-router-dom'
import { Navigation } from './components/ui/navigation'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default App
