import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { 
  BookOpen, 
  Code, 
  Terminal, 
  Zap, 
  Bug, 
  FolderTree, 
  Settings, 
  Github,
  ChevronRight,
  Menu,
  X,
  ExternalLink
} from 'lucide-react'
import workflowDiagram from './assets/claude_code_workflow_diagram.png'
import featuresOverview from './assets/claude_code_features_overview.png'
import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'core-concepts', title: 'Core Concepts', icon: Code },
    { id: 'workflows', title: 'Common Workflows', icon: Terminal },
    { id: 'best-practices', title: 'Best Practices', icon: Settings },
    { id: 'advanced', title: 'Advanced Topics', icon: Github },
    { id: 'tutorial', title: 'Practical Tutorial', icon: FolderTree },
    { id: 'reference', title: 'Reference', icon: Bug }
  ]

  const features = [
    {
      title: "Build Features from Descriptions",
      description: "Simply describe what you want to build in plain English, and Claude Code will create a plan, write the code, and ensure it works.",
      icon: Code
    },
    {
      title: "Debug and Fix Issues",
      description: "Paste an error message or describe a bug, and Claude Code will analyze your codebase and implement a fix.",
      icon: Bug
    },
    {
      title: "Navigate Any Codebase",
      description: "Ask anything about your team's codebase and get thoughtful answers. Claude maintains awareness of your entire project.",
      icon: FolderTree
    },
    {
      title: "Automate Tedious Tasks",
      description: "Fix linting issues, resolve merge conflicts, and write release notes with a single command.",
      icon: Settings
    }
  ]

  const commands = [
    { command: 'claude', description: 'Start interactive mode', example: 'claude' },
    { command: 'claude "task"', description: 'Run a one-time task', example: 'claude "fix the build error"' },
    { command: 'claude -p "query"', description: 'Run one-off query, then exit', example: 'claude -p "explain this function"' },
    { command: '/clear', description: 'Clear conversation history', example: '> /clear' },
    { command: '/help', description: 'Show available commands', example: '> /help' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('data-section')

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(`[data-section="${sectionId}"]`)
    if (element) {
      const headerHeight = 80 // Account for sticky header height
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Claude Code Guide</h1>
              <p className="text-sm text-gray-600">Complete guide for novice users</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}>
          <div className="pt-20 md:pt-4">
            <ScrollArea className="h-[calc(100vh-5rem)]">
              <nav className="p-4 space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64">
          <div className="container mx-auto px-4 py-8 max-w-4xl">
            
            {/* Hero Section */}
            <section data-section="introduction" className="mb-16">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">
                  AI-Powered Development
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                  Claude Code
                  <span className="block text-blue-600">Complete Guide</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                  Master Anthropic's revolutionary agentic coding tool. From installation to advanced workflows, 
                  this comprehensive guide will transform how you write, debug, and think about code.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={() => scrollToSection('getting-started')}>
                    Get Started <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View on GitHub <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {features.map((feature, index) => {
                  const Icon = feature.icon
                  return (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <CardTitle className="text-lg">{feature.title}</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              {/* Visual Diagrams */}
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Development Process</CardTitle>
                    <CardDescription>
                      The typical workflow when using Claude Code for development tasks
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src={workflowDiagram} 
                      alt="Claude Code Development Process" 
                      className="w-full rounded-lg border"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Key Features Overview</CardTitle>
                    <CardDescription>
                      Four main categories of functionality that make Claude Code invaluable
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <img 
                      src={featuresOverview} 
                      alt="Claude Code Key Features" 
                      className="w-full rounded-lg border"
                    />
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Getting Started Section */}
            <section data-section="getting-started" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h2>
              
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Prerequisites</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Node.js 18 or newer</h4>
                        <p className="text-gray-600">Download from the official Node.js website</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <div>
                        <h4 className="font-semibold">Claude.ai or Anthropic Console account</h4>
                        <p className="text-gray-600">Sign up for a free account to use Claude Code</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Installation</CardTitle>
                    <CardDescription>Choose your preferred installation method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">NPM Install (Recommended)</h4>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                          npm install -g @anthropic-ai/claude-code
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Native Install</h4>
                        <div className="space-y-2">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">macOS, Linux, WSL:</p>
                            <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                              curl -fsSL https://claude.ai/install.sh | bash
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Core Concepts Section */}
            <section data-section="core-concepts" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Core Concepts</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="w-5 h-5" />
                      <span>The Claude Code Interface</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Claude Code is designed to be flexible. You can interact with it directly in your terminal 
                      or use the VS Code extension for a more integrated experience.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-blue-900 mb-2">Terminal Interface</h4>
                        <p className="text-blue-800 text-sm">
                          Primary interface with @-tagging, slash commands, and keyboard shortcuts
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-semibold text-purple-900 mb-2">VS Code Extension</h4>
                        <p className="text-purple-800 text-sm">
                          Integrated experience within your IDE for seamless development
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Understanding Context</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <Badge variant="outline">@-tagging</Badge>
                        <p className="text-gray-600">Use @ symbol to tag files and include them in conversation context</p>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Badge variant="outline">/clear</Badge>
                        <p className="text-gray-600">Clear conversation history to keep conversations focused</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Common Workflows Section */}
            <section data-section="workflows" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Workflows</h2>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Understanding New Codebases",
                    description: "Get quick overviews, explore components, and find relevant code",
                    steps: ["Get codebase overview", "Dive into specific components", "Find relevant code"]
                  },
                  {
                    title: "Building Features",
                    description: "From description to working feature in simple steps",
                    steps: ["Describe the feature", "Review the plan", "Approve changes", "Test the feature"]
                  },
                  {
                    title: "Fixing Bugs",
                    description: "Debug and resolve issues efficiently",
                    steps: ["Share error with Claude", "Get fix recommendations", "Apply the fix"]
                  }
                ].map((workflow, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{workflow.title}</CardTitle>
                      <CardDescription>{workflow.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {workflow.steps.map((step, stepIndex) => (
                          <Badge key={stepIndex} variant="secondary">
                            {stepIndex + 1}. {step}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <Separator className="my-16" />

            {/* Best Practices Section */}
            <section data-section="best-practices" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Practices & Pro Tips</h2>
              
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Writing Effective Prompts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-600"><strong>Be specific:</strong> Detailed requests get better results</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-600"><strong>Step-by-step:</strong> Break complex tasks into smaller steps</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <span className="text-gray-600"><strong>Let Claude explore:</strong> Allow codebase exploration first</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Terminal UI Tips</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Badge variant="outline">Shift+Enter</Badge>
                        <p className="text-sm text-gray-600">Create new lines</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline">Shift+Drag</Badge>
                        <p className="text-sm text-gray-600">Reference files</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline">Ctrl+V</Badge>
                        <p className="text-sm text-gray-600">Paste images</p>
                      </div>
                      <div className="space-y-2">
                        <Badge variant="outline">Escape</Badge>
                        <p className="text-sm text-gray-600">Stop Claude</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Advanced Topics Section */}
            <section data-section="advanced" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Topics</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    title: "GitHub Integration",
                    description: "Automatic pull request reviews and code analysis",
                    icon: Github
                  },
                  {
                    title: "Hooks",
                    description: "Shell commands executed at various lifecycle points",
                    icon: Settings
                  },
                  {
                    title: "Subagents",
                    description: "Specialized AI agents for specific tasks",
                    icon: Code
                  },
                  {
                    title: "Headless Mode",
                    description: "Run Claude Code without interactive UI for automation",
                    icon: Terminal
                  }
                ].map((topic, index) => {
                  const Icon = topic.icon
                  return (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Icon className="w-5 h-5" />
                          <span>{topic.title}</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{topic.description}</p>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </section>

            <Separator className="my-16" />

            {/* Tutorial Section */}
            <section data-section="tutorial" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Practical Tutorial: Building a Movie App</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Step-by-Step Project</CardTitle>
                  <CardDescription>
                    Learn by building a real-world application with watchlist functionality
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                      git clone https://github.com/sudeepmahato16/movie-app.git
                    </div>
                    <div className="grid gap-4">
                      {[
                        "Explain the codebase",
                        "Set up the environment", 
                        "Plan the watchlist feature",
                        "Build with Claude Code",
                        "Test and verify"
                      ].map((step, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                          </div>
                          <span className="text-gray-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-16" />

            {/* Reference Section */}
            <section data-section="reference" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Commands Reference</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Command Cheatsheet</CardTitle>
                  <CardDescription>Quick reference for the most important Claude Code commands</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-semibold">Command</th>
                          <th className="text-left py-2 font-semibold">Description</th>
                          <th className="text-left py-2 font-semibold">Example</th>
                        </tr>
                      </thead>
                      <tbody>
                        {commands.map((cmd, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                {cmd.command}
                              </code>
                            </td>
                            <td className="py-3 text-gray-600">{cmd.description}</td>
                            <td className="py-3">
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                {cmd.example}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t text-center text-gray-600">
              <p className="mb-4">
                Created with ❤️ by <strong>Manus AI</strong> • Based on official Anthropic documentation and community insights
              </p>
              <div className="flex justify-center space-x-6 text-sm">
                <a href="#" className="hover:text-blue-600 transition-colors">Documentation</a>
                <a href="#" className="hover:text-blue-600 transition-colors">GitHub</a>
                <a href="#" className="hover:text-blue-600 transition-colors">Community</a>
              </div>
            </footer>
          </div>
        </main>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default App

