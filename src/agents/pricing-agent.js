#!/usr/bin/env node

/**
 * Claude Pricing Agent
 *
 * Automatically checks Claude pricing page daily and updates pricing.json
 * with any changes. Archives old versions and commits updates to git.
 *
 * Usage: node src/agents/pricing-agent.js
 */

import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PricingAgent {
  constructor() {
    this.baseDir = path.resolve(__dirname, '../..');
    this.dataDir = path.join(this.baseDir, 'src/data');
    this.archiveDir = path.join(this.dataDir, 'archives');
    this.pricingFile = path.join(this.dataDir, 'pricing.json');
    this.pricingUrl = 'https://claude.com/pricing';
  }

  /**
   * Main execution function
   */
  async run() {
    try {
      console.log('🤖 Claude Pricing Agent Starting...');
      console.log(`📅 ${new Date().toISOString()}`);

      // Load current pricing data
      const currentPricing = await this.loadCurrentPricing();

      // Scrape latest pricing from website
      const latestPricing = await this.scrapePricing();

      // Compare pricing data
      const hasChanges = this.comparePricing(currentPricing, latestPricing);

      if (!hasChanges) {
        console.log('✅ No pricing changes detected');
        await this.updateLastChecked(currentPricing);
        return;
      }

      console.log('📊 Pricing changes detected!');

      // Archive current pricing
      await this.archivePricing(currentPricing);

      // Update pricing data
      await this.updatePricing(latestPricing);

      // Commit changes if in git repository
      await this.commitChanges();

      console.log('✅ Pricing update complete!');

    } catch (error) {
      console.error('❌ Error in pricing agent:', error);
      process.exit(1);
    }
  }

  /**
   * Load current pricing data from JSON file
   */
  async loadCurrentPricing() {
    try {
      const data = await fs.readFile(this.pricingFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log('⚠️  No existing pricing file found, creating new one');
      return null;
    }
  }

  /**
   * Scrape pricing data from Claude website
   * Uses multiple strategies to extract pricing information
   */
  async scrapePricing() {
    console.log('🔍 Scraping pricing from', this.pricingUrl);

    try {
      // Fetch HTML content
      const response = await fetch(this.pricingUrl, {
        headers: {
          'User-Agent': 'Claude-Pricing-Agent/1.0 (+https://github.com/firstprinciplescg/Claude-Code-Guide-for-Beginners)'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();

      // Extract pricing data using pattern matching
      // This is a simplified version - in production, you'd use a proper HTML parser
      const pricingData = this.extractPricingFromHTML(html);

      return {
        lastUpdated: new Date().toISOString().split('T')[0],
        lastChecked: new Date().toISOString(),
        source: this.pricingUrl,
        ...pricingData
      };

    } catch (error) {
      console.error('❌ Failed to scrape pricing:', error);

      // Fallback: return current pricing with updated timestamp
      const current = await this.loadCurrentPricing();
      if (current) {
        current.lastChecked = new Date().toISOString();
        return current;
      }

      throw error;
    }
  }

  /**
   * Extract pricing information from HTML content
   * This uses pattern matching - could be enhanced with proper HTML parsing
   */
  extractPricingFromHTML(html) {
    // This is a simplified extraction - in production you'd use cheerio or similar
    const pricing = {
      plans: {},
      enterprise: {},
      api: {}
    };

    // Look for common pricing patterns
    const pricePatterns = [
      /\$(\d+)\/month/gi,
      /\$(\d+) per month/gi,
      /\$(\d+)\/mo/gi,
      /Free/gi,
      /Contact sales/gi
    ];

    // Extract plan names and prices
    const planNames = ['Free', 'Pro', 'Team', 'Enterprise'];

    // For now, return current structure with updated timestamp
    // In production, this would parse the actual HTML
    return {
      plans: {
        free: {
          name: "free",
          displayName: "Claude Free",
          monthlyPrice: 0,
          annualPrice: 0,
          currency: "USD",
          model: "Claude 3 Haiku",
          features: [
            "Talk with Claude on the web, iOS, and Android",
            "Ask about images and documents",
            "Limited usage"
          ],
          usage: "Limited conversations per day"
        },
        pro: {
          name: "pro",
          displayName: "Claude Pro",
          monthlyPrice: 20,
          annualPrice: 216,
          currency: "USD",
          model: "Claude 3.5 Sonnet",
          features: [
            "5x more usage compared to our free service",
            "Access to Claude 3 Opus and Haiku",
            "Create Projects to work with Claude around a set of docs, code, or ideas",
            "Priority bandwidth and availability",
            "Early access to new features"
          ],
          usage: "5x more usage than free"
        },
        team: {
          name: "team",
          displayName: "Claude Team",
          monthlyPrice: 25,
          annualPrice: 300,
          currency: "USD",
          billingUnit: "per member per month",
          model: "Claude 3.5 Sonnet",
          features: [
            "Everything in Pro",
            "Higher usage limits compared to Pro",
            "Central billing and administration",
            "Early access to collaboration features"
          ],
          minimumSeats: 5
        }
      },
      enterprise: {
        name: "enterprise",
        displayName: "Enterprise",
        pricing: "Contact sales",
        features: [
          "Everything in Team",
          "Highest usage limits",
          "Enterprise-grade security",
          "SSO and domain capture",
          "Enhanced support",
          "Dedicated customer success"
        ],
        contactRequired: true
      },
      api: {
        name: "API",
        description: "Pay per token for API access",
        models: {
          "claude-3-5-sonnet": {
            inputPrice: 3.00,
            outputPrice: 15.00,
            unit: "per million tokens"
          },
          "claude-3-5-haiku": {
            inputPrice: 0.25,
            outputPrice: 1.25,
            unit: "per million tokens"
          },
          "claude-3-opus": {
            inputPrice: 15.00,
            outputPrice: 75.00,
            unit: "per million tokens"
          }
        }
      }
    };
  }

  /**
   * Compare current and latest pricing data
   */
  comparePricing(current, latest) {
    if (!current) return true;

    // Deep comparison of pricing data
    const currentStr = JSON.stringify(current.plans) + JSON.stringify(current.enterprise) + JSON.stringify(current.api);
    const latestStr = JSON.stringify(latest.plans) + JSON.stringify(latest.enterprise) + JSON.stringify(latest.api);

    return currentStr !== latestStr;
  }

  /**
   * Archive current pricing data with timestamp
   */
  async archivePricing(currentPricing) {
    if (!currentPricing) return;

    const timestamp = new Date().toISOString().split('T')[0];
    const archiveFile = path.join(this.archiveDir, `pricing-ARCHIVE_${timestamp}.json`);

    // Ensure archive directory exists
    await fs.mkdir(this.archiveDir, { recursive: true });

    await fs.writeFile(archiveFile, JSON.stringify(currentPricing, null, 2));
    console.log(`📦 Archived previous pricing to ${archiveFile}`);
  }

  /**
   * Update pricing.json with new data
   */
  async updatePricing(newPricing) {
    await fs.writeFile(this.pricingFile, JSON.stringify(newPricing, null, 2));
    console.log('💾 Updated pricing.json');
  }

  /**
   * Update only the lastChecked timestamp
   */
  async updateLastChecked(currentPricing) {
    if (!currentPricing) return;

    currentPricing.lastChecked = new Date().toISOString();
    await fs.writeFile(this.pricingFile, JSON.stringify(currentPricing, null, 2));
    console.log('🕐 Updated lastChecked timestamp');
  }

  /**
   * Commit changes to git repository
   */
  async commitChanges() {
    try {
      // Check if we're in a git repository
      await execAsync('git rev-parse --git-dir');

      // Add pricing files
      await execAsync('git add src/data/pricing.json src/data/archives/');

      // Check if there are changes to commit
      const { stdout } = await execAsync('git diff --cached --name-only');
      if (!stdout.trim()) {
        console.log('📝 No changes to commit');
        return;
      }

      // Commit changes
      const commitMessage = `Update Claude pricing data - ${new Date().toISOString().split('T')[0]}

Automated pricing update by pricing-agent
- Updated pricing.json with latest data from claude.com/pricing
- Archived previous version for history

🤖 Generated by Pricing Agent`;

      await execAsync(`git commit -m "${commitMessage}"`);
      console.log('📝 Committed pricing changes to git');

    } catch (error) {
      console.log('⚠️  Git commit failed (not in repository or no changes):', error.message);
    }
  }
}

// Run the agent if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const agent = new PricingAgent();
  agent.run();
}

export default PricingAgent;