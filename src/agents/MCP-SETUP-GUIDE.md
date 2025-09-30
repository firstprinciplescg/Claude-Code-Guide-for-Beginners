# MCP Setup Guide for Solution Architect Agent

Complete installation instructions for Make.com, Zapier, and GitHub MCP servers with Claude Code.

## 🎯 Quick Overview

MCP (Model Context Protocol) servers give Claude Code direct access to external tools and platforms. The Solution Architect Agent can leverage these to create real, working automations.

## 📦 Available MCP Integrations

### 1. GitHub MCP Server (Official)
**Purpose**: Direct repository access, issue/PR management, CI/CD control
**Cost**: Free with GitHub account

### 2. Zapier MCP
**Purpose**: Connect to 8,000+ apps with 30,000+ actions
**Cost**: 2 Zapier tasks per MCP call

### 3. Make.com MCP
**Purpose**: Visual workflow automation with extensive integrations
**Cost**: Free tier available

---

## 🚀 GitHub MCP Installation

### Prerequisites
- GitHub account
- Personal Access Token (PAT)

### Step 1: Create GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Click "Generate new token (classic)"
3. Select scopes:
   - `repo` (full control of private repos)
   - `workflow` (update GitHub Actions)
   - `write:packages` (if using packages)
4. Copy the generated token

### Step 2: Install GitHub MCP in Claude Code

**Option A: Remote Server (Recommended)**
```bash
claude mcp add --transport http github https://api.githubcopilot.com/mcp -H "Authorization: Bearer YOUR_GITHUB_PAT"
```

**Option B: Docker Installation**
```bash
claude mcp add github -e GITHUB_PERSONAL_ACCESS_TOKEN=YOUR_GITHUB_PAT -- docker run -i --rm -e GITHUB_PERSONAL_ACCESS_TOKEN ghcr.io/github/github-mcp-server
```

**Option C: JSON Configuration**
```bash
claude mcp add-json github '{"command": "github-mcp-server", "args": ["stdio"], "env": {"GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT"}}'
```

### Step 3: Verify Installation
```bash
# List all MCP servers
claude mcp list

# Check GitHub server details
claude mcp get github

# In Claude Code, check status
/mcp
```

---

## ⚡ Zapier MCP Installation

### Prerequisites
- Zapier account (free tier works)
- Personal MCP URL from Zapier

