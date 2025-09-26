# Custom Slash Commands

This directory contains custom slash commands for the Claude Code Guide project.

## Available Commands

### `/workstation-start`
**Purpose**: Begin a work session when switching computers
- Pulls latest changes from git
- Reads WORKSTATION.md for context
- Updates local workstation info
- Shows current status

**Usage**: Type `/workstation-start` at the beginning of any Claude Code session

### `/workstation-end`
**Purpose**: End a work session before switching computers
- Commits all current work (as WIP if needed)
- Pushes to remote repository
- Updates WORKSTATION.md with handoff notes
- Ensures clean state for other workstation

**Usage**: Type `/workstation-end` before closing Claude Code or switching computers

## How Custom Commands Work

Claude Code automatically discovers markdown files in `.claude/commands/` and makes them available as slash commands. The command name is derived from the filename (without .md extension).

## Creating New Commands

To create a new custom command:
1. Add a new `.md` file in this directory
2. Name it with your desired command name (e.g., `deploy.md` for `/deploy`)
3. Document the steps Claude should execute
4. The command becomes immediately available in your Claude Code session

## Multi-Workstation Workflow

These commands are specifically designed for developers working across multiple computers:

**Typical workflow**:
1. Start Computer A session: `/workstation-start`
2. Do your work...
3. End Computer A session: `/workstation-end`
4. Move to Computer B
5. Start Computer B session: `/workstation-start`
6. Continue where you left off...

This ensures seamless transitions with no lost work or merge conflicts.