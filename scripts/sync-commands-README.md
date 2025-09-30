# Command Sync Automation

This directory contains scripts for automatically synchronizing Claude Code slash commands with the latest documentation.

## Overview

The automation system keeps CC4B's command documentation up-to-date by:

1. **Weekly Monitoring**: Automatically checks for new/changed commands every Sunday
2. **Multi-Source Checking**: Pulls from both official docs and GitHub issues
3. **Automated Reporting**: Generates detailed reports of any changes
4. **Issue Creation**: Automatically creates GitHub issues when updates are needed

## Files

### `sync-commands.js`
Main synchronization script that:
- Fetches commands from official Claude Code documentation
- Checks GitHub issues for undocumented commands
- Compares against current CC4B commands
- Generates detailed reports with recommendations

### `.github/workflows/sync-commands.yml`
GitHub Actions workflow that:
- Runs weekly on Sundays at 6 AM UTC
- Can be triggered manually
- Creates GitHub issues when changes are detected
- Uploads reports as artifacts

## Usage

### Manual Check
```bash
# Dry run to preview changes
npm run sync-commands:dry-run

# Full run to generate report files
npm run sync-commands
```

### Automated (GitHub Actions)
- Runs automatically every Sunday
- Can be triggered manually from Actions tab
- Creates issues when updates needed
- Reports stored as artifacts

## Command Sources

1. **Official Documentation**: https://docs.claude.com/en/docs/claude-code/slash-commands
2. **GitHub Issues**: https://github.com/anthropics/claude-code/issues/6493 (undocumented commands)

## Report Format

Reports include:
- Summary of command counts from each source
- Missing commands that need to be added to CC4B
- Potentially deprecated commands in CC4B
- Up-to-date commands confirmed in external sources
- Specific recommendations for updates

## Integration Points

When changes are detected, update these files:
1. `src/sections/CommandsReference.jsx` - Main command reference
2. `src/sections/EssentialCommands.jsx` - Important commands with detailed explanations
3. `public/claude-code-guide.md` - AI-readable markdown version

## Maintenance

The automation is designed to be low-maintenance:
- Reports false positives for manual review
- Handles API failures gracefully
- Preserves historical reports
- Provides clear next-step guidance

## Future Enhancements

Potential improvements:
- Parse HTML more reliably using proper libraries
- Add command descriptions to automated updates
- Integrate with Claude Code's API if available
- Auto-generate pull requests for simple additions