### Step 1: Get Your Zapier MCP URL
1. Go to [mcp.zapier.com](https://mcp.zapier.com)
2. Sign in with your Zapier account
3. Copy your personal MCP URL (looks like: `https://mcp.zapier.com/api/mcp/[SECRET]/mcp`)

### Step 2: Install Zapier MCP in Claude Code
```bash
claude mcp add --transport http zapier https://mcp.zapier.com/api/mcp/[YOUR-SECRET]/mcp
```

Replace `[YOUR-SECRET]` with your actual secret from the URL.

### Step 3: Test Zapier Integration
In Claude Code:
```
"Connect my Google Sheets to Slack notifications"
"Create a Zap that monitors my email for invoices"
```

### Important Notes
- Each MCP call uses 2 Zapier tasks
- Works with 8,000+ apps
- Can create and modify Zaps programmatically

---

## 🔧 Make.com MCP Installation

### Prerequisites
- Make.com account (free tier available)
- MCP Token from Make profile

### Step 1: Get Your Make MCP Token
1. Log into Make.com
2. Go to your Profile settings
3. Navigate to MCP section
4. Generate or copy your MCP token
5. Note your organization zone (e.g., `eu2.make.com`)

### Step 2: Configure Claude Desktop

**For Claude Desktop App:**

1. Open Claude Desktop
2. Click hamburger menu → File → Settings
3. Go to Developer section
4. Click "Edit Config"
5. Open `claude_desktop_config.json`

**Add this configuration:**
```json
{
  "mcpServers": {
    "make": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://YOUR_ZONE.make.com/mcp/api/v1/u/YOUR_MCP_TOKEN/sse"
      ]
    }
  }
}
```

Replace:
- `YOUR_ZONE` with your Make zone (e.g., `eu2`)
- `YOUR_MCP_TOKEN` with your token from Make profile

### Step 3: Windows-Specific Fix
On Windows, use full path to npx:
```json
{
  "mcpServers": {
    "make": {
      "command": "C:\\Program Files\\nodejs\\npx.cmd",
      "args": [
        "-y",
        "mcp-remote",
        "https://YOUR_ZONE.make.com/mcp/api/v1/u/YOUR_MCP_TOKEN/sse"
      ]
    }
  }
}
```

### Step 4: Restart and Verify
1. Restart Claude Desktop
2. Look for MCP tools icon
3. Test with: "Create a Make scenario to sync data"

---

## 🔄 Using Multiple MCP Servers Together

You can install all three MCP servers simultaneously for maximum automation capability:

```json
{
  "mcpServers": {
    "github": {
      "command": "github-mcp-server",
      "args": ["stdio"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_GITHUB_PAT"
      }
    },
    "make": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://YOUR_ZONE.make.com/mcp/api/v1/u/YOUR_MCP_TOKEN/sse"
      ]
    }
  }
}
```

For Zapier, use the Claude Code CLI as it's HTTP-based.

---

## 🎮 Solution Architect Agent Integration

Once installed, the Solution Architect Agent can:

### With GitHub MCP
- Create GitHub Actions workflows automatically
- Set up repository structures
- Configure CI/CD pipelines
- Manage issues and PRs
- Analyze existing codebases

### With Zapier MCP
- Build multi-app automations
- Connect 8,000+ services
- Create complex workflows
- Set up triggers and actions
- Test automations in real-time

### With Make.com MCP
- Design visual workflows
- Create on-demand scenarios
- Set up webhooks
- Configure data transformations
- Build enterprise automations

---

## 🧪 Testing Your Setup

### Test GitHub MCP
```javascript
// In Claude Code
"Show me the latest commits in this repository"
"Create an issue for implementing user authentication"
"Set up a GitHub Action for daily backups"
```

### Test Zapier MCP
```javascript
// In Claude Code
"Create a Zap that saves Gmail attachments to Google Drive"
"Connect Stripe payments to a Google Sheet"
"Set up Slack notifications for new Trello cards"
```

### Test Make.com MCP
```javascript
// In Claude Code
"Create a Make scenario for data synchronization"
"Build a webhook that processes form submissions"
"Set up an automation for invoice processing"
```

---

## 🚨 Troubleshooting

### Common Issues

**"Cannot connect to MCP server"**
- Check your credentials/tokens
- Verify JSON syntax in config file
- Restart Claude Desktop/Code
- Check logs at:
  - macOS: `~/Library/Logs/Claude/`
  - Windows: `%APPDATA%\Claude\logs\`

**"MCP tools not showing"**
- Ensure config file is saved
- Restart application
- Check server status with `/mcp`

**Windows-specific issues**
- Use full path to npx.cmd
- Run as administrator if needed
- Check Node.js installation

### Debug Commands
```bash
# Check all MCP servers
claude mcp list

# Get specific server info
claude mcp get github
claude mcp get zapier
claude mcp get make

# View server logs
claude mcp logs github

# Remove a server
claude mcp remove github
```

---

## 📊 MCP Comparison

| Feature | GitHub MCP | Zapier MCP | Make.com MCP |
|---------|------------|------------|--------------|
| **Cost** | Free | 2 tasks/call | Free tier |
| **Apps** | GitHub only | 8,000+ | 1,500+ |
| **Setup** | Medium | Easy | Medium |
| **Use Case** | Code/Repos | General | Enterprise |
| **Best For** | Developers | Business | Complex flows |

---

## 🎯 Next Steps

1. **Install at least one MCP server** to enable real automation creation
2. **Test the Solution Architect Agent** with MCP-enabled capabilities
3. **Create your first automation** using the 4-phase approach
4. **Combine multiple MCPs** for powerful hybrid solutions

---

## 📚 Resources

- [GitHub MCP Documentation](https://github.com/github/github-mcp-server)
- [Zapier MCP Portal](https://mcp.zapier.com)
- [Make.com Developer Hub](https://developers.make.com/mcp-server)
- [Claude MCP Docs](https://docs.claude.com/en/docs/claude-code/mcp)

---

Built with Claude Code for the Solution Architect Agent ✨