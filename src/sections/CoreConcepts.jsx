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
          { id: 'context-window-memory', title: 'Context Window and Memory' },
          { id: 'file-access', title: 'File Access and Project Awareness' },
          { id: 'model-selection', title: 'Model Selection and Capabilities' },
          { id: 'claude-md', title: 'The CLAUDE.md File' }
        ]}
        className="mb-8"
      />
      
      <div className="space-y-8">
        {/* Context Window and Memory */}
        <div data-subsection="context-window-memory">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Context Window and Memory</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 mb-6">
                The context window is Claude Code's working memory during your conversation. Think of it as Claude's ability to remember and reference information from your current session.
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">What's Included in Context</h4>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Your recent conversation history</li>
                  <li>• Files that have been read during the session</li>
                  <li>• Commands that have been executed and their outputs</li>
                  <li>• Changes that have been made to your codebase</li>
                </ul>
              </div>
              
              <ExpandableSection title="Understanding Context Limits" className="mb-4 mt-6">
                <div className="space-y-4">
                  <p className="text-gray-600">
                    The context window has limits. During long sessions, especially when working with large files or extensive command outputs, older information gets pushed out to make room for new information.
                  </p>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-amber-900 mb-2">When to Use /clear</h5>
                    <p className="text-amber-800 text-sm">
                      Using <code className="bg-amber-100 px-1 rounded">/clear</code> is like starting a fresh conversation with someone who already knows your codebase but isn't carrying baggage from previous discussions. Essential for productive long sessions.
                    </p>
                  </div>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600">
                When you reference "the function we just discussed" or "the error from earlier," Claude understands these references because they're within the context window. This allows for coherent, contextual responses throughout your session.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* File Access and Project Awareness */}
        <div data-subsection="file-access">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">File Access and Project Awareness</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 mb-6">
                Claude Code takes a security-first approach to file access while maintaining comprehensive project awareness. It understands your project structure and conventions without compromising security.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">What Claude Can Access</h4>
                  <ul className="text-sm text-green-800 space-y-2">
                    <li>• Any file in your current directory and subdirectories</li>
                    <li>• Project structure and organization</li>
                    <li>• Code patterns and conventions</li>
                    <li>• Technology stack and dependencies</li>
                    <li>• File relationships and imports</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Security Features</h4>
                  <ul className="text-sm text-blue-800 space-y-2">
                    <li>• Always asks permission before modifying files</li>
                    <li>• Shows clear diff views before changes</li>
                    <li>• Never automatically runs destructive commands</li>
                    <li>• Respects .gitignore and similar files</li>
                    <li>• You maintain full control over all changes</li>
                  </ul>
                </div>
              </div>
              
              <ExpandableSection title="Project Understanding Capabilities" className="mb-4">
                <div className="space-y-3 text-gray-600">
                  <p><strong>Pattern Recognition:</strong> Claude identifies and follows your project's coding patterns, naming conventions, and architectural decisions.</p>
                  <p><strong>Cross-file Awareness:</strong> Understands how changes in one file might affect others throughout your codebase.</p>
                  <p><strong>Technology Integration:</strong> Recognizes your frameworks, libraries, and tools to provide contextually appropriate suggestions.</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600">
                This holistic understanding means Claude can make suggestions that feel native to your project rather than generic solutions copied from documentation. Changes are real and immediate, working perfectly with version control systems.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Model Selection and Capabilities */}
        <div data-subsection="model-selection">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Model Selection and Capabilities</h3>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Models</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Claude Code can utilize different AI models, each optimized for different types of tasks. Understanding these options helps you choose the right tool for each job.
                </p>
                
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h5 className="font-semibold text-purple-900 mb-2">Claude Opus 4.1</h5>
                    <p className="text-sm text-gray-600 mb-2">The most capable model, excelling at complex reasoning and architectural decisions.</p>
                    <p className="text-xs text-purple-700"><strong>Best for:</strong> System design, complex refactoring, nuanced problem analysis</p>
                  </div>
                  
                  <div className="border-l-4 border-blue-500 pl-4">
                    <h5 className="font-semibold text-blue-900 mb-2">Claude Sonnet 4</h5>
                    <p className="text-sm text-gray-600 mb-2">Excellent balance of capability and speed for most development tasks.</p>
                    <p className="text-xs text-blue-700"><strong>Best for:</strong> Day-to-day coding, debugging, feature implementation</p>
                  </div>
                  
                  <div className="border-l-4 border-green-500 pl-4">
                    <h5 className="font-semibold text-green-900 mb-2">Claude Haiku 3.5</h5>
                    <p className="text-sm text-gray-600 mb-2">Optimized for speed and efficiency with quick responses.</p>
                    <p className="text-xs text-green-700"><strong>Best for:</strong> Quick answers, simple code generation, straightforward tasks</p>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg mt-6">
                  <h5 className="font-semibold text-blue-900 mb-2">Switching Models</h5>
                  <CodeBlock 
                    code={`/model`}
                    title="Switch between available models"
                    language="bash"
                  />
                  <p className="text-blue-800 text-sm mt-2">
                    You can switch models during your session to match the model to your current needs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The CLAUDE.md File */}
        <div data-subsection="claude-md">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">The CLAUDE.md File</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 mb-6">
                A powerful but often overlooked feature is the CLAUDE.md file. This special file, placed in your project root, is automatically read by Claude at the start of each conversation.
              </p>
              
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 mb-2">What to Include in CLAUDE.md</h4>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Coding standards specific to your team</li>
                  <li>• Build commands and their purposes</li>
                  <li>• Architectural decisions and their rationales</li>
                  <li>• Known issues or workarounds</li>
                  <li>• Preferred libraries or patterns</li>
                </ul>
              </div>
              
              <ExpandableSection title="Example CLAUDE.md Structure" defaultExpanded={true}>
                <CodeBlock 
                  code={`# Project Conventions

## Code Style
- Use ES modules (import/export) not CommonJS
- Prefer functional components in React
- Use descriptive variable names over comments

## Testing
- Run tests with: npm test
- Focus on integration tests over unit tests
- Mock external APIs using MSW

## Architecture Notes
- Authentication uses JWT tokens stored in httpOnly cookies
- All API responses follow the JSend specification
- Database migrations must be reversible`}
                  title="CLAUDE.md"
                  language="markdown"
                />
              </ExpandableSection>
              
              <p className="text-gray-600 mt-4">
                This file ensures consistency across sessions and team members, as everyone working with Claude Code on your project gets the same contextual understanding. Think of it as a primer that helps Claude understand your project's specific conventions and requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CoreConcepts