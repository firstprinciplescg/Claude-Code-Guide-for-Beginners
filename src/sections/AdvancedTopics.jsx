import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'
import { Server, Terminal, Folders, CreditCard } from 'lucide-react'

const AdvancedTopics = () => {
  return (
    <section data-section="advanced" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Advanced Features</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        As you become comfortable with Claude Code's core capabilities, exploring its advanced features opens new possibilities for automation, integration, and sophisticated development workflows.
      </p>

      <SectionTOC
        sections={[
          { id: 'checkpoints', title: 'Checkpoints and Time Travel' },
          { id: 'subagents-hooks', title: 'Subagents and Hooks' },
          { id: 'mcp-servers', title: 'MCP Servers' },
          { id: 'print-mode', title: 'Print Mode and Automation' },
          { id: 'multi-directory', title: 'Multi-Directory Access' },
          { id: 'subscription-optimization', title: 'Subscription Optimization' }
        ]}
        className="mb-8"
      />

      <div className="space-y-12">
        {/* Checkpoints and Time Travel Section */}
        <div data-subsection="checkpoints">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Checkpoints and Time Travel</h3>

          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              One of Claude Code's most requested features, checkpoints provide automatic state saving that lets you rewind to previous points in your session. Think of it as "undo on steroids" for your entire coding conversation.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>How Checkpoints Work</span>
                  <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">NEW</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Claude Code automatically creates checkpoints before each significant change to your codebase. This happens transparently in the background, so you can focus on development without worrying about manually saving states.
                </p>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Using Checkpoints</h6>
                  <div className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                    <p><strong>Quick Rewind:</strong> Press <code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">Esc</code> twice to instantly rewind to the previous checkpoint</p>
                    <p><strong>Command-Based:</strong> Use <code className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">/rewind</code> for more control over checkpoint navigation</p>
                    <p><strong>Selective Restore:</strong> Choose to restore code only, conversation only, or both</p>
                    <p><strong>Multiple Checkpoints:</strong> Navigate through several checkpoints to find the exact state you need</p>
                  </div>
                </div>

                <ExpandableSection title="Common Use Cases">
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>• <strong>Experimentation:</strong> Try different implementation approaches and easily revert to compare</li>
                    <li>• <strong>Error Recovery:</strong> Quickly undo changes that introduced bugs or broke functionality</li>
                    <li>• <strong>Exploratory Coding:</strong> Safely explore complex refactoring with the ability to backtrack</li>
                    <li>• <strong>Learning:</strong> Compare different solutions side-by-side by rewinding between them</li>
                  </ul>
                </ExpandableSection>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-green-900 dark:text-green-100 mb-2">Pro Tip</h6>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    Checkpoints are invaluable when working on complex features. Don't hesitate to experiment boldly—you can always rewind if an approach doesn't work out. This encourages more creative problem-solving.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subagents and Hooks Section */}
        <div data-subsection="subagents-hooks">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Subagents and Hooks</h3>

          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Advanced automation features that let you delegate specialized tasks and trigger automatic actions throughout your development workflow.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Subagents for Specialized Tasks</span>
                  <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">NEW</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Subagents are specialized AI assistants that you can delegate specific tasks to, enabling parallel processing and domain-specific expertise within your Claude Code sessions.
                </p>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">Benefits of Subagents</h6>
                  <ul className="text-purple-800 dark:text-purple-200 text-sm space-y-2">
                    <li>• <strong>Parallel Processing:</strong> Handle multiple tasks simultaneously</li>
                    <li>• <strong>Specialized Expertise:</strong> Different subagents for testing, documentation, security, etc.</li>
                    <li>• <strong>Complex Projects:</strong> More efficient handling of multi-faceted development work</li>
                    <li>• <strong>Custom Subagents:</strong> Create organization-specific subagents for your unique workflows</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Hooks - Automated Actions</span>
                  <span className="text-xs font-bold bg-indigo-600 text-white px-2 py-0.5 rounded">NEW</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Hooks allow you to automatically trigger actions at specific points in your workflow, creating a more seamless and automated development experience.
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Common Hook Types</h6>
                    <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                      <li>• Pre-commit validation</li>
                      <li>• Post-change testing</li>
                      <li>• Automated documentation updates</li>
                      <li>• Custom workflow triggers</li>
                    </ul>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h6 className="font-semibold text-green-900 dark:text-green-100 mb-2">Use Cases</h6>
                    <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                      <li>• Enforce code quality standards</li>
                      <li>• Auto-run security checks</li>
                      <li>• Keep docs in sync with code</li>
                      <li>• Trigger CI/CD pipelines</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Background Tasks</h6>
                  <p className="text-amber-800 dark:text-amber-200 text-sm">
                    Hooks can work with background tasks via GitHub Actions integration, allowing long-running processes to continue even after your session ends. Perfect for comprehensive test suites or extensive refactoring operations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* MCP Servers Section */}
        <div data-subsection="mcp-servers">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <Server className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>Model Context Protocol (MCP) Servers</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              MCP represents one of Claude Code's most powerful extensibility features. MCP servers are bridges that connect Claude to external tools and services, extending its capabilities far beyond code analysis and generation.
            </p>

            <p className="text-gray-700 dark:text-gray-300">
              Think of MCP servers as specialized assistants that Claude can consult. When you have an MCP server for GitHub configured, Claude can directly read issues, create pull requests, and manage workflows without you needing to leave your terminal. With a Slack MCP server, Claude can read relevant discussions to understand project context or notify channels about deployments.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-700 dark:text-blue-300">🔧 MCP Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    To configure MCP servers, you create a <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">.claude/mcp.json</code> file in your project:
                  </p>
                  
                  <CodeBlock 
                    code={`{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "\${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx", 
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "CONNECTION_STRING": "\${DATABASE_URL}"
      }
    }
  }
}`}
                    title="MCP server configuration"
                    language="json"
                  />
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Example MCP Usage</h6>
                  <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
                    With these servers configured, you can make requests like:
                  </p>
                  <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                    <li>• "Check if there are any high-priority issues related to the authentication system"</li>
                    <li>• "What's the current schema for the users table?"</li>
                    <li>• "Create a pull request for the feature branch with appropriate reviewers"</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-green-900 dark:text-green-100 mb-2">Custom MCP Servers</h6>
                  <p className="text-green-800 dark:text-green-200 text-sm">
                    The power of MCP extends beyond pre-built servers. You can create custom MCP servers for your organization's specific tools, internal APIs, or specialized workflows. This transforms Claude Code from a coding assistant into a comprehensive development platform that understands your entire ecosystem.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Print Mode Section */}
        <div data-subsection="print-mode" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <Terminal className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>Print Mode and Automation</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Print mode, activated with the <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">-p</code> flag, transforms Claude Code into a powerful automation tool. Instead of interactive conversation, print mode executes a single request and returns the result, making it perfect for scripting and integration into automated workflows.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700 dark:text-green-300">🚀 Print Mode Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Generate Documentation</h6>
                  <CodeBlock 
                    code={`claude -p "Generate a comprehensive README based on this codebase, including setup instructions, API documentation, and examples" > README.md`}
                    title="Automated documentation generation"
                    language="bash"
                  />
                </div>

                <div>
                  <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Unix Pipeline Integration</h6>
                  <CodeBlock 
                    code={`# Monitor logs and alert on anomalies
tail -f application.log | claude -p "Watch for errors or unusual patterns and summarize any issues"

# Generate release notes from git history
git log --oneline HEAD...\$(git describe --tags --abbrev=0) | \\
  claude -p "Generate user-friendly release notes from these commits"

# Create tests for changed files
git diff --name-only main | \\
  xargs -I {} claude -p "Generate tests for the changes in {}"`}
                    title="Pipeline integration examples"
                    language="bash"
                  />
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">CI/CD Integration</h6>
                  <p className="text-purple-800 dark:text-purple-200 text-sm">
                    You can integrate print mode into CI/CD pipelines for automated code review, documentation generation, or even preliminary security scanning. The key is that print mode makes Claude Code composable with other tools, following Unix philosophy of doing one thing well and working with other tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Multi-Directory Access Section */}
        <div data-subsection="multi-directory" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <Folders className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>Multi-Directory Access</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              While Claude Code primarily operates within your current directory, complex projects often span multiple repositories or require reference to shared libraries. The <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">--add-dir</code> flag extends Claude's awareness:
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-orange-700 dark:text-orange-300">📁 Multi-Directory Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CodeBlock 
                  code={`claude --add-dir ../shared-components --add-dir ../api-contracts`}
                  title="Adding multiple directories"
                  language="bash"
                />

                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Use Cases</h6>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• <strong>Microservice architectures</strong> where you need Claude to understand service interactions</li>
                    <li>• <strong>Monorepos</strong> where related projects live in sibling directories</li>
                    <li>• <strong>Shared libraries</strong> or components that multiple projects depend on</li>
                    <li>• <strong>Documentation references</strong> outside your main project directory</li>
                  </ul>
                </div>

                <div>
                  <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Example Multi-Directory Queries</h6>
                  <CodeBlock 
                    code={`"How does this service's data model align with the shared API contracts?"

"Can you update this component to match the pattern used in the shared-components library?"`}
                    title="Cross-directory analysis"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subscription Optimization Section */}
        <div data-subsection="subscription-optimization" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <CreditCard className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>Subscription Tiers and Optimization</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Understanding Claude Code's subscription model helps you optimize usage for your needs and budget.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-indigo-700 dark:text-indigo-300">💳 Subscription Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border border-blue-200 dark:border-blue-700 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">API Model</h5>
                    <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">Pay-as-you-go pricing</p>
                    <ul className="text-blue-800 dark:text-blue-200 text-xs space-y-1">
                      <li>• Ideal for occasional use</li>
                      <li>• Cost-effective for specific projects</li>
                      <li>• No monthly commitment</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-green-200 dark:border-green-700 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">Pro Plan</h5>
                    <p className="text-green-800 dark:text-green-200 text-sm mb-3">$20/month or $200/year</p>
                    <ul className="text-green-800 dark:text-green-200 text-xs space-y-1">
                      <li>• Substantial usage included</li>
                      <li>• Claude Code in terminal</li>
                      <li>• Individual developers</li>
                    </ul>
                  </div>

                  <div className="p-4 border border-purple-200 dark:border-purple-700 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                    <h5 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">Max Plans</h5>
                    <p className="text-purple-800 dark:text-purple-200 text-sm mb-3">From $100/month</p>
                    <ul className="text-purple-800 dark:text-purple-200 text-xs space-y-1">
                      <li>• 5x or 20x more usage than Pro</li>
                      <li>• Higher output limits</li>
                      <li>• Early access to features</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">💡 Usage Optimization Tips</h6>
                  <ul className="text-gray-700 dark:text-gray-300 text-sm space-y-1">
                    <li>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/status</code> command to monitor usage patterns</li>
                    <li>• Use Sonnet 4.5 for routine tasks, switch to Opus 4.1 for complex problems</li>
                    <li>• Consider using print mode for batch operations to optimize API calls</li>
                    <li>• Use <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded">/clear</code> strategically to manage context window efficiently</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AdvancedTopics