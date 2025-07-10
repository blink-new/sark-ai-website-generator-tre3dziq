import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'

interface HeroProps {
  onStartGenerating: () => void
}

export function Hero({ onStartGenerating }: HeroProps) {
  const [idea, setIdea] = useState('')

  const handleGenerate = () => {
    if (idea.trim()) {
      localStorage.setItem('websiteIdea', idea.trim())
      onStartGenerating()
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="flex items-center justify-between p-6 mx-auto w-full max-w-4xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">Sark</span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-xl mx-auto w-full">
        <div className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Build something{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Beautiful
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Create complete websites by simply describing your idea. Powered by Google Gemini 2.5 Pro.
          </p>
        </div>

        {/* Chat Interface */}
        <div className="w-full">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xl">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-gray-400 text-sm ml-1">Describe your website idea</span>
            </div>
            <Textarea
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="I want to build a modern portfolio website for a photographer with a gallery, about section, and contact form..."
              className="min-h-32 bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 resize-none text-lg leading-relaxed focus:ring-2 focus:ring-pink-200"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  handleGenerate()
                }
              }}
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Enter</kbd>
                <span>to generate</span>
              </div>
              <Button 
                onClick={handleGenerate}
                disabled={!idea.trim()}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white px-8 py-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Generate Website
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center text-gray-400 text-sm">
        Powered by Google Gemini 2.5 Pro via OpenRouter
      </div>
    </div>
  )
}
