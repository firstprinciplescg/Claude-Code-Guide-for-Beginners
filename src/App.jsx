import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { CopyButton } from '@/components/ui/copy-button.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock, InlineCode } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'
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
    { id: 'tutorial', title: 'Practice Tutorial: Creating Your Own Claude Code Guide', icon: FolderTree },
    { id: 'reference', title: 'Commands Reference', icon: Bug }
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
              
              {/* Section TOC */}
              <SectionTOC 
                sections={[
                  { id: 'terminal-interface', title: 'Terminal Interface' },
                  { id: 'vscode-extension', title: 'VS Code Extension' },
                  { id: 'understanding-context', title: 'Understanding Context' },
                  { id: 'additional-context-items', title: 'Additional Context Management' }
                ]}
                className="mb-8"
              />
              
              <div className="space-y-8">
                {/* Terminal Interface */}
                <div data-subsection="terminal-interface">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Terminal Interface</h3>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-6">
                        The Claude Code terminal interface is your primary gateway to AI-powered development assistance. 
                        Unlike traditional development tools, Claude Code operates through conversational commands that 
                        feel natural while providing powerful automation capabilities.
                      </p>
                      
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <h4 className="font-semibold text-blue-900 mb-2">Getting Started</h4>
                        <CodeBlock 
                          code="claude-code"
                          title="Launch Claude Code"
                          language="bash"
                        />
                      </div>
                      
                      <ExpandableSection title="Key Terminal Features" className="mb-4 mt-6">
                        <ul className="space-y-3 text-gray-600">
                          <li className="flex items-start space-x-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span><strong>Real-time code generation:</strong> Watch Claude write code as you describe what you need</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span><strong>Intelligent file suggestions:</strong> Automatic recommendations based on project structure</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span><strong>Rich text formatting:</strong> Syntax highlighting and file previews in terminal</span>
                          </li>
                          <li className="flex items-start space-x-2">
                            <span className="font-medium text-blue-600">•</span>
                            <span><strong>Context preservation:</strong> Maintains conversation history and project awareness</span>
                          </li>
                        </ul>
                      </ExpandableSection>
                      
                      <p className="text-gray-600">
                        When you launch Claude Code, you enter an interactive session where you can describe what you want to 
                        accomplish in plain English. The interface maintains context throughout your session, remembering 
                        previous conversations, file changes, and project details.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* VS Code Extension */}
                <div data-subsection="vscode-extension">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">VS Code Extension</h3>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-6">
                        The VS Code extension brings Claude Code's capabilities directly into your familiar development 
                        environment. This integration allows you to leverage Claude's assistance without leaving your 
                        preferred editor, creating a seamless development experience.
                      </p>
                      
                      <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <h4 className="font-semibold text-purple-900 mb-3">Extension Features</h4>
                          <ul className="text-sm text-purple-800 space-y-2">
                            <li>• Dedicated Claude Code panel</li>
                            <li>• Visual diff views</li>
                            <li>• Inline code suggestions</li>
                            <li>• Integrated file management</li>
                            <li>• Clickable file references</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h4 className="font-semibold text-green-900 mb-3">Integration Benefits</h4>
                          <ul className="text-sm text-green-800 space-y-2">
                            <li>• Works with existing Git workflow</li>
                            <li>• Integrates with debugging tools</li>
                            <li>• Compatible with extension ecosystem</li>
                            <li>• Maintains your keybindings</li>
                            <li>• Preserves editor preferences</li>
                          </ul>
                        </div>
                      </div>
                      
                      <p className="text-gray-600">
                        The VS Code extension is particularly valuable for developers who prefer visual interfaces and 
                        want to maintain their existing development workflow while adding AI assistance. It provides the 
                        same conversational interface as the terminal but with enhanced visual feedback and editor integration.
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Understanding Context */}
                <div data-subsection="understanding-context">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Understanding Context</h3>
                  
                  <div className="space-y-6">
                    {/* @ Symbol Tagging */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-blue-600 font-mono text-lg">@</span>
                          <span>Tagging with @ Symbol</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          The @ symbol in Claude Code serves as your primary tool for providing specific context to your AI assistant. 
                          Think of it as a way to "tag" or reference specific files, directories, or code elements.
                        </p>
                        
                        <div className="space-y-4">
                          <ExpandableSection title="@ Tagging Examples" defaultExpanded={true}>
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Basic File Tagging</h5>
                                <CodeBlock 
                                  code="Can you review @src/components/UserAuth.tsx and suggest improvements?"
                                  title="Tag specific files"
                                />
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Directory Tagging</h5>
                                <CodeBlock 
                                  code="Please analyze the structure of @src/components/ and identify patterns"
                                  title="Tag entire directories"
                                />
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Multiple Tags</h5>
                                <CodeBlock 
                                  code="Compare @package.json with @yarn.lock and @src/api/client.js to understand dependencies"
                                  title="Combine multiple file references"
                                />
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Function-Specific Tagging</h5>
                                <CodeBlock 
                                  code="Help me optimize @utils.py:helperFunction for better performance"
                                  title="Reference specific functions within files"
                                />
                              </div>
                            </div>
                          </ExpandableSection>
                        </div>
                      </CardContent>
                    </Card>

                    {/* /clear Command */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-red-600 font-mono text-lg">/</span>
                          <span>The /clear Command</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          The <InlineCode>/clear</InlineCode> command is essential for managing conversation context in Claude Code. 
                          As your development session progresses, the conversation history can become lengthy and potentially 
                          confusing for the AI.
                        </p>
                        
                        <div className="bg-amber-50 p-4 rounded-lg mb-4">
                          <h5 className="font-semibold text-amber-900 mb-2">When to Use /clear</h5>
                          <ul className="text-amber-800 text-sm space-y-1">
                            <li>• Switching between different features or components</li>
                            <li>• Starting work on unrelated debugging issues</li>
                            <li>• When conversation becomes too long and unfocused</li>
                            <li>• Moving from planning phase to implementation</li>
                          </ul>
                        </div>
                        
                        <CodeBlock 
                          code="/clear"
                          title="Reset conversation context"
                          language="bash"
                        />
                        
                        <p className="text-gray-600 mt-4">
                          <strong>Important:</strong> The command doesn't affect your file system or any changes you've made—it 
                          only clears the conversational context. Claude will still have access to your current codebase through @ tags.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Additional Context Items */}
                <div data-subsection="additional-context-items">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Additional Context Management</h3>
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-6">
                        Beyond @ tags and /clear, Claude Code offers several other context management features that 
                        enhance your development experience.
                      </p>
                      
                      <div className="grid gap-4">
                        <ExpandableSection title="Help and Documentation">
                          <div className="space-y-3">
                            <CodeBlock 
                              code="claude-code --help"
                              title="Get comprehensive help information"
                            />
                            <p className="text-gray-600">
                              Provides detailed information about available commands, flags, and usage patterns.
                            </p>
                          </div>
                        </ExpandableSection>
                        
                        <ExpandableSection title="File Watching">
                          <p className="text-gray-600 mb-3">
                            File watching capabilities automatically detect changes in your codebase, allowing Claude 
                            to stay current with your modifications even between conversation turns.
                          </p>
                          <div className="bg-blue-50 p-3 rounded text-sm text-blue-800">
                            <strong>Benefit:</strong> You don't need to constantly re-tag files you're actively editing
                          </div>
                        </ExpandableSection>
                        
                        <ExpandableSection title="Environment Integration">
                          <p className="text-gray-600 mb-3">
                            Claude Code can access and understand your development environment configuration, including 
                            database connections, API configurations, and deployment settings.
                          </p>
                          <div className="bg-green-50 p-3 rounded text-sm text-green-800">
                            <strong>Security:</strong> API keys and sensitive data are handled securely and never logged
                          </div>
                        </ExpandableSection>
                        
                        <ExpandableSection title="Session Persistence">
                          <p className="text-gray-600">
                            Even if you close and reopen Claude Code, it can restore context from your previous session, 
                            making it easier to continue complex development tasks across multiple work sessions.
                          </p>
                        </ExpandableSection>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Common Workflows Section */}
            <section data-section="workflows" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Common Workflows</h2>
              
              {/* Section TOC */}
              <SectionTOC 
                sections={[
                  { id: 'understanding-codebases', title: 'Understanding New Codebases' },
                  { id: 'building-features', title: 'Building Features' },
                  { id: 'fixing-bugs', title: 'Fixing Bugs' }
                ]}
                className="mb-8"
              />
              
              <div className="space-y-8">
                {/* Understanding New Codebases */}
                <div data-subsection="understanding-codebases">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Understanding New Codebases</h3>
                  
                  <div className="space-y-6">
                    {/* Get Codebase Overview */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold text-lg">1.</span>
                          <span>Get Codebase Overview</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          When encountering a new codebase, start by gaining a high-level understanding of the project 
                          structure, technologies used, and overall architecture.
                        </p>
                        
                        <ExpandableSection title="How to Get Started" className="mb-4">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Basic Overview Request</h5>
                              <CodeBlock 
                                code="Can you give me an overview of this codebase? @README.md @package.json"
                                title="Start with key project files"
                              />
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">For Larger Codebases</h5>
                              <CodeBlock 
                                code="What's the main application flow in @src/ and how is the database layer organized?"
                                title="Focus on specific aspects"
                              />
                            </div>
                          </div>
                        </ExpandableSection>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <h5 className="font-semibold text-green-900 mb-2">What Claude Will Identify</h5>
                          <ul className="text-green-800 text-sm space-y-1">
                            <li>• Project structure and folder organization</li>
                            <li>• Main technologies and frameworks used</li>
                            <li>• Entry points and configuration files</li>
                            <li>• Architectural patterns (MVC, microservices, etc.)</li>
                            <li>• Build and deployment processes</li>
                            <li>• Areas of potential technical debt</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Dive into Specific Components */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold text-lg">2.</span>
                          <span>Dive into Specific Components</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Once you have a general understanding, explore specific components or modules relevant to your work.
                        </p>
                        
                        <div className="space-y-4">
                          <ExpandableSection title="Component Analysis Examples">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Analyze Specific Components</h5>
                                <CodeBlock 
                                  code="What does this UserAuth component do and how does it integrate with the rest of the application? @src/components/UserAuth/"
                                  title="Deep dive into components"
                                />
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Understand Implementation Details</h5>
                                <CodeBlock 
                                  code="Can you walk me through how the authentication flow works in @src/components/UserAuth.tsx?"
                                  title="Trace functionality step by step"
                                />
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Identify Patterns</h5>
                                <CodeBlock 
                                  code="How is error handling implemented in @src/components/ and what patterns are used consistently?"
                                  title="Learn project conventions"
                                />
                              </div>
                            </div>
                          </ExpandableSection>
                        </div>
                        
                        <div className="bg-blue-50 p-4 rounded-lg mt-4">
                          <p className="text-blue-800 text-sm">
                            <strong>Pro Tip:</strong> Ask Claude to explain not just what the code does, but why it's 
                            structured the way it is. This helps you understand the reasoning behind design decisions.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Find Relevant Code */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-blue-600 font-bold text-lg">3.</span>
                          <span>Find Relevant Code</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Efficiently locate code related to specific functionality or features using Claude's 
                          understanding of code relationships and semantic search capabilities.
                        </p>
                        
                        <ExpandableSection title="Smart Code Discovery">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Find Feature Implementation</h5>
                              <CodeBlock 
                                code="Where is the user registration logic implemented? Show me all files involved."
                                title="Locate functionality across the codebase"
                              />
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Trace Dependencies</h5>
                              <CodeBlock 
                                code="What files are affected if I modify @database/schema/users.sql?"
                                title="Understand ripple effects of changes"
                              />
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Identify Related Code</h5>
                              <CodeBlock 
                                code="Show me all files related to payment processing and how they work together"
                                title="Map feature boundaries"
                              />
                            </div>
                          </div>
                        </ExpandableSection>
                        
                        <div className="bg-purple-50 p-4 rounded-lg mt-4">
                          <h5 className="font-semibold text-purple-900 mb-2">Claude's Code Discovery Powers</h5>
                          <ul className="text-purple-800 text-sm space-y-1">
                            <li>• Traces relationships between files and functions</li>
                            <li>• Identifies patterns and conventions used throughout</li>
                            <li>• Maps data flow across multiple layers</li>
                            <li>• Suggests where to make changes safely</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Building Features */}
                <div data-subsection="building-features">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Building Features</h3>
                  
                  <div className="space-y-6">
                    {/* Describe the Feature */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-green-600 font-bold text-lg">1.</span>
                          <span>Describe the Feature</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Effective feature development starts with clear, detailed feature descriptions. The more 
                          specific you are, the better Claude can plan the implementation.
                        </p>
                        
                        <ExpandableSection title="Good vs. Better Feature Descriptions" defaultExpanded={true}>
                          <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                <h5 className="font-semibold text-red-900 mb-2">❌ Vague Request</h5>
                                <CodeBlock 
                                  code="I need a login feature"
                                  title="Too basic"
                                />
                              </div>
                              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                <h5 className="font-semibold text-green-900 mb-2">✅ Detailed Request</h5>
                                <CodeBlock 
                                  code="I need a user authentication system that supports email/password login, includes password reset functionality, integrates with our existing user database, provides JWT tokens for session management, and works with our React frontend and Node.js backend following our existing API patterns."
                                  title="Comprehensive requirements"
                                />
                              </div>
                            </div>
                            
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h5 className="font-semibold text-blue-900 mb-2">Include These Details</h5>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• User experience and interaction flow</li>
                                <li>• Integration points with existing systems</li>
                                <li>• Error handling and edge cases</li>
                                <li>• Performance and security requirements</li>
                                <li>• Technology stack constraints</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>

                    {/* Review the Plan */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-green-600 font-bold text-lg">2.</span>
                          <span>Review the Plan</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Claude will provide a detailed implementation plan. Take time to review and understand 
                          the proposed approach before proceeding.
                        </p>
                        
                        <ExpandableSection title="What to Look For in the Plan">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Implementation Strategy</h5>
                              <ul className="text-gray-600 text-sm space-y-1">
                                <li>• File modifications and new files to create</li>
                                <li>• Database changes and migrations</li>
                                <li>• Step-by-step implementation order</li>
                                <li>• Integration points and dependencies</li>
                              </ul>
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Questions to Ask</h5>
                              <CodeBlock 
                                code="Why did you choose JWT over sessions for this implementation?"
                                title="Understand design decisions"
                              />
                              <CodeBlock 
                                code="Can we implement this using TypeScript instead of JavaScript?"
                                title="Request modifications"
                              />
                              <CodeBlock 
                                code="Are there alternative approaches we should consider?"
                                title="Explore options"
                              />
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>

                    {/* Approve Changes */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-green-600 font-bold text-lg">3.</span>
                          <span>Approve Changes</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Once satisfied with the plan, approve Claude to proceed with implementation. You'll see 
                          exactly what changes will be made before they're applied.
                        </p>
                        
                        <div className="bg-amber-50 p-4 rounded-lg mb-4">
                          <h5 className="font-semibold text-amber-900 mb-2">Review Process</h5>
                          <ul className="text-amber-800 text-sm space-y-1">
                            <li>• Claude shows diff views for each file</li>
                            <li>• Changes are grouped logically</li>
                            <li>• You can approve file by file or all at once</li>
                            <li>• Request modifications to specific parts</li>
                            <li>• Full control over what gets implemented</li>
                          </ul>
                        </div>
                        
                        <CodeBlock 
                          code="The validation logic looks good, but can you add more descriptive error messages for users?"
                          title="Request specific adjustments during approval"
                        />
                      </CardContent>
                    </Card>

                    {/* Test the Feature */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-green-600 font-bold text-lg">4.</span>
                          <span>Test the Feature</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          After implementation, Claude can help you test the new feature thoroughly with both 
                          automated tests and manual testing procedures.
                        </p>
                        
                        <ExpandableSection title="Comprehensive Testing Approach">
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Generate Test Cases</h5>
                              <CodeBlock 
                                code="Create comprehensive tests for this authentication feature, including unit tests, integration tests, and edge cases"
                                title="Automated testing"
                              />
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Manual Testing Procedures</h5>
                              <CodeBlock 
                                code="Provide step-by-step manual testing procedures for the login flow, including testing with valid credentials, invalid credentials, and password reset functionality"
                                title="User acceptance testing"
                              />
                            </div>
                            
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Debug Issues</h5>
                              <CodeBlock 
                                code="I'm getting a 401 error when trying to log in with valid credentials. Can you help debug this issue?"
                                title="Troubleshoot problems"
                              />
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Fixing Bugs */}
                <div data-subsection="fixing-bugs">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Fixing Bugs</h3>
                  
                  <div className="space-y-6">
                    {/* Share Error with Claude */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-red-600 font-bold text-lg">1.</span>
                          <span>Share Error with Claude</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Provide Claude with comprehensive information about the error for accurate diagnosis and resolution.
                        </p>
                        
                        <ExpandableSection title="What Information to Include" defaultExpanded={true}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-gray-900 mb-2">Complete Error Details</h5>
                              <CodeBlock 
                                code="I'm getting this error when trying to submit the contact form:

TypeError: Cannot read property 'email' of undefined
    at ContactForm.handleSubmit (/src/components/ContactForm.jsx:45:12)
    at onClick (/src/components/ContactForm.jsx:78:20)

Here's the relevant code: @src/components/ContactForm.jsx

Steps to reproduce:
1. Navigate to /contact page
2. Fill in name and message fields
3. Leave email field empty
4. Click submit button

Expected: Form should show validation error
Actual: Application crashes with TypeError"
                                title="Comprehensive bug report"
                              />
                            </div>
                            
                            <div className="bg-blue-50 p-3 rounded">
                              <h6 className="font-semibold text-blue-900 mb-2">Essential Information</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Complete error message and stack trace</li>
                                <li>• Steps to reproduce the issue</li>
                                <li>• Expected vs. actual behavior</li>
                                <li>• Relevant code files with @tags</li>
                                <li>• Environment details (browser, Node version, etc.)</li>
                                <li>• Recent changes that might be related</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>

                    {/* Get Fix Recommendations */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-red-600 font-bold text-lg">2.</span>
                          <span>Get Fix Recommendations</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Claude analyzes the issue and provides specific fix recommendations with explanations 
                          of what's causing the problem and why the solutions work.
                        </p>
                        
                        <div className="space-y-4">
                          <ExpandableSection title="What Claude Provides">
                            <div className="space-y-4">
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Root Cause Analysis</h5>
                                <p className="text-gray-600 text-sm mb-2">
                                  Explanation of what's causing the problem and why it's happening
                                </p>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Multiple Solution Options</h5>
                                <p className="text-gray-600 text-sm mb-2">
                                  Different approaches with trade-offs explained
                                </p>
                              </div>
                              
                              <div>
                                <h5 className="font-semibold text-gray-900 mb-2">Context-Aware Fixes</h5>
                                <p className="text-gray-600 text-sm mb-2">
                                  Solutions that don't break other functionality
                                </p>
                              </div>
                            </div>
                          </ExpandableSection>
                          
                          <div className="bg-purple-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-purple-900 mb-2">Ask Follow-up Questions</h5>
                            <div className="space-y-2">
                              <CodeBlock 
                                code="Why does this solution work better than just adding a try-catch block?"
                                title="Understand the reasoning"
                              />
                              <CodeBlock 
                                code="This fix might impact performance. Are there more efficient approaches?"
                                title="Explore alternatives"
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Apply the Fix */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <span className="text-red-600 font-bold text-lg">3.</span>
                          <span>Apply the Fix</span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 mb-4">
                          Once you've chosen a fix approach, Claude implements the solution with the same 
                          review and approval process used for new features.
                        </p>
                        
                        <div className="space-y-4">
                          <div className="bg-green-50 p-4 rounded-lg">
                            <h5 className="font-semibold text-green-900 mb-2">What You Get</h5>
                            <ul className="text-green-800 text-sm space-y-1">
                              <li>• Exact changes shown before implementation</li>
                              <li>• Additional improvements beyond the immediate fix</li>
                              <li>• Verification that the issue is resolved</li>
                              <li>• Regression test suggestions</li>
                              <li>• Documentation updates if needed</li>
                            </ul>
                          </div>
                          
                          <ExpandableSection title="Post-Fix Verification">
                            <div className="space-y-3">
                              <CodeBlock 
                                code="Can you help me verify that this bug is completely fixed and that no new issues have been introduced?"
                                title="Comprehensive testing after fix"
                              />
                              <CodeBlock 
                                code="What test cases should I add to prevent this type of bug in the future?"
                                title="Prevent regression"
                              />
                            </div>
                          </ExpandableSection>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
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
                Created with ❤️ by <a href="https://www.linkedin.com/in/mdustinmoore/">Dustin Moore</a> from <a href="https://firstprinciplescg.com">First Principles Consulting Group</a> using <a href="https://claude.ai">Claude</a> and <a href="https://www.anthropic.com/claude-code">Claude Code</a></p>
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

