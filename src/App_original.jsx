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
    { command: 'claude-code', description: 'Launch Claude Code in interactive mode', example: 'claude-code' },
    { command: 'claude-code --help', description: 'Display comprehensive help information', example: 'claude-code --help' },
    { command: 'claude-code --version', description: 'Display current version of Claude Code', example: 'claude-code --version' },
    { command: 'claude-code init', description: 'Initialize Claude Code configuration in project', example: 'claude-code init' },
    { command: 'claude-code --config', description: 'Access and modify configuration settings', example: 'claude-code --config api-key set [key]' },
    { command: 'claude-code --headless --task [name]', description: 'Run in headless mode for automation', example: 'claude-code --headless --task format-code' },
    { command: '/clear', description: 'Clear conversation history while maintaining context', example: '/clear' },
    { command: '/save [filename]', description: 'Save current conversation to file', example: '/save debugging-session.md' },
    { command: '/load [filename]', description: 'Load previously saved conversation', example: '/load debugging-session.md' },
    { command: '/diff [filename]', description: 'Display detailed diff view for file changes', example: '/diff src/components/UserAuth.tsx' },
    { command: '/undo', description: 'Revert last set of changes applied by Claude', example: '/undo' },
    { command: '/commit [message]', description: 'Create git commit with message', example: '/commit "Add user authentication"' },
    { command: '/status', description: 'Display current session information', example: '/status' },
    { command: '/files', description: 'List all files in conversation context', example: '/files' },
    { command: '/search [query]', description: 'Search across codebase for terms or patterns', example: '/search "getUserProfile"' },
    { command: '/export [format]', description: 'Export conversation or code changes', example: '/export markdown' },
    { command: '/test [component]', description: 'Generate and run tests for component', example: '/test UserAuth' },
    { command: '/deploy [environment]', description: 'Deploy project to specified environment', example: '/deploy staging' },
    { command: '/refactor [pattern]', description: 'Apply refactoring patterns across codebase', example: '/refactor extract-components' },
    { command: '/docs [component]', description: 'Generate documentation for components', example: '/docs api' }
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
              
              <SectionTOC 
                sections={[
                  { id: 'specific-requests', title: 'Be Specific: Detailed Requests Get Better Results' },
                  { id: 'step-by-step', title: 'Step-by-Step: Break Complex Tasks into Smaller Steps' },
                  { id: 'let-claude-explore', title: 'Let Claude Explore: Allow Codebase Exploration First' },
                  { id: 'terminal-ui-tips', title: 'Terminal UI Tips' }
                ]}
                className="mb-8"
              />

              <div className="space-y-8">
                {/* Be Specific Section */}
                <div data-subsection="specific-requests">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Be Specific: Detailed Requests Get Better Results</h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      The quality of Claude's responses directly correlates with the specificity of your requests. 
                      Instead of vague instructions, provide detailed context, specific requirements, and clear expectations.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-green-700">✓ Base Request vs Improved Request Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Example 1: API Integration" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                              <CodeBlock 
                                code="Help me add an API"
                                title="Vague request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                              <CodeBlock 
                                code="I need to integrate a REST API for user management that fetches user profiles from `/api/users/:id`, handles authentication with bearer tokens stored in localStorage, includes proper error handling for 401/403/500 responses, and updates the existing UserProfile component to display the fetched data with loading states."
                                title="Detailed request"
                              />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Specifies the exact API endpoint and HTTP method</li>
                                <li>• Identifies authentication method and storage location</li>
                                <li>• Lists specific error scenarios to handle</li>
                                <li>• Names the component to update</li>
                                <li>• Includes UX considerations (loading states)</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Example 2: Database Operations" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                              <CodeBlock 
                                code="Fix my database"
                                title="Vague request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                              <CodeBlock 
                                code="My PostgreSQL database queries are timing out when fetching user orders. The query joins three tables (users, orders, order_items) and needs to handle up to 10,000 records. I'm using Prisma ORM with Next.js. The specific query is in @lib/database/orders.js and the error occurs in the getUserOrderHistory function. I need optimization that maintains the same data structure for the frontend."
                                title="Detailed request"
                              />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Identifies the specific database technology (PostgreSQL)</li>
                                <li>• Describes the exact problem (query timeouts)</li>
                                <li>• Provides scale context (10,000 records)</li>
                                <li>• Mentions the ORM and framework being used</li>
                                <li>• Uses @tags to reference specific files</li>
                                <li>• Sets constraints (maintain data structure)</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Example 3: UI Component Development" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                              <CodeBlock 
                                code="Create a form"
                                title="Vague request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                              <CodeBlock 
                                code="Create a responsive contact form component for our React/TypeScript project that includes fields for name, email, phone, and message. It should use our existing design system in @components/ui/, implement real-time validation with error messages, handle form submission to our /api/contact endpoint, show loading and success states, and follow WCAG accessibility guidelines. The form should match the styling patterns used in @components/auth/LoginForm.tsx."
                                title="Detailed request"
                              />
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Specifies technology stack (React/TypeScript)</li>
                                <li>• Lists exact form fields needed</li>
                                <li>• References existing design system with @tags</li>
                                <li>• Includes validation and UX requirements</li>
                                <li>• Mentions API endpoint for submission</li>
                                <li>• Addresses accessibility compliance</li>
                                <li>• References existing patterns to follow</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Step-by-Step Section */}
                <div data-subsection="step-by-step" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Step-by-Step: Break Complex Tasks into Smaller Steps</h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Large, complex tasks can overwhelm both you and Claude. Breaking them into smaller, 
                      manageable steps leads to better results, easier debugging, and clearer progress tracking.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-700">📝 Complex Task Breakdown Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Example 1: E-commerce Checkout System" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Large Task</h5>
                              <CodeBlock 
                                code="Build a complete checkout system for our e-commerce site"
                                title="Overwhelming request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Broken into Smaller Steps</h5>
                              <div className="space-y-2">
                                {[
                                  "Create shopping cart state management with add/remove/update quantity functions",
                                  "Build cart display component with item details and price calculations", 
                                  "Implement shipping address form with validation and address lookup",
                                  "Add payment method selection (credit card, PayPal, etc.)",
                                  "Create order summary component with tax and shipping calculations",
                                  "Integrate payment processing with Stripe API",
                                  "Build order confirmation page and email notifications",
                                  "Add inventory checking and reservation during checkout",
                                  "Implement order tracking and status updates"
                                ].map((step, index) => (
                                  <div key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                                    <span className="text-green-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                                    <span className="text-green-800 text-sm">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why stepwise is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Each step can be developed, tested, and refined individually</li>
                                <li>• Allows validation of functionality at each stage</li>
                                <li>• Makes debugging easier by isolating issues</li>
                                <li>• Enables requirement adjustments based on learning</li>
                                <li>• Provides clear progress milestones</li>
                                <li>• Makes the project less overwhelming</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Example 2: User Authentication System" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Large Task</h5>
                              <CodeBlock 
                                code="Implement user authentication across the entire application"
                                title="Overwhelming request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Broken into Smaller Steps</h5>
                              <div className="space-y-2">
                                {[
                                  "Set up user database schema and models",
                                  "Create registration API endpoint with validation",
                                  "Build login API with password hashing and JWT generation",
                                  "Implement password reset functionality with email tokens",
                                  "Create authentication middleware for protected routes",
                                  "Build registration form component with real-time validation",
                                  "Create login form component with error handling",
                                  "Add authentication context/state management to React app",
                                  "Implement route protection in frontend",
                                  "Add user profile management (view/edit profile)",
                                  "Create logout functionality and token cleanup"
                                ].map((step, index) => (
                                  <div key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                                    <span className="text-green-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                                    <span className="text-green-800 text-sm">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why stepwise is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Authentication touches many parts of an application</li>
                                <li>• Building incrementally ensures each piece works correctly</li>
                                <li>• Allows thorough testing of security features at each step</li>
                                <li>• Makes troubleshooting issues much easier</li>
                                <li>• Enables security review at each stage</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Example 3: Data Dashboard with Analytics" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-red-600 mb-2">❌ Large Task</h5>
                              <CodeBlock 
                                code="Create a comprehensive analytics dashboard for our SaaS application"
                                title="Overwhelming request"
                              />
                            </div>

                            <div>
                              <h5 className="font-semibold text-green-600 mb-2">✅ Broken into Smaller Steps</h5>
                              <div className="space-y-2">
                                {[
                                  "Design database schema for tracking user events and metrics",
                                  "Implement event tracking API endpoints for data collection",
                                  "Create data aggregation jobs for daily/weekly/monthly summaries",
                                  "Build reusable chart components (line, bar, pie charts)",
                                  "Develop key metrics calculations (user growth, retention, revenue)",
                                  "Create individual dashboard widgets for each metric type",
                                  "Implement dashboard layout with drag-and-drop customization",
                                  "Add date range filtering and time period comparisons",
                                  "Build export functionality for reports (PDF, CSV)",
                                  "Add real-time updates and live data streaming",
                                  "Implement user-specific dashboard configurations"
                                ].map((step, index) => (
                                  <div key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                                    <span className="text-green-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                                    <span className="text-green-800 text-sm">{step}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Why stepwise is better:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Analytics dashboards involve complex data processing</li>
                                <li>• Breaking it down allows data accuracy validation at each step</li>
                                <li>• Ensures performance with each new component</li>
                                <li>• Enables user feedback on individual features</li>
                                <li>• Prevents building a complete system before validation</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Let Claude Explore Section */}
                <div data-subsection="let-claude-explore" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let Claude Explore: Allow Codebase Exploration First</h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Before diving into implementation, let Claude explore your codebase to understand existing patterns, 
                      technologies, and architectural decisions. This leads to solutions that integrate seamlessly with your project.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-purple-700">🔍 Exploration Strategy</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Example of Prompting Claude to Explore" defaultExpanded={true}>
                          <div className="space-y-4">
                            <div>
                              <h5 className="font-semibold text-purple-600 mb-2">Exploration Prompt</h5>
                              <CodeBlock 
                                code="Before we start working on the user notification system, can you explore the codebase to understand how we currently handle user communications, what technologies we're using for messaging, and what patterns we follow for user-facing features? Please examine @src/, @package.json, and any files related to email, notifications, or user communication."
                                title="Comprehensive exploration request"
                              />
                            </div>

                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-purple-900 mb-2">What Exploration Means:</h6>
                              <p className="text-purple-800 text-sm mb-3">
                                When Claude explores a codebase, it systematically examines:
                              </p>
                              <ul className="text-purple-800 text-sm space-y-1">
                                <li>• Project structure and organization patterns</li>
                                <li>• Existing conventions and code styles</li>
                                <li>• Technology stack and dependencies</li>
                                <li>• Component relationships and data flow</li>
                                <li>• Relevant existing functionality to build upon</li>
                              </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-green-900 mb-2">Benefits of Exploration:</h6>
                              <ul className="text-green-800 text-sm space-y-1">
                                <li>• Ensures consistency with existing code styles</li>
                                <li>• Identifies reusable components or utilities</li>
                                <li>• Avoids duplicating existing functionality</li>
                                <li>• Follows established architectural patterns</li>
                                <li>• Provides context-aware suggestions</li>
                                <li>• Integrates seamlessly with project ecosystem</li>
                              </ul>
                            </div>

                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">What Claude Might Discover:</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Existing notification infrastructure you weren't aware of</li>
                                <li>• Patterns for handling user preferences to follow</li>
                                <li>• Utility functions that can be reused</li>
                                <li>• Styling systems and component patterns</li>
                                <li>• Testing frameworks and conventions</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Terminal UI Tips Section */}
                <div data-subsection="terminal-ui-tips" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">Terminal UI Tips</h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Master these essential terminal commands and shortcuts to work more efficiently with Claude Code.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-indigo-700">⌨️ Essential Terminal Commands and Tips</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {[
                            { command: "claude-code --help", description: "Display comprehensive help information including all available commands, flags, and usage examples" },
                            { command: "claude-code --version", description: "Check your current Claude Code version for compatibility and troubleshooting" },
                            { command: "claude-code init", description: "Initialize Claude Code in a new project directory with configuration files" },
                            { command: "claude-code --config", description: "Access and modify Claude Code configuration settings, API keys, and preferences" },
                            { command: "claude-code --verbose", description: "Enable detailed logging for debugging internal operations and decision-making" },
                            { command: "Ctrl + C", description: "Gracefully interrupt ongoing operations without losing session context" },
                            { command: "/save [filename]", description: "Save current conversation to file for future reference and documentation" },
                            { command: "/load [filename]", description: "Load previously saved conversation to continue complex development tasks" },
                            { command: "/export", description: "Export code changes and conversation history in various formats (markdown, diff)" },
                            { command: "/status", description: "Display current session information including active file watchers and context size" },
                            { command: "/diff [file]", description: "Show detailed diff view for any file modified during the session" },
                            { command: "/undo", description: "Revert the last set of changes applied by Claude Code safely" },
                            { command: "/files", description: "List all files currently being watched or referenced in conversation" },
                            { command: "/search [query]", description: "Search across entire codebase for specific terms, functions, or patterns" },
                            { command: "/commit [message]", description: "Create git commits with AI-generated or custom commit messages" }
                          ].map((tip, index) => (
                            <div key={index} className="p-4 border border-gray-200 rounded-lg">
                              <code className="text-indigo-600 font-semibold text-sm bg-indigo-50 px-2 py-1 rounded">
                                {tip.command}
                              </code>
                              <p className="text-gray-600 text-sm mt-2">{tip.description}</p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <h6 className="font-semibold text-yellow-900 mb-2">💡 Pro Tips:</h6>
                          <ul className="text-yellow-800 text-sm space-y-1">
                            <li>• Use `/clear` frequently when switching between different development tasks</li>
                            <li>• Combine multiple @ tags in one message to provide comprehensive context</li>
                            <li>• Save important debugging sessions with `/save` for team knowledge sharing</li>
                            <li>• Use `/status` to monitor context size and session health during long sessions</li>
                            <li>• The `/search` command understands code semantics, not just text matching</li>
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Advanced Topics Section */}
            <section data-section="advanced" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Advanced Topics</h2>
              
              <SectionTOC 
                sections={[
                  { id: 'github-integration', title: 'GitHub Integration' },
                  { id: 'hooks', title: 'Hooks' },
                  { id: 'subagents', title: 'Subagents' },
                  { id: 'headless-mode', title: 'Headless Mode' }
                ]}
                className="mb-8"
              />

              <div className="space-y-12">
                {/* GitHub Integration Section */}
                <div data-subsection="github-integration">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                    <Github className="w-6 h-6 text-gray-700" />
                    <span>GitHub Integration</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Claude Code's GitHub integration enables seamless collaboration workflows, automated pull request management, 
                      and intelligent code analysis directly within your development process.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-blue-700">🔧 Detailed Integration Walkthrough</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Step 1: Initial Setup" defaultExpanded={true}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              First, ensure you have GitHub CLI installed and properly authenticated.
                            </p>
                            <CodeBlock 
                              code={`# Install GitHub CLI (if not already installed)
# On macOS:
brew install gh

# On Windows:
winget install --id GitHub.cli

# On Linux:
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=\\$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Authenticate with GitHub
gh auth login`}
                              title="GitHub CLI Installation & Authentication"
                            />
                            
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">Configuration Setup</h6>
                              <CodeBlock 
                                code="# Enable GitHub integration in Claude Code
claude-code --config github enable

# Verify GitHub connection
gh auth status"
                                title="Claude Code GitHub configuration"
                              />
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Step 2: Repository Connection" defaultExpanded={false}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Connect your project directory to GitHub and configure Claude Code to understand your repository setup.
                            </p>
                            
                            <div>
                              <h6 className="font-semibold text-gray-900 mb-2">Repository Setup Commands</h6>
                              <CodeBlock 
                                code="# Navigate to your project directory
cd /path/to/your/project

# Initialize git repository (if needed)
git init

# Add GitHub remote
git remote add origin https://github.com/username/repository-name.git

# Let Claude analyze repository configuration
# In Claude Code session:
@.git/config"
                                title="Repository connection setup"
                              />
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-green-900 mb-2">What Claude Can Now Access:</h6>
                              <ul className="text-green-800 text-sm space-y-1">
                                <li>• Repository metadata and branch information</li>
                                <li>• Existing pull request and issue context</li>
                                <li>• Team collaboration patterns and workflows</li>
                                <li>• Branch protection rules and CI/CD requirements</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Step 3: Branch Management Integration" defaultExpanded={false}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Configure Claude Code to automatically create appropriate feature branches and follow your team's branching strategy.
                            </p>
                            
                            <CodeBlock 
                              code={`# Example Claude Code conversation for branch creation:
# "I need to implement user authentication for the login feature"

# Claude can automatically suggest and create:
git checkout -b feature/user-authentication-login

# Or follow your team's patterns:
git checkout -b feat/AUTH-123-implement-login-system
git checkout -b bugfix/ISSUE-456-fix-validation-error`}
                              title="Automated branch creation"
                            />

                            <div className="bg-purple-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-purple-900 mb-2">Branch Strategy Configuration</h6>
                              <ul className="text-purple-800 text-sm space-y-1">
                                <li>• Claude learns your team's branch naming conventions</li>
                                <li>• Automatically creates branches based on task descriptions</li>
                                <li>• Understands branch protection rules and requirements</li>
                                <li>• Suggests appropriate base branches for different change types</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Step 4: Pull Request Automation" defaultExpanded={false}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Enable Claude Code to create comprehensive pull requests with detailed descriptions, testing instructions, and impact analysis.
                            </p>
                            
                            <CodeBlock 
                              code={`# After implementing a feature, Claude can create PR:
gh pr create --title "Implement user authentication system" --body "\\$(cat <<EOF
## Summary
- Added JWT-based authentication system
- Implemented login/logout functionality  
- Created user registration with email verification
- Added password reset capability

## Changes Made
- \`src/auth/AuthProvider.js\` - Authentication context and state management
- \`src/components/LoginForm.js\` - Login form component with validation
- \`src/api/auth.js\` - Authentication API endpoints
- \`src/middleware/authMiddleware.js\` - Route protection middleware

## Testing Instructions
1. Navigate to /login page
2. Test login with valid credentials
3. Verify JWT token storage in localStorage
4. Test password reset flow
5. Confirm logout clears authentication state

## Potential Impact
- **Frontend:** New authentication context affects all protected routes  
- **Backend:** New middleware applied to secure endpoints
- **Database:** New user sessions table created
- **Security:** Implements industry-standard JWT authentication

## Screenshots
[Include relevant UI screenshots]

Generated with Claude Code
EOF
)"`}
                              title="Automated PR creation with comprehensive description"
                            />
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Step 5: Issue Integration" defaultExpanded={false}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Connect Claude Code to your GitHub issues for automatic linking and status updates.
                            </p>
                            
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                <h6 className="font-semibold text-gray-900">Issue Linking</h6>
                                <CodeBlock 
                                  code={`# Commits automatically reference issues
git commit -m "Fix login validation

Resolves #123
Closes #124
Related to #125"`}
                                  title="Automatic issue linking"
                                />
                              </div>
                              <div className="space-y-3">
                                <h6 className="font-semibold text-gray-900">Status Updates</h6>
                                <CodeBlock 
                                  code={`# Claude can update issue status
gh issue edit 123 --add-label "in-progress"
gh issue edit 123 --add-label "ready-for-review"
gh issue close 123`}
                                  title="Issue status management"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Hooks Section */}
                <div data-subsection="hooks" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                    <Settings className="w-6 h-6 text-gray-700" />
                    <span>Hooks</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Hooks allow you to execute shell commands automatically at various points in your development lifecycle, 
                      enabling powerful automation and quality assurance workflows.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-orange-700">🪝 Hook Types and Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Pre-commit Hooks" defaultExpanded={true}>
                          <div className="space-y-4">
                            <p className="text-gray-700">
                              Execute before each commit to ensure code quality and consistency.
                            </p>
                            
                            <div className="grid gap-4">
                              <div className="p-4 border border-green-200 rounded-lg bg-green-50">
                                <h6 className="font-semibold text-green-900 mb-2">1. Code Formatting Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/pre-commit-format.sh

echo "Running code formatting..."

# Format JavaScript/TypeScript files
npx prettier --write "src/**/*.{js,ts,jsx,tsx}"

# Format CSS files  
npx prettier --write "src/**/*.{css,scss}"

# Format Python files
black src/

echo "Code formatting complete!"
exit 0`}
                                  title="Automatic code formatting"
                                />
                              </div>

                              <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                                <h6 className="font-semibold text-blue-900 mb-2">2. Lint Checking Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/pre-commit-lint.sh

echo "Running linting checks..."

# ESLint for JavaScript/TypeScript
npx eslint src/ --ext .js,.ts,.jsx,.tsx
if [ $? -ne 0 ]; then
    echo "ESLint failed. Please fix the issues before committing."
    exit 1
fi

# PyLint for Python
pylint src/**/*.py
if [ $? -ne 0 ]; then
    echo "PyLint failed. Please fix the issues before committing."
    exit 1
fi

echo "All linting checks passed!"
exit 0`}
                                  title="Comprehensive lint checking"
                                />
                              </div>

                              <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                                <h6 className="font-semibold text-purple-900 mb-2">3. Test Execution Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/pre-commit-test.sh

echo "Running test suite..."

# Run unit tests
npm test -- --watchAll=false --coverage
if [ $? -ne 0 ]; then
    echo "Unit tests failed. Please fix before committing."
    exit 1
fi

# Run integration tests
npm run test:integration
if [ $? -ne 0 ]; then
    echo "Integration tests failed. Please fix before committing."
    exit 1
fi

echo "All tests passed!"
exit 0`}
                                  title="Automated test execution"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Post-commit Hooks" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                                <h6 className="font-semibold text-indigo-900 mb-2">1. Deployment Trigger Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/post-commit-deploy.sh

# Get current branch
BRANCH=\\$(git rev-parse --abbrev-ref HEAD)

echo "Post-commit hook triggered on branch: \\$BRANCH"

# Trigger deployment for main branch
if [ "\\$BRANCH" = "main" ]; then
    echo "Triggering production deployment..."
    curl -X POST "https://api.netlify.com/build_hooks/YOUR_HOOK_ID"
elif [ "\\$BRANCH" = "develop" ]; then
    echo "Triggering staging deployment..."
    curl -X POST "https://api.netlify.com/build_hooks/YOUR_STAGING_HOOK_ID"
fi

echo "Deployment trigger complete!"
exit 0`}
                                  title="Automatic deployment triggers"
                                />
                              </div>

                              <div className="p-4 border border-teal-200 rounded-lg bg-teal-50">
                                <h6 className="font-semibold text-teal-900 mb-2">2. Documentation Update Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/post-commit-docs.sh

echo "Updating documentation..."

# Generate API documentation
npx typedoc src/ --out docs/api

# Update README if package.json changed
if git diff --name-only HEAD~1 HEAD | grep -q "package.json"; then
    echo "package.json changed, updating README..."
    node scripts/update-readme.js
    git add README.md
    git commit -m "docs: Update README with latest package info"
fi

echo "Documentation update complete!"
exit 0`}
                                  title="Automated documentation generation"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Pre-push Hooks" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                                <h6 className="font-semibold text-red-900 mb-2">1. Security Scan Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/pre-push-security.sh

echo "Running security scans..."

# Check for secrets in code
git secrets --scan

# Audit npm dependencies
npm audit --audit-level high
if [ $? -ne 0 ]; then
    echo "Security vulnerabilities found in dependencies!"
    exit 1
fi

# Scan for potential security issues
npx eslint src/ --config .eslintrc.security.js
if [ $? -ne 0 ]; then
    echo "Security lint issues found!"
    exit 1
fi

echo "Security scans passed!"
exit 0`}
                                  title="Comprehensive security scanning"
                                />
                              </div>

                              <div className="p-4 border border-amber-200 rounded-lg bg-amber-50">
                                <h6 className="font-semibold text-amber-900 mb-2">2. Build Verification Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/pre-push-build.sh

echo "Verifying build..."

# Clean previous builds
rm -rf dist/ build/

# Run production build
npm run build
if [ $? -ne 0 ]; then
    echo "Production build failed!"
    exit 1
fi

# Verify build artifacts
if [ ! -d "dist/" ] || [ -z "$(ls -A dist/)" ]; then
    echo "Build artifacts not generated properly!"
    exit 1
fi

echo "Build verification successful!"
exit 0`}
                                  title="Build verification process"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Post-merge Hooks" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div className="grid gap-4">
                              <div className="p-4 border border-cyan-200 rounded-lg bg-cyan-50">
                                <h6 className="font-semibold text-cyan-900 mb-2">1. Environment Sync Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/post-merge-sync.sh

echo "Syncing development environment..."

# Update dependencies if package files changed
if git diff --name-only HEAD@{1} HEAD | grep -q "package.json\\|package-lock.json"; then
    echo "Dependencies changed, running npm install..."
    npm install
fi

# Run database migrations if schema changed
if git diff --name-only HEAD@{1} HEAD | grep -q "migrations/"; then
    echo "Database migrations detected, running migrations..."
    npm run db:migrate
fi

# Clear caches
npm run cache:clear

echo "Environment sync complete!"
exit 0`}
                                  title="Environment synchronization"
                                />
                              </div>

                              <div className="p-4 border border-pink-200 rounded-lg bg-pink-50">
                                <h6 className="font-semibold text-pink-900 mb-2">2. Notification Hook</h6>
                                <CodeBlock 
                                  code={`#!/bin/bash
# .claude-code/hooks/post-merge-notify.sh

# Get merge information
BRANCH=$(git rev-parse --abbrev-ref HEAD)
AUTHOR=$(git log -1 --pretty=format:'%an')
MESSAGE=$(git log -1 --pretty=format:'%s')

echo "Sending team notifications..."

# Slack notification
curl -X POST -H 'Content-type: application/json' \\
    --data "{\\"text\\":\\"🎉 New merge to $BRANCH by $AUTHOR: $MESSAGE\\"}" \\
    https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK

# Discord notification (if using Discord)
curl -X POST -H "Content-Type: application/json" \\
    --data "{\\"content\\":\\"📦 **$BRANCH** updated by **$AUTHOR**: $MESSAGE\\"}" \\
    https://discord.com/api/webhooks/YOUR/DISCORD/WEBHOOK

echo "Notifications sent!"
exit 0`}
                                  title="Team notification system"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Subagents Section */}
                <div data-subsection="subagents" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                    <Code className="w-6 h-6 text-gray-700" />
                    <span>Subagents</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Subagents are specialized AI assistants designed for specific aspects of the development lifecycle. 
                      Each subagent has deep expertise in its domain and can work independently or collaboratively.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-violet-700">🤖 Development Lifecycle Subagents</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Planning Phase Subagents" defaultExpanded={true}>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 border border-blue-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-blue-600 font-bold">1.</span>
                                  <h6 className="font-semibold text-blue-900">Requirements Analyzer</h6>
                                </div>
                                <p className="text-blue-800 text-sm mb-3">
                                  Breaks down complex requirements into actionable tasks and identifies potential technical challenges.
                                </p>
                                <CodeBlock 
                                  code={`# Example interaction:
"Analyze requirements for a multi-tenant SaaS dashboard with real-time analytics"

# Subagent response:
- User authentication & tenant isolation
- Real-time data pipeline architecture  
- Scalable database schema design
- WebSocket implementation for live updates
- Caching strategy for performance
- Security considerations for multi-tenancy`}
                                  title="Requirements breakdown"
                                />
                              </div>

                              <div className="p-4 border border-green-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-green-600 font-bold">2.</span>
                                  <h6 className="font-semibold text-green-900">Architecture Planner</h6>
                                </div>
                                <p className="text-green-800 text-sm mb-3">
                                  Suggests system architecture patterns and component relationships based on project requirements.
                                </p>
                                <CodeBlock 
                                  code="# Architectural recommendations:
- Frontend: React with Redux Toolkit
- Backend: Node.js with Express
- Database: PostgreSQL with Redis cache
- Real-time: Socket.io for WebSocket connections
- Deployment: Docker containers on AWS ECS
- Monitoring: CloudWatch + DataDog integration"
                                  title="Architecture suggestions"
                                />
                              </div>

                              <div className="p-4 border border-purple-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-purple-600 font-bold">3.</span>
                                  <h6 className="font-semibold text-purple-900">Technology Advisor</h6>
                                </div>
                                <p className="text-purple-800 text-sm mb-3">
                                  Recommends appropriate technologies, libraries, and frameworks for specific use cases.
                                </p>
                                <CodeBlock 
                                  code="# Technology stack recommendations:
# For real-time features:
- Socket.io (WebSocket library)
- Redis (pub/sub messaging)
- Server-sent events (fallback)

# For data visualization:
- Chart.js or D3.js for complex charts
- React-Chartjs-2 for React integration
- Recharts for responsive charts"
                                  title="Technology recommendations"
                                />
                              </div>

                              <div className="p-4 border border-orange-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-orange-600 font-bold">4.</span>
                                  <h6 className="font-semibold text-orange-900">Timeline Estimator</h6>
                                </div>
                                <p className="text-orange-800 text-sm mb-3">
                                  Provides realistic time estimates for development tasks based on complexity and team velocity.
                                </p>
                                <CodeBlock 
                                  code="# Timeline estimation:
Phase 1 - Core Infrastructure: 2-3 weeks
- Database schema & API setup: 1 week
- Authentication system: 1 week  
- Basic dashboard layout: 1 week

Phase 2 - Real-time Features: 2-3 weeks
- WebSocket integration: 1 week
- Live data pipeline: 1-2 weeks
- Dashboard widgets: 1 week"
                                  title="Project timeline breakdown"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Implementation Phase Subagents" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 border border-indigo-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-indigo-600 font-bold">5.</span>
                                  <h6 className="font-semibold text-indigo-900">Code Generator</h6>
                                </div>
                                <p className="text-indigo-800 text-sm mb-3">
                                  Creates boilerplate code, components, and modules following project conventions and best practices.
                                </p>
                                <CodeBlock 
                                  code={`# Generated React component:
import React, { useState, useEffect } from 'react'
import { useSocket } from '../hooks/useSocket'
import { Chart } from '../components/Chart'

export const RealTimeDashboard = ({ tenantId }) => {
  const [data, setData] = useState([])
  const socket = useSocket()
  
  useEffect(() => {
    socket.emit('join-tenant', tenantId)
    socket.on('data-update', setData)
    return () => socket.off('data-update')
  }, [tenantId, socket])
  
  return <Chart data={data} />
}`}
                                  title="Generated component code"
                                />
                              </div>

                              <div className="p-4 border border-teal-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-teal-600 font-bold">6.</span>
                                  <h6 className="font-semibold text-teal-900">Database Designer</h6>
                                </div>
                                <p className="text-teal-800 text-sm mb-3">
                                  Designs schemas, relationships, and queries optimized for the application's data access patterns.
                                </p>
                                <CodeBlock 
                                  code="-- Multi-tenant schema design
CREATE TABLE tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID REFERENCES tenants(id),
  email VARCHAR(255) UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'member'
);"
                                  title="Database schema design"
                                />
                              </div>

                              <div className="p-4 border border-rose-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-rose-600 font-bold">7.</span>
                                  <h6 className="font-semibold text-rose-900">API Architect</h6>
                                </div>
                                <p className="text-rose-800 text-sm mb-3">
                                  Designs RESTful or GraphQL APIs with proper endpoint structure, authentication, and documentation.
                                </p>
                                <CodeBlock 
                                  code={`// Generated API routes
router.get('/api/v1/tenants/:tenantId/analytics', 
  authenticateToken,
  validateTenantAccess,
  async (req, res) => {
    const { tenantId } = req.params
    const { startDate, endDate } = req.query
    
    const analytics = await getAnalytics({
      tenantId, startDate, endDate
    })
    
    res.json({ success: true, data: analytics })
  }
)`}
                                  title="API endpoint design"
                                />
                              </div>

                              <div className="p-4 border border-emerald-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-emerald-600 font-bold">8.</span>
                                  <h6 className="font-semibold text-emerald-900">Frontend Specialist</h6>
                                </div>
                                <p className="text-emerald-800 text-sm mb-3">
                                  Creates responsive, accessible user interfaces following design systems and UX best practices.
                                </p>
                                <CodeBlock 
                                  code="// Generated responsive dashboard layout
const DashboardGrid = styled.div\`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  padding: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
\`"
                                  title="Responsive UI components"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Testing & Deployment Phase Subagents" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div className="p-4 border border-yellow-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-yellow-600 font-bold">9.</span>
                                  <h6 className="font-semibold text-yellow-900">Test Generator</h6>
                                </div>
                                <p className="text-yellow-800 text-sm mb-3">
                                  Creates comprehensive unit, integration, and end-to-end tests covering various scenarios and edge cases.
                                </p>
                                <CodeBlock 
                                  code={`// Generated test suite
describe('RealTimeDashboard', () => {
  it('should connect to socket on mount', () => {
    const mockSocket = { emit: jest.fn(), on: jest.fn() }
    useSocket.mockReturnValue(mockSocket)
    
    render(<RealTimeDashboard tenantId="123" />)
    
    expect(mockSocket.emit).toHaveBeenCalledWith('join-tenant', '123')
    expect(mockSocket.on).toHaveBeenCalledWith('data-update', expect.any(Function))
  })
})`}
                                  title="Automated test generation"
                                />
                              </div>

                              <div className="p-4 border border-red-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-red-600 font-bold">10.</span>
                                  <h6 className="font-semibold text-red-900">Performance Auditor</h6>
                                </div>
                                <p className="text-red-800 text-sm mb-3">
                                  Analyzes code for performance bottlenecks and suggests optimizations for speed and efficiency.
                                </p>
                                <CodeBlock 
                                  code="// Performance optimization suggestions:
// 1. Memoize expensive calculations
const expensiveCalculation = useMemo(() => 
  calculateMetrics(data), [data]
)

// 2. Virtualize large lists
import { FixedSizeList as List } from 'react-window'

// 3. Debounce search inputs
const debouncedSearch = useDebounce(searchTerm, 300)"
                                  title="Performance optimization code"
                                />
                              </div>

                              <div className="p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-gray-600 font-bold">11.</span>
                                  <h6 className="font-semibold text-gray-900">DevOps Engineer</h6>
                                </div>
                                <p className="text-gray-800 text-sm mb-3">
                                  Configures CI/CD pipelines, containerization, and deployment strategies for different environments.
                                </p>
                                <CodeBlock 
                                  code="# Generated Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD [\"npm\", \"start\"]

# Docker Compose for development
version: '3.8'
services:
  app:
    build: .
    ports: [\"3000:3000\"]
    environment:
      - NODE_ENV=development"
                                  title="Deployment configuration"
                                />
                              </div>

                              <div className="p-4 border border-cyan-200 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <span className="text-cyan-600 font-bold">12.</span>
                                  <h6 className="font-semibold text-cyan-900">Security Auditor</h6>
                                </div>
                                <p className="text-cyan-800 text-sm mb-3">
                                  Reviews code for security vulnerabilities and implements security best practices throughout the application.
                                </p>
                                <CodeBlock 
                                  code="// Security implementations:
// 1. Input validation
const validateTenantId = (id) => {
  if (!uuid.validate(id)) {
    throw new Error('Invalid tenant ID format')
  }
}

// 2. SQL injection prevention
const query = 'SELECT * FROM users WHERE tenant_id = $1'
const result = await db.query(query, [tenantId])

// 3. Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})"
                                  title="Security implementation code"
                                />
                              </div>
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Headless Mode Section */}
                <div data-subsection="headless-mode" className="mt-12">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                    <Terminal className="w-6 h-6 text-gray-700" />
                    <span>Headless Mode</span>
                  </h3>
                  
                  <div className="space-y-6">
                    <p className="text-gray-700 text-lg">
                      Headless mode enables Claude Code to run without the interactive terminal interface, making it perfect for 
                      automation, CI/CD pipelines, and scripted workflows where human interaction isn't required.
                    </p>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg text-slate-700">⚙️ Headless Mode Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <ExpandableSection title="Understanding Headless Mode" defaultExpanded={true}>
                          <div className="space-y-4">
                            <div className="bg-blue-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-blue-900 mb-2">When to Use Headless Mode</h6>
                              <ul className="text-blue-800 text-sm space-y-1">
                                <li>• Automated code generation in CI/CD pipelines</li>
                                <li>• Batch processing of multiple similar tasks</li>
                                <li>• Integration with external automation systems</li>
                                <li>• Scheduled maintenance tasks like dependency updates</li>
                                <li>• Large-scale refactoring operations</li>
                                <li>• Server environments without display capabilities</li>
                              </ul>
                            </div>

                            <div className="bg-green-50 p-4 rounded-lg">
                              <h6 className="font-semibold text-green-900 mb-2">Benefits of Headless Mode</h6>
                              <ul className="text-green-800 text-sm space-y-1">
                                <li>• Consistent, repeatable operations across environments</li>
                                <li>• Reduced human error in routine tasks</li>
                                <li>• Integration with existing automation infrastructure</li>
                                <li>• Faster execution for batch operations</li>
                                <li>• Resource-efficient operation without UI overhead</li>
                              </ul>
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Configuration Setup" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">1. Create Configuration File</h6>
                              <CodeBlock 
                                code="# claude-config.yaml
version: 1.0
project:
  name: \"my-awesome-project\"
  language: \"typescript\"
  framework: \"react\"

tasks:
  format-code:
    description: \"Format all code files using project standards\"
    commands:
      - \"npx prettier --write src/**/*.{ts,tsx,js,jsx}\"
      - \"npx eslint --fix src/\"
    
  generate-components:
    description: \"Generate React components from specifications\"
    input_pattern: \"specs/*.component.yaml\"
    output_directory: \"src/components\"
    template: \"react-typescript-component\"
    
  update-dependencies:
    description: \"Update project dependencies safely\"
    commands:
      - \"npm update\"
      - \"npm audit fix\"
      - \"npm run test\"
    
  refactor-imports:
    description: \"Update import statements to use absolute paths\"
    pattern: \"src/**/*.{ts,tsx}\"
    rules:
      - replace_relative_imports: true
      - use_barrel_exports: true

output:
  format: \"json\"
  file: \"claude-output.json\"
  include_diffs: true
  include_logs: true

logging:
  level: \"info\"
  file: \"claude-headless.log\"

error_handling:
  continue_on_error: false
  retry_count: 3
  notification:
    slack_webhook: \"${SLACK_WEBHOOK_URL}\"
    email: \"${NOTIFICATION_EMAIL}\""
                                title="Comprehensive headless configuration"
                              />
                            </div>

                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">2. Environment Setup</h6>
                              <CodeBlock 
                                code="# .env file for headless mode
CLAUDE_API_KEY=your_api_key_here
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
NOTIFICATION_EMAIL=dev-team@company.com
PROJECT_ROOT=/path/to/your/project

# CI/CD environment variables
CLAUDE_HEADLESS_MODE=true
CLAUDE_CONFIG_PATH=./claude-config.yaml
CLAUDE_LOG_LEVEL=info
CLAUDE_OUTPUT_FORMAT=json"
                                title="Environment configuration"
                              />
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Command Structure & Usage" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">Basic Command Structure</h6>
                              <CodeBlock 
                                code="# Basic headless command
claude-code --headless --config claude-config.yaml --task format-code

# With specific output file
claude-code --headless --config claude-config.yaml --task generate-components --output results.json

# With environment variables
CLAUDE_HEADLESS_MODE=true claude-code --task update-dependencies

# Batch processing multiple tasks
claude-code --headless --config claude-config.yaml --tasks format-code,generate-components,update-dependencies"
                                title="Command examples"
                              />
                            </div>

                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">CI/CD Pipeline Integration</h6>
                              <CodeBlock 
                                code="# GitHub Actions workflow
name: Claude Code Automation
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  claude-code-tasks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Claude Code formatting
        run: |
          claude-code --headless \\
            --config ./.github/claude-config.yaml \\
            --task format-code
        env:
          CLAUDE_API_KEY: \${{ secrets.CLAUDE_API_KEY }}
          
      - name: Generate components
        run: |
          claude-code --headless \\
            --config ./.github/claude-config.yaml \\
            --task generate-components \\
            --output component-generation-results.json
            
      - name: Commit changes
        run: |
          git config --local user.email \"action@github.com\"
          git config --local user.name \"GitHub Action\"
          git add .
          git diff --staged --quiet || git commit -m \"Auto: Claude Code formatting and component generation\"
          git push"
                                title="GitHub Actions integration"
                              />
                            </div>

                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">Task Definition Examples</h6>
                              <CodeBlock 
                                code="# Advanced task definitions in claude-config.yaml

# Component generation task
generate-api-client:
  description: \"Generate TypeScript API client from OpenAPI spec\"
  input: \"api-spec.yaml\"
  template: \"typescript-axios-client\"
  output_directory: \"src/api\"
  post_process:
    - \"npx prettier --write src/api/**/*.ts\"
    - \"npx eslint --fix src/api/\"

# Database migration task  
generate-migrations:
  description: \"Generate database migrations from schema changes\"
  compare:
    - \"schema/previous.sql\"
    - \"schema/current.sql\"
  output: \"migrations/\"
  naming_pattern: \"{timestamp}_{description}.sql\"

# Documentation update task
update-docs:
  description: \"Update documentation from code comments\"
  input_patterns:
    - \"src/**/*.ts\"
    - \"src/**/*.tsx\"  
  output_formats:
    - \"markdown\"
    - \"json\"
  output_directory: \"docs/\"
  include_examples: true

# Refactoring task
modernize-codebase:
  description: \"Update codebase to use modern patterns\"
  rules:
    - \"convert_class_components_to_hooks\"
    - \"replace_deprecated_apis\"
    - \"update_import_syntax\"
  file_patterns:
    - \"src/**/*.{js,jsx,ts,tsx}\"
  backup: true
  dry_run: false"
                                title="Complex task definitions"
                              />
                            </div>
                          </div>
                        </ExpandableSection>

                        <ExpandableSection title="Output Management & Integration" defaultExpanded={false}>
                          <div className="space-y-4">
                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">Output Format Examples</h6>
                              <CodeBlock 
                                code="// Example JSON output from headless mode
{
  \"task\": \"generate-components\",
  \"status\": \"completed\",
  \"timestamp\": \"2024-01-15T10:30:00Z\",
  \"duration\": \"45s\",
  \"results\": {
    \"files_created\": [
      \"src/components/UserProfile.tsx\",
      \"src/components/UserProfile.test.tsx\",
      \"src/components/UserProfile.stories.tsx\"
    ],
    \"files_modified\": [
      \"src/components/index.ts\"
    ],
    \"lines_added\": 234,
    \"lines_modified\": 12
  },
  \"diffs\": [
    {
      \"file\": \"src/components/UserProfile.tsx\",
      \"additions\": 156,
      \"deletions\": 0,
      \"diff\": \"+ import React from 'react'\\n+ \\n+ export const UserProfile = ({ user }) => {\\n...\"
    }
  ],
  \"logs\": [
    {\"level\": \"info\", \"message\": \"Starting component generation\", \"timestamp\": \"2024-01-15T10:29:15Z\"},
    {\"level\": \"info\", \"message\": \"Analyzing component specifications\", \"timestamp\": \"2024-01-15T10:29:20Z\"},
    {\"level\": \"success\", \"message\": \"Components generated successfully\", \"timestamp\": \"2024-01-15T10:30:00Z\"}
  ]
}"
                                title="Structured JSON output"
                              />
                            </div>

                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3">Integration with External Systems</h6>
                              <CodeBlock 
                                code={`#!/bin/bash
# integration-script.sh - Example integration script

# Run Claude Code headless task
claude-code --headless --config claude-config.yaml --task generate-components --output results.json

# Parse results and integrate with external systems
if [ $? -eq 0 ]; then
    echo "Claude Code task completed successfully"
    
    # Extract metrics from results
    FILES_CREATED=$(jq '.results.files_created | length' results.json)
    LINES_ADDED=$(jq '.results.lines_added' results.json)
    
    # Update project metrics in monitoring system
    curl -X POST "https://metrics.company.com/api/deployments" \\
        -H "Content-Type: application/json" \\
        -d "{\\"project\\": \\"my-project\\", \\"files_created\\": $FILES_CREATED, \\"lines_added\\": $LINES_ADDED}"
    
    # Update Jira issues if component specs were linked to tickets
    ISSUE_KEYS=$(jq -r '.metadata.jira_issues[]?' results.json)
    for issue in $ISSUE_KEYS; do
        curl -X POST "https://company.atlassian.net/rest/api/2/issue/$issue/transitions" \\
            -H "Authorization: Bearer $JIRA_TOKEN" \\
            -H "Content-Type: application/json" \\
            -d '{"transition": {"id": "31"}}' # Transition to "In Review"
    done
    
    # Trigger additional automation
    aws lambda invoke \\
        --function-name code-review-automation \\
        --payload "$(cat results.json)" \\
        response.json
        
else
    echo "Claude Code task failed"
    
    # Send failure notifications
    curl -X POST $SLACK_WEBHOOK \\
        -H "Content-Type: application/json" \\
        -d '{"text": "🚨 Claude Code headless task failed in CI/CD pipeline"}'
        
    exit 1
fi`}
                                title="External system integration"
                              />
                            </div>
                          </div>
                        </ExpandableSection>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </section>

            <Separator className="my-16" />

            {/* Tutorial Section */}
            <section data-section="tutorial" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Practical Tutorial: Creating Your Own Claude Code Guide</h2>
              
              <div className="mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Step-by-Step Project</CardTitle>
                    <CardDescription>
                      Learn Claude Code by building and customizing your own interactive guide website
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                      <p className="text-blue-800">
                        <strong>🎯 Project Goal:</strong> Clone, customize, and deploy your own personalized Claude Code guide with automatic GitHub deployment via Netlify.
                      </p>
                    </div>
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
                      git clone https://github.com/firstprinciplescg/Claude-Code-Guide-For-Beginners-Project-Files.git
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Step 1: Clone Repository */}
              <ExpandableSection title="Step 1: Clone the Repository" defaultOpen={true}>
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Start Claude Code and tell it to help you clone and set up the project:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">What to tell Claude:</p>
                          <div className="bg-white border rounded p-3">
                            <code className="text-sm text-gray-700">
                              "I want to clone the repository at https://github.com/firstprinciplescg/Claude-Code-Guide-For-Beginners-Project-Files and set it up for development. Please walk me through the process and help me understand the project structure."
                            </code>
                          </div>
                        </div>
                        <p className="text-gray-600">Claude will guide you through running the git clone command and navigating into the project directory.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* Step 2: Explore Codebase */}
              <ExpandableSection title="Step 2: Explore the Codebase">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Let Claude perform a comprehensive analysis of your new project:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">Analysis Request:</p>
                          <div className="bg-white border rounded p-3 mb-3">
                            <code className="text-sm text-gray-700">
                              "Please explore this entire codebase and explain the project structure, technologies used, and how the different components work together. Look at @src/, @public/, and any configuration files."
                            </code>
                          </div>
                          <p className="font-semibold text-gray-800 mb-2">Follow-up Questions:</p>
                          <div className="bg-white border rounded p-3">
                            <code className="text-sm text-gray-700">
                              "What's the main application architecture? How are styles organized? What build tools are being used? Which files are most important for customization?"
                            </code>
                          </div>
                        </div>
                        <p className="text-gray-600">This exploration phase helps you understand the project's technical foundation and customization possibilities.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* Step 3: Publish on Netlify */}
              <ExpandableSection title="Step 3: Publish on Netlify with Automatic Deployment">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Set up continuous deployment from GitHub to Netlify:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">Deployment Setup:</p>
                          <div className="space-y-3">
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Step 1 - GitHub Setup:</p>
                              <code className="text-sm text-gray-600">
                                "I want to deploy this project to Netlify with automatic deployment from GitHub. Please guide me through setting up the repository on GitHub first, then connecting it to Netlify."
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Step 2 - Netlify Connection:</p>
                              <code className="text-sm text-gray-600">
                                "Now help me connect this GitHub repository to Netlify for automatic deployment."
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Step 3 - Build Configuration:</p>
                              <code className="text-sm text-gray-600">
                                "What build command and publish directory should I use for Netlify?"
                              </code>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">Claude will analyze your project structure and provide the correct Netlify build settings.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* Step 4: Customize Color Scheme */}
              <ExpandableSection title="Step 4: Customize the Color Scheme">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Personalize the visual appearance with your preferred colors:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">Styling Analysis:</p>
                          <div className="space-y-3">
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Find Current Styling:</p>
                              <code className="text-sm text-gray-600">
                                "Where are the colors defined in this project? Show me how the color scheme is organized and what files I need to modify to change it."
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Color Analysis:</p>
                              <code className="text-sm text-gray-600">
                                "What colors are currently being used? Can you show me the CSS variables or styling constants that define the theme?"
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Apply New Scheme:</p>
                              <code className="text-sm text-gray-600">
                                "I want to change the color scheme to use a [your choice] palette instead of the current colors. Can you help me update the appropriate files?"
                              </code>
                            </div>
                          </div>
                        </div>
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                          <p className="text-yellow-800 text-sm">
                            <strong>💡 Pro Tip:</strong> Ask Claude to check contrast ratios for accessibility compliance when changing colors.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* Step 5: Personalize Content */}
              <ExpandableSection title="Step 5: Personalize the H1 Copy">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Make the guide uniquely yours with personalized headings:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">Content Personalization:</p>
                          <div className="space-y-3">
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Locate Main Heading:</p>
                              <code className="text-sm text-gray-600">
                                "Where is the main H1 heading defined in this project? I want to personalize it to include my name."
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Make the Change:</p>
                              <code className="text-sm text-gray-600">
                                "Please update the H1 heading to read 'Claude Code Complete Guide for [Your Name]' and show me exactly what changes need to be made."
                              </code>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">Claude will locate the heading and make the personalization changes for you.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* Step 6: Commit and Deploy */}
              <ExpandableSection title="Step 6: Commit and Push Updates">
                <Card className="mb-4">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <p className="mb-4 text-gray-700">Save your changes and deploy them automatically:</p>
                        <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                          <p className="font-semibold text-gray-800 mb-2">Git Workflow:</p>
                          <div className="space-y-3">
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Review Changes:</p>
                              <code className="text-sm text-gray-600">
                                "Can you show me all the modifications we've made to this project? I want to review everything before committing."
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Commit Strategy:</p>
                              <code className="text-sm text-gray-600">
                                "Help me create appropriate git commits for these changes. Should these be separate commits or can they be combined?"
                              </code>
                            </div>
                            <div className="bg-white border rounded p-3">
                              <p className="text-sm font-medium text-gray-700 mb-1">Deploy Verification:</p>
                              <code className="text-sm text-gray-600">
                                "Can you help me confirm that the changes are live on Netlify? What should I check to ensure everything deployed correctly?"
                              </code>
                            </div>
                          </div>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-400 p-4">
                          <p className="text-green-800 text-sm">
                            <strong>🎉 Success!</strong> Once deployed, you'll have your own personalized Claude Code guide that automatically updates whenever you push changes to GitHub.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </ExpandableSection>

              {/* What You'll Learn */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>What You'll Learn</CardTitle>
                  <CardDescription>Skills and concepts you'll master through this tutorial</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Claude Code Skills:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Project exploration and analysis</li>
                        <li>• Code modification and customization</li>
                        <li>• Git workflow automation</li>
                        <li>• File system navigation with @tags</li>
                        <li>• Deployment configuration</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-800">Development Concepts:</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• React application structure</li>
                        <li>• CSS customization and theming</li>
                        <li>• GitHub repository management</li>
                        <li>• Continuous deployment setup</li>
                        <li>• Build configuration optimization</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            <Separator className="my-16" />

            {/* Reference Section */}
            <section data-section="reference" className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Essential Commands Reference</h2>
              
              {/* Core Commands */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Core Commands</CardTitle>
                  <CardDescription>Essential commands for launching and configuring Claude Code</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {commands.slice(0, 6).map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm font-semibold">
                            {cmd.command}
                          </code>
                        </div>
                        <p className="text-gray-600 mb-2">{cmd.description}</p>
                        <div className="bg-gray-50 p-2 rounded">
                          <code className="text-sm font-mono text-gray-700">{cmd.example}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Session Management Commands */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Session Management</CardTitle>
                  <CardDescription>Commands for managing your development sessions and conversation history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {commands.slice(6, 12).map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm font-semibold">
                            {cmd.command}
                          </code>
                        </div>
                        <p className="text-gray-600 mb-2">{cmd.description}</p>
                        <div className="bg-gray-50 p-2 rounded">
                          <code className="text-sm font-mono text-gray-700">{cmd.example}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Development Commands */}
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle>Development & Project Commands</CardTitle>
                  <CardDescription>Commands for development workflow, testing, and project management</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {commands.slice(12).map((cmd, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                          <code className="bg-gray-100 px-3 py-1 rounded font-mono text-sm font-semibold">
                            {cmd.command}
                          </code>
                        </div>
                        <p className="text-gray-600 mb-2">{cmd.description}</p>
                        <div className="bg-gray-50 p-2 rounded">
                          <code className="text-sm font-mono text-gray-700">{cmd.example}</code>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Reference Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Reference Table</CardTitle>
                  <CardDescription>All commands at a glance for quick lookup</CardDescription>
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
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                                {cmd.command}
                              </code>
                            </td>
                            <td className="py-3 text-gray-600 text-sm">{cmd.description}</td>
                            <td className="py-3">
                              <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
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

