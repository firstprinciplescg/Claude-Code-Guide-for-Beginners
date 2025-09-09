# Claude Code: The Complete Beginner's Guide

*A comprehensive guide to understanding and using Claude Code, Anthropic's command-line coding assistant*

## Table of Contents

1. [Understanding Claude Code](#understanding-claude-code)
2. [Installation and Setup](#installation-and-setup)
3. [Your First Session](#your-first-session)
4. [Core Concepts](#core-concepts)
5. [Essential Commands](#essential-commands)
6. [IDE Integration](#ide-integration)
7. [Working with Your Codebase](#working-with-your-codebase)
8. [Common Development Tasks](#common-development-tasks)
9. [Best Practices](#best-practices)
10. [Advanced Features](#advanced-features)
11. [Troubleshooting & Quick Reference](#troubleshooting--quick-reference)

---

## Understanding Claude Code

Imagine having an experienced developer sitting next to you who understands your entire codebase, can write and modify code directly, and communicates in plain English rather than cryptic commands. That's Claude Code. Unlike traditional development tools that require you to memorize specific syntax and commands, Claude Code works through natural conversation while maintaining deep awareness of your project context.

### What Makes Claude Code Different

Traditional development tools operate on a rigid command-response basis where you need to know exact syntax, remember specific flags, and manually manage context. Claude Code fundamentally changes this paradigm. Instead of typing `git diff HEAD~1 --stat` followed by `git commit -m "message"` and then `git push origin feature-branch`, you can simply tell Claude, "Review my recent changes and commit them with an appropriate message." Claude understands your intent, examines the changes, writes a meaningful commit message based on what actually changed, and handles the git workflow.

This conversational approach extends to every aspect of development. Rather than remembering which files contain specific functions, you ask Claude to "find the user authentication logic." Instead of manually writing boilerplate code, you describe the feature you want. Rather than debugging by inserting print statements and rerunning tests, you explain the unexpected behavior and let Claude analyze the root cause.

### What You Can Do with Claude Code

Claude Code excels at several key areas of development work, each designed to amplify your capabilities rather than replace your expertise.

**Building New Features**: When building new features, you describe what you want in plain English, including business requirements, technical constraints, and preferred approaches. Claude creates an implementation plan that respects your existing architecture, writes code that follows your project's patterns and conventions, and ensures everything integrates properly with your existing codebase.

**Debugging and Problem Solving**: For debugging, Claude Code transforms frustrating investigation sessions into collaborative problem-solving. When you encounter unexpected behavior, Claude analyzes not just the error message but your entire codebase context to identify root causes. It can trace data flow, identify side effects, and suggest fixes that address underlying issues rather than just symptoms.

**Codebase Exploration**: When exploring unfamiliar codebases, Claude acts as a knowledgeable guide. It can map out architectural patterns, explain complex business logic, identify key entry points and data flows, and help you understand not just what the code does, but why it was designed that way.

**Maintenance and Refactoring**: For routine tasks that interrupt flow states, Claude Code handles the tedious work. Fixing linting issues across multiple files, resolving merge conflicts while preserving intended changes, updating import statements after restructuring, writing comprehensive test suites with edge cases, and generating documentation that actually explains the why behind the code all become simple requests rather than time-consuming chores.

### How Claude Code Fits Into Your Workflow

The goal isn't to replace your development practices but to enhance them. You still make architectural decisions, write complex algorithms, and review all changes before they're committed. Claude Code handles the mechanical parts—the searching, the boilerplate, the tedious refactoring—so you can focus on the creative and strategic aspects of development.

---

## Installation and Setup

Setting up Claude Code is straightforward, but understanding your options helps you choose the best approach for your environment.

### System Requirements

Before installing Claude Code, ensure your system meets these requirements:

- **Node.js**: Version 18 or higher (verify with `node --version`)
- **Operating System**: 
  - macOS 10.15 or later
  - Ubuntu 20.04 or later (including other Debian-based distributions)
  - Windows 10 or later with WSL or Git for Windows
- **Dependencies**: ripgrep for fast file searching (usually included with Claude Code)

### Installation Methods

**npm Installation** (Recommended for Node.js users):
```bash
npm install -g @anthropic-ai/claude-code
```

This installs Claude Code globally on your system, making it available from any directory. If you encounter permission errors, avoid using `sudo` as this can create security vulnerabilities.

**Native Installer** (Alternative approach):

On macOS and Linux:
```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows users can install using PowerShell:
```powershell
irm https://claude.ai/install.ps1 | iex
```

### Setting Up Your Account

After installation, navigate to any project directory and run:

```bash
claude
```

On your first run, Claude Code will guide you through authentication. You have several options:

**Anthropic Console Account**: If you have an Anthropic Console account with an API key, you can authenticate directly through the console. This requires active billing at console.anthropic.com and provides pay-as-you-go usage.

**Claude.ai Account**: If you have a Claude Pro or Max subscription, you can authenticate using your Claude.ai account credentials. This provides a unified experience across Claude Code and the web interface, with usage counting against your subscription limits.

### Verifying Your Installation

Check your version:
```bash
claude --version
```

For a comprehensive system check:
```bash
claude doctor
```

This diagnostic tool examines your installation, checking Node.js compatibility, verifying Claude Code components, testing API connectivity, identifying potential configuration issues, and confirming that required dependencies like ripgrep are available.

---

## Your First Session

Starting your journey with Claude Code is like beginning a conversation with a knowledgeable colleague. Navigate to your project directory in the terminal and simply type:

```bash
claude
```

You'll see a welcome message, and Claude will be ready to assist. The interface shows when Claude is thinking, reading files, or waiting for your input.

### Your First Conversation

Let's start with something that demonstrates Claude's contextual awareness:

```
Can you give me an overview of this project? What does it do and how is it structured?
```

Watch as Claude explores your project, examining:
- README files for project description and purpose
- package.json or requirements.txt for dependencies and configuration
- Main source files to understand entry points
- Directory structure to map out organization
- Configuration files to identify frameworks and tools

Claude synthesizes this information into a comprehensive overview, explaining not just what files exist, but how they work together to create your application.

### Making Your First Code Change

Let's try making an actual modification to see how Claude handles file changes:

```
Can you add comprehensive documentation to the main function, explaining its purpose, parameters, and return value?
```

Claude will:
- Locate your main function
- Analyze its implementation to understand its purpose
- Examine how it's called throughout your codebase
- Create appropriate documentation following your project's style
- Show you the proposed changes with a clear diff

### Understanding the Interaction Pattern

Notice how Claude Code interactions follow a natural flow:
1. **You make a request** in plain English
2. **Claude analyzes** the request and your codebase
3. **Claude explains** what it's going to do
4. **Claude shows you** the proposed changes
5. **You review and approve** (or request modifications)

This pattern ensures you're always in control of what changes are made to your code.

---

## Core Concepts

Understanding how Claude Code thinks and operates will help you use it more effectively. These core concepts form the foundation of productive interaction with Claude.

### Context Window and Memory

The context window is perhaps the most important concept to understand when working with Claude Code. Think of it as Claude's working memory during your conversation. Unlike a human colleague who remembers every discussion you've had, Claude works with a limited amount of recent context that includes:

- Your recent conversation history
- Files that have been read during the session
- Commands that have been executed and their outputs
- Changes that have been made to your codebase

However, this context window has limits. During long sessions, especially when working with large files or extensive command outputs, older information gets pushed out to make room for new information. This is why the `/clear` command becomes essential for productive long sessions—it resets the conversation context while maintaining Claude's awareness of your project structure.

### File Access and Project Awareness

Claude Code takes a security-first approach to file access while maintaining comprehensive project awareness. It can read any file in your current directory and subdirectories, allowing it to understand your entire project structure. However, it always asks for permission before modifying files or running commands that could affect your system.

When Claude reads files, it builds an understanding of:
- Your project's architecture and patterns
- Coding conventions and style
- Dependencies and their relationships
- Test structures and patterns
- Documentation approaches

This awareness persists throughout your session, so Claude can make informed decisions about how new code should be written or how changes should be structured.

### Model Selection and Capabilities

Claude Code can utilize different AI models, each optimized for different types of tasks:

**Claude Opus 4.1**: The most capable model, excelling at complex reasoning, architectural decisions, and nuanced understanding of large codebases. Best for challenging problems requiring deep analysis.

**Claude Sonnet 4**: Offers an excellent balance of capability and speed, handling most coding tasks efficiently while maintaining high quality output.

**Claude Haiku 3.5**: Optimized for speed and efficiency, perfect for quick questions, simple modifications, or when you need rapid iterations.

You can switch between models during your session using the `/model` command, choosing based on the complexity of your current task.

### The CLAUDE.md File

A powerful but often overlooked feature is the CLAUDE.md file. This special file, placed in your project root, is automatically read by Claude at the start of each conversation. Think of it as a primer that helps Claude understand your project's specific conventions and requirements.

Your CLAUDE.md might include:
- Project-specific terminology and concepts
- Coding standards and conventions
- Architecture decisions and patterns
- Common workflows and processes
- Testing approaches and requirements

This file acts as persistent memory that survives across sessions, ensuring Claude always understands your project's unique context.

---

## Essential Commands

Claude Code uses slash commands for system operations, distinct from your conversational requests. Understanding these commands helps you manage your sessions effectively.

### Core Slash Commands

**`/clear`**: Perhaps the most frequently used command. It resets your conversation context while maintaining project awareness. Think of it as starting a fresh discussion about a new topic while Claude still remembers everything about your project.

Use `/clear` when:
- Switching to a completely different task
- The conversation becomes unfocused
- You've filled up the context window with extensive outputs
- Starting a new feature or debugging session

**`/model`**: Allows you to switch between available AI models mid-session. Simply typing `/model` shows available options, and you can select based on your current needs:
- Choose Opus 4.1 for complex architectural decisions
- Select Sonnet 4 for balanced performance on most tasks
- Use Haiku 3.5 for quick questions or simple changes

**`/config`**: Opens configuration options for Claude Code. Here you can adjust:
- How diffs are displayed
- Which tools require permission
- Default behaviors for various operations
- IDE integration settings

**Other Essential Commands**:
- `/logout` - Signs you out of Claude Code
- `/status` - Shows session info, current model, and usage statistics
- `/bug` - Reports issues to the Claude Code team
- `/ide` - Connects Claude Code to your IDE

### Custom Commands

Beyond built-in commands, Claude Code supports custom commands that you can create for your project or team. These are stored as markdown files in the `.claude/commands/` directory in your project.

Custom commands might include:
- Team-specific workflows
- Project deployment procedures
- Testing protocols
- Documentation generation tasks

---

## IDE Integration

One of Claude Code's most powerful features is its ability to integrate directly with your development environment. Rather than being another separate tool to switch between, Claude Code can work seamlessly within your IDE.

### VS Code and Compatible Editors

Claude Code works with VS Code and its popular forks including Cursor, Windsurf, and VSCodium. To set up the integration:

1. Open your project in VS Code
2. Open the integrated terminal
3. Run `claude`
4. The extension auto-installs on first run

Benefits of IDE integration:
- Claude can see your current file and cursor position
- Changes are automatically reflected in your editor
- You can continue coding while Claude works in the background
- Diff views are displayed directly in the editor interface

### JetBrains IDEs

Claude Code also integrates with JetBrains IDEs including IntelliJ IDEA, PyCharm, WebStorm, PhpStorm, GoLand, and Android Studio. The setup process is similar to VS Code:

1. Open your project in your JetBrains IDE
2. Use the built-in terminal or external terminal
3. Run `claude` to start the integration

### Working Within Your Editor

When Claude Code is integrated with your IDE, you can:
- Ask Claude about code you're currently viewing
- Request changes to specific functions or classes
- Get explanations of complex logic without leaving your editor
- Have Claude generate tests for the code you're working on

The integration creates a seamless workflow where Claude becomes a natural extension of your development environment.

---

## Working with Your Codebase

One of Claude Code's greatest strengths is its ability to understand and navigate complex codebases. Whether you're exploring an unfamiliar project, maintaining legacy code, or building new features, Claude Code acts as a knowledgeable guide through your code.

### Exploring Project Structure

When approaching a new or unfamiliar codebase, Claude Code can quickly help you build a mental model of how everything fits together. Start with broad, architectural questions like "What's the overall architecture of this application?"

Claude will analyze:
- **Architectural patterns** (MVC, microservices, event-driven)
- **Major components** and their responsibilities  
- **Data flow** between different parts
- **External dependencies** and integrations
- **Configuration and deployment** patterns

Example exploration queries:
```
"Walk me through the user authentication flow in this application"
"How does data flow from the API to the frontend components?"
"What are the main business logic modules and how do they interact?"
```

### Understanding Code Relationships

Modern applications involve complex relationships between different parts of the codebase. Claude Code excels at mapping these relationships and explaining their implications.

**Dependency Analysis**: Claude can trace how changes in one module might affect others, helping you understand the ripple effects of modifications before you make them.

**Call Graph Understanding**: When you ask about a function, Claude doesn't just show you its implementation—it explains where it's called from, what calls it makes, and how it fits into the larger system.

**Data Flow Tracing**: Claude can follow data as it moves through your system, from API endpoints through business logic to database operations, helping you understand complex workflows.

### Finding Relevant Code

Instead of using text search to find code, you can ask Claude semantic questions:

```
"Where is the email validation logic?"
"Show me how user preferences are stored and retrieved"
"Find the code that handles payment processing errors"
```

Claude searches not just for keywords but for concepts, understanding that "email validation" might be implemented in a function called `validateEmailAddress` or as part of a larger `UserInput` class.

### Learning from Patterns

Claude Code can identify and explain patterns in your codebase, helping you maintain consistency:

**Coding Patterns**: "How does this project typically handle error conditions?" Claude will show you examples of error handling patterns used throughout the codebase.

**Architectural Patterns**: "What's the standard way to add a new API endpoint in this project?" Claude analyzes existing endpoints to show you the established pattern.

**Testing Patterns**: "How should I write tests for this new feature?" Claude examines your test suite to understand your testing approach and conventions.

### Navigating Legacy Code

Legacy codebases can be particularly challenging to understand. Claude Code helps by:

**Explaining Historical Context**: Claude can often infer why code was written a certain way based on patterns and comments, helping you understand the reasoning behind seemingly unusual implementations.

**Identifying Safe Change Points**: When you need to modify legacy code, Claude can help identify the safest places to make changes and highlight potential risks.

**Modernization Guidance**: Claude can suggest how to gradually modernize legacy code while maintaining functionality, showing you incremental steps toward better architecture.

### Cross-File Understanding

Unlike traditional search tools that work file by file, Claude Code understands how your code works across multiple files:

**Interface Contracts**: Claude understands how classes and modules work together, even when they're defined in separate files.

**Configuration Dependencies**: Changes to configuration files are understood in the context of the code that uses them.

**Import and Module Relationships**: Claude tracks how modules depend on each other and can predict the impact of changes.

This holistic understanding makes Claude Code invaluable for working with complex, multi-file features where understanding the full context is essential for making correct changes.

---

## Common Development Tasks

Claude Code transforms routine development tasks from time-consuming chores into collaborative conversations.

### Building New Features

When building new features, success depends on clear communication about requirements and constraints. Instead of vague requests, provide comprehensive context that helps Claude understand not just what to build, but why and how it should fit into your existing system.

**Effective Feature Requests**:
```
"I need to add user profile management to this Express.js app. Users should be able to update their name, email, and preferences. The app already uses JWT authentication and PostgreSQL. Follow the existing REST API patterns and include comprehensive error handling."
```

Notice how this request includes:
- The specific technology stack
- Business requirements
- Technical constraints
- Quality expectations

**Feature Development Process**:
1. **Planning Phase**: Claude analyzes your request and existing code to create an implementation plan
2. **Architecture Review**: Claude explains how the new feature will integrate with existing code
3. **Implementation**: Claude writes the code following your project's patterns
4. **Testing**: Claude suggests tests based on your existing test structure
5. **Documentation**: Claude updates relevant documentation

### Debugging and Fixing Issues

Debugging with Claude Code transforms frustrating investigation into collaborative problem-solving. When encountering issues, provide comprehensive context including the complete error message, relevant code snippets, steps to reproduce the issue, and what you expected versus what happened.

**Effective Bug Reports**:
```
"I'm getting a 'Cannot read property name of undefined' error when users try to update their profiles. This happens about 50% of the time, but I can't reproduce it consistently. The error occurs in the ProfileController.updateUser method. Here's the error stack trace: [paste stack trace]"
```

**Debugging Process**:
1. **Error Analysis**: Claude examines the error message and stack trace
2. **Code Review**: Claude analyzes the relevant code for potential issues
3. **Context Investigation**: Claude looks at how the problematic code is called
4. **Root Cause Identification**: Claude identifies the underlying issue
5. **Solution Proposal**: Claude suggests fixes and explains why they work

### Code Review and Quality Improvements

Claude Code can act as a thorough code reviewer, checking for:

**Functionality Issues**: Logic errors, edge cases, potential bugs
**Performance Problems**: Inefficient algorithms, memory leaks, optimization opportunities
**Security Concerns**: Input validation, authentication issues, data exposure risks
**Maintainability**: Code clarity, documentation, adherence to project patterns

**Code Review Request**:
```
"Please review this user authentication module I just wrote. Check for security issues, performance problems, and whether it follows our project's patterns."
```

### Refactoring and Code Organization

When your code needs restructuring, Claude Code can help with both small-scale and large-scale refactoring:

**Small-Scale Refactoring**: Extract functions, rename variables, simplify complex expressions
**Large-Scale Refactoring**: Restructure modules, update architectural patterns, migrate between frameworks

**Refactoring Approach**:
1. **Analysis**: Claude understands the current structure and its problems
2. **Planning**: Claude proposes a refactoring strategy
3. **Implementation**: Claude makes changes incrementally
4. **Validation**: Claude ensures functionality is preserved

### Documentation and Comments

Claude Code excels at generating useful documentation that explains not just what code does, but why it exists:

**API Documentation**: Generate comprehensive API docs with examples
**Code Comments**: Add helpful inline comments that explain complex logic
**README Updates**: Keep project documentation current with code changes
**Architecture Documents**: Create high-level documentation of system design

---

## Best Practices

Working effectively with Claude Code involves more than just knowing commands and features. These practices will help you get the most value from your AI pair programmer.

### Effective Communication

The quality of Claude's assistance directly correlates with the clarity and completeness of your communication. Think of Claude as a skilled colleague who needs context to provide the best help.

**Provide Background Context**: When making requests, include information about what you're trying to achieve, not just the immediate task. Context about business requirements, technical constraints, and project goals helps Claude make better decisions.

**Be Specific About Requirements**: Instead of "make this faster," explain "this API endpoint takes 3 seconds to respond during peak traffic, and we need it under 500ms for a good user experience."

**Reference Relevant Code**: Help Claude understand the scope by mentioning specific files, functions, or areas of the codebase that are relevant to your request.

**Explain Your Constraints**: If you have preferences about implementation approach, mention them: "I prefer using existing utility functions rather than adding new dependencies" or "This needs to work with our existing caching layer."

### Session Management

Managing your Claude Code sessions effectively ensures optimal performance and clarity throughout your development work.

**Use `/clear` Strategically**: Clear your context between distinct tasks or when the conversation becomes unfocused. This prevents Claude from being distracted by irrelevant previous discussions.

**Break Large Tasks Down**: For complex features or major refactoring, break the work into logical phases. Complete each phase before moving to the next, using `/clear` between phases if needed.

**Maintain Focus**: Keep each session focused on related tasks. If you switch between debugging, feature development, and documentation, consider clearing context between these different types of work.

### Working with Large Changes

When making significant changes to your codebase, follow these practices to maintain code quality and project stability:

**Start with Planning**: For major features or refactoring, ask Claude to create a detailed plan before beginning implementation. Review and refine the plan before proceeding.

**Work Incrementally**: Make changes in small, reviewable chunks. This makes it easier to verify each change and maintain a working codebase throughout the development process.

**Test Frequently**: Ask Claude to run tests after significant changes. If your project has automated tests, use them to validate changes as you go.

**Review All Changes**: Always review Claude's proposed changes before accepting them. Claude is excellent at following patterns and implementing requirements, but you're the expert on your specific project needs.

### Maintaining Code Quality

Claude Code can help maintain and improve code quality, but you should establish clear quality standards:

**Establish Style Guidelines**: Use a CLAUDE.md file to document your project's coding standards, patterns, and preferences. This helps Claude maintain consistency across all changes.

**Regular Code Reviews**: Even when Claude writes code, review it as you would any other code contribution. Look for adherence to project patterns, proper error handling, and maintainability.

**Test Coverage**: Ask Claude to write tests for new features and modifications. Good test coverage makes it safer to make future changes and helps document expected behavior.

### Learning from Claude

One of the unexpected benefits of using Claude Code is how much you can learn from its explanations and implementations:

**Ask for Explanations**: When Claude suggests a solution you don't immediately understand, ask for an explanation. This helps you learn new techniques and understand different approaches.

**Explore Alternatives**: Ask Claude to show you different ways to implement the same feature. Understanding trade-offs between approaches improves your architectural decision-making.

**Pattern Recognition**: Pay attention to the patterns Claude uses. Often, these reflect industry best practices that you can apply to other parts of your codebase.

### Team Collaboration

When using Claude Code in a team environment, consider these practices:

**Shared CLAUDE.md**: Maintain a team-wide CLAUDE.md file that documents shared conventions, patterns, and project-specific guidelines.

**Consistent Patterns**: Use Claude to help maintain consistency across team members' code by referencing established patterns and conventions.

**Knowledge Sharing**: Share effective Claude Code techniques and query patterns with your team to help everyone work more effectively.

---

## Advanced Features

As you become comfortable with Claude Code's core capabilities, exploring its advanced features opens new possibilities for automation, integration, and sophisticated development workflows.

### Model Context Protocol (MCP) Servers

MCP represents one of Claude Code's most powerful extensibility features. MCP servers are bridges that connect Claude to external tools and services, extending its capabilities far beyond code analysis and generation.

Think of MCP servers as specialized assistants that Claude can consult. When you have an MCP server for GitHub configured, Claude can directly read issues, create pull requests, and manage workflows without you needing to leave your terminal. With a Slack MCP server, Claude can read relevant discussions to understand project context or notify channels about deployments.

**MCP Configuration**:

To configure MCP servers, you create a `.claude/mcp.json` file in your project:

```json
{
  "servers": {
    "github": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx", 
      "args": ["@modelcontextprotocol/server-postgres"],
      "env": {
        "CONNECTION_STRING": "${DATABASE_URL}"
      }
    }
  }
}
```

**Example MCP Usage**:

With these servers configured, you can make requests like:
- "Check if there are any high-priority issues related to the authentication system"
- "What's the current schema for the users table?"
- "Create a pull request for the feature branch with appropriate reviewers"

**Custom MCP Servers**:

The power of MCP extends beyond pre-built servers. You can create custom MCP servers for your organization's specific tools, internal APIs, or specialized workflows. This transforms Claude Code from a coding assistant into a comprehensive development platform that understands your entire ecosystem.

### Print Mode and Automation

Print mode, activated with the `-p` flag, transforms Claude Code into a powerful automation tool. Instead of interactive conversation, print mode executes a single request and returns the result, making it perfect for scripting and integration into automated workflows.

**Print Mode Examples**:

Generate Documentation:
```bash
claude -p "Generate a comprehensive README based on this codebase, including setup instructions, API documentation, and examples" > README.md
```

Unix Pipeline Integration:
```bash
# Monitor logs and alert on anomalies
tail -f application.log | claude -p "Watch for errors or unusual patterns and summarize any issues"

# Generate release notes from git history
git log --oneline HEAD...$(git describe --tags --abbrev=0) | \
  claude -p "Generate user-friendly release notes from these commits"

# Create tests for changed files
git diff --name-only main | \
  xargs -I {} claude -p "Generate tests for the changes in {}"
```

**CI/CD Integration**:

You can integrate print mode into CI/CD pipelines for automated code review, documentation generation, or even preliminary security scanning. The key is that print mode makes Claude Code composable with other tools, following Unix philosophy of doing one thing well and working with other tools.

### Multi-Directory Access

While Claude Code primarily operates within your current directory, complex projects often span multiple repositories or require reference to shared libraries. The `--add-dir` flag extends Claude's awareness:

```bash
claude --add-dir ../shared-components --add-dir ../api-contracts
```

**Use Cases**:
- **Microservice architectures** where you need Claude to understand service interactions
- **Monorepos** where related projects live in sibling directories
- **Shared libraries** or components that multiple projects depend on
- **Documentation references** outside your main project directory

**Example Multi-Directory Queries**:
```
"How does this service's data model align with the shared API contracts?"

"Can you update this component to match the pattern used in the shared-components library?"
```

### Subscription Tiers and Optimization

Understanding Claude Code's subscription model helps you optimize usage for your needs and budget.

**Subscription Options**:

**API Model**: Pay-as-you-go pricing
- Ideal for occasional use
- Cost-effective for specific projects
- No monthly commitment

**Pro Plan**: $20/month
- Substantial usage included
- Claude Sonnet 4 access
- Perfect for individual developers

**Max Plans**: $100-200/month
- Extensive usage allowances
- Claude Opus 4.1 access
- Designed for professional/team use

**Usage Optimization Tips**:
- Use `/status` command to monitor usage patterns
- Use Sonnet 4 for routine tasks, switch to Opus 4.1 for complex problems
- Consider using print mode for batch operations to optimize API calls
- Use `/clear` strategically to manage context window efficiently

---

## Troubleshooting & Quick Reference

When things don't work as expected, these troubleshooting steps and reference materials will help you resolve issues quickly.

### Common Issues and Solutions

**Authentication Problems**:

*Symptoms*:
- "Invalid credentials" errors despite correct login
- Session expires unexpectedly during work
- Can't switch between authentication methods

*Solutions*:
```bash
claude doctor  # Check system status and authentication
```
```bash
/logout  # Clear current session and re-authenticate
```

For persistent issues, check your account status at console.anthropic.com or claude.ai

**Performance and Responsiveness**:

*Symptoms*:
- Long wait times for responses
- Requests timing out
- Claude seems "stuck" processing

*Solutions*:
```bash
/clear  # Reset context window if it's overloaded
```
```bash
/model  # Switch to Haiku 3.5 for faster responses
```

Create a `.claudeignore` file to exclude large directories:
```
node_modules/
build/
.git/
*.log
```

**Context Window Overflow**:

*Symptoms*:
- Claude "forgets" earlier conversations
- Responses become less relevant to your project
- Claude asks for information you already provided

*Solutions*:
```bash
/clear  # Start fresh while maintaining project awareness
```

Break large tasks into smaller, focused sessions. Use `/status` to monitor context usage.

**File Access Issues**:

*Symptoms*:
- Claude can't find files you know exist
- Permission errors when reading/writing files
- Missing project context

*Solutions*:

Verify you're in the correct directory:
```bash
pwd  # Check current directory
```

Check file permissions:
```bash
ls -la  # View file permissions
```

Ensure Claude can access your project root and has proper permissions.

### When Things Go Wrong

**Installation Problems**:

If Claude Code isn't installing correctly, first verify your Node.js version meets requirements:
```bash
node --version  # Should be 18 or higher
```

Permission errors during npm installation often tempt users to use `sudo`, but this creates more problems than it solves. Instead, configure npm to use a different directory for global packages.

**Network and Connectivity**:

If Claude Code can't connect to Anthropic's servers:
- Check your internet connection
- Verify firewall settings aren't blocking Claude Code
- Corporate networks sometimes block OAuth flows—contact IT if needed
- Try using a different network to isolate network-specific issues

**Model Switching Issues**:

If you can't access certain models:
- Verify your subscription tier includes the model you're trying to use
- Check if there are temporary service limitations
- Use `/status` to see which models are available to your account

### Getting Help

**Built-in Help**:
- `claude --help` - Show command-line options
- `/status` - View current session and account information
- `claude doctor` - Run comprehensive diagnostics

**Official Resources**:
- **Documentation**: https://docs.anthropic.com/en/docs/claude-code
- **GitHub Repository**: https://github.com/anthropics/claude-code  
- **API Documentation**: https://docs.anthropic.com

**Support Channels**:
- Use `/bug` command to report issues directly from Claude Code
- Account and billing help: https://support.anthropic.com
- Community discussions and tips on GitHub Issues

### Quick Reference

**Essential Commands**:
- `claude` - Start Claude Code in interactive mode
- `claude --version` - Check current version  
- `claude doctor` - Run comprehensive diagnostic check
- `claude -p "request"` - Use print mode for automation
- `claude --add-dir path` - Add additional directories

**Slash Commands**:
- `/clear` - Reset conversation context while maintaining project awareness
- `/model` - Switch between AI models (Opus 4.1, Sonnet 4, Haiku 3.5)
- `/config` - Open configuration options
- `/logout` - Sign out of Claude Code
- `/status` - View session information and usage statistics
- `/bug` - Report issues to development team
- `/ide` - Connect to IDE integration

**Key Concepts**:
- **Context Window**: Claude's working memory during your session
- **CLAUDE.md**: Project-specific configuration and conventions file
- **MCP Servers**: Extend Claude's capabilities with external tools
- **Print Mode**: Use `-p` flag for automation and scripting
- **IDE Integration**: Auto-installs when running from IDE terminal

**File Structure**:
- `CLAUDE.md` - Project conventions and guidelines
- `.claude/mcp.json` - MCP server configurations
- `.claude/commands/` - Custom command definitions
- `.claudeignore` - Files and directories to exclude

---

*Last Updated: January 2025*  
*For Claude Code with Claude Opus 4.1, Sonnet 4, and Haiku 3.5 models*  
*Complete guide available at: https://claudecodeforbeginners.com*