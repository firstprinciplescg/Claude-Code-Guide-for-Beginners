import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const GettingStarted = () => {
  return (
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
  )
}

export default GettingStarted