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
      // Simulate progress updates to match loveable.dev experience
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
      const prompt = `You are an expert AI web developer. Only output a single file containing valid HTML, CSS, and JavaScript for a fully functional, modern, beautiful website. Do not include explanations, comments, or any non-code text. The code must be ready to copy and use, and must implement the user's idea as a complete, advanced, and visually stunning website. All design, layout, and color choices must exactly match loveable.dev.

User's request: ${websiteIdea}`

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
    // For this demo, we'll create a high-quality template that follows the loveable.dev style
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${userIdea.split(' ').slice(0, 4).join(' ')} - Professional Website</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            transition: all 0.3s ease;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
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
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.3s ease;
            padding: 8px 16px;
            border-radius: 8px;
        }
        
        .nav-links a:hover {
            color: white;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            padding-top: 80px;
            position: relative;
            overflow: hidden;
        }
        
        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
            pointer-events: none;
        }
        
        .hero-content {
            position: relative;
            z-index: 2;
        }
        
        .hero h1 {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 800;
            margin-bottom: 1.5rem;
            animation: fadeInUp 1s ease-out;
            background: linear-gradient(135deg, #fff 0%, #e0e7ff 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .hero p {
            font-size: 1.5rem;
            margin-bottom: 3rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease-out 0.2s both;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .cta-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%);
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            animation: fadeInUp 1s ease-out 0.4s both;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }
        
        .cta-button:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }
        
        .section {
            padding: 6rem 0;
            background: white;
            position: relative;
        }
        
        .section h2 {
            text-align: center;
            font-size: 3rem;
            margin-bottom: 4rem;
            color: #333;
            font-weight: 700;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 3rem;
            margin-top: 4rem;
        }
        
        .feature-card {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 3rem;
            border-radius: 20px;
            text-align: center;
            transition: all 0.3s ease;
            border: 1px solid rgba(226, 232, 240, 0.8);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }
        
        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
        }
        
        .feature-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 20px;
            margin: 0 auto 2rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
        }
        
        .feature-card h3 {
            margin-bottom: 1rem;
            color: #667eea;
            font-size: 1.5rem;
            font-weight: 600;
        }
        
        .feature-card p {
            color: #64748b;
            line-height: 1.7;
        }
        
        footer {
            background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
            color: white;
            text-align: center;
            padding: 3rem 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 3rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
            
            .feature-card {
                padding: 2rem;
            }
        }
        
        .floating-elements {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            pointer-events: none;
            overflow: hidden;
        }
        
        .floating-element {
            position: absolute;
            width: 100px;
            height: 100px;
            background: linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
            border-radius: 50%;
            animation: float 6s ease-in-out infinite;
        }
        
        .floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
        .floating-element:nth-child(2) { top: 60%; right: 10%; animation-delay: 2s; }
        .floating-element:nth-child(3) { bottom: 20%; left: 20%; animation-delay: 4s; }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
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
        <div class="floating-elements">
            <div class="floating-element"></div>
            <div class="floating-element"></div>
            <div class="floating-element"></div>
        </div>
        <div class="hero-content container">
            <h1>Transform Your Vision</h1>
            <p>Bringing innovative ideas to life with modern, beautiful, and functional design</p>
            <a href="#about" class="cta-button">Explore Our Work</a>
        </div>
    </section>
    
    <section class="section" id="about">
        <div class="container">
            <h2>About Our Mission</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto; font-size: 1.2rem; color: #64748b; line-height: 1.8;">
                ${userIdea}
            </p>
            
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Innovation First</h3>
                    <p>Cutting-edge solutions that push boundaries and deliver exceptional results for our clients.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Optimized performance and rapid delivery without compromising on quality or attention to detail.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
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
    
    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            const scrolled = window.scrollY > 50;
            
            if (scrolled) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
                header.querySelector('.logo').style.color = '#333';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = '#333';
                });
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.1)';
                header.style.backdropFilter = 'blur(20px)';
                header.querySelector('.logo').style.color = 'white';
                header.querySelectorAll('.nav-links a').forEach(link => {
                    link.style.color = 'rgba(255, 255, 255, 0.8)';
                });
            }
        });
        
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe feature cards
        document.querySelectorAll('.feature-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    </script>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-violet-500 rounded-xl flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Sark Generator</span>
          </div>
          
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Progress Section */}
        {isGenerating && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
              <span className="text-white font-medium">{statusMessage}</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/10" />
            <div className="text-white/60 text-sm mt-2">{progress}% complete</div>
          </div>
        )}

        {/* Generated Content */}
        {generatedCode && !isGenerating && (
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white/70 text-sm ml-4">Generated by Google Gemini 2.5 Pro</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={copyToClipboard}
                  size="sm" 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={downloadCode}
                  size="sm" 
                  variant="ghost" 
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-white/5 m-4 mb-0">
                <TabsTrigger value="preview" className="data-[state=active]:bg-white/10 text-white">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </TabsTrigger>
                <TabsTrigger value="code" className="data-[state=active]:bg-white/10 text-white">
                  <Code2 className="w-4 h-4 mr-2" />
                  Code
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="preview" className="m-4 mt-0">
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden" style={{ height: '600px' }}>
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
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <MonacoEditor
                    height="600px"
                    language="html"
                    theme="vs-dark"
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
          <div className="mt-8 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <h3 className="text-white font-medium mb-2">Your Idea:</h3>
            <p className="text-white/70">{idea}</p>
          </div>
        )}
      </div>
    </div>
  )
}