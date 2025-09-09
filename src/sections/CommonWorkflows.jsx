import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { ExpandableSection } from '@/components/ui/expandable-section.jsx'
import { CodeBlock } from '@/components/ui/code-block.jsx'
import { SectionTOC } from '@/components/ui/section-toc.jsx'

const CommonWorkflows = () => {
  return (
    <section data-section="workflows" className="mb-16">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8">Working with Your Codebase</h2>
      
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        One of Claude Code's greatest strengths is its ability to understand and navigate complex codebases. Whether you're exploring an unfamiliar project, maintaining legacy code, or building new features, Claude Code acts as a knowledgeable guide through your code.
      </p>

      {/* Section TOC */}
      <SectionTOC 
        sections={[
          { id: 'exploring-project-structure', title: 'Exploring Project Structure' },
          { id: 'understanding-code-relationships', title: 'Understanding Code Relationships' },
          { id: 'finding-relevant-code', title: 'Finding Relevant Code' },
          { id: 'learning-from-patterns', title: 'Learning from Patterns' },
          { id: 'navigating-legacy-code', title: 'Navigating Legacy Code' },
          { id: 'cross-file-understanding', title: 'Cross-File Understanding' }
        ]}
        className="mb-8"
      />
      
      <div className="space-y-8">
        {/* Exploring Project Structure */}
        <div data-subsection="exploring-project-structure">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Exploring Project Structure</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                When approaching a new or unfamiliar codebase, Claude Code can quickly help you build a mental model of how everything fits together. Start with broad, architectural questions.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Example Exploration Query</h4>
                <CodeBlock 
                  code={`What's the overall architecture of this application? How do the main components interact?`}
                  title="Broad architectural understanding"
                />
              </div>
              
              <ExpandableSection title="What Claude Will Analyze">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Architectural patterns</strong> (MVC, microservices, event-driven)</p>
                  <p>• <strong>Major components</strong> and their responsibilities</p>
                  <p>• <strong>Data flow</strong> between different parts</p>
                  <p>• <strong>Third-party integrations</strong> and APIs</p>
                  <p>• <strong>Technology stack</strong> and reasoning behind choices</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                This high-level understanding provides context for more specific explorations. Once you understand the architecture, you can drill down into specific areas.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Understanding Code Relationships */}
        <div data-subsection="understanding-code-relationships">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Understanding Code Relationships</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Modern applications involve complex relationships between different parts of the codebase. Claude Code excels at mapping these relationships and explaining their implications.
              </p>
              
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">Example Relationship Query</h4>
                <CodeBlock 
                  code={`What calls the processOrder function, and what would be affected if I changed its signature?`}
                  title="Impact analysis for code changes"
                />
              </div>
              
              <ExpandableSection title="Relationship Analysis Capabilities">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Find all callers</strong> of a specific function</p>
                  <p>• <strong>Identify dependent systems</strong> that might be affected</p>
                  <p>• <strong>Understand data flow</strong> through functions</p>
                  <p>• <strong>Assess impact</strong> of potential changes</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                This comprehensive analysis helps you make informed decisions about refactoring or modifications.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Finding Relevant Code */}
        <div data-subsection="finding-relevant-code">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Finding Relevant Code</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Instead of manually searching through files or relying on basic text search, you can ask Claude to locate specific functionality using natural language.
              </p>
              
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-purple-900 mb-2">Example Semantic Search</h4>
                <CodeBlock 
                  code={`Where is the code that handles email notifications when a user's subscription expires?`}
                  title="Natural language code discovery"
                />
              </div>
              
              <ExpandableSection title="Smart Discovery Features">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Semantic understanding</strong> - finds related functionality across multiple files</p>
                  <p>• <strong>Component mapping</strong> - shows how pieces work together</p>
                  <p>• <strong>File relationships</strong> - identifies dependencies and connections</p>
                  <p>• <strong>Feature boundaries</strong> - maps complete feature implementations</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                Claude will search semantically, presenting not just file locations but explaining how these pieces work together to implement the feature.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Learning from Patterns */}
        <div data-subsection="learning-from-patterns">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Learning from Patterns</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Every codebase has its own conventions and patterns. Claude Code can identify and explain these patterns, helping you write code that fits naturally with the existing style.
              </p>
              
              <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Example Pattern Analysis</h4>
                <CodeBlock 
                  code={`What patterns does this project use for error handling? Show me some examples and explain the approach.`}
                  title="Learning project conventions"
                />
              </div>
              
              <ExpandableSection title="Pattern Recognition Abilities">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Identify consistent patterns</strong> throughout the codebase</p>
                  <p>• <strong>Note deviations</strong> or inconsistencies</p>
                  <p>• <strong>Explain reasoning</strong> behind the approach</p>
                  <p>• <strong>Provide examples</strong> you can follow</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                This pattern recognition ensures that new code maintains consistency with existing conventions.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigating Legacy Code */}
        <div data-subsection="navigating-legacy-code">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Navigating Legacy Code</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Legacy code often lacks documentation and may use outdated patterns. Claude Code can help decipher complex legacy systems.
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">Example Legacy Analysis</h4>
                <CodeBlock 
                  code={`This calculateTax function is 500 lines long and has no comments. Can you help me understand what it does and identify the main logic blocks?`}
                  title="Deciphering complex legacy code"
                />
              </div>
              
              <ExpandableSection title="Legacy Code Analysis">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Break down functions</strong> into logical sections</p>
                  <p>• <strong>Explain business rules</strong> embedded in the code</p>
                  <p>• <strong>Identify refactoring opportunities</strong></p>
                  <p>• <strong>Create documentation</strong> that captures institutional knowledge</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                Claude helps capture and document the institutional knowledge locked in legacy code, making it accessible to future developers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Cross-File Understanding */}
        <div data-subsection="cross-file-understanding">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">Cross-File Understanding</h3>
          <Card>
            <CardContent className="p-6 pt-6">
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Real understanding of a codebase requires following logic across multiple files. Claude Code maintains this cross-file context naturally.
              </p>
              
              <div className="bg-indigo-50 p-4 rounded-lg mb-6">
                <h4 className="font-semibold text-indigo-900 mb-2">Example Cross-File Trace</h4>
                <CodeBlock 
                  code={`Trace the data flow from when a user submits the contact form to when the email is actually sent.`}
                  title="Following complete data flows"
                />
              </div>
              
              <ExpandableSection title="Cross-File Analysis Features">
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm">
                  <p>• <strong>Follow entire flows</strong> from start to finish</p>
                  <p>• <strong>Explain integration points</strong> between components</p>
                  <p>• <strong>Cover error handling</strong> and retry logic</p>
                  <p>• <strong>Identify edge cases</strong> and boundary conditions</p>
                </div>
              </ExpandableSection>
              
              <p className="text-gray-600 dark:text-gray-400 mt-6">
                Claude provides a complete picture of feature implementation, explaining not just the happy path but also error handling, retry logic, and edge cases.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default CommonWorkflows