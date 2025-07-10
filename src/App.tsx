import { useState } from 'react'
import { Hero } from './components/Hero'
import { Generator } from './components/Generator'
import { Toaster } from 'react-hot-toast'

function App() {
  const [showGenerator, setShowGenerator] = useState(false)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
      <Toaster position="top-right" />
      {showGenerator ? (
        <Generator onBack={() => setShowGenerator(false)} />
      ) : (
        <Hero onStartGenerating={() => setShowGenerator(true)} />
      )}
    </div>
  )
}

export default App