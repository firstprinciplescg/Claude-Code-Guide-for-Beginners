#!/usr/bin/env node

/**
 * Claude Code Commands Sync Script
 *
 * This script checks for new/updated slash commands from:
 * 1. Official Claude Code documentation
 * 2. GitHub issues for undocumented commands
 *
 * Runs weekly to identify changes and generate update reports.
 *
 * Usage:
 *   node scripts/sync-commands.js
 *   node scripts/sync-commands.js --dry-run
 */

const fs = require('fs').promises;
const path = require('path');

// Current commands in CC4B (from our update)
const CURRENT_COMMANDS = {
  session: ['/clear', '/compact', '/context', '/resume', '/status', '/cost', '/todos', '/export', '/exit'],
  auth: ['/login', '/logout', '/config', '/permissions', '/upgrade'],
  development: ['/vim', '/review', '/security-review', '/pr_comments', '/bashes'],
  project: ['/init', '/memory', '/add-dir', '/ide', '/terminal-setup'],
  ai: ['/model', '/agents', '/mcp', '/output-style'],
  support: ['/help', '/bug', '/doctor', '/release-notes'],
  github: ['/install-github-app', '/migrate-installer']
};

const DOCS_URL = 'https://docs.claude.com/en/docs/claude-code/slash-commands';
const GITHUB_ISSUE_URL = 'https://api.github.com/repos/anthropics/claude-code/issues/6493';

/**
 * Fetch commands from official documentation
 */
async function fetchOfficialCommands() {
  try {
    console.log('🔍 Fetching commands from official documentation...');

    // In a real implementation, you would use a web scraping library
    // or API to fetch the latest documentation
    const response = await fetch(DOCS_URL);
    const html = await response.text();

    // Parse HTML to extract slash commands
    // This is a simplified version - in practice you'd use a proper HTML parser
    const commandRegex = /\/[a-z_-]+/g;
    const matches = html.match(commandRegex) || [];

    // Remove duplicates and sort
    const commands = [...new Set(matches)].sort();

    console.log(`✅ Found ${commands.length} commands in documentation`);
    return commands;

  } catch (error) {
    console.error('❌ Error fetching official commands:', error.message);
    return [];
  }
}

/**
 * Fetch undocumented commands from GitHub issues
 */
async function fetchGitHubIssueCommands() {
  try {
    console.log('🔍 Fetching undocumented commands from GitHub issue...');

    const response = await fetch(GITHUB_ISSUE_URL);
    const issueData = await response.json();

    // Parse issue body for slash commands
    const body = issueData.body || '';
    const commandRegex = /\/[a-z_-]+/g;
    const matches = body.match(commandRegex) || [];

    // Remove duplicates and sort
    const commands = [...new Set(matches)].sort();

    console.log(`✅ Found ${commands.length} undocumented commands in GitHub issue`);
    return commands;

  } catch (error) {
    console.error('❌ Error fetching GitHub issue commands:', error.message);
    return [];
  }
}

/**
 * Get all current commands from CC4B
 */
function getCurrentCommands() {
  return Object.values(CURRENT_COMMANDS).flat().sort();
}

/**
 * Compare command lists and identify differences
 */
function compareCommands(official, github, current) {
  const allExternal = [...new Set([...official, ...github])].sort();
  const currentSet = new Set(current);
  const externalSet = new Set(allExternal);

  const missing = allExternal.filter(cmd => !currentSet.has(cmd));
  const deprecated = current.filter(cmd => !externalSet.has(cmd));
  const unchanged = current.filter(cmd => externalSet.has(cmd));

  return {
    missing,
    deprecated,
    unchanged,
    total: {
      official: official.length,
      github: github.length,
      current: current.length,
      external: allExternal.length
    }
  };
}

/**
 * Generate update report
 */
