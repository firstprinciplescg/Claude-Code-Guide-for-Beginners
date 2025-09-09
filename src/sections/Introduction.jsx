import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { OptimizedImage } from '@/components/ui/optimized-image.jsx'
import { ChevronRight, ExternalLink } from 'lucide-react'
import workflowDiagram from '../assets/claude_code_workflow_diagram.png'
import featuresOverview from '../assets/claude_code_features_overview.png'
import workflowDiagramWebp from '../assets/claude_code_workflow_diagram.webp'
import featuresOverviewWebp from '../assets/claude_code_features_overview.webp'

const Introduction = ({ features, scrollToSection }) => {
  return (
    <section data-section="introduction" className="mb-16">
      <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">
          AI-Powered Development
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 dark:text-gray-100 mb-6">
          Claude Code
          <span className="block text-blue-600 dark:text-blue-400">Complete Guide</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Imagine having an experienced developer sitting next to you who understands your entire codebase, can write and modify code directly, and communicates in plain English rather than cryptic commands. That's Claude Code.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => scrollToSection('getting-started')}>
            Get Started <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/firstprinciplescg/Claude-Code-Guide-for-Beginners', '_blank')}>
            View on GitHub <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      {/* Understanding Claude Code */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Understanding Claude Code</h2>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>What Makes Claude Code Different</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Traditional development tools operate on a rigid command-response basis where you need to know exact syntax, remember specific flags, and manually manage context. Claude Code fundamentally changes this paradigm.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Instead of typing <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git diff HEAD~1 --stat</code> followed by <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git commit -m "message"</code> and then <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">git push origin feature-branch</code>, you can simply tell Claude, "Review my recent changes and commit them with an appropriate message." Claude understands your intent, examines the changes, writes a meaningful commit message based on what actually changed, and handles the git workflow.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                This conversational approach extends to every aspect of development. When you encounter a confusing error, you don't need to parse stack traces and search through documentation. You paste the error and say, "This started happening after I updated the database schema. Can you help?" Claude analyzes your recent changes, understands the relationship between your schema update and the error, and provides both an explanation and a fix.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>What You Can Do with Claude Code</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Building New Features</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Describe what you want in plain English, including business requirements and technical constraints. Claude creates implementation plans that respect your existing architecture and writes code that follows your project's patterns.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Debugging & Analysis</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Claude transforms frustrating investigation sessions into collaborative problem-solving. It analyzes not just error messages but your entire codebase context to identify root causes and trace through complex call stacks.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Exploring Codebases</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    When working with unfamiliar codebases, Claude acts as a knowledgeable guide. It maps out architectural patterns, explains complex business logic, and helps you understand not just what the code does, but why it was designed that way.
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Routine Tasks</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm">
                    Claude handles tedious work that interrupts flow states: fixing linting issues, resolving merge conflicts, updating imports after restructuring, writing comprehensive tests, and generating documentation that explains the why behind the code.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>How Claude Code Fits Into Your Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Claude Code is designed to integrate seamlessly with your existing development environment rather than replacing it. It runs directly in your terminal, working alongside whatever tools you already use—whether you prefer VS Code, Vim, IntelliJ, or any other editor.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                The tool reads files from your project directory, understanding your codebase structure without requiring manual configuration. It can execute commands in your terminal, from running tests to managing git operations. Most importantly, it always asks for permission before making changes to your files or executing potentially impactful commands, ensuring you maintain full control over your codebase.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                This integration philosophy extends to your team's practices as well. Claude Code respects your existing conventions, from coding standards to git workflows. It learns from your codebase patterns and adapts its suggestions accordingly, following existing patterns rather than imposing its own preferences.
              </p>
            </CardContent>
          </Card>
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
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 dark:text-gray-400">{feature.description}</p>
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
            <OptimizedImage 
              webpSrc={workflowDiagramWebp}
              pngSrc={workflowDiagram} 
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
            <OptimizedImage 
              webpSrc={featuresOverviewWebp}
              pngSrc={featuresOverview} 
              alt="Claude Code Key Features" 
              className="w-full rounded-lg border"
            />
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default Introduction