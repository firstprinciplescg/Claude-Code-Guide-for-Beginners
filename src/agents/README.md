# Claude Pricing Agent

An automated system for monitoring and updating Claude pricing information with zero human intervention.

## 🤖 What It Does

The pricing agent:
- **Monitors** claude.ai/pricing daily at 9 AM UTC
- **Detects** changes in pricing plans, features, or models
- **Archives** previous versions with timestamps
- **Updates** pricing.json with new data
- **Commits** changes automatically to git
- **Creates** pull requests for review (optional auto-merge for minor changes)

## 📁 File Structure

```
src/
├── agents/
│   ├── pricing-agent.js       # Main agent logic
│   ├── pricing-scraper.js     # Web scraping utilities
│   ├── test-pricing.js        # Test infrastructure
│   └── README.md              # This file
├── data/
│   ├── pricing.json           # Current pricing data
│   └── archives/              # Historical versions
├── components/
│   └── PricingSection.jsx     # Dynamic pricing display
└── sections/
    └── CoreConcepts.jsx       # Includes pricing section
```

## 🚀 Usage

### Manual Testing
```bash
# Test infrastructure
node src/agents/test-pricing.js

# Run pricing agent manually
npm run pricing-agent

# Or directly
node src/agents/pricing-agent.js
```

### Automated Operation
The agent runs automatically via GitHub Actions:
- **Daily**: 9 AM UTC (5 AM EST)
- **Manual**: Trigger via GitHub Actions UI
- **Force Update**: Available via workflow input

## 📊 Data Structure

The `pricing.json` file contains:

```json
{
  "lastUpdated": "2025-01-23",
  "lastChecked": "2025-01-23T09:00:00Z",
  "source": "https://claude.ai/pricing",
  "plans": {
    "free": { /* plan details */ },
    "pro": { /* plan details */ },
    "team": { /* plan details */ }
  },
  "enterprise": { /* enterprise details */ },
  "api": {
    "models": { /* API pricing */ }
  }
}
```

## 🔧 How It Works

### 1. Change Detection
- Fetches current pricing from claude.ai/pricing
- Compares with existing pricing.json
- Uses multiple parsing strategies for reliability

### 2. Data Processing
- Extracts plan names, prices, features, models
- Validates data structure and reasonableness
- Falls back to current data if scraping fails

### 3. Update Process
- Archives current version with timestamp
- Updates pricing.json with new data
- Commits changes with descriptive message
- Creates PR if changes are significant

### 4. Integration
- React component reads from pricing.json
- Displays "Accurate as of" timestamp
- Updates automatically when data changes

## 🛡️ Safety Features

### Fallback Mechanisms
- Multiple parsing strategies
- Graceful degradation if scraping fails
- Validation before updating data
- Archive creation before changes

### Review Process
- Creates PRs for human review
- Auto-merge only for minor changes
- Manual approval for major price changes
- Health check warnings for stale data

## 📈 Monitoring

### GitHub Actions Logs
- View execution results in Actions tab
- Check for parsing errors or failures
- Monitor change detection accuracy

### Weekly Health Check
- Validates pricing.json integrity
- Warns if data is more than 7 days old
- Checks JSON structure and required fields

## 🔧 Configuration

### Environment Variables
- `FORCE_UPDATE`: Force update even if no changes
- `GH_TOKEN`: GitHub token for PR creation

### Customization
- Modify parsing patterns in `pricing-scraper.js`
- Adjust schedule in `.github/workflows/pricing-agent.yml`
- Update data structure in `pricing.json`

## 🚨 Troubleshooting

### Agent Not Running
1. Check GitHub Actions logs
2. Verify cron schedule
3. Ensure repository permissions

### Parsing Failures
1. Check if claude.ai/pricing structure changed
2. Update parsing patterns
3. Test with `npm run pricing-test`

### Missing Data
1. Verify pricing.json exists
2. Check for JSON syntax errors
3. Run infrastructure test

## 🎯 Future Enhancements

- **Email notifications** for pricing changes
- **Slack integration** for team updates
- **Historical analysis** of pricing trends
- **API pricing monitoring** for developers
- **Multi-language support** for international pricing

## 📝 Manual Override

If needed, you can manually update pricing:

```bash
# Edit pricing.json directly
nano src/data/pricing.json

# Update timestamp
node -e "
const fs = require('fs/promises');
(async () => {
  const data = JSON.parse(await fs.readFile('src/data/pricing.json', 'utf8'));
  data.lastUpdated = new Date().toISOString().split('T')[0];
  data.lastChecked = new Date().toISOString();
  await fs.writeFile('src/data/pricing.json', JSON.stringify(data, null, 2));
})();
"

# Commit changes
git add src/data/pricing.json
git commit -m "Manual pricing update"
```

---

**Built with Claude Code** | Zero human intervention required ✨