import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'

const GettingStarted = () => {
  return (
    <section data-section="getting-started" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Installation and Setup</h2>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>System Requirements</CardTitle>
            <CardDescription>Ensure your system meets these requirements before installation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold">Node.js 18 or higher</h4>
                <p className="text-gray-600">Verify with <code className="bg-gray-100 px-1 rounded text-sm">node --version</code></p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold">Operating System</h4>
                <p className="text-gray-600">macOS 10.15+, Ubuntu 20.04+, Windows 10+ with WSL or Git for Windows</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold">Dependencies</h4>
                <p className="text-gray-600">ripgrep for fast file searching (usually included automatically)</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Installation Methods</CardTitle>
            <CardDescription>Choose the method that best suits your environment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">npm (Recommended for Node.js users)</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                  npm install -g @anthropic-ai/claude-code
                </div>
                <p className="text-sm text-gray-600">⚠️ If you encounter permission errors, avoid using <code className="bg-gray-100 px-1 rounded">sudo</code>. Configure npm to use a different directory for global packages instead.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Native Installers</h4>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">macOS and Linux:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                      curl -fsSL https://claude.ai/install.sh | bash
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Windows PowerShell:</p>
                    <div className="bg-gray-900 text-gray-100 p-3 rounded-lg font-mono text-sm">
                      irm https://claude.ai/install.ps1 | iex
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">Native installers manage updates independently and work well in restricted environments.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Setup and Authentication</CardTitle>
            <CardDescription>Connect Claude Code to your Anthropic account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">First Run</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                  claude
                </div>
                <p className="text-gray-600">Navigate to your project directory and run this command to start the authentication process.</p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Authentication Options</h4>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-medium">API Key (Pay-as-you-go)</h5>
                    <p className="text-sm text-gray-600">Requires active billing at console.anthropic.com. Creates a dedicated "Claude Code" workspace for usage tracking.</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-medium">Claude Pro/Max Subscription</h5>
                    <p className="text-sm text-gray-600">Use existing Claude.ai account credentials. Usage counts against subscription limits.</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-medium">Enterprise Options</h5>
                    <p className="text-sm text-gray-600">Amazon Bedrock or Google Vertex AI integration for enterprise compliance.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Verify Installation</CardTitle>
            <CardDescription>Confirm everything is working correctly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Check Version</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
                  claude --version
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">Run Diagnostic</h4>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-2">
                  claude doctor
                </div>
                <p className="text-gray-600">This command checks Node.js compatibility, verifies Claude Code components, tests API connectivity, and identifies potential configuration issues.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default GettingStarted