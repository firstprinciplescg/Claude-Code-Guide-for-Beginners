import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const CommonWorkflows = () => {
  return (
    <section data-section="workflows" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Common Workflows</h2>
      
      {/* Section TOC */}
      <SectionTOC 
        sections={[
          { id: 'understanding-codebases', title: 'Understanding New Codebases' },
          { id: 'building-features', title: 'Building Features' },
          { id: 'fixing-bugs', title: 'Fixing Bugs' }
        ]}
        className="mb-8"
      />
      
      <div className="space-y-8">
        {/* Understanding New Codebases */}
        <div data-subsection="understanding-codebases">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Understanding New Codebases</h3>
          
          <div className="space-y-6">
            {/* Get Codebase Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold text-lg">1.</span>
                  <span>Get Codebase Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  When encountering a new codebase, start by gaining a high-level understanding of the project 
                  structure, technologies used, and overall architecture.
                </p>
                
                <ExpandableSection title="How to Get Started" className="mb-4">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Basic Overview Request</h5>
                      <CodeBlock 
                        code={`Can you give me an overview of this codebase? @README.md @package.json`}
                        title="Start with key project files"
                      />
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">For Larger Codebases</h5>
                      <CodeBlock 
                        code={`What's the main application flow in @src/ and how is the database layer organized?`}
                        title="Focus on specific aspects"
                      />
                    </div>
                  </div>
                </ExpandableSection>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">What Claude Will Identify</h5>
                  <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                    <li>• Project structure and folder organization</li>
                    <li>• Main technologies and frameworks used</li>
                    <li>• Entry points and configuration files</li>
                    <li>• Architectural patterns (MVC, microservices, etc.)</li>
                    <li>• Build and deployment processes</li>
                    <li>• Areas of potential technical debt</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Dive into Specific Components */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold text-lg">2.</span>
                  <span>Dive into Specific Components</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Once you have a general understanding, explore specific components or modules relevant to your work.
                </p>
                
                <div className="space-y-4">
                  <ExpandableSection title="Component Analysis Examples">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Analyze Specific Components</h5>
                        <CodeBlock 
                          code={`What does this UserAuth component do and how does it integrate with the rest of the application? @src/components/UserAuth/`}
                          title="Deep dive into components"
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Understand Implementation Details</h5>
                        <CodeBlock 
                          code={`Can you walk me through how the authentication flow works in @src/components/UserAuth.tsx?`}
                          title="Trace functionality step by step"
                        />
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Identify Patterns</h5>
                        <CodeBlock 
                          code={`How is error handling implemented in @src/components/ and what patterns are used consistently?`}
                          title="Learn project conventions"
                        />
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mt-4">
                  <p className="text-blue-800 dark:text-blue-200 text-sm">
                    <strong>Pro Tip:</strong> Ask Claude to explain not just what the code does, but why it's 
                    structured the way it is. This helps you understand the reasoning behind design decisions.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Find Relevant Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-blue-600 font-bold text-lg">3.</span>
                  <span>Find Relevant Code</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Efficiently locate code related to specific functionality or features using Claude's 
                  understanding of code relationships and semantic search capabilities.
                </p>
                
                <ExpandableSection title="Smart Code Discovery">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Find Feature Implementation</h5>
                      <CodeBlock 
                        code={`Where is the user registration logic implemented? Show me all files involved.`}
                        title="Locate functionality across the codebase"
                      />
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Trace Dependencies</h5>
                      <CodeBlock 
                        code={`What files are affected if I modify @database/schema/users.sql?`}
                        title="Understand ripple effects of changes"
                      />
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Identify Related Code</h5>
                      <CodeBlock 
                        code={`Show me all files related to payment processing and how they work together`}
                        title="Map feature boundaries"
                      />
                    </div>
                  </div>
                </ExpandableSection>
                
                <div className="bg-purple-50 p-4 rounded-lg mt-4">
                  <h5 className="font-semibold text-purple-900 mb-2">Claude's Code Discovery Powers</h5>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Traces relationships between files and functions</li>
                    <li>• Identifies patterns and conventions used throughout</li>
                    <li>• Maps data flow across multiple layers</li>
                    <li>• Suggests where to make changes safely</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Building Features */}
        <div data-subsection="building-features">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Building Features</h3>
          
          <div className="space-y-6">
            {/* Describe the Feature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-lg">1.</span>
                  <span>Describe the Feature</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Effective feature development starts with clear, detailed feature descriptions. The more 
                  specific you are, the better Claude can plan the implementation.
                </p>
                
                <ExpandableSection title="Good vs. Better Feature Descriptions" defaultExpanded={true}>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 rounded-lg">
                        <h5 className="font-semibold text-red-900 dark:text-red-100 mb-2">❌ Vague Request</h5>
                        <CodeBlock 
                          code={`I need a login feature`}
                          title="Too basic"
                        />
                      </div>
                      <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 rounded-lg">
                        <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Detailed Request</h5>
                        <CodeBlock 
                          code={`I need a user authentication system that supports email/password login, includes password reset functionality, integrates with our existing user database, provides JWT tokens for session management, and works with our React frontend and Node.js backend following our existing API patterns.`}
                          title="Comprehensive requirements"
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Include These Details</h5>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• User experience and interaction flow</li>
                        <li>• Integration points with existing systems</li>
                        <li>• Error handling and edge cases</li>
                        <li>• Performance and security requirements</li>
                        <li>• Technology stack constraints</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>

            {/* Review the Plan */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-lg">2.</span>
                  <span>Review the Plan</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Claude will provide a detailed implementation plan. Take time to review and understand 
                  the proposed approach before proceeding.
                </p>
                
                <ExpandableSection title="What to Look For in the Plan">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Implementation Strategy</h5>
                      <ul className="text-gray-600 dark:text-gray-400 text-sm space-y-1">
                        <li>• File modifications and new files to create</li>
                        <li>• Database changes and migrations</li>
                        <li>• Step-by-step implementation order</li>
                        <li>• Integration points and dependencies</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Questions to Ask</h5>
                      <CodeBlock 
                        code={`Why did you choose JWT over sessions for this implementation?`}
                        title="Understand design decisions"
                      />
                      <CodeBlock 
                        code={`Can we implement this using TypeScript instead of JavaScript?`}
                        title="Request modifications"
                      />
                      <CodeBlock 
                        code={`Are there alternative approaches we should consider?`}
                        title="Explore options"
                      />
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>

            {/* Approve Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-lg">3.</span>
                  <span>Approve Changes</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Once satisfied with the plan, approve Claude to proceed with implementation. You'll see 
                  exactly what changes will be made before they're applied.
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-4">
                  <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Review Process</h5>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• Claude shows diff views for each file</li>
                    <li>• Changes are grouped logically</li>
                    <li>• You can approve file by file or all at once</li>
                    <li>• Request modifications to specific parts</li>
                    <li>• Full control over what gets implemented</li>
                  </ul>
                </div>
                
                <CodeBlock 
                  code={`The validation logic looks good, but can you add more descriptive error messages for users?`}
                  title="Request specific adjustments during approval"
                />
              </CardContent>
            </Card>

            {/* Test the Feature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-green-600 font-bold text-lg">4.</span>
                  <span>Test the Feature</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  After implementation, Claude can help you test the new feature thoroughly with both 
                  automated tests and manual testing procedures.
                </p>
                
                <ExpandableSection title="Comprehensive Testing Approach">
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Generate Test Cases</h5>
                      <CodeBlock 
                        code={`Create comprehensive tests for this authentication feature, including unit tests, integration tests, and edge cases`}
                        title="Automated testing"
                      />
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Manual Testing Procedures</h5>
                      <CodeBlock 
                        code={`Provide step-by-step manual testing procedures for the login flow, including testing with valid credentials, invalid credentials, and password reset functionality`}
                        title="User acceptance testing"
                      />
                    </div>
                    
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Performance Testing</h5>
                      <CodeBlock 
                        code={`Help me set up performance tests to ensure the login system handles concurrent users effectively`}
                        title="Load and stress testing"
                      />
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Fixing Bugs */}
        <div data-subsection="fixing-bugs">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Fixing Bugs</h3>
          
          <div className="space-y-6">
            {/* Share Error with Claude */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-lg">1.</span>
                  <span>Share Error with Claude</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Provide Claude with comprehensive information about the error for accurate diagnosis and resolution.
                </p>
                
                <ExpandableSection title="What Information to Include" defaultExpanded={true}>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Complete Error Details</h5>
                      <CodeBlock 
                        code={`I'm getting this error when trying to submit the contact form:

TypeError: Cannot read property 'email' of undefined
    at ContactForm.handleSubmit (/src/components/ContactForm.jsx:45:12)
    at onClick (/src/components/ContactForm.jsx:78:20)

Here's the relevant code: @src/components/ContactForm.jsx

Steps to reproduce:
1. Navigate to /contact page
2. Fill in name and message fields
3. Leave email field empty
4. Click submit button

Expected: Form should show validation error
Actual: Application crashes with TypeError`}
                        title="Comprehensive bug report"
                      />
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Essential Information</h6>
                      <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                        <li>• Complete error message and stack trace</li>
                        <li>• Steps to reproduce the issue</li>
                        <li>• Expected vs. actual behavior</li>
                        <li>• Relevant code files with @tags</li>
                        <li>• Environment details (browser, Node version, etc.)</li>
                        <li>• Recent changes that might be related</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>

            {/* Get Fix Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-lg">2.</span>
                  <span>Get Fix Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Claude will analyze the error, examine your code, and provide targeted fix recommendations.
                </p>
                
                <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg">
                  <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Claude's Debugging Process</h5>
                  <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                    <li>• Analyzes error messages and stack traces</li>
                    <li>• Examines relevant code for potential issues</li>
                    <li>• Identifies root cause vs. symptoms</li>
                    <li>• Provides multiple solution approaches</li>
                    <li>• Explains why the error occurred</li>
                    <li>• Suggests preventive measures</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Implement the Fix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-lg">3.</span>
                  <span>Implement the Fix</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  After understanding the fix recommendations, approve Claude to implement the solution.
                </p>
                
                <CodeBlock 
                  code={`I understand the issue. Please implement the fix that adds proper null checking for the email field and improves the error handling throughout the form.`}
                  title="Approve the recommended fix"
                />
              </CardContent>
            </Card>

            {/* Verify the Fix */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-red-600 font-bold text-lg">4.</span>
                  <span>Verify the Fix</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Test the fix thoroughly and consider additional safeguards or improvements.
                </p>
                
                <CodeBlock 
                  code={`The fix works! Can you also add unit tests to prevent this type of error in the future and improve the form validation UX?`}
                  title="Extend the fix with improvements"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommonWorkflows