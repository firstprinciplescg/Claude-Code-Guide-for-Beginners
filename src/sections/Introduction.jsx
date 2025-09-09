import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { ChevronRight, ExternalLink } from 'lucide-react'
import workflowDiagram from '../assets/claude_code_workflow_diagram.png'
import featuresOverview from '../assets/claude_code_features_overview.png'

const Introduction = ({ features, scrollToSection }) => {
  return (
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
          <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/firstprinciplescg/Claude-Code-Guide-for-Beginners', '_blank')}>
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
  )
}

export default Introduction