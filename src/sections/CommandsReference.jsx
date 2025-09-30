import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

export default function CommandsReference() {
  const coreCommands = [
    { command: 'claude', description: 'Start Claude Code in interactive mode', example: 'claude' },
    { command: 'claude --version', description: 'Check current version', example: 'claude --version' },
    { command: 'claude doctor', description: 'Run comprehensive diagnostic check', example: 'claude doctor' }
  ]

  const slashCommands = [
    { command: '/clear', description: 'Reset conversation context while maintaining project awareness', example: '/clear' },
    { command: '/model', description: 'Switch between available AI models (Sonnet 4.5, Opus 4.1, Sonnet 4, Haiku 3.5)', example: '/model' },
    { command: '/rewind', description: 'Rewind to previous checkpoints - restore code, conversation, or both to an earlier state', example: '/rewind', badge: 'NEW' },
    { command: '/security-review', description: 'Perform automated security review identifying vulnerabilities and security concerns', example: '/security-review', badge: 'NEW' },
    { command: '/config', description: 'Open configuration options for Claude Code settings', example: '/config' },
    { command: '/logout', description: 'Sign out of Claude Code', example: '/logout' },
    { command: '/status', description: 'Display session information, model in use, and usage statistics', example: '/status' },
    { command: '/bug', description: 'Submit feedback and report issues to Claude Code development team', example: '/bug' },
    { command: '/ide', description: 'Connect Claude Code to your IDE (when used in external terminal)', example: '/ide' }
  ]

  const allCommands = [...coreCommands, ...slashCommands]

  return (
    <section data-section="troubleshooting" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Troubleshooting & Quick Reference</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        When things don't work as expected, these troubleshooting steps and reference materials will help you resolve issues quickly.
      </p>

      <SectionTOC 
        sections={[
          { id: 'common-issues', title: 'Common Issues and Solutions' },
          { id: 'when-things-go-wrong', title: 'When Things Go Wrong' },
          { id: 'getting-help', title: 'Getting Help' },
          { id: 'commands-reference', title: 'Commands Reference' }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">
        {/* Common Issues and Solutions */}
        <div data-subsection="common-issues">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Common Issues and Solutions</h3>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Problems</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableSection title="Login failures or session expiry">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Symptoms</h5>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        <li>• \"Invalid credentials\" errors despite correct login</li>
                        <li>• Session expires unexpectedly during work</li>
                        <li>• Can't switch between authentication methods</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Solutions</h5>
                      <div className="space-y-3">
                        <CodeBlock 
                          code="claude doctor"
                          title="Check system status and authentication"
                        />
                        <CodeBlock 
                          code="/logout"
                          title="Clear current session and re-authenticate"
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-sm">For persistent issues, check your account status at console.anthropic.com or claude.ai</p>
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance and Responsiveness</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableSection title="Slow responses or timeouts">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Symptoms</h5>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        <li>• Long wait times for responses</li>
                        <li>• Requests timing out</li>
                        <li>• Claude seems \"stuck\" processing</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Solutions</h5>
                      <div className="space-y-3">
                        <CodeBlock 
                          code="/model"
                          title="Switch to faster model (Haiku 3.5) for simple tasks"
                        />
                        <CodeBlock 
                          code="/clear"
                          title="Clear context if session has become very long"
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Consider breaking large requests into smaller parts</p>
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Context and Memory Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <ExpandableSection title="Claude forgets previous context or makes inconsistent suggestions">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Symptoms</h5>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        <li>• Claude asks about information discussed earlier</li>
                        <li>• Suggestions contradict project patterns</li>
                        <li>• Doesn't remember files or decisions from earlier in session</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Solutions</h5>
                      <div className="space-y-3">
                        <CodeBlock 
                          code="/status"
                          title="Check context window usage"
                        />
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Use CLAUDE.md to maintain project context across sessions. Include key decisions and patterns that Claude should always remember.
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          For very long sessions, use /clear strategically when switching between unrelated tasks.
                        </p>
                      </div>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* When Things Go Wrong */}
        <div data-subsection="when-things-go-wrong">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">When Things Go Wrong</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Development rarely goes perfectly, and Claude Code sessions are no exception. Here's how to handle problems when they arise.
              </p>
              
              <div className="space-y-6">
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">Code Doesn't Work as Expected</h4>
                  <p className="text-red-800 dark:text-red-200 text-sm mb-3">
                    If Claude generates code that doesn't work correctly, don't immediately blame the AI. Instead, engage in collaborative debugging.
                  </p>
                  <CodeBlock 
                    code="The authentication function you created isn't working. I'm getting a 401 error when trying to access protected routes. Here's the error message: [paste error]. Can you help me debug this?"
                    title="Good debugging request"
                  />
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Unexpected Changes to Files</h4>
                  <p className="text-amber-800 dark:text-amber-200 text-sm mb-3">
                    Claude Code always shows you changes before applying them, but if something unexpected happens, you have options.
                  </p>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• Use git to revert unwanted changes</li>
                    <li>• Ask Claude to explain what changed and why</li>
                    <li>• Request specific modifications to the approach</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">Sessions Become Unproductive</h4>
                  <p className="text-blue-800 dark:text-blue-200 text-sm mb-3">
                    If conversations become circular or unproductive, take control of the session direction.
                  </p>
                  <CodeBlock 
                    code="/clear"
                    title="Start fresh with a clear approach"
                  />
                  <p className="text-blue-800 dark:text-blue-200 text-sm mt-2">
                    Then restate your problem with more specific requirements or constraints.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Getting Help */}
        <div data-subsection="getting-help">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Getting Help</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When you encounter issues that aren't covered here, or when Claude Code isn't behaving as expected, you have several options for getting help.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Built-in Help</h4>
                  <div className="space-y-3">
                    <CodeBlock 
                      code="/bug"
                      title="Report issues directly to Claude Code team"
                    />
                    <CodeBlock 
                      code="claude doctor"
                      title="Run comprehensive diagnostic"
                    />
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      The diagnostic tool checks your system, authentication, and common configuration issues.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Community Resources</h4>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      • Check the official documentation for updates
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      • Look for known issues in the GitHub repository
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      • Join community discussions and forums
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      • Share your experience with teammates who use Claude Code
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Remember</h4>
                <p className="text-green-800 dark:text-green-200 text-sm">
                  Claude Code is designed to be helpful and collaborative. Most issues can be resolved by clearly describing the problem and working together to find a solution. Don't hesitate to ask follow-up questions or request clarification.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commands Reference */}
        <div data-subsection="commands-reference">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Commands Reference</h3>
          
          <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              <strong>Note:</strong> Claude Code uses slash commands for system operations, distinct from your conversational requests. These commands help you manage your sessions effectively.
            </p>
          </div>

      {/* Core Commands */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Core Launch Commands</CardTitle>
          <CardDescription>Essential commands for starting Claude Code and checking system status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {coreCommands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                  <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-3 py-1 rounded font-mono text-sm font-semibold">
                    {cmd.command}
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">{cmd.description}</p>
                <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded">
                  <code className="text-sm font-mono text-gray-700 dark:text-gray-300">{cmd.example}</code>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Reference - Mobile-friendly Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
          <CardDescription>All commands at a glance for quick lookup</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Layout - Card Grid */}
          <div className="md:hidden space-y-3">
            {allCommands.map((cmd, index) => (
              <div key={index} className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                <div className="mb-2">
                  <code className={`px-2 py-1 rounded text-xs font-mono font-semibold border ${
                    cmd.command.startsWith('/') 
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 border-blue-200' 
                      : 'bg-white text-gray-800 border-gray-200'
                  }`}>
                    {cmd.command}
                  </code>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{cmd.description}</p>
                <div className="bg-white p-2 rounded border">
                  <code className="text-xs font-mono text-gray-700 dark:text-gray-300 break-all">
                    {cmd.example}
                  </code>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop Layout - Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-semibold">Command</th>
                  <th className="text-left py-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {allCommands.map((cmd, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3">
                      <code className={`px-2 py-1 rounded text-xs font-mono ${
                        cmd.command.startsWith('/') 
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                      }`}>
                        {cmd.command}
                      </code>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400 text-sm">{cmd.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
        </div>
      </div>
    </section>
  )
}