function generateReport(comparison, official, github) {
  const timestamp = new Date().toISOString();

  let report = `# Claude Code Commands Sync Report\n`;
  report += `Generated: ${timestamp}\n\n`;

  report += `## Summary\n`;
  report += `- Official docs: ${comparison.total.official} commands\n`;
  report += `- GitHub issue: ${comparison.total.github} commands\n`;
  report += `- Current CC4B: ${comparison.total.current} commands\n`;
  report += `- Total external: ${comparison.total.external} commands\n\n`;

  if (comparison.missing.length > 0) {
    report += `## ⚠️  Missing Commands (${comparison.missing.length})\n`;
    report += `These commands are documented/reported but not in CC4B:\n\n`;
    comparison.missing.forEach(cmd => {
      const inOfficial = official.includes(cmd);
      const inGithub = github.includes(cmd);
      const source = inOfficial && inGithub ? 'docs + GitHub' :
                     inOfficial ? 'docs' : 'GitHub';
      report += `- \`${cmd}\` (${source})\n`;
    });
    report += `\n`;
  }

  if (comparison.deprecated.length > 0) {
    report += `## 🗑️  Potentially Deprecated Commands (${comparison.deprecated.length})\n`;
    report += `These commands are in CC4B but not found in external sources:\n\n`;
    comparison.deprecated.forEach(cmd => {
      report += `- \`${cmd}\`\n`;
    });
    report += `\n`;
  }

  if (comparison.unchanged.length > 0) {
    report += `## ✅ Up-to-date Commands (${comparison.unchanged.length})\n`;
    report += `These commands are confirmed in external sources:\n\n`;
    comparison.unchanged.forEach(cmd => {
      report += `- \`${cmd}\`\n`;
    });
    report += `\n`;
  }

  report += `## Recommendations\n`;
  if (comparison.missing.length > 0) {
    report += `1. Add ${comparison.missing.length} missing commands to CC4B\n`;
    report += `2. Update CommandsReference.jsx with new commands\n`;
    report += `3. Consider adding important commands to EssentialCommands.jsx\n`;
    report += `4. Update public/claude-code-guide.md\n`;
  } else {
    report += `✅ CC4B appears to be up-to-date with all known commands!\n`;
  }

  if (comparison.deprecated.length > 0) {
    report += `5. Verify if deprecated commands are still valid\n`;
  }

  return report;
}

/**
 * Save report to file
 */
async function saveReport(report, isDryRun = false) {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `command-sync-report-${timestamp}.md`;
  const filepath = path.join(__dirname, '..', 'reports', filename);

  if (isDryRun) {
    console.log('\n📄 Report preview:');
    console.log('='.repeat(50));
    console.log(report);
    console.log('='.repeat(50));
    return;
  }

  try {
    // Ensure reports directory exists
    await fs.mkdir(path.dirname(filepath), { recursive: true });

    // Save report
    await fs.writeFile(filepath, report);
    console.log(`✅ Report saved to: ${filepath}`);

  } catch (error) {
    console.error('❌ Error saving report:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('🚀 Starting Claude Code commands sync...\n');

  try {
    // Fetch commands from all sources
    const [official, github] = await Promise.all([
      fetchOfficialCommands(),
      fetchGitHubIssueCommands()
    ]);

    const current = getCurrentCommands();

    console.log('\n📊 Command counts:');
    console.log(`  Official docs: ${official.length}`);
    console.log(`  GitHub issue: ${github.length}`);
    console.log(`  Current CC4B: ${current.length}`);

    // Compare and generate report
    const comparison = compareCommands(official, github, current);
    const report = generateReport(comparison, official, github);

    // Output results
    console.log('\n📈 Analysis results:');
    console.log(`  Missing: ${comparison.missing.length}`);
    console.log(`  Deprecated: ${comparison.deprecated.length}`);
    console.log(`  Up-to-date: ${comparison.unchanged.length}`);

    if (comparison.missing.length > 0 || comparison.deprecated.length > 0) {
      console.log('\n⚠️  Changes detected! Review the report for details.');
    } else {
      console.log('\n✅ No changes detected. CC4B is up-to-date!');
    }

    // Save report
    await saveReport(report, isDryRun);

  } catch (error) {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  fetchOfficialCommands,
  fetchGitHubIssueCommands,
  compareCommands,
  generateReport
};