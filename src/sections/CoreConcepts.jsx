import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock, InlineCode } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const CoreConcepts = () => {
  return (
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
                  code={`claude-code`}
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
                          code={`Can you review @src/components/UserAuth.tsx and suggest improvements?`}
                          title="Tag specific files"
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Directory Tagging</h5>
                        <CodeBlock 
                          code={`Please analyze the structure of @src/components/ and identify patterns`}
                          title="Tag entire directories"
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Multiple Tags</h5>
                        <CodeBlock 
                          code={`Compare @package.json with @yarn.lock and @src/api/client.js to understand dependencies`}
                          title="Combine multiple file references"
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 mb-2">Function-Specific Tagging</h5>
                        <CodeBlock 
                          code={`Help me optimize @utils.py:helperFunction for better performance`}
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
                  code={`/clear`}
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
                      code={`claude-code --help`}
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
  )
}

export default CoreConcepts