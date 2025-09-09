import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'
import { Github, Code } from 'lucide-react'

const AdvancedTopics = () => {
  return (
    <section data-section="advanced" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Advanced Topics</h2>
      
      <SectionTOC 
        sections={[
          { id: 'github-integration', title: 'GitHub Integration' },
          { id: 'hooks', title: 'Hooks' },
          { id: 'subagents', title: 'Subagents' },
          { id: 'headless-mode', title: 'Headless Mode' }
        ]}
        className="mb-8"
      />

      <div className="space-y-12">
        {/* GitHub Integration Section */}
        <div data-subsection="github-integration">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <Github className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>GitHub Integration</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Claude Code's GitHub integration enables seamless collaboration workflows, automated pull request management, 
              and intelligent code analysis directly within your development process.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-blue-700">🔧 Detailed Integration Walkthrough</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpandableSection title="Step 1: Initial Setup" defaultExpanded={true}>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      First, ensure you have GitHub CLI installed and properly authenticated.
                    </p>
                    <CodeBlock 
                      code={`# Install GitHub CLI (if not already installed)
# On macOS:
brew install gh

# On Windows:
winget install --id GitHub.cli

# On Linux:
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh

# Authenticate with GitHub
gh auth login`}
                      title="GitHub CLI Installation & Authentication"
                      language="bash"
                    />
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h6 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Configuration Setup</h6>
                      <CodeBlock 
                        code={`# Enable GitHub integration in Claude Code
claude-code --config github enable

# Verify GitHub connection
gh auth status`}
                        title="Claude Code GitHub configuration"
                        language="bash"
                      />
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Step 2: Repository Connection" defaultExpanded={false}>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Connect your project directory to GitHub and configure Claude Code to understand your repository setup.
                    </p>
                    
                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Repository Setup Commands</h6>
                      <CodeBlock 
                        code={`# Navigate to your project directory
cd /path/to/your/project

# Initialize git repository (if needed)
git init

# Add GitHub remote
git remote add origin https://github.com/username/repository-name.git

# Let Claude analyze repository configuration
# In Claude Code session:
@.git/config`}
                        title="Repository connection setup"
                        language="bash"
                      />
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                      <h6 className="font-semibold text-green-900 dark:text-green-100 mb-2">What Claude Can Now Access:</h6>
                      <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                        <li>• Repository metadata and branch information</li>
                        <li>• Existing pull request and issue context</li>
                        <li>• Team collaboration patterns and workflows</li>
                        <li>• Branch protection rules and CI/CD requirements</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="Step 3: Pull Request Automation" defaultExpanded={false}>
                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      Configure Claude Code to automatically create and manage pull requests with intelligent descriptions and metadata.
                    </p>
                    
                    <CodeBlock 
                      code={`# Example: Creating a PR automatically
"I've finished implementing the user authentication feature. Can you create a pull request with an appropriate title and description that includes the changes, testing notes, and any breaking changes?"`}
                      title="Automated PR creation"
                    />

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h6 className="font-semibold text-purple-900 mb-2">Auto-Generated PR Features:</h6>
                      <ul className="text-purple-800 text-sm space-y-1">
                        <li>• Intelligent commit message analysis</li>
                        <li>• Automatic change summary generation</li>
                        <li>• Testing checklist creation</li>
                        <li>• Breaking change detection</li>
                        <li>• Reviewer suggestion based on code areas</li>
                      </ul>
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hooks Section */}
        <div data-subsection="hooks" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Hooks</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Claude Code hooks allow you to automate workflows and customize behavior at key points in your development process. 
              These hooks can trigger actions, run scripts, or integrate with external services.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-green-700">🪝 Available Hook Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                    <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Pre-Commit Hooks</h5>
                    <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                      <li>• Code formatting and linting</li>
                      <li>• Test execution</li>
                      <li>• Security scanning</li>
                      <li>• Documentation generation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20">
                    <h5 className="font-semibold text-green-900 dark:text-green-100 mb-2">Post-Merge Hooks</h5>
                    <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                      <li>• Environment synchronization</li>
                      <li>• Team notifications</li>
                      <li>• Deployment triggers</li>
                      <li>• Cache invalidation</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <h5 className="font-semibold text-purple-900 mb-2">Session Hooks</h5>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• Session initialization</li>
                      <li>• Context loading</li>
                      <li>• Custom tool registration</li>
                      <li>• Environment setup</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border border-orange-200 rounded-lg bg-orange-50">
                    <h5 className="font-semibold text-orange-900 mb-2">Error Hooks</h5>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Error reporting</li>
                      <li>• Automated rollback</li>
                      <li>• Recovery procedures</li>
                      <li>• Alert notifications</li>
                    </ul>
                  </div>
                </div>

                <ExpandableSection title="Hook Configuration Examples" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Pre-Commit Formatting Hook</h6>
                      <CodeBlock 
                        code={`#!/bin/bash
# .claude-code/hooks/pre-commit-format.sh

echo "Running code formatting..."

# Format JavaScript/TypeScript files
npx prettier --write "src/**/*.{js,ts,jsx,tsx}"

# Format CSS/SCSS files  
npx prettier --write "src/**/*.{css,scss}"

# Lint and fix issues
npx eslint "src/**/*.{js,ts,jsx,tsx}" --fix

echo "Code formatting complete!"
exit 0`}
                        title="Automated formatting"
                        language="bash"
                      />
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Post-Merge Environment Sync</h6>
                      <CodeBlock 
                        code={`#!/bin/bash
# .claude-code/hooks/post-merge-sync.sh

echo "Synchronizing development environment..."

# Update dependencies
npm install

# Run database migrations if needed
if git diff --name-only HEAD@{1} HEAD | grep -q "migrations/"; then
    echo "Database migrations detected, running migrations..."
    npm run db:migrate
fi

# Clear caches
npm run cache:clear

echo "Environment sync complete!"
exit 0`}
                        title="Environment synchronization"
                        language="bash"
                      />
                    </div>
                  </div>
                </ExpandableSection>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Subagents Section */}
        <div data-subsection="subagents" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center space-x-3">
            <Code className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span>Subagents</span>
          </h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Subagents are specialized AI assistants designed for specific aspects of the development lifecycle. 
              They provide focused expertise and can work autonomously on designated tasks.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-purple-700">🤖 Available Subagents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6">
                  <div className="p-4 border border-indigo-200 rounded-lg bg-indigo-50">
                    <h5 className="font-semibold text-indigo-900 mb-2">Testing Subagent</h5>
                    <p className="text-indigo-800 text-sm mb-3">Specializes in test creation, maintenance, and optimization</p>
                    <CodeBlock 
                      code={`# Activate testing subagent
"@testing-agent: Create comprehensive unit tests for the UserAuth component, including edge cases and error scenarios"`}
                      title="Testing subagent usage"
                    />
                  </div>

                  <div className="p-4 border border-emerald-200 rounded-lg bg-emerald-50">
                    <h5 className="font-semibold text-emerald-900 mb-2">Documentation Subagent</h5>
                    <p className="text-emerald-800 text-sm mb-3">Automatically generates and maintains project documentation</p>
                    <CodeBlock 
                      code={`# Activate documentation subagent  
"@docs-agent: Generate API documentation for all endpoints in @routes/ and update the README with usage examples"`}
                      title="Documentation subagent usage"
                    />
                  </div>

                  <div className="p-4 border border-rose-200 rounded-lg bg-rose-50">
                    <h5 className="font-semibold text-rose-900 mb-2">Security Subagent</h5>
                    <p className="text-rose-800 text-sm mb-3">Performs security analysis and implements security best practices</p>
                    <CodeBlock 
                      code={`# Activate security subagent
"@security-agent: Audit the authentication system for security vulnerabilities and suggest improvements"`}
                      title="Security subagent usage"
                    />
                  </div>

                  <div className="p-4 border border-amber-200 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                    <h5 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Performance Subagent</h5>
                    <p className="text-amber-800 dark:text-amber-200 text-sm mb-3">Optimizes code performance and identifies bottlenecks</p>
                    <CodeBlock 
                      code={`# Activate performance subagent
"@perf-agent: Analyze the database queries in @models/ and optimize slow operations"`}
                      title="Performance subagent usage"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Headless Mode Section */}
        <div data-subsection="headless-mode" className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Headless Mode</h3>
          
          <div className="space-y-6">
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Headless mode allows Claude Code to run non-interactively, perfect for CI/CD pipelines, automated workflows, 
              and batch processing tasks.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-gray-700 dark:text-gray-300">⚙️ Headless Mode Usage</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ExpandableSection title="Basic Headless Commands" defaultExpanded={true}>
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Code Generation</h6>
                      <CodeBlock 
                        code={`# Generate code from specifications
claude-code --headless --task "generate-api" --spec api-specification.yaml --output src/api/`}
                        title="Automated code generation"
                        language="bash"
                      />
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Test Generation</h6>
                      <CodeBlock 
                        code={`# Generate tests for all components
claude-code --headless --task "generate-tests" --input src/components/ --output tests/`}
                        title="Batch test creation"
                        language="bash"
                      />
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Documentation Updates</h6>
                      <CodeBlock 
                        code={`# Update documentation automatically
claude-code --headless --task "update-docs" --source src/ --docs docs/`}
                        title="Documentation maintenance"
                        language="bash"
                      />
                    </div>
                  </div>
                </ExpandableSection>

                <ExpandableSection title="CI/CD Integration" defaultExpanded={false}>
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">GitHub Actions Example</h6>
                      <CodeBlock 
                        code={`name: Claude Code Automation
on:
  pull_request:
    branches: [main]

jobs:
  claude-code-review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Claude Code
        run: npm install -g @anthropic-ai/claude-code
      - name: Generate Tests
        run: claude-code --headless --task "review-pr" --pr \${{ github.event.number }}
      - name: Update Documentation
        run: claude-code --headless --task "update-docs" --changed-files
      - name: Security Scan
        run: claude-code --headless --task "security-scan" --output security-report.json`}
                        title="GitHub Actions integration"
                        language="yaml"
                      />
                    </div>

                    <div>
                      <h6 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">Jenkins Pipeline</h6>
                      <CodeBlock 
                        code={`pipeline {
    agent any
    stages {
        stage('Code Analysis') {
            steps {
                sh 'claude-code --headless --task "code-review" --output analysis.json'
            }
        }
        stage('Generate Tests') {
            steps {
                sh 'claude-code --headless --task "generate-tests" --coverage-target 90'
            }
        }
        stage('Performance Check') {
            steps {
                sh 'claude-code --headless --task "performance-audit" --benchmark'
            }
        }
    }
}`}
                        title="Jenkins pipeline integration"
                        language="groovy"
                      />
                    </div>
                  </div>
                </ExpandableSection>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h6 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">💡 Headless Mode Best Practices</h6>
                  <ul className="text-yellow-800 dark:text-yellow-200 text-sm space-y-1">
                    <li>• Always specify clear task parameters and expected outputs</li>
                    <li>• Use configuration files for complex workflows</li>
                    <li>• Implement proper error handling and logging</li>
                    <li>• Test headless scripts in development before CI/CD deployment</li>
                    <li>• Monitor resource usage for large batch operations</li>
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

export default AdvancedTopics