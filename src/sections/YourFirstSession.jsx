import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'

const YourFirstSession = () => {
  return (
    <section data-section="your-first-session" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Your First Session</h2>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Starting Claude Code</CardTitle>
            <CardDescription>Begin your journey with Claude Code</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Starting your journey with Claude Code is like beginning a conversation with a knowledgeable colleague. 
              Navigate to your project directory in the terminal and simply type:
            </p>
            
            <CodeBlock 
              code="claude"
              title="Launch Claude Code"
              language="bash"
            />
            
            <p className="text-gray-600 mt-4">
              You'll see a welcome message, and Claude will be ready to assist. The interface shows when Claude is 
              thinking, reading files, or waiting for your input. This transparency helps you understand what Claude 
              is doing at each moment.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your First Conversation</CardTitle>
            <CardDescription>Experience Claude's contextual awareness</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Let's start with something that demonstrates Claude's contextual awareness. Try asking:
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">Example First Question</h4>
              <p className="text-blue-800 italic">
                "Can you give me an overview of this project? What does it do and how is it structured?"
              </p>
            </div>
            
            <ExpandableSection title="What Claude Will Do" defaultExpanded={true}>
              <div className="space-y-3 text-gray-600">
                <p><strong>Examine README files</strong> for project description and purpose</p>
                <p><strong>Analyze package.json or requirements.txt</strong> for dependencies and configuration</p>
                <p><strong>Review main source files</strong> to understand entry points</p>
                <p><strong>Map directory structure</strong> to understand organization</p>
                <p><strong>Check configuration files</strong> to identify frameworks and tools</p>
              </div>
            </ExpandableSection>
            
            <p className="text-gray-600 mt-6">
              Claude then synthesizes this information into a comprehensive overview, explaining not just what files 
              exist, but how they work together to create your application. Notice how you didn't need to specify 
              which files to examine or use any special syntax.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Understanding Claude's Responses</CardTitle>
            <CardDescription>Learn to interpret Claude's different types of assistance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-green-900 mb-2">Explanations</h4>
                <p className="text-gray-600">
                  Natural language responses as if you're discussing with a colleague who understands both 
                  technical details and the bigger picture.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-blue-900 mb-2">Code Snippets</h4>
                <p className="text-gray-600">
                  Syntax highlighted code with helpful comments that explain not just what the code does, 
                  but why specific approaches were chosen.
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-purple-900 mb-2">File Changes</h4>
                <p className="text-gray-600">
                  Clear diff views showing exactly what will be modified before taking action, with additions 
                  in green and deletions in red, just like in version control.
                </p>
              </div>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-amber-900 mb-2">Transparency Principle</h4>
              <p className="text-amber-800 text-sm">
                When Claude needs to make changes to your files, it shows you exactly what will be modified 
                before taking action. This ensures you understand and approve every change before it happens.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Making Your First Code Change</CardTitle>
            <CardDescription>Experience Claude's file modification capabilities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Let's try making an actual modification to see how Claude handles file changes. 
              If you have a function or class in your project, try this:
            </p>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-green-900 mb-2">Example Request</h4>
              <p className="text-green-800 italic">
                "Can you add comprehensive documentation to the main function, explaining its purpose, 
                parameters, and return value?"
              </p>
            </div>
            
            <ExpandableSection title="Claude's Process">
              <div className="space-y-3 text-gray-600">
                <p><strong>Locate</strong> your main function automatically</p>
                <p><strong>Analyze</strong> its implementation to understand its purpose</p>
                <p><strong>Examine</strong> how it's called throughout your codebase</p>
                <p><strong>Create</strong> appropriate documentation following your project's style</p>
                <p><strong>Show</strong> proposed changes with a clear diff</p>
                <p><strong>Apply</strong> changes only after your approval</p>
              </div>
            </ExpandableSection>
            
            <p className="text-gray-600 mt-6">
              This demonstrates several key principles: Claude understands context without explicit instructions, 
              follows your project's existing patterns, shows changes transparently, and maintains your control 
              over all modifications.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Building Your First Feature</CardTitle>
            <CardDescription>Try a more substantial development task</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-6">
              Now let's try something more substantial. Describe a small feature you'd like to add:
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-purple-900 mb-2">Example Feature Request</h4>
              <p className="text-purple-800 italic mb-3">
                "I need a utility function that validates email addresses. It should check for basic format 
                correctness and return true for valid emails, false for invalid ones. Can you add this to 
                our utils module with some test cases?"
              </p>
            </div>
            
            <ExpandableSection title="What You'll Observe">
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">1. Project Analysis</h5>
                  <p className="text-gray-600 text-sm">
                    Claude analyzes your project structure to determine where utilities belong
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">2. Pattern Recognition</h5>
                  <p className="text-gray-600 text-sm">
                    Checks for existing validation patterns to maintain consistency
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">3. Implementation</h5>
                  <p className="text-gray-600 text-sm">
                    Creates the function with appropriate error handling
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">4. Testing</h5>
                  <p className="text-gray-600 text-sm">
                    Generates comprehensive test cases including edge cases
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-2">5. Explanation</h5>
                  <p className="text-gray-600 text-sm">
                    Throughout the process, Claude explains its decisions and reasoning
                  </p>
                </div>
              </div>
            </ExpandableSection>
            
            <p className="text-gray-600 mt-6">
              This example shows how Claude doesn't just generate code—it makes thoughtful decisions that 
              fit naturally into your project, helping you understand not just what it's doing, but why.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default YourFirstSession