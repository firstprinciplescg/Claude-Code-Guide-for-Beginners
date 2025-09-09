import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const BestPractices = () => {
  return (
    <section data-section="best-practices" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Best Practices</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Working effectively with Claude Code involves more than just knowing commands and features. These practices will help you get the most value from your AI pair programmer.
      </p>

      <SectionTOC 
        sections={[
          { id: 'effective-communication', title: 'Effective Communication' },
          { id: 'session-management', title: 'Session Management' },
          { id: 'working-with-large-changes', title: 'Working with Large Changes' },
          { id: 'maintaining-code-quality', title: 'Maintaining Code Quality' },
          { id: 'learning-from-claude', title: 'Learning from Claude' },
          { id: 'team-collaboration', title: 'Team Collaboration' }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">
        {/* Effective Communication */}
        <div data-subsection="effective-communication">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Effective Communication</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                The quality of Claude's assistance directly correlates with the clarity and completeness of your communication. Think of Claude as a skilled colleague who needs context to provide the best help.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Provide Background Context</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    When making requests, provide background about what you're trying to achieve, not just the immediate task. Instead of saying "fix this function," explain what the function should do, why it's not working correctly, and what constraints exist.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <CodeBlock 
                      code={`This authentication middleware isn't working properly. Users should be redirected to /login when their JWT token is expired, but instead they're getting a 500 error. The middleware is used on all /api/protected/* routes and needs to work with our existing session management in @lib/auth.js.`}
                      title="Good: Provides context and constraints"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Be Specific About Requirements</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    If performance is critical, mention it. If you need to maintain backward compatibility, say so. If you prefer certain patterns or libraries, make that clear. These details shape Claude's suggestions to match your needs precisely.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Reference Relevant Files</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Reference relevant files or areas of the codebase in your conversation. While Claude can search your entire project, pointing to specific areas helps focus the analysis and ensures Claude examines the most relevant code.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Session Management */}
        <div data-subsection="session-management">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Session Management</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Managing your Claude Code sessions effectively ensures optimal performance and clarity. The context window, while generous, has limits that affect long sessions.
              </p>
              
              <div className="space-y-6">
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-3">Strategic Use of /clear</h4>
                  <p className="text-amber-800 dark:text-amber-200 text-sm mb-3">
                    Use <code className="bg-amber-100 dark:bg-amber-800 px-1 rounded">/clear</code> strategically between distinct tasks. Think of your session like a focused meeting; when you've completed one topic and are moving to something entirely different, clearing the context helps Claude provide more relevant assistance on the new topic.
                  </p>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• After completing one feature before starting another</li>
                    <li>• When switching between different areas of your codebase</li>
                    <li>• If conversations become unfocused or off-topic</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Break Work into Logical Chunks</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    For long development sessions, consider breaking work into logical chunks. Complete one feature or fix one bug, then clear context before moving to the next. This approach keeps each conversation focused and prevents earlier discussions from influencing unrelated work.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Save Important Information</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Save important information before clearing. If Claude has provided valuable analysis or design decisions you'll need later, copy them to a document or comment in your code before clearing the context.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Working with Large Changes */}
        <div data-subsection="working-with-large-changes">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Working with Large Changes</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When making substantial changes to your codebase, break them into smaller, manageable steps. This approach offers several benefits that go beyond just working with Claude Code.
              </p>
              
              <div className="space-y-6">
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">Benefits of Incremental Changes</h4>
                  <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>• Each smaller change is easier to review and understand</li>
                    <li>• You can test incrementally, catching issues early</li>
                    <li>• Easier to revert specific changes if something goes wrong</li>
                    <li>• Claude can maintain better context for focused changes</li>
                    <li>• Better for teammates reviewing your code later</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Example: Adding a Major Feature</h4>
                  <div className="text-gray-600 dark:text-gray-400 text-sm space-y-2">
                    <p>Instead of "implement user authentication system," break it down:</p>
                    <div className="ml-4 space-y-1">
                      <p>1. Start with the data model</p>
                      <p>2. Build the API layer</p>
                      <p>3. Add business logic</p>
                      <p>4. Create the user interface</p>
                      <p>5. Test at each stage</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Maintaining Code Quality */}
        <div data-subsection="maintaining-code-quality">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Maintaining Code Quality</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                While Claude Code can generate substantial amounts of code quickly, maintaining quality requires thoughtful interaction.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Always Review Generated Code</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Always review generated code before accepting it, even if it appears correct. Understanding what Claude has created ensures you can maintain and modify it later.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Ask for Explanations</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Ask Claude to explain complex logic or unusual patterns in generated code. These explanations help you learn and verify that the approach is appropriate for your needs. Don't hesitate to ask for alternatives if the first suggestion doesn't feel right.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <CodeBlock 
                      code={`Can you explain why you used a WeakMap here instead of a regular Map? Are there alternative approaches we should consider?`}
                      title="Good: Asks for reasoning and alternatives"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Request Tests</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Request tests for generated code, even for seemingly simple functions. Tests serve as both validation and documentation, ensuring the code works as expected and helping future developers understand the intended behavior.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning from Claude */}
        <div data-subsection="learning-from-claude">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Learning from Claude</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Every interaction with Claude Code is an opportunity to learn. This active learning approach transforms Claude Code from a tool into a teacher.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Ask About New Approaches</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    When Claude suggests an approach you haven't seen before, ask for an explanation. Understanding why certain patterns or techniques are used improves your own development skills.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Understand Root Causes</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    When debugging, ask Claude to explain not just the fix but the root cause. Understanding why problems occur helps prevent similar issues in the future. These explanations often reveal subtle aspects of the languages or frameworks you're using.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Study Refactoring Changes</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    If Claude refactors your code, study the changes to understand the improvements. What made the new version better? How can you apply these principles to future code you write?
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Team Collaboration */}
        <div data-subsection="team-collaboration">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Team Collaboration</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When working in a team, Claude Code can help maintain consistency and share knowledge across team members.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Comprehensive CLAUDE.md</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Create a comprehensive CLAUDE.md file that documents your team's conventions, preferences, and decisions. This ensures everyone using Claude Code gets consistent suggestions aligned with team standards.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                    <CodeBlock 
                      code={`# Team Conventions\n\n## Code Style\n- Use ES modules, prefer TypeScript\n- Follow functional programming patterns\n\n## Architecture Decisions\n- Authentication uses JWT with httpOnly cookies\n- All API responses follow JSend specification\n\n## Testing\n- Focus on integration tests\n- Mock external APIs using MSW`}
                      title="Example CLAUDE.md structure"
                      language="markdown"
                    />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Document Architectural Decisions</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Include architectural decisions and their rationales in CLAUDE.md. When Claude understands why certain choices were made, it can provide better assistance that respects these decisions. Document not just what patterns to use, but why they were chosen over alternatives.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Share Custom Commands</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                    Share useful custom commands by committing them to your repository's <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">.claude/commands/</code> directory. If someone discovers an effective way to handle deployments, testing, or other routine tasks, everyone benefits from that knowledge.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">Code Reviews with Claude</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Consider using Claude Code during code reviews. It can help identify issues, suggest improvements, and explain complex changes, making reviews more thorough and educational for all participants.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default BestPractices