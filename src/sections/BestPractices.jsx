import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const BestPractices = () => {
  return (
    <section data-section="best-practices" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Practices & Pro Tips</h2>
      
      <SectionTOC 
        sections={[
          { id: 'specific-requests', title: 'Be Specific: Detailed Requests Get Better Results' },
          { id: 'step-by-step', title: 'Step-by-Step: Break Complex Tasks into Smaller Steps' },
          { id: 'let-claude-explore', title: 'Let Claude Explore: Allow Codebase Exploration First' },
          { id: 'terminal-ui-tips', title: 'Terminal UI Tips' }
        ]}
        className="mb-8"
      />

      <div className="space-y-8">
        {/* Be Specific Section */}
        <div data-subsection="specific-requests">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Be Specific: Detailed Requests Get Better Results</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              The quality of Claude's responses directly correlates with the specificity of your requests. 
              Instead of vague instructions, provide detailed context, specific requirements, and clear expectations.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">✓ Base Request vs Improved Request Examples</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpandableSection title="Example 1: API Integration" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                      <CodeBlock 
                        code={`Help me add an API`}
                        title="Vague request"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                      <CodeBlock 
                        code={`I need to integrate a REST API for user management that fetches user profiles from \`/api/users/:id\`, handles authentication with bearer tokens stored in localStorage, includes proper error handling for 401/403/500 responses, and updates the existing UserProfile component to display the fetched data with loading states.`}
                        title="Detailed request"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Specifies the exact API endpoint and HTTP method</li>
                        <li>• Identifies authentication method and storage location</li>
                        <li>• Lists specific error scenarios to handle</li>
                        <li>• Names the component to update</li>
                        <li>• Includes UX considerations (loading states)</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Example 2: Database Operations" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                      <CodeBlock 
                        code={`Fix my database`}
                        title="Vague request"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                      <CodeBlock 
                        code={`My PostgreSQL database queries are timing out when fetching user orders. The query joins three tables (users, orders, order_items) and needs to handle up to 10,000 records. I'm using Prisma ORM with Next.js. The specific query is in @lib/database/orders.js and the error occurs in the getUserOrderHistory function. I need optimization that maintains the same data structure for the frontend.`}
                        title="Detailed request"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Identifies the specific database technology (PostgreSQL)</li>
                        <li>• Describes the exact problem (query timeouts)</li>
                        <li>• Provides scale context (10,000 records)</li>
                        <li>• Mentions the ORM and framework being used</li>
                        <li>• Uses @tags to reference specific files</li>
                        <li>• Sets constraints (maintain data structure)</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Example 3: UI Component Development" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">❌ Base Request</h5>
                      <CodeBlock 
                        code={`Create a form`}
                        title="Vague request"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">✅ Improved Request</h5>
                      <CodeBlock 
                        code={`Create a responsive contact form component for our React/TypeScript project that includes fields for name, email, phone, and message. It should use our existing design system in @components/ui/, implement real-time validation with error messages, handle form submission to our /api/contact endpoint, show loading and success states, and follow WCAG accessibility guidelines. The form should match the styling patterns used in @components/auth/LoginForm.tsx.`}
                        title="Detailed request"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 mb-2">Why the improved request is better:</h6>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Specifies technology stack (React/TypeScript)</li>
                        <li>• Lists exact form fields needed</li>
                        <li>• References existing design system with @tags</li>
                        <li>• Includes validation and UX requirements</li>
                        <li>• Mentions API endpoint for submission</li>
                        <li>• Addresses accessibility compliance</li>
                        <li>• References existing patterns to follow</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Step-by-Step Section */}
        <div data-subsection="step-by-step">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Step-by-Step: Break Complex Tasks into Smaller Steps</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              Large development tasks can be overwhelming for both you and Claude. Breaking complex features into smaller, 
              manageable steps ensures better results, easier debugging, and clearer progress tracking.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">✓ Breaking Down Complex Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpandableSection title="Example 1: E-commerce Checkout Flow" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">❌ Large Task</h5>
                      <CodeBlock 
                        code={`Implement complete e-commerce checkout functionality`}
                        title="Overwhelming request"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">✅ Broken into Smaller Steps</h5>
                      <div className="space-y-2">
                        {[
                          "Create shopping cart state management with add/remove/update quantity functions",
                          "Build cart display component with item details and price calculations", 
                          "Implement shipping address form with validation and address lookup",
                          "Add payment method selection (credit card, PayPal, etc.)",
                          "Create order summary component with tax and shipping calculations",
                          "Integrate payment processing with Stripe API",
                          "Build order confirmation page and email notifications",
                          "Add inventory checking and reservation during checkout",
                          "Implement order tracking and status updates"
                        ].map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                            <span className="text-green-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                            <span className="text-green-800 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 mb-2">Why stepwise is better:</h6>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Each step can be developed, tested, and refined individually</li>
                        <li>• Allows validation of functionality at each stage</li>
                        <li>• Makes debugging easier by isolating issues</li>
                        <li>• Enables requirement adjustments based on learning</li>
                        <li>• Provides clear progress milestones</li>
                        <li>• Makes the project less overwhelming</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Example 2: User Authentication System" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-red-600 mb-2">❌ Large Task</h5>
                      <CodeBlock 
                        code={`Implement user authentication across the entire application`}
                        title="Overwhelming request"
                      />
                    </div>

                    <div>
                      <h5 className="font-semibold text-green-600 mb-2">✅ Broken into Smaller Steps</h5>
                      <div className="space-y-2">
                        {[
                          "Set up user database schema and models",
                          "Create registration API endpoint with validation",
                          "Build login API with password hashing and JWT generation",
                          "Implement password reset functionality with email tokens",
                          "Create authentication middleware for protected routes",
                          "Build registration form component with real-time validation",
                          "Create login form component with error handling",
                          "Add authentication context/state management to React app",
                          "Implement route protection in frontend",
                          "Add user profile management (view/edit profile)",
                          "Create logout functionality and token cleanup"
                        ].map((step, index) => (
                          <div key={index} className="flex items-start space-x-3 p-2 bg-green-50 rounded">
                            <span className="text-green-600 font-bold text-sm mt-0.5">{index + 1}.</span>
                            <span className="text-green-800 text-sm">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 mb-2">Why stepwise is better:</h6>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• Authentication touches many parts of an application</li>
                        <li>• Building incrementally ensures each piece works correctly</li>
                        <li>• Allows thorough testing of security features at each step</li>
                        <li>• Makes troubleshooting issues much easier</li>
                        <li>• Enables security review at each stage</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Let Claude Explore Section */}
        <div data-subsection="let-claude-explore">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Let Claude Explore: Allow Codebase Exploration First</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              Before diving into implementation, let Claude explore your codebase to understand your patterns, 
              conventions, and existing architecture. This leads to more consistent, maintainable solutions.
            </p>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-amber-900 mb-3">Exploration Request Examples</h5>
                    <div className="space-y-3">
                      <CodeBlock 
                        code={`Before we implement the new feature, can you explore @src/components/ and @src/hooks/ to understand our React patterns and conventions?`}
                        title="Understanding patterns"
                      />
                      <CodeBlock 
                        code={`Please review @server/routes/ and @server/middleware/ to see how we currently structure our API endpoints and error handling`}
                        title="Backend architecture"
                      />
                      <CodeBlock 
                        code={`Look at @styles/ and a few existing components to understand our styling approach and design system usage`}
                        title="Design patterns"
                      />
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-green-900 mb-2">Benefits of Exploration</h5>
                    <ul className="text-green-800 text-sm space-y-1">
                      <li>• Claude learns your naming conventions and code style</li>
                      <li>• Ensures new code follows existing patterns</li>
                      <li>• Identifies reusable components and utilities</li>
                      <li>• Avoids breaking existing functionality</li>
                      <li>• Results in more maintainable solutions</li>
                      <li>• Reduces the need for refactoring later</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-semibold text-blue-900 mb-2">What Claude Discovers During Exploration</h5>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• File organization and directory structure</li>
                      <li>• Naming conventions for files, functions, and variables</li>
                      <li>• Error handling patterns and logging approaches</li>
                      <li>• Testing strategies and existing test structure</li>
                      <li>• Third-party libraries and how they're used</li>
                      <li>• Configuration patterns and environment handling</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Terminal UI Tips Section */}
        <div data-subsection="terminal-ui-tips">
          <h3 className="text-2xl font-semibond text-gray-900 mb-6">Terminal UI Tips</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 text-lg">
              Master these terminal interface features to become more efficient with Claude Code sessions.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-indigo-700">Essential Terminal Commands & Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {[
                    { command: "/clear", description: "Clear conversation history while maintaining codebase context" },
                    { command: "/save [session-name]", description: "Save current conversation for future reference or team sharing" },
                    { command: "/load [session-name]", description: "Load a previously saved conversation and restore context" },
                    { command: "/diff [filename]", description: "Show detailed diff view of changes made to specific files" },
                    { command: "/undo", description: "Revert the most recent changes made by Claude Code" },
                    { command: "/status", description: "Display current session information and context size" },
                    { command: "/files", description: "List all files currently in conversation context" },
                    { command: "/search [query]", description: "Search across your codebase using semantic understanding" },
                    { command: "/commit [message]", description: "Create git commits with AI-generated or custom commit messages" }
                  ].map((tip, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <code className="text-indigo-600 font-semibold text-sm bg-indigo-50 px-2 py-1 rounded">
                        {tip.command}
                      </code>
                      <p className="text-gray-600 text-sm mt-2">{tip.description}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h6 className="font-semibold text-yellow-900 mb-2">💡 Pro Tips:</h6>
                  <ul className="text-yellow-800 text-sm space-y-1">
                    <li>• Use `/clear` frequently when switching between different development tasks</li>
                    <li>• Combine multiple @ tags in one message to provide comprehensive context</li>
                    <li>• Save important debugging sessions with `/save` for team knowledge sharing</li>
                    <li>• Use `/status` to monitor context size and session health during long sessions</li>
                    <li>• The `/search` command understands code semantics, not just text matching</li>
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

export default BestPractices