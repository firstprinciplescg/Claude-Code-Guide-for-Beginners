import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'
import { Badge } from '@/components/ui/badge.jsx'

const IDEIntegration = () => {
  return (
    <section data-section="ide-integration" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">IDE Integration</h2>
      
      {/* Section TOC */}
      <SectionTOC 
        sections={[
          { id: 'understanding-integration', title: 'Understanding IDE Integration' },
          { id: 'vscode-compatible', title: 'VS Code and Compatible Editors' },
          { id: 'jetbrains-ides', title: 'JetBrains IDEs' },
          { id: 'cross-environment', title: 'Working Across Environments' },
          { id: 'maximizing-benefits', title: 'Maximizing Integration Benefits' }
        ]}
        className="mb-8"
      />
      
      <div className="space-y-8">
        {/* Understanding IDE Integration */}
        <div data-subsection="understanding-integration">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Understanding IDE Integration</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                One of Claude Code's most powerful features is its ability to integrate directly with your development environment. 
                Rather than being another separate tool to switch between, Claude Code works seamlessly within your IDE, providing 
                AI assistance without disrupting your flow.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Auto-Installation System</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  The IDE integration isn't a traditional extension you download from a marketplace. Instead, it's an intelligent 
                  system that auto-installs when you run Claude from within your IDE's integrated terminal. This ensures compatibility 
                  and eliminates manual updates.
                </p>
              </div>
              
              <ExpandableSection title="Enhanced Capabilities with IDE Integration">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-green-600">•</span>
                    <span><strong>Visual Diff Views:</strong> Display code changes in your IDE's familiar diff viewer</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-green-600">•</span>
                    <span><strong>Quick Launch Shortcuts:</strong> Keyboard shortcuts like Cmd+Esc (Mac) or Ctrl+Esc (Windows/Linux)</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-green-600">•</span>
                    <span><strong>Automatic Context Sharing:</strong> Share current selection or active file context automatically</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="font-medium text-green-600">•</span>
                    <span><strong>Diagnostic Information:</strong> Receive real-time error and warning information from your IDE</span>
                  </div>
                </div>
              </ExpandableSection>
            </CardContent>
          </Card>
        </div>

        {/* VS Code and Compatible Editors */}
        <div data-subsection="vscode-compatible">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">VS Code and Compatible Editors</h3>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <span>Supported Editors</span>
                  <div className="flex space-x-2">
                    <Badge variant="secondary">VS Code</Badge>
                    <Badge variant="secondary">Cursor</Badge>
                    <Badge variant="secondary">Windsurf</Badge>
                    <Badge variant="secondary">VSCodium</Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Claude Code works seamlessly with VS Code and its popular forks. Setup is straightforward and automatic.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Setup Process</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                        <span className="text-gray-600 dark:text-gray-400">Open your project in VS Code</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                        <span className="text-gray-600 dark:text-gray-400">Open the integrated terminal (Ctrl+` or from View menu)</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                        <span className="text-gray-600 dark:text-gray-400">Run <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">claude</code></span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="bg-green-50 dark:bg-green-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                        <span className="text-gray-600 dark:text-gray-400">Extension auto-installs and you'll see a confirmation notification</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>VS Code Integration Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Diff Viewer Integration</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        When Claude proposes changes, review them in VS Code's familiar diff interface with 
                        syntax highlighting and inline comments.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">Quick Launch</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Press <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Cmd+Esc</kbd> (Mac) or 
                        <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Ctrl+Esc</kbd> (Windows/Linux) 
                        from anywhere in VS Code to instantly start Claude Code.
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-semibold text-purple-900 mb-2">Selection Sharing</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Highlight code and invoke Claude - it automatically understands you want to work 
                        with that specific selection.
                      </p>
                    </div>
                    
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h5 className="font-semibold text-orange-900 mb-2">File Reference Shortcuts</h5>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Use <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Cmd+Option+K</kbd> (Mac) or 
                        <kbd className="bg-gray-100 px-2 py-1 rounded text-xs">Alt+Ctrl+K</kbd> (Windows/Linux) 
                        to quickly insert file references.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* JetBrains IDEs */}
        <div data-subsection="jetbrains-ides">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">JetBrains IDEs</h3>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <span>Supported JetBrains IDEs</span>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">IntelliJ IDEA</Badge>
                  <Badge variant="outline" className="text-xs">PyCharm</Badge>
                  <Badge variant="outline" className="text-xs">WebStorm</Badge>
                  <Badge variant="outline" className="text-xs">PhpStorm</Badge>
                  <Badge variant="outline" className="text-xs">GoLand</Badge>
                  <Badge variant="outline" className="text-xs">Android Studio</Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Setup Process</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                      <span className="text-gray-600 dark:text-gray-400">Open your JetBrains IDE</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                      <span className="text-gray-600 dark:text-gray-400">Open the integrated terminal</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-blue-50 dark:bg-blue-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                      <span className="text-gray-600 dark:text-gray-400">Run <code className="bg-gray-100 px-1 rounded">claude</code></span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-amber-50 dark:bg-amber-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">!</span>
                      <span className="text-gray-600 dark:text-gray-400">Plugin may auto-install or require manual installation from JetBrains marketplace</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="bg-green-50 dark:bg-green-900/200 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">✓</span>
                      <span className="text-gray-600 dark:text-gray-400">Restart IDE if prompted</span>
                    </div>
                  </div>
                </div>
                
                <ExpandableSection title="JetBrains-Specific Benefits">
                  <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-blue-600">•</span>
                      <span><strong>Code Analysis Integration:</strong> Respects JetBrains' powerful code analysis and provides rich context</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-blue-600">•</span>
                      <span><strong>Refactoring Tools:</strong> Works with JetBrains' advanced refactoring capabilities</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <span className="font-medium text-blue-600">•</span>
                      <span><strong>Debugging Context:</strong> Leverages debugging information to understand runtime issues</span>
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Working Across Environments */}
        <div data-subsection="cross-environment">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Working Across Environments</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                One of the thoughtful aspects of Claude Code's IDE integration is its flexibility. You're never locked 
                into one way of working.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Terminal to IDE</h4>
                    <p className="text-green-800 dark:text-green-200 text-sm mb-2">
                      Start a session in your terminal, then connect it to your IDE using:
                    </p>
                    <CodeBlock 
                      code="/ide"
                      title="Connect to IDE"
                      language="bash"
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">IDE to Terminal</h4>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      Begin in your IDE and continue in a standalone terminal if needed. 
                      The session context transfers seamlessly.
                    </p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h4 className="font-semibold text-purple-900 mb-2">Configuration Respect</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      The integration respects your IDE's configuration and extensions. If you use specific linters, 
                      formatters, or other tools, Claude Code sees their output and works with them.
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold text-orange-900 mb-2">Unified Experience</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      AI assistance feels like a natural extension of your existing tools rather than a foreign addition. 
                      This creates a unified development experience.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maximizing Integration Benefits */}
        <div data-subsection="maximizing-benefits">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Maximizing Integration Benefits</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                To get the most from IDE integration, consider your workflow patterns and optimize accordingly.
              </p>
              
              <div className="space-y-6">
                <ExpandableSection title="Diff Viewer Optimization" defaultExpanded={true}>
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Set Claude Code to use your IDE's diff viewer by default through the <code className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 rounded">/config</code> command. 
                      This provides a richer review experience than terminal-based diffs.
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded text-sm text-blue-800 dark:text-blue-200">
                      <strong>Benefit:</strong> Familiar interface with syntax highlighting, inline comments, and integrated file management
                    </div>
                  </div>
                </ExpandableSection>
                
                <ExpandableSection title="Keyboard Shortcuts for Flow">
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Use keyboard shortcuts to maintain flow. Instead of switching to terminal to ask Claude a question, 
                      use the quick launch shortcut to invoke Claude without leaving your current context.
                    </p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded text-sm text-green-800 dark:text-green-200">
                      <strong>Particularly powerful when debugging:</strong> Get immediate assistance while staying focused on the problem
                    </div>
                  </div>
                </ExpandableSection>
                
                <ExpandableSection title="Diagnostic Information Sharing">
                  <div className="space-y-3">
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      When your IDE shows errors or warnings, Claude can see these through the integration. Instead of copying 
                      and pasting error messages, simply ask: "Can you help with this error?"
                    </p>
                    <div className="bg-purple-50 p-3 rounded text-sm text-purple-800">
                      <strong>Result:</strong> Claude understands the context from your IDE's diagnostics automatically
                    </div>
                  </div>
                </ExpandableSection>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default IDEIntegration