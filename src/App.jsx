import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
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
  Menu,
  X
} from 'lucide-react'

// Import section components
import Introduction from './sections/Introduction.jsx'
import GettingStarted from './sections/GettingStarted.jsx'
import CoreConcepts from './sections/CoreConcepts.jsx'
import CommonWorkflows from './sections/CommonWorkflows.jsx'
import BestPractices from './sections/BestPractices.jsx'
import AdvancedTopics from './sections/AdvancedTopics.jsx'
import PracticalTutorial from './sections/PracticalTutorial.jsx'
import CommandsReference from './sections/CommandsReference.jsx'

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
            
            {/* Introduction Section */}
            <Introduction features={features} scrollToSection={scrollToSection} />
            
            <Separator className="my-16" />

            {/* Getting Started Section */}
            <GettingStarted />

            <Separator className="my-16" />

            {/* Core Concepts Section */}
            <CoreConcepts />

            <Separator className="my-16" />

            {/* Common Workflows Section */}
            <CommonWorkflows />

            <Separator className="my-16" />

            {/* Best Practices Section */}
            <BestPractices />

            <Separator className="my-16" />

            {/* Advanced Topics Section */}
            <AdvancedTopics />

            <Separator className="my-16" />

            {/* Tutorial Section */}
            <PracticalTutorial />

            <Separator className="my-16" />

            {/* Commands Reference Section */}
            <CommandsReference commands={commands} />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  )
}

export default App