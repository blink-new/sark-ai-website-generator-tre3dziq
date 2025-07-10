import { useState } from 'react'
import { Button } from './ui/button'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'

interface HeroProps {
  onStartGenerating: () => void
}

// Mock project data to match loveable.dev layout
const featuredProjects = [
  { id: 1, title: 'pulse-robot-template', type: 'Website', remixes: '12496 Remixes' },
  { id: 2, title: 'cryptocurrency-trading-dashboard', type: 'Website', remixes: '8965 Remixes' },
  { id: 3, title: 'wrlds-ai-integration', type: 'Website', remixes: '5603 Remixes' },
  { id: 4, title: 'crypto-trade-template', type: 'Website', remixes: '4688 Remixes' },
  { id: 5, title: 'Cagri-dom', type: 'Prototype', remixes: '4514 Remixes' },
  { id: 6, title: 'characterforge-imagix', type: 'Consumer App', remixes: '4256 Remixes' },
  { id: 7, title: 'modern-seaside-stay', type: 'Website', remixes: '4242 Remixes' },
  { id: 8, title: 'billify-generator', type: 'Internal Tools', remixes: '3997 Remixes' },
]

export function Hero({ onStartGenerating }: HeroProps) {
  const [idea, setIdea] = useState('')

  const handleGenerate = () => {
    if (idea.trim()) {
      localStorage.setItem('websiteIdea', idea.trim())
      onStartGenerating()
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="flex items-center justify-between p-6 mx-auto w-full max-w-7xl">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-2xl font-bold text-white">Sark</span>
        </div>
        
        <div className="flex items-center space-x-8">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Popular
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Discover
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Internal Tools
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Website
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Personal
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Consumer App
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            B2B App
          </Button>
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 text-base">
            Prototype
          </Button>
        </div>
      </nav>

      <div className="px-6 max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Build something{' '}
            <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent">
              Sarkable
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-lg mx-auto leading-relaxed">
            Create apps and websites by chatting with AI
          </p>
        </div>

        {/* Chat Interface */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-sm px-3 py-1">
                    Attach
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-sm px-3 py-1">
                    Public
                  </Button>
                </div>
                <span className="text-white/50 text-sm">From the Community</span>
              </div>
              
              <Textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="I want to build a modern portfolio website for a photographer with a gallery, about section, and contact form..."
                className="min-h-32 bg-transparent border-0 text-white placeholder:text-white/40 resize-none text-lg leading-relaxed focus:ring-0 focus:border-0 p-0"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    handleGenerate()
                  }
                }}
              />
              
              <div className="flex items-center justify-end mt-4">
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

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredProjects.map((project) => (
            <Card key={project.id} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs px-2 py-1">
                    Remix
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/60 hover:text-white text-xs px-2 py-1">
                    Preview
                  </Button>
                </div>
                
                <div className="mb-3">
                  <h3 className="text-white font-medium text-sm mb-1 truncate">
                    {project.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/10 text-white/80 px-2 py-1 rounded text-xs">
                      {project.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-white/60 text-xs">
                  {project.remixes}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center mt-8 mb-16">
          <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10">
            Show More
          </Button>
        </div>
      </div>
    </div>
  )
}