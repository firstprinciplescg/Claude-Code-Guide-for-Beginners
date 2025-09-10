import React, { useState, useEffect, Suspense } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'
import { BuyMeCoffeeButton } from '@/components/ui/buy-me-coffee-button.jsx'
import { ThemeToggle } from '@/components/ui/theme-toggle.jsx'
import { SectionSkeleton } from '@/components/ui/section-skeleton.jsx'
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

// Lazy load section components for better performance
const Introduction = React.lazy(() => import('./sections/Introduction.jsx'))
const GettingStarted = React.lazy(() => import('./sections/GettingStarted.jsx'))
const YourFirstSession = React.lazy(() => import('./sections/YourFirstSession.jsx'))
const CoreConcepts = React.lazy(() => import('./sections/CoreConcepts.jsx'))
const EssentialCommands = React.lazy(() => import('./sections/EssentialCommands.jsx'))
const IDEIntegration = React.lazy(() => import('./sections/IDEIntegration.jsx'))
const CommonWorkflows = React.lazy(() => import('./sections/CommonWorkflows.jsx'))
const BestPractices = React.lazy(() => import('./sections/BestPractices.jsx'))
const AdvancedTopics = React.lazy(() => import('./sections/AdvancedTopics.jsx'))
const PracticalTutorial = React.lazy(() => import('./sections/PracticalTutorial.jsx'))
const CommandsReference = React.lazy(() => import('./sections/CommandsReference.jsx'))

import './App.css'

function App() {
  const [activeSection, setActiveSection] = useState('introduction')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const sections = [
    { id: 'introduction', title: 'Understanding Claude Code', icon: BookOpen },
    { id: 'getting-started', title: 'Installation and Setup', icon: Zap },
    { id: 'your-first-session', title: 'Your First Session', icon: Terminal },
    { id: 'core-concepts', title: 'Core Concepts', icon: Code },
    { id: 'essential-commands', title: 'Essential Commands', icon: Terminal },
    { id: 'ide-integration', title: 'IDE Integration', icon: Code },
    { id: 'workflows', title: 'Working with Your Codebase', icon: FolderTree },
    { id: 'best-practices', title: 'Best Practices', icon: Settings },
    { id: 'advanced', title: 'Advanced Features', icon: Github },
    { id: 'tutorial', title: 'Practical Tutorial', icon: FolderTree },
    { id: 'troubleshooting', title: 'Troubleshooting & Quick Reference', icon: Bug }
  ]

  const features = [
    {
      title: "Build Features from Descriptions",
      description: "Describe what you want in plain English, including business requirements and technical constraints. Claude creates implementation plans that respect your existing architecture and follows your project's patterns.",
      icon: Code
    },
    {
      title: "Debug and Fix Issues",
      description: "Claude transforms frustrating investigation sessions into collaborative problem-solving. It analyzes not just error messages but your entire codebase context to identify root causes.",
      icon: Bug
    },
    {
      title: "Navigate Any Codebase",
      description: "Whether exploring unfamiliar codebases or maintaining legacy systems, Claude acts as a knowledgeable guide that maps architectural patterns and explains complex business logic.",
      icon: FolderTree
    },
    {
      title: "Automate Tedious Tasks",
      description: "Handle routine work that interrupts flow states: fix linting issues, resolve merge conflicts, update imports, write comprehensive tests, and generate meaningful documentation.",
      icon: Settings
    }
  ]

  const commands = [
    { command: 'claude', description: 'Launch Claude Code in interactive mode', example: 'claude' },
    { command: 'claude --version', description: 'Display current version of Claude Code', example: 'claude --version' },
    { command: 'claude doctor', description: 'Run diagnostic to check installation and configuration', example: 'claude doctor' },
    { command: '/clear', description: 'Reset conversation context while maintaining project awareness', example: '/clear' },
    { command: '/model', description: 'Switch between available AI models', example: '/model' },
    { command: '/config', description: 'Access configuration settings', example: '/config' },
    { command: '/logout', description: 'Sign out of Claude Code', example: '/logout' },
    { command: '/status', description: 'Display session information and usage statistics', example: '/status' },
    { command: '/bug', description: 'Report issues to the Claude Code development team', example: '/bug' },
    { command: '/ide', description: 'Connect Claude Code to your IDE', example: '/ide' }
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
      // Dynamically calculate header height for better mobile compatibility
      const header = document.querySelector('header')
      const headerHeight = header ? header.offsetHeight + 20 : 100 // 20px extra padding, fallback to 100px
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-300">Claude Code for Beginners</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">The easy to use guide to Claude Code for vibe coders and new users.</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block">
              <BuyMeCoffeeButton />
            </div>
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden min-h-[48px] min-w-[48px] p-3"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className={`fixed left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0 top-20 bottom-0' : '-translate-x-full top-20 bottom-0'
        } md:translate-x-0 md:shadow-none md:top-20 md:bottom-0 overflow-hidden`}>
          <div className="pt-4 md:pt-0">
            <ScrollArea className="h-[calc(100vh-6rem)] md:h-full">
              <nav className="p-3 space-y-1">
                {sections.map((section) => {
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 min-h-[40px] rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-xs font-medium leading-tight">{section.title}</span>
                    </button>
                  )
                })}
              </nav>
            </ScrollArea>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 md:ml-64">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            
            {/* Introduction Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <Introduction features={features} scrollToSection={scrollToSection} />
            </Suspense>
            
            <Separator className="my-16" />

            {/* Installation and Setup Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <GettingStarted />
            </Suspense>

            <Separator className="my-16" />

            {/* Your First Session Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <YourFirstSession />
            </Suspense>

            <Separator className="my-16" />

            {/* Core Concepts Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <CoreConcepts />
            </Suspense>

            <Separator className="my-16" />

            {/* Essential Commands Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <EssentialCommands />
            </Suspense>

            <Separator className="my-16" />

            {/* IDE Integration Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <IDEIntegration />
            </Suspense>

            <Separator className="my-16" />

            {/* Working with Your Codebase Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <CommonWorkflows />
            </Suspense>

            <Separator className="my-16" />

            {/* Best Practices Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <BestPractices />
            </Suspense>

            <Separator className="my-16" />

            {/* Advanced Features Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <AdvancedTopics />
            </Suspense>

            <Separator className="my-16" />

            {/* Practical Tutorial Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <PracticalTutorial />
            </Suspense>

            <Separator className="my-16" />

            {/* Commands Reference Section */}
            <Suspense fallback={<SectionSkeleton />}>
              <CommandsReference />
            </Suspense>

            {/* Footer */}
            <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <p className="mb-6 text-sm sm:text-base leading-relaxed px-4">
                Created with ❤️ by <a href="https://www.linkedin.com/in/mdustinmoore/" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Dustin Moore</a> from <a href="https://firstprinciplescg.com" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">First Principles Consulting Group</a> using <a href="https://claude.ai" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Claude</a> and <a href="https://www.anthropic.com/claude-code" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors" target="_blank" rel="noopener noreferrer">Claude Code</a>
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 text-sm">
                <a href="https://docs.anthropic.com/en/docs/claude-code/overview" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 min-h-[44px] flex items-center justify-center" target="_blank" rel="noopener noreferrer">Documentation</a>
                <a href="https://github.com/anthropics" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2 min-h-[44px] flex items-center justify-center" target="_blank" rel="noopener noreferrer">Anthropic's GitHub</a>
              </div>
            </footer>
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