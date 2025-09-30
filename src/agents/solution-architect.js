#!/usr/bin/env node

/**
 * Solution Architect Agent
 *
 * An intelligent meta-agent that analyzes problems and creates automated solutions
 * using Claude Code agents, scripts, Make.com, Zapier, or other automation tools.
 *
 * Four-Phase Approach:
 * 1. Discovery - Understand the problem, goals, and constraints
 * 2. Design - Recommend the optimal solution architecture
 * 3. Validation - Get user approval with iterative refinement
 * 4. Implementation - Actually build the approved solution
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline/promises'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Solution types the architect can create
const SOLUTION_TYPES = {
  CLAUDE_AGENT: 'claude-agent',
  SHELL_SCRIPT: 'shell-script',
  NODE_SCRIPT: 'node-script',
  PYTHON_SCRIPT: 'python-script',
  GITHUB_ACTIONS: 'github-actions',
  MAKE_AUTOMATION: 'make-automation',
  ZAPIER_AUTOMATION: 'zapier-automation',
  HYBRID: 'hybrid'
}

// Evaluation criteria for solution selection
const EVALUATION_CRITERIA = {
  complexity: ['simple', 'moderate', 'complex'],
  frequency: ['one-time', 'periodic', 'continuous'],
  integrations: ['none', 'few', 'many'],
  userInteraction: ['none', 'minimal', 'interactive'],
  dataVolume: ['small', 'medium', 'large'],
  errorHandling: ['basic', 'robust', 'enterprise']
}

class SolutionArchitect {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
    this.currentProject = null
    this.solutionHistory = []
  }

  /**
   * PHASE 1: Discovery
   * Understand the problem through structured questioning
   */
  async discoverProblem() {
    console.log('\n🔍 PHASE 1: DISCOVERY\n')
    console.log('Let me understand your automation challenge...\n')

    const problem = {
      description: '',
      goals: [],
      constraints: [],
      currentProcess: '',
      painPoints: [],
      successCriteria: [],
      technicalContext: {}
    }

    // Core problem understanding
    problem.description = await this.ask('📝 Describe the problem or task you want to automate:')

    // Goals
    console.log('\n🎯 What are your goals? (enter empty line when done)')
    let goal
    while (goal = await this.ask('  Goal:')) {
      problem.goals.push(goal)
    }

    // Current process
    problem.currentProcess = await this.ask('\n🔄 How is this currently being done (if at all)?')

    // Pain points
    console.log('\n😤 What are the main pain points? (enter empty line when done)')
    let pain
    while (pain = await this.ask('  Pain point:')) {
      problem.painPoints.push(pain)
    }

    // Constraints
    console.log('\n⚠️ Any constraints or requirements? (enter empty line when done)')
    let constraint
    while (constraint = await this.ask('  Constraint:')) {
      problem.constraints.push(constraint)
    }

    // Technical context
    problem.technicalContext = await this.assessTechnicalContext()

    // Success criteria
    console.log('\n✅ How will you measure success? (enter empty line when done)')
    let criteria
    while (criteria = await this.ask('  Success criteria:')) {
      problem.successCriteria.push(criteria)
    }

    return problem
  }

  /**
   * Assess technical environment and capabilities
   */
  async assessTechnicalContext() {
    const context = {}

    // Check for available tools
    context.hasGitHub = await this.checkTool('git --version')
    context.hasNode = await this.checkTool('node --version')
    context.hasPython = await this.checkTool('python --version')
    context.hasMake = await this.ask('Do you have a Make.com account? (y/n)') === 'y'
    context.hasZapier = await this.ask('Do you have a Zapier account? (y/n)') === 'y'

    // Assess complexity
    context.complexity = await this.selectOption(
      'How complex is this task?',
      EVALUATION_CRITERIA.complexity
    )

    // Assess frequency
    context.frequency = await this.selectOption(
      'How often does this need to run?',
      EVALUATION_CRITERIA.frequency
    )

    // Assess integrations
    context.integrations = await this.selectOption(
      'How many external services need to be integrated?',
      EVALUATION_CRITERIA.integrations
    )

    return context
  }

  /**
   * PHASE 2: Design
   * Create solution architecture based on discovery
   */
  async designSolution(problem) {
    console.log('\n🎨 PHASE 2: DESIGN\n')
    console.log('Analyzing requirements and designing optimal solution...\n')

    const solution = {
      type: this.selectSolutionType(problem),
      architecture: {},
      components: [],
      dataFlow: [],
      implementation: {},
      alternatives: []
    }

    // Build architecture based on solution type
    switch (solution.type) {
      case SOLUTION_TYPES.CLAUDE_AGENT:
        solution.architecture = this.designClaudeAgent(problem)
        break
      case SOLUTION_TYPES.GITHUB_ACTIONS:
        solution.architecture = this.designGitHubActions(problem)
        break
      case SOLUTION_TYPES.MAKE_AUTOMATION:
        solution.architecture = this.designMakeAutomation(problem)
        break
      case SOLUTION_TYPES.ZAPIER_AUTOMATION:
        solution.architecture = this.designZapierAutomation(problem)
        break
      case SOLUTION_TYPES.NODE_SCRIPT:
        solution.architecture = this.designNodeScript(problem)
        break
      case SOLUTION_TYPES.HYBRID:
        solution.architecture = this.designHybridSolution(problem)
        break
    }

    // Generate alternatives
    solution.alternatives = this.generateAlternatives(problem, solution.type)

    return solution
  }

  /**
   * Select optimal solution type based on problem characteristics
   */
  selectSolutionType(problem) {
    const { technicalContext } = problem
    const scores = {}

    // Score each solution type
    for (const [type, key] of Object.entries(SOLUTION_TYPES)) {
      scores[key] = 0

      // Claude Agent: Good for complex, AI-driven tasks
      if (type === 'CLAUDE_AGENT') {
        if (technicalContext.complexity === 'complex') scores[key] += 3
        if (problem.goals.some(g => g.toLowerCase().includes('ai') || g.toLowerCase().includes('intelligent'))) scores[key] += 3
      }

      // GitHub Actions: Good for code-related automation
      if (type === 'GITHUB_ACTIONS' && technicalContext.hasGitHub) {
        if (technicalContext.frequency === 'periodic') scores[key] += 3
        if (problem.description.toLowerCase().includes('deploy') || problem.description.toLowerCase().includes('test')) scores[key] += 2
      }

      // Make/Zapier: Good for integrations
      if ((type === 'MAKE_AUTOMATION' && technicalContext.hasMake) ||
          (type === 'ZAPIER_AUTOMATION' && technicalContext.hasZapier)) {
        if (technicalContext.integrations !== 'none') scores[key] += 3
        if (technicalContext.complexity === 'simple') scores[key] += 2
      }

      // Node Script: Good for custom logic
      if (type === 'NODE_SCRIPT' && technicalContext.hasNode) {
        if (technicalContext.complexity === 'moderate') scores[key] += 2
        scores[key] += 1 // Always a viable option
      }
    }

    // Return highest scoring solution
    return Object.entries(scores).reduce((a, b) => scores[a] > scores[b] ? a : b)[0]
  }

  /**
   * Design Claude Agent solution
   */
  designClaudeAgent(problem) {
    return {
      name: 'Claude Code Automation Agent',
      description: 'An intelligent agent that uses Claude\'s capabilities to solve the problem',
      components: [
        { name: 'Agent Core', file: 'agent.js', purpose: 'Main agent logic and orchestration' },
        { name: 'Task Processor', file: 'processor.js', purpose: 'Handles specific task execution' },
        { name: 'Data Manager', file: 'data-manager.js', purpose: 'Manages data persistence and retrieval' }
      ],
      workflow: [
        'Initialize agent with configuration',
        'Process input/trigger conditions',
        'Execute core logic with Claude AI',
        'Handle outputs and side effects',
        'Log results and update state'
      ],
      triggers: this.determineTriggers(problem),
      configuration: {
        schedule: problem.technicalContext.frequency,
        inputs: problem.goals,
        outputs: problem.successCriteria
      }
    }
  }

  /**
   * Design GitHub Actions solution
   */
  designGitHubActions(problem) {
    return {
      name: 'GitHub Actions Workflow',
      description: 'Automated workflow triggered by GitHub events',
      components: [
        { name: 'Workflow File', file: '.github/workflows/automation.yml', purpose: 'Defines workflow triggers and steps' },
        { name: 'Action Scripts', file: 'scripts/', purpose: 'Contains executable scripts for each step' }
      ],
      workflow: [
        'Define trigger events (push, PR, schedule, manual)',
        'Set up environment and dependencies',
        'Execute main automation logic',
        'Handle artifacts and outputs',
        'Notify on success/failure'
      ],
      triggers: ['push', 'pull_request', 'schedule', 'workflow_dispatch'],
      configuration: {
        cronSchedule: this.getCronSchedule(problem.technicalContext.frequency),
        secrets: ['API_KEYS', 'CREDENTIALS'],
        permissions: ['contents: write', 'issues: write']
      }
    }
  }

  /**
   * Design Make.com automation
   */
  designMakeAutomation(problem) {
    return {
      name: 'Make.com Scenario',
      description: 'Visual workflow automation using Make.com\'s integration platform',
      components: [
        { name: 'Trigger Module', type: 'webhook/schedule', purpose: 'Initiates the scenario' },
        { name: 'Data Processing', type: 'routers/filters', purpose: 'Process and transform data' },
        { name: 'Action Modules', type: 'integrations', purpose: 'Execute actions in connected apps' },
        { name: 'Error Handlers', type: 'error-routes', purpose: 'Handle failures gracefully' }
      ],
      workflow: [
        'Configure trigger (webhook, schedule, or app event)',
        'Set up data mapping and transformations',
        'Add conditional logic with routers',
        'Configure target app actions',
        'Set up error handling and notifications'
      ],
      integrations: this.suggestIntegrations(problem),
      configuration: {
        scenarioType: 'on-demand',
        dataStructure: 'json',
        errorHandling: 'continue'
      }
    }
  }

  /**
   * Design Zapier automation
   */
  designZapierAutomation(problem) {
    return {
      name: 'Zapier Zap',
      description: 'Multi-step automation connecting apps through Zapier',
      components: [
        { name: 'Trigger', type: 'app-event', purpose: 'Starts the Zap when conditions are met' },
        { name: 'Actions', type: 'app-actions', purpose: 'Performs tasks in connected apps' },
        { name: 'Filters', type: 'conditions', purpose: 'Controls flow based on data' },
        { name: 'Formatters', type: 'data-tools', purpose: 'Transform data between steps' }
      ],
      workflow: [
        'Select trigger app and event',
        'Configure trigger settings and test',
        'Add action steps for each task',
        'Set up data mapping between steps',
        'Add filters and paths for conditional logic',
        'Test and activate the Zap'
      ],
      integrations: this.suggestIntegrations(problem),
      configuration: {
        zapType: problem.technicalContext.frequency === 'continuous' ? 'instant' : 'scheduled',
        multiStep: problem.goals.length > 1,
        paths: problem.constraints.length > 0
      }
    }
  }

  /**
   * Design Node.js script solution
   */
  designNodeScript(problem) {
    return {
      name: 'Node.js Automation Script',
      description: 'Custom Node.js script with full programmatic control',
      components: [
        { name: 'Main Script', file: 'automation.js', purpose: 'Entry point and orchestration' },
        { name: 'Modules', file: 'lib/', purpose: 'Reusable functions and utilities' },
        { name: 'Config', file: 'config.json', purpose: 'Configuration and environment settings' },
        { name: 'Tests', file: 'tests/', purpose: 'Unit and integration tests' }
      ],
      workflow: [
        'Parse command-line arguments or config',
        'Initialize services and connections',
        'Execute main automation logic',
        'Handle errors and retries',
        'Generate reports and logs'
      ],
      dependencies: this.suggestNpmPackages(problem),
      configuration: {
        runMode: problem.technicalContext.frequency === 'continuous' ? 'daemon' : 'script',
        logging: 'winston',
        testing: 'jest'
      }
    }
  }

  /**
   * Design hybrid solution combining multiple approaches
   */
  designHybridSolution(problem) {
    return {
      name: 'Hybrid Automation Solution',
      description: 'Combines multiple automation approaches for maximum flexibility',
      components: [
        { name: 'Claude Agent', purpose: 'Handles complex AI-driven decisions' },
        { name: 'GitHub Actions', purpose: 'Manages deployment and scheduling' },
        { name: 'API Integration', purpose: 'Connects to external services via Make/Zapier' },
        { name: 'Custom Scripts', purpose: 'Handles specific business logic' }
      ],
      workflow: [
        'GitHub Action triggers on schedule or event',
        'Invokes Claude Agent for intelligent processing',
        'Routes to Make/Zapier for external integrations',
        'Executes custom scripts for specialized tasks',
        'Aggregates results and generates reports'
      ],
      architecture: 'microservices',
      configuration: {
        orchestration: 'github-actions',
        intelligence: 'claude-agent',
        integrations: 'make-zapier',
        custom: 'node-scripts'
      }
    }
  }

  /**
   * PHASE 3: Validation
   * Present solution and get user approval
   */
  async validateSolution(solution, problem) {
    console.log('\n✔️ PHASE 3: VALIDATION\n')
    console.log('Here\'s my recommended solution:\n')

    // Present main solution
    console.log(`📦 Solution Type: ${solution.type}`)
    console.log(`📋 Architecture: ${solution.architecture.name}`)
    console.log(`📝 Description: ${solution.architecture.description}\n`)

    console.log('🔧 Components:')
    solution.architecture.components.forEach(comp => {
      console.log(`  • ${comp.name}: ${comp.purpose}`)
    })

    console.log('\n📊 Workflow:')
    solution.architecture.workflow.forEach((step, i) => {
      console.log(`  ${i + 1}. ${step}`)
    })

    // Present alternatives
    if (solution.alternatives.length > 0) {
      console.log('\n🔄 Alternative Approaches:')
      solution.alternatives.forEach((alt, i) => {
        console.log(`  ${i + 1}. ${alt.type}: ${alt.reason}`)
      })
    }

    // Get user feedback
    const approved = await this.ask('\n✅ Does this solution meet your needs? (y/n/modify)')

    if (approved === 'y') {
      return { approved: true, solution }
    } else if (approved === 'modify') {
      return await this.modifySolution(solution, problem)
    } else {
      // Try alternative
      const altIndex = await this.ask('Which alternative would you like to explore? (number or "custom")')
      if (altIndex === 'custom') {
        return await this.customSolution(problem)
      } else {
        const alternative = solution.alternatives[parseInt(altIndex) - 1]
        if (alternative) {
          solution.type = alternative.type
          solution.architecture = this[`design${this.toPascalCase(alternative.type)}`](problem)
          return this.validateSolution(solution, problem)
        }
      }
    }

    return { approved: false, solution: null }
  }

  /**
   * Allow user to modify the proposed solution
   */
  async modifySolution(solution, problem) {
    console.log('\n🔧 What would you like to modify?')
    console.log('1. Solution type')
    console.log('2. Components')
    console.log('3. Workflow')
    console.log('4. Configuration')
    console.log('5. Start over')

    const choice = await this.ask('Choice (1-5):')

    switch (choice) {
      case '1':
        const types = Object.values(SOLUTION_TYPES)
        console.log('\nAvailable solution types:')
        types.forEach((type, i) => console.log(`  ${i + 1}. ${type}`))
        const typeIndex = await this.ask('Select type (number):')
        solution.type = types[parseInt(typeIndex) - 1]
        solution.architecture = this[`design${this.toPascalCase(solution.type)}`](problem)
        break

      case '2':
        console.log('\nCurrent components:')
        solution.architecture.components.forEach((comp, i) => {
          console.log(`  ${i + 1}. ${comp.name}`)
        })
        const addRemove = await this.ask('Add or remove component? (add/remove):')
        if (addRemove === 'add') {
          const name = await this.ask('Component name:')
          const purpose = await this.ask('Component purpose:')
          solution.architecture.components.push({ name, purpose })
        } else {
          const index = await this.ask('Component number to remove:')
          solution.architecture.components.splice(parseInt(index) - 1, 1)
        }
        break

      case '3':
        console.log('\nModifying workflow steps...')
        const workflowAction = await this.ask('Add, remove, or reorder? (add/remove/reorder):')
        if (workflowAction === 'add') {
          const step = await this.ask('New workflow step:')
          const position = await this.ask(`Position (1-${solution.architecture.workflow.length + 1}):`)
          solution.architecture.workflow.splice(parseInt(position) - 1, 0, step)
        }
        break

      case '5':
        return await this.run() // Start over
    }

    return this.validateSolution(solution, problem)
  }

  /**
   * PHASE 4: Implementation
   * Actually create the approved solution
   */
  async implementSolution(solution, problem) {
    console.log('\n🚀 PHASE 4: IMPLEMENTATION\n')
    console.log('Building your automation solution...\n')

    const outputDir = path.join(__dirname, 'generated', Date.now().toString())
    await fs.mkdir(outputDir, { recursive: true })

    let implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    switch (solution.type) {
      case SOLUTION_TYPES.CLAUDE_AGENT:
        implementation = await this.implementClaudeAgent(solution, outputDir)
        break
      case SOLUTION_TYPES.GITHUB_ACTIONS:
        implementation = await this.implementGitHubActions(solution, outputDir)
        break
      case SOLUTION_TYPES.MAKE_AUTOMATION:
        implementation = await this.implementMakeAutomation(solution)
        break
      case SOLUTION_TYPES.ZAPIER_AUTOMATION:
        implementation = await this.implementZapierAutomation(solution)
        break
      case SOLUTION_TYPES.NODE_SCRIPT:
        implementation = await this.implementNodeScript(solution, outputDir)
        break
      case SOLUTION_TYPES.HYBRID:
        implementation = await this.implementHybridSolution(solution, outputDir)
        break
    }

    // Save project documentation
    await this.saveProjectDocumentation(problem, solution, implementation, outputDir)

    console.log('\n✅ Implementation Complete!\n')
    console.log(`📁 Files created in: ${outputDir}`)

    if (implementation.files.length > 0) {
      console.log('\n📄 Generated Files:')
      implementation.files.forEach(file => {
        console.log(`  • ${file}`)
      })
    }

    if (implementation.instructions.length > 0) {
      console.log('\n📋 Setup Instructions:')
      implementation.instructions.forEach((instruction, i) => {
        console.log(`  ${i + 1}. ${instruction}`)
      })
    }

    if (implementation.nextSteps.length > 0) {
      console.log('\n🎯 Next Steps:')
      implementation.nextSteps.forEach((step, i) => {
        console.log(`  ${i + 1}. ${step}`)
      })
    }

    return implementation
  }

  /**
   * Implement Claude Agent solution
   */
  async implementClaudeAgent(solution, outputDir) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    // Generate main agent file
    const agentCode = this.generateClaudeAgentCode(solution.architecture)
    const agentFile = path.join(outputDir, 'agent.js')
    await fs.writeFile(agentFile, agentCode)
    implementation.files.push('agent.js')

    // Generate test file
    const testCode = this.generateTestCode(solution.architecture)
    const testFile = path.join(outputDir, 'test-agent.js')
    await fs.writeFile(testFile, testCode)
    implementation.files.push('test-agent.js')

    // Generate README
    const readme = this.generateAgentReadme(solution.architecture)
    const readmeFile = path.join(outputDir, 'README.md')
    await fs.writeFile(readmeFile, readme)
    implementation.files.push('README.md')

    // Generate package.json if needed
    const packageJson = this.generatePackageJson(solution.architecture)
    const packageFile = path.join(outputDir, 'package.json')
    await fs.writeFile(packageFile, JSON.stringify(packageJson, null, 2))
    implementation.files.push('package.json')

    implementation.instructions = [
      'Navigate to the generated directory',
      'Run: npm install',
      'Test the agent: node test-agent.js',
      'Configure any API keys or credentials needed',
      'Deploy using GitHub Actions or run manually'
    ]

    implementation.nextSteps = [
      'Review and customize the generated agent code',
      'Set up any required API integrations',
      'Create GitHub Actions workflow for automation',
      'Test thoroughly before production use'
    ]

    return implementation
  }

  /**
   * Generate Claude Agent code
   */
  generateClaudeAgentCode(architecture) {
    return `#!/usr/bin/env node

/**
 * ${architecture.name}
 * ${architecture.description}
 *
 * Generated by Solution Architect Agent
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class AutomationAgent {
  constructor(config = {}) {
    this.config = {
      schedule: '${architecture.configuration.schedule}',
      ...config
    }
    this.state = {}
  }

  /**
   * Initialize the agent
   */
  async init() {
    console.log('🤖 Initializing ${architecture.name}...')

    // Load any persisted state
    await this.loadState()

    // Set up connections/integrations
    await this.setupIntegrations()

    console.log('✅ Agent initialized successfully')
  }

  /**
   * Main execution logic
   */
  async execute() {
    console.log('🚀 Starting automation...')

    try {
      ${architecture.workflow.map(step => `
      // ${step}
      await this.${this.toMethodName(step)}()`).join('')}

      console.log('✅ Automation completed successfully')
      return { success: true, timestamp: new Date().toISOString() }

    } catch (error) {
      console.error('❌ Automation failed:', error.message)
      await this.handleError(error)
      return { success: false, error: error.message }
    }
  }

  /**
   * Load persisted state
   */
  async loadState() {
    const stateFile = path.join(__dirname, 'state.json')
    try {
      const data = await fs.readFile(stateFile, 'utf8')
      this.state = JSON.parse(data)
    } catch {
      // No state file, start fresh
      this.state = {}
    }
  }

  /**
   * Save state
   */
  async saveState() {
    const stateFile = path.join(__dirname, 'state.json')
    await fs.writeFile(stateFile, JSON.stringify(this.state, null, 2))
  }

  /**
   * Set up integrations
   */
  async setupIntegrations() {
    // Configure any API clients or connections
    ${architecture.configuration.inputs.map(input => `
    // Setup for: ${input}`).join('')}
  }

  /**
   * Error handling
   */
  async handleError(error) {
    // Log error
    console.error('Error details:', error)

    // Save error state
    this.state.lastError = {
      message: error.message,
      timestamp: new Date().toISOString()
    }
    await this.saveState()

    // Notify if configured
    // await this.sendNotification(error)
  }

