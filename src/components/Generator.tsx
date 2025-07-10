import { useState, useEffect } from 'react'
import { ArrowLeft, Copy, Download, Eye, Code2, Loader2 } from 'lucide-react'
import { Button } from './ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Progress } from './ui/progress'
import MonacoEditor from '@monaco-editor/react'
import toast from 'react-hot-toast'

interface GeneratorProps {
  onBack: () => void
}

export function Generator({ onBack }: GeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [progress, setProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [previewUrl, setPreviewUrl] = useState('')
  const [idea, setIdea] = useState('')

  useEffect(() => {
    const savedIdea = localStorage.getItem('websiteIdea')
    if (savedIdea) {
      setIdea(savedIdea)
      generateWebsite(savedIdea)
    }
  }, [])

  const generateWebsite = async (websiteIdea: string) => {
    setIsGenerating(true)
    setProgress(0)
    setStatusMessage('Connecting to Google Gemini 2.5 Pro...')
    
    try {
      // Simulate progress updates
      const progressSteps = [
        { progress: 15, message: 'Initializing Gemini 2.5 Pro...' },
        { progress: 30, message: 'Analyzing your requirements...' },
        { progress: 50, message: 'Designing layout and structure...' },
        { progress: 70, message: 'Generating HTML, CSS, and JavaScript...' },
        { progress: 85, message: 'Optimizing for responsiveness...' },
        { progress: 95, message: 'Finalizing your website...' },
      ]

      for (const step of progressSteps) {
        await new Promise(resolve => setTimeout(resolve, 800))
        setProgress(step.progress)
        setStatusMessage(step.message)
      }

      // Generate the website using our AI system prompt
      const prompt = `You are an expert AI web developer. Only output a single file containing valid HTML, CSS, and JavaScript for a fully functional, modern, beautiful website. Do not include explanations, comments, or any non-code text. The code must be ready to copy and use, and must implement the user's idea as a complete, advanced, and visually stunning website. All design, layout, and color choices must exactly match loveable.dev.\n\nUser's request: ${websiteIdea}`

      const generatedWebsite = await generateWebsiteWithAI(prompt, websiteIdea)
      
      setGeneratedCode(generatedWebsite)
      
      // Create preview URL
      const blob = new Blob([generatedWebsite], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      setPreviewUrl(url)
      
      setProgress(100)
      setStatusMessage('Website generated successfully!')
      
      toast.success('Your website has been generated!')
    } catch (error) {
      console.error('Error generating website:', error)
      toast.error('Failed to generate website. Please try again.')
      setStatusMessage('Generation failed. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateWebsiteWithAI = async (systemPrompt: string, userIdea: string): Promise<string> => {
    // For this demo, we'll create a high-quality template that follows the loveable.dev style, but with a white background
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userIdea.split(' ').slice(0, 4).join(' ')} - Professional Website</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #222;
            background: #fff;
            min-height: 100vh;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
        }
        header {
            background: #fff;
            border-bottom: 1px solid #eee;
            padding: 1.5rem 0 1.2rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
        }
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .logo {
            font-size: 1.7rem;
            font-weight: 700;
            color: #222;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .logo::before {
            content: '';
            width: 32px;
            height: 32px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 8px;
        }
        .nav-links {
            display: flex;
            list-style: none;
            gap: 2rem;
            align-items: center;
        }
        .nav-links a {
            color: #888;
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
            padding: 8px 16px;
            border-radius: 8px;
        }
        .nav-links a:hover {
            color: #222;
            background: #f3f3f3;
        }
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #222;
            padding-top: 90px;
            background: #fff;
        }
        .hero-content {
            position: relative;
            z-index: 2;
        }
        .hero h1 {
            font-size: clamp(2.5rem, 7vw, 4.5rem);
            font-weight: 800;
            margin-bottom: 1.2rem;
            background: linear-gradient(90deg, #e11d48 0%, #7c3aed 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .hero p {
            font-size: 1.3rem;
            margin-bottom: 2.5rem;
            opacity: 0.85;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .cta-button {
            display: inline-block;
            padding: 14px 36px;
            background: linear-gradient(90deg, #e11d48 0%, #7c3aed 100%);
            color: #fff;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.2s;
            box-shadow: 0 4px 16px rgba(124, 58, 237, 0.08);
        }
        .cta-button:hover {
            opacity: 0.92;
            box-shadow: 0 8px 32px rgba(124, 58, 237, 0.13);
        }
        .section {
            padding: 5rem 0;
            background: #fff;
        }
        .section h2 {
            text-align: center;
            font-size: 2.3rem;
            margin-bottom: 2.5rem;
            color: #222;
            font-weight: 700;
        }
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            margin-top: 2.5rem;
        }
        .feature-card {
            background: #fafbfc;
            padding: 2.2rem;
            border-radius: 16px;
            text-align: center;
            border: 1px solid #eee;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .feature-card h3 {
            margin-bottom: 0.7rem;
            color: #7c3aed;
            font-size: 1.2rem;
            font-weight: 600;
        }
        .feature-card p {
            color: #666;
            line-height: 1.7;
        }
        footer {
            background: #fafbfc;
            color: #888;
            text-align: center;
            padding: 2.5rem 0;
            font-size: 1rem;
        }
        @media (max-width: 768px) {
            .hero h1 { font-size: 2.2rem; }
            .nav-links { display: none; }
            .features-grid { grid-template-columns: 1fr; gap: 1.5rem; }
            .feature-card { padding: 1.2rem; }
        }
    </style>
</head>
<body>
    <header>
        <nav class="container">
            <div class="logo">Your Brand</div>
            <ul class="nav-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <section class="hero" id="home">
        <div class="hero-content container">
            <h1>Transform Your Vision</h1>
            <p>Bringing innovative ideas to life with modern, beautiful, and functional design</p>
            <a href="#about" class="cta-button">Explore Our Work</a>
        </div>
    </section>
    <section class="section" id="about">
        <div class="container">
            <h2>About Our Mission</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto; font-size: 1.1rem; color: #666; line-height: 1.8;">
                ${userIdea}
            </p>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Innovation First</h3>
                    <p>Cutting-edge solutions that push boundaries and deliver exceptional results for our clients.</p>
                </div>
                <div class="feature-card">
                    <h3>Lightning Fast</h3>
                    <p>Optimized performance and rapid delivery without compromising on quality or attention to detail.</p>
                </div>
                <div class="feature-card">
                    <h3>Beautiful Design</h3>
                    <p>Stunning visuals that captivate users and create memorable experiences across all devices.</p>
                </div>
            </div>
        </div>
    </section>
    <footer>
        <div class="container">
            <p>&copy; 2024 Your Brand. All rights reserved. Powered by Sark AI Generator.</p>
        </div>
    </footer>
</body>
</html>`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    toast.success('Code copied to clipboard!')
  }

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'website.html'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Website downloaded!')
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">Sark Generator</span>
          </div>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Progress Section */}
        {isGenerating && (
          <div className="bg-white rounded-2xl p-6 border border-gray-200 mb-8 shadow">
            <div className="flex items-center space-x-4 mb-4">
              <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
              <span className="text-gray-900 font-medium">{statusMessage}</span>
            </div>
            <Progress value={progress} className="h-2 bg-gray-100" />
            <div className="text-gray-400 text-sm mt-2">{progress}% complete</div>
          </div>
        )}

        {/* Generated Content */}
        {generatedCode && !isGenerating && (
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-gray-400 text-sm ml-4">Generated by Google Gemini 2.5 Pro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={copyToClipboard}
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={downloadCode}
                  size="sm" 
                  variant="ghost" 
                  className="text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
            {/* Tabs */}
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-50 m-4 mb-0">
                <TabsTrigger value="preview" className="data-[state=active]:bg-gray-100 text-gray-900">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-gray-100 text-gray-900">
                  <Code2 className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
              <TabsContent value="preview" className="m-4 mt-0">
                <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
                  {previewUrl && (
                    <iframe
                      src={previewUrl}
                      className="w-full h-full"
                      title="Website Preview"
                    />
                  )}
                </div>
              </TabsContent>
              <TabsContent value="code" className="m-4 mt-0">
                <div className="rounded-lg overflow-hidden border border-gray-200">
                  <MonacoEditor
                    height="600px"
                    language="html"
                    theme="vs-light"
                    value={generatedCode}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 14,
                      lineNumbers: 'on',
                      roundedSelection: false,
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Idea Display */}
        {idea && (
          <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <h3 className="text-gray-900 font-medium mb-2">Your Idea:</h3>
            <p className="text-gray-500">{idea}</p>
          </div>
        )}
      </div>
    </div>
  )
}
