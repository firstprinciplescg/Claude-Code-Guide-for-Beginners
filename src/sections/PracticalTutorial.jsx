import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.jsx'
import { ExpandableSection } from '../components/ui/expandable-section.jsx'

export default function PracticalTutorial() {
  return (
    <section data-section="tutorial" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Practical Tutorial: Creating Your Own Claude Code Guide</h2>
      
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Step-by-Step Project</CardTitle>
            <CardDescription>
              Learn Claude Code by building and customizing your own interactive guide website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
              <p className="text-blue-800">
                <strong>🎯 Project Goal:</strong> Clone, customize, and deploy your own personalized Claude Code guide with automatic GitHub deployment via Netlify.
              </p>
            </div>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm mb-6">
              git clone https://github.com/firstprinciplescg/Claude-Code-Guide-For-Beginners-Project-Files.git
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Step 1: Clone Repository */}
      <ExpandableSection title="Step 1: Clone the Repository" defaultOpen={true}>
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Start Claude Code and tell it to help you clone and set up the project:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">What to tell Claude:</p>
                  <div className="bg-white border rounded p-3">
                    <code className="text-sm text-gray-700">
                      "I want to clone the repository at https://github.com/firstprinciplescg/Claude-Code-Guide-For-Beginners-Project-Files and set it up for development. Please walk me through the process and help me understand the project structure."
                    </code>
                  </div>
                </div>
                <p className="text-gray-600">Claude will guide you through running the git clone command and navigating into the project directory.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* Step 2: Explore Codebase */}
      <ExpandableSection title="Step 2: Explore the Codebase">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Let Claude perform a comprehensive analysis of your new project:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Analysis Request:</p>
                  <div className="bg-white border rounded p-3 mb-3">
                    <code className="text-sm text-gray-700">
                      "Please explore this entire codebase and explain the project structure, technologies used, and how the different components work together. Look at @src/, @public/, and any configuration files."
                    </code>
                  </div>
                  <p className="font-semibold text-gray-800 mb-2">Follow-up Questions:</p>
                  <div className="bg-white border rounded p-3">
                    <code className="text-sm text-gray-700">
                      "What's the main application architecture? How are styles organized? What build tools are being used? Which files are most important for customization?"
                    </code>
                  </div>
                </div>
                <p className="text-gray-600">This exploration phase helps you understand the project's technical foundation and customization possibilities.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* Step 3: Publish on Netlify */}
      <ExpandableSection title="Step 3: Publish on Netlify with Automatic Deployment">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Set up continuous deployment from GitHub to Netlify:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Deployment Setup:</p>
                  <div className="space-y-3">
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Step 1 - GitHub Setup:</p>
                      <code className="text-sm text-gray-600">
                        "I want to deploy this project to Netlify with automatic deployment from GitHub. Please guide me through setting up the repository on GitHub first, then connecting it to Netlify."
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Step 2 - Netlify Connection:</p>
                      <code className="text-sm text-gray-600">
                        "Now help me connect this GitHub repository to Netlify for automatic deployment."
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Step 3 - Build Configuration:</p>
                      <code className="text-sm text-gray-600">
                        "What build command and publish directory should I use for Netlify?"
                      </code>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Claude will analyze your project structure and provide the correct Netlify build settings.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* Step 4: Customize Color Scheme */}
      <ExpandableSection title="Step 4: Customize the Color Scheme">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Personalize the visual appearance with your preferred colors:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Styling Analysis:</p>
                  <div className="space-y-3">
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Find Current Styling:</p>
                      <code className="text-sm text-gray-600">
                        "Where are the colors defined in this project? Show me how the color scheme is organized and what files I need to modify to change it."
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Color Analysis:</p>
                      <code className="text-sm text-gray-600">
                        "What colors are currently being used? Can you show me the CSS variables or styling constants that define the theme?"
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Apply New Scheme:</p>
                      <code className="text-sm text-gray-600">
                        "I want to change the color scheme to use a [your choice] palette instead of the current colors. Can you help me update the appropriate files?"
                      </code>
                    </div>
                  </div>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <p className="text-yellow-800 text-sm">
                    <strong>💡 Pro Tip:</strong> Ask Claude to check contrast ratios for accessibility compliance when changing colors.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* Step 5: Personalize Content */}
      <ExpandableSection title="Step 5: Personalize the H1 Copy">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Make the guide uniquely yours with personalized headings:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Content Personalization:</p>
                  <div className="space-y-3">
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Locate Main Heading:</p>
                      <code className="text-sm text-gray-600">
                        "Where is the main H1 heading defined in this project? I want to personalize it to include my name."
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Make the Change:</p>
                      <code className="text-sm text-gray-600">
                        "Please update the H1 heading to read 'Claude Code Complete Guide for [Your Name]' and show me exactly what changes need to be made."
                      </code>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Claude will locate the heading and make the personalization changes for you.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* Step 6: Commit and Deploy */}
      <ExpandableSection title="Step 6: Commit and Push Updates">
        <Card className="mb-4">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <p className="mb-4 text-gray-700">Save your changes and deploy them automatically:</p>
                <div className="bg-gray-50 border rounded-lg p-4 mb-4">
                  <p className="font-semibold text-gray-800 mb-2">Git Workflow:</p>
                  <div className="space-y-3">
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Review Changes:</p>
                      <code className="text-sm text-gray-600">
                        "Can you show me all the modifications we've made to this project? I want to review everything before committing."
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Commit Strategy:</p>
                      <code className="text-sm text-gray-600">
                        "Help me create appropriate git commits for these changes. Should these be separate commits or can they be combined?"
                      </code>
                    </div>
                    <div className="bg-white border rounded p-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">Deploy Verification:</p>
                      <code className="text-sm text-gray-600">
                        "Can you help me confirm that the changes are live on Netlify? What should I check to ensure everything deployed correctly?"
                      </code>
                    </div>
                  </div>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4">
                  <p className="text-green-800 text-sm">
                    <strong>🎉 Success!</strong> Once deployed, you'll have your own personalized Claude Code guide that automatically updates whenever you push changes to GitHub.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ExpandableSection>

      {/* What You'll Learn */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>What You'll Learn</CardTitle>
          <CardDescription>Skills and concepts you'll master through this tutorial</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Claude Code Skills:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Project exploration and analysis</li>
                <li>• Code modification and customization</li>
                <li>• Git workflow automation</li>
                <li>• File system navigation with @tags</li>
                <li>• Deployment configuration</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-800">Development Concepts:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• React application structure</li>
                <li>• CSS customization and theming</li>
                <li>• GitHub repository management</li>
                <li>• Continuous deployment setup</li>
                <li>• Build configuration optimization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}