${architecture.workflow.map(step => `
  /**
   * ${step}
   */
  async ${this.toMethodName(step)}() {
    console.log('  ➜ ${step}')
    // TODO: Implement ${step.toLowerCase()}
    // Add your implementation here
  }`).join('\n')}
}

// Run if called directly
if (import.meta.url === \`file://\${process.argv[1]}\`) {
  const agent = new AutomationAgent()
  await agent.init()
  await agent.execute()
}

export default AutomationAgent
`
  }

  /**
   * Generate test code
   */
  generateTestCode(architecture) {
    return `#!/usr/bin/env node

/**
 * Test suite for ${architecture.name}
 */

import AutomationAgent from './agent.js'

async function testAgent() {
  console.log('🧪 Testing ${architecture.name}...')

  try {
    // Initialize agent
    const agent = new AutomationAgent({
      testMode: true
    })

    await agent.init()
    console.log('✅ Initialization test passed')

    // Test execution
    const result = await agent.execute()

    if (result.success) {
      console.log('✅ Execution test passed')
    } else {
      console.log('⚠️ Execution completed with issues:', result.error)
    }

    console.log('\\n🎉 All tests completed!')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testAgent()
`
  }

  /**
   * Generate README for the agent
   */
  generateAgentReadme(architecture) {
    return `# ${architecture.name}

${architecture.description}

## 🚀 Quick Start

\`\`\`bash
# Install dependencies
npm install

# Test the agent
node test-agent.js

# Run the agent
node agent.js
\`\`\`

## 📦 Components

${architecture.components.map(comp => `- **${comp.name}**: ${comp.purpose}`).join('\n')}

## 📊 Workflow

${architecture.workflow.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## ⚙️ Configuration

${architecture.configuration ? Object.entries(architecture.configuration).map(([key, value]) =>
  `- **${key}**: ${JSON.stringify(value)}`).join('\n') : 'See config.json for configuration options'}

## 🔧 Customization

Modify the \`agent.js\` file to customize the automation logic for your specific needs.

## 📝 Notes

- Generated by Solution Architect Agent
- Created: ${new Date().toISOString()}

---

Built with Claude Code ✨
`
  }

  /**
   * Generate package.json
   */
  generatePackageJson(architecture) {
    return {
      name: architecture.name.toLowerCase().replace(/\s+/g, '-'),
      version: '1.0.0',
      type: 'module',
      description: architecture.description,
      main: 'agent.js',
      scripts: {
        start: 'node agent.js',
        test: 'node test-agent.js'
      },
      dependencies: {
        // Add dependencies based on requirements
      },
      devDependencies: {}
    }
  }

  /**
   * Implement Make.com automation
   */
  async implementMakeAutomation(solution) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    implementation.instructions = [
      'Log in to your Make.com account',
      'Create a new scenario',
      'Add trigger module: ' + solution.architecture.workflow[0],
      ...solution.architecture.workflow.slice(1).map(step => `Add module: ${step}`),
      'Configure data mappings between modules',
      'Set up error handling routes',
      'Test the scenario with sample data',
      'Schedule or activate the scenario'
    ]

    // Generate MCP configuration
    const mcpConfig = {
      mcpServers: {
        make: {
          command: 'npx',
          args: [
            '-y',
            'mcp-remote',
            'https://<MAKE_ZONE>/mcp/api/v1/u/<MCP_TOKEN>/sse'
          ]
        }
      }
    }

    implementation.nextSteps = [
      'Get your MCP token from Make.com profile',
      'Add to Claude Desktop config: ' + JSON.stringify(mcpConfig, null, 2),
      'Test the integration with Claude',
      'Create documentation for scenario maintenance'
    ]

    return implementation
  }

  /**
   * Implement Zapier automation
   */
  async implementZapierAutomation(solution) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    implementation.instructions = [
      'Log in to your Zapier account',
      'Create a new Zap',
      'Select trigger app and event',
      'Connect your account and configure trigger',
      'Test the trigger with sample data',
      ...solution.architecture.workflow.slice(1).map(step => `Add action: ${step}`),
      'Map data between steps',
      'Add any filters or paths needed',
      'Test the complete Zap',
      'Turn on the Zap'
    ]

    implementation.nextSteps = [
      'Get your Zapier MCP URL from mcp.zapier.com',
      'Install in Claude: claude mcp add --transport http zapier https://mcp.zapier.com/api/mcp/[YOUR-SECRET]/mcp',
      'Test Zapier actions from Claude',
      'Monitor Zap performance in Zapier dashboard',
      'Set up error notifications'
    ]

    return implementation
  }

  /**
   * Implement GitHub Actions workflow
   */
  async implementGitHubActions(solution, outputDir) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    // Create workflow directory
    const workflowDir = path.join(outputDir, '.github', 'workflows')
    await fs.mkdir(workflowDir, { recursive: true })

    // Generate workflow file
    const workflowYaml = this.generateGitHubActionsWorkflow(solution.architecture)
    const workflowFile = path.join(workflowDir, 'automation.yml')
    await fs.writeFile(workflowFile, workflowYaml)
    implementation.files.push('.github/workflows/automation.yml')

    implementation.instructions = [
      'Copy the .github folder to your repository root',
      'Configure repository secrets in Settings > Secrets',
      'Push changes to trigger the workflow',
      'Monitor workflow runs in Actions tab'
    ]

    implementation.nextSteps = [
      'Test workflow with manual trigger',
      'Configure notifications for failures',
      'Add status badges to README',
      'Set up branch protection rules'
    ]

    return implementation
  }

  /**
   * Generate GitHub Actions workflow
   */
  generateGitHubActionsWorkflow(architecture) {
    return `name: ${architecture.name}

on:
  schedule:
    - cron: '${architecture.configuration.cronSchedule || '0 9 * * *'}'
  workflow_dispatch:
  push:
    branches: [main]

jobs:
  automate:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

${architecture.workflow.map(step => `      - name: ${step}
        run: |
          # TODO: Implement ${step.toLowerCase()}
          echo "Executing: ${step}"
`).join('\n')}

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add -A
          git diff --quiet && git diff --staged --quiet || git commit -m "Automated update"

      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: \${{ secrets.GITHUB_TOKEN }}
`
  }

  /**
   * Implement Node.js script
   */
  async implementNodeScript(solution, outputDir) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    // Generate main script
    const scriptCode = this.generateNodeScript(solution.architecture)
    const scriptFile = path.join(outputDir, 'automation.js')
    await fs.writeFile(scriptFile, scriptCode)
    implementation.files.push('automation.js')

    // Generate config file
    const config = {
      schedule: solution.architecture.configuration.runMode,
      environment: 'development',
      logging: {
        level: 'info',
        file: 'automation.log'
      }
    }
    const configFile = path.join(outputDir, 'config.json')
    await fs.writeFile(configFile, JSON.stringify(config, null, 2))
    implementation.files.push('config.json')

    // Generate package.json
    const packageJson = {
      name: 'automation-script',
      version: '1.0.0',
      type: 'module',
      scripts: {
        start: 'node automation.js',
        test: 'node --test'
      },
      dependencies: solution.architecture.dependencies.reduce((acc, dep) => {
        acc[dep] = 'latest'
        return acc
      }, {})
    }
    const packageFile = path.join(outputDir, 'package.json')
    await fs.writeFile(packageFile, JSON.stringify(packageJson, null, 2))
    implementation.files.push('package.json')

    implementation.instructions = [
      'Navigate to the generated directory',
      'Run: npm install',
      'Configure config.json with your settings',
      'Test: npm start',
      'Deploy to your preferred hosting'
    ]

    implementation.nextSteps = [
      'Add error handling and retry logic',
      'Implement logging and monitoring',
      'Create unit tests',
      'Set up CI/CD pipeline'
    ]

    return implementation
  }

  /**
   * Generate Node.js script code
   */
  generateNodeScript(architecture) {
    return `#!/usr/bin/env node

/**
 * ${architecture.name}
 * ${architecture.description}
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load configuration
const config = JSON.parse(await fs.readFile(path.join(__dirname, 'config.json'), 'utf8'))

async function main() {
  console.log('🚀 Starting automation script...')

  try {
${architecture.workflow.map(step => `    // ${step}
    await ${this.toMethodName(step)}()
    console.log('✓ ${step}')
`).join('\n')}

    console.log('✅ Automation completed successfully!')

  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

${architecture.workflow.map(step => `
async function ${this.toMethodName(step)}() {
  // TODO: Implement ${step.toLowerCase()}
  // Your implementation here
}`).join('\n')}

// Run the script
main()
`
  }

  /**
   * Implement hybrid solution
   */
  async implementHybridSolution(solution, outputDir) {
    const implementation = {
      files: [],
      instructions: [],
      nextSteps: []
    }

    console.log('🔀 Implementing hybrid solution with multiple components...')

    // Implement each component type
    if (solution.architecture.configuration.intelligence === 'claude-agent') {
      const agentImpl = await this.implementClaudeAgent(solution, outputDir)
      implementation.files.push(...agentImpl.files)
    }

    if (solution.architecture.configuration.orchestration === 'github-actions') {
      const ghImpl = await this.implementGitHubActions(solution, outputDir)
      implementation.files.push(...ghImpl.files)
    }

    // Add integration configuration
    const integrationConfig = {
      make: solution.architecture.configuration.integrations.includes('make'),
      zapier: solution.architecture.configuration.integrations.includes('zapier'),
      endpoints: {},
      webhooks: []
    }

    const integrationFile = path.join(outputDir, 'integrations.json')
    await fs.writeFile(integrationFile, JSON.stringify(integrationConfig, null, 2))
    implementation.files.push('integrations.json')

    implementation.instructions = [
      'Review all generated components',
      'Configure integrations between systems',
      'Set up authentication and secrets',
      'Test each component individually',
      'Test the complete workflow end-to-end'
    ]

    implementation.nextSteps = [
      'Document the complete architecture',
      'Set up monitoring across all components',
      'Create runbooks for troubleshooting',
      'Plan for scaling and optimization'
    ]

    return implementation
  }

  /**
   * Save complete project documentation
   */
  async saveProjectDocumentation(problem, solution, implementation, outputDir) {
    const documentation = `# Automation Solution Documentation

## Problem Statement
${problem.description}

## Goals
${problem.goals.map(g => `- ${g}`).join('\n')}

## Solution Architecture
- **Type**: ${solution.type}
- **Name**: ${solution.architecture.name}
- **Description**: ${solution.architecture.description}

## Components
${solution.architecture.components.map(c => `- **${c.name}**: ${c.purpose}`).join('\n')}

## Workflow
${solution.architecture.workflow.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## Implementation Details
${implementation.files.length > 0 ? `
### Generated Files
${implementation.files.map(f => `- ${f}`).join('\n')}
` : ''}

${implementation.instructions.length > 0 ? `
### Setup Instructions
${implementation.instructions.map((inst, i) => `${i + 1}. ${inst}`).join('\n')}
` : ''}

${implementation.nextSteps.length > 0 ? `
### Next Steps
${implementation.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}
` : ''}

## Success Criteria
${problem.successCriteria.map(c => `- ${c}`).join('\n')}

---

Generated by Solution Architect Agent
${new Date().toISOString()}
`

    const docFile = path.join(outputDir, 'SOLUTION.md')
    await fs.writeFile(docFile, documentation)
  }

  // Utility methods

  /**
   * Check if a tool is available
   */
  async checkTool(command) {
    try {
      const { execSync } = await import('child_process')
      execSync(command, { stdio: 'ignore' })
      return true
    } catch {
      return false
    }
  }

  /**
   * Ask user a question
   */
  async ask(question) {
    const answer = await this.rl.question(`${question} `)
    return answer.trim()
  }

  /**
   * Select from options
   */
  async selectOption(question, options) {
    console.log(`\n${question}`)
    options.forEach((opt, i) => {
      console.log(`  ${i + 1}. ${opt}`)
    })
    const index = await this.ask('Choice (number):')
    return options[parseInt(index) - 1] || options[0]
  }

  /**
   * Determine triggers based on problem
   */
  determineTriggers(problem) {
    const triggers = []

    if (problem.technicalContext.frequency === 'periodic') {
      triggers.push('schedule')
    }
    if (problem.technicalContext.frequency === 'continuous') {
      triggers.push('webhook', 'event')
    }
    if (problem.goals.some(g => g.toLowerCase().includes('deploy'))) {
      triggers.push('push', 'pull_request')
    }

    return triggers.length > 0 ? triggers : ['manual']
  }

  /**
   * Get cron schedule from frequency
   */
  getCronSchedule(frequency) {
    const schedules = {
      'one-time': null,
      'periodic': '0 9 * * *', // Daily at 9 AM
      'continuous': '*/15 * * * *' // Every 15 minutes
    }
    return schedules[frequency] || '0 9 * * *'
  }

  /**
   * Suggest integrations based on problem
   */
  suggestIntegrations(problem) {
    const integrations = []
    const keywords = problem.description.toLowerCase() + ' ' + problem.goals.join(' ').toLowerCase()

    if (keywords.includes('email')) integrations.push('Gmail', 'Outlook')
    if (keywords.includes('slack')) integrations.push('Slack')
    if (keywords.includes('database')) integrations.push('PostgreSQL', 'MongoDB')
    if (keywords.includes('spreadsheet')) integrations.push('Google Sheets', 'Excel')
    if (keywords.includes('calendar')) integrations.push('Google Calendar', 'Outlook Calendar')
    if (keywords.includes('crm')) integrations.push('Salesforce', 'HubSpot')

    return integrations
  }

  /**
   * Suggest NPM packages based on problem
   */
  suggestNpmPackages(problem) {
    const packages = []
    const keywords = problem.description.toLowerCase() + ' ' + problem.goals.join(' ').toLowerCase()

    if (keywords.includes('web') || keywords.includes('scrape')) packages.push('puppeteer', 'cheerio')
    if (keywords.includes('api')) packages.push('axios', 'node-fetch')
    if (keywords.includes('database')) packages.push('pg', 'mongodb')
    if (keywords.includes('file')) packages.push('fs-extra', 'glob')
    if (keywords.includes('schedule')) packages.push('node-cron')
    if (keywords.includes('email')) packages.push('nodemailer')

    return packages
  }

  /**
   * Generate alternatives to main solution
   */
  generateAlternatives(problem, mainType) {
    const alternatives = []
    const allTypes = Object.values(SOLUTION_TYPES).filter(t => t !== mainType)

    allTypes.forEach(type => {
      let reason = ''

      if (type === SOLUTION_TYPES.GITHUB_ACTIONS) {
        reason = 'Better for repository-based automation with version control'
      } else if (type === SOLUTION_TYPES.MAKE_AUTOMATION) {
        reason = 'Visual workflow builder with extensive integrations'
      } else if (type === SOLUTION_TYPES.ZAPIER_AUTOMATION) {
        reason = 'User-friendly with largest app ecosystem'
      } else if (type === SOLUTION_TYPES.NODE_SCRIPT) {
        reason = 'Maximum flexibility and control'
      } else if (type === SOLUTION_TYPES.CLAUDE_AGENT) {
        reason = 'AI-powered intelligence and decision making'
      } else if (type === SOLUTION_TYPES.HYBRID) {
        reason = 'Combines multiple approaches for complex requirements'
      }

      if (reason) {
        alternatives.push({ type, reason })
      }
    })

    return alternatives.slice(0, 3) // Return top 3 alternatives
  }

  /**
   * Convert to PascalCase
   */
  toPascalCase(str) {
    return str.split('-').map(word =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
  }

  /**
   * Convert to method name
   */
  toMethodName(str) {
    const clean = str.replace(/[^a-zA-Z0-9\s]/g, '')
    const words = clean.split(/\s+/)
    return words[0].toLowerCase() + words.slice(1).map(w =>
      w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
    ).join('')
  }

  /**
   * Main run method
   */
  async run() {
    console.log('\n🤖 SOLUTION ARCHITECT AGENT')
    console.log('━'.repeat(50))
    console.log('I help you create automated solutions for any problem!')
    console.log('━'.repeat(50))

    try {
      // Phase 1: Discovery
      const problem = await this.discoverProblem()

      // Phase 2: Design
      const solution = await this.designSolution(problem)

      // Phase 3: Validation
      const validation = await this.validateSolution(solution, problem)

      if (validation.approved) {
        // Phase 4: Implementation
        const implementation = await this.implementSolution(validation.solution, problem)

        // Save to history
        this.solutionHistory.push({
          problem,
          solution: validation.solution,
          implementation,
          timestamp: new Date().toISOString()
        })

        console.log('\n🎉 Your automation solution is ready!')
        console.log('Feel free to customize the generated files for your specific needs.')
      } else {
        console.log('\n❌ Solution not approved. Please run again to try a different approach.')
      }

    } catch (error) {
      console.error('\n❌ Error:', error.message)
    } finally {
      this.rl.close()
    }
  }
}

// Run the Solution Architect
const architect = new SolutionArchitect()
architect.run()