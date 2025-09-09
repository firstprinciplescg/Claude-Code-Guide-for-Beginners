import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const EssentialCommands = () => {
  return (
    <section data-section="essential-commands" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Essential Commands</h2>
      
      {/* Section TOC */}
      <SectionTOC 
        sections={[
          { id: 'core-slash-commands', title: 'Core Slash Commands' },
          { id: 'custom-commands', title: 'Custom Commands' },
          { id: 'using-commands-effectively', title: 'Using Commands Effectively' }
        ]}
        className="mb-8"
      />
      
      <div className="space-y-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Note:</strong> Claude Code uses slash commands for system operations, distinct from your 
            conversational requests. Understanding these commands helps you manage your sessions effectively.
          </p>
        </div>

        {/* Core Slash Commands */}
        <div data-subsection="core-slash-commands">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Core Slash Commands</h3>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <code className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded font-mono text-sm">/clear</code>
                  <span>- Reset Context</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  The most frequently used command. Resets your conversation context while maintaining project awareness. 
                  Think of it as starting a fresh discussion about a new topic while Claude still remembers everything about your project.
                </p>
                
                <ExpandableSection title="When to Use /clear">
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>• Switching between different features</li>
                    <li>• When your conversation has become long and unfocused</li>
                    <li>• Ensuring Claude isn't influenced by earlier discussions</li>
                    <li>• Starting work on a completely different component</li>
                  </ul>
                </ExpandableSection>
                
                <CodeBlock 
                  code="/clear"
                  title="Reset conversation context"
                  language="bash"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <code className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded font-mono text-sm">/model</code>
                  <span>- Switch AI Models</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Switch between available AI models mid-session. Shows available options and allows selection 
                  based on your current needs.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h5 className="font-semibold text-purple-900 text-sm mb-1">Opus 4.1</h5>
                    <p className="text-purple-700 text-xs">Complex reasoning</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h5 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">Sonnet 4</h5>
                    <p className="text-blue-700 text-xs">Balanced capability</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h5 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-1">Haiku 3.5</h5>
                    <p className="text-green-700 text-xs">Speed optimized</p>
                  </div>
                </div>
                
                <CodeBlock 
                  code="/model"
                  title="Switch between available models"
                  language="bash"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <code className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded font-mono text-sm">/config</code>
                  <span>- Configuration Options</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Opens configuration options for Claude Code. Adjust settings like diff display preferences, 
                  tool permissions, and default behaviors.
                </p>
                
                <ExpandableSection title="Configuration Options">
                  <ul className="text-gray-600 dark:text-gray-400 space-y-2 text-sm">
                    <li>• How diffs are displayed</li>
                    <li>• Which tools require permission</li>
                    <li>• Default behaviors for various operations</li>
                    <li>• IDE integration preferences</li>
                  </ul>
                </ExpandableSection>
                
                <CodeBlock 
                  code="/config"
                  title="Access configuration settings"
                  language="bash"
                />
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">/logout</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Sign out of Claude Code. Next session will require authentication again.
                  </p>
                  <CodeBlock 
                    code="/logout"
                    title="Sign out"
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">/status</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Display session information, current model, and usage statistics.
                  </p>
                  <CodeBlock 
                    code="/status"
                    title="Show session info"
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">/bug</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Report issues directly to the Claude Code team with relevant context.
                  </p>
                  <CodeBlock 
                    code="/bug"
                    title="Report issues"
                    language="bash"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">/ide</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Connect Claude Code to your IDE when used in external terminal.
                  </p>
                  <CodeBlock 
                    code="/ide"
                    title="Connect to IDE"
                    language="bash"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Custom Commands */}
        <div data-subsection="custom-commands">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Custom Commands</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Beyond built-in commands, Claude Code supports custom commands that you can create for your project or team. 
                These are stored as markdown files in the <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">.claude/commands/</code> directory.
              </p>
              
              <ExpandableSection title="Example: Custom Deploy Command" defaultExpanded={true}>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Create <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">.claude/commands/deploy.md</code>:
                  </p>
                  <CodeBlock 
                    code={`# Deploy Command

When asked to deploy, follow these steps:
1. Run all tests to ensure they pass
2. Build the production bundle
3. Check that no sensitive files are included
4. Create a git tag with the version number
5. Push to the deployment branch`}
                    title=".claude/commands/deploy.md"
                    language="markdown"
                  />
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    This file would then be accessible via <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">/deploy</code> 
                    in your Claude Code session, ensuring consistent deployment procedures across your team.
                  </p>
                </div>
              </ExpandableSection>
            </CardContent>
          </Card>
        </div>

        {/* Using Commands Effectively */}
        <div data-subsection="using-commands-effectively">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Using Commands Effectively</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Unobtrusive Design</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Commands don't interrupt your conversation flow. You can use them at any point without losing context. 
                    Most commands provide immediate feedback, confirming their action or showing relevant information.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Commands vs Conversation</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Remember that commands are different from conversational requests. Typing <code className="bg-gray-100 px-1 rounded">/clear</code> 
                    executes a system command, while saying "clear the screen" would be interpreted as a conversational request.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold text-purple-900 mb-2">Strategic Usage</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Use commands strategically to enhance your workflow. For example, switch to a faster model for simple tasks, 
                    then back to a more powerful model for complex reasoning.
                  </p>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-6">
                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Pro Tip</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Commands in Claude Code are designed to feel natural and unobtrusive. They're there when you need them, 
                  invisible when you don't. Master them gradually as you become more comfortable with Claude Code's workflow.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default EssentialCommands