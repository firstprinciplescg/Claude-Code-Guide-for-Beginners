/**
 * Advanced HTML parser for Claude pricing page
 * Uses multiple strategies to extract pricing information reliably
 */

import fetch from 'node-fetch';

export class PricingScraper {
  constructor() {
    this.pricingUrl = 'https://claude.com/pricing';
    this.userAgent = 'Claude-Pricing-Agent/1.0 (+https://github.com/firstprinciplescg/Claude-Code-Guide-for-Beginners)';
  }

  /**
   * Main scraping function with fallback strategies
   */
  async scrapePricing() {
    try {
      console.log('🔍 Fetching pricing page...');

      const response = await fetch(this.pricingUrl, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
          'Accept-Encoding': 'gzip, deflate',
          'Cache-Control': 'no-cache'
        },
        timeout: 30000
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const html = await response.text();
      console.log(`📄 Received ${html.length} characters of HTML`);

      // Try multiple parsing strategies
      const strategies = [
        this.parseWithRegex.bind(this),
        this.parseWithTextSearch.bind(this),
        this.parseWithPatternMatching.bind(this)
      ];

      for (const strategy of strategies) {
        try {
          const result = strategy(html);
          if (result && this.validatePricingData(result)) {
            console.log('✅ Successfully parsed pricing data');
            return result;
          }
        } catch (error) {
          console.log(`⚠️  Strategy failed: ${error.message}`);
        }
      }

      // If all strategies fail, return current structure
      console.log('⚠️  All parsing strategies failed, using fallback data');
      return this.getFallbackPricing();

    } catch (error) {
      console.error('❌ Scraping failed:', error);
      return this.getFallbackPricing();
    }
  }

  /**
   * Parse pricing using regex patterns
   */
  parseWithRegex(html) {
    const pricing = {
      plans: {},
      enterprise: {},
      api: {}
    };

    // Common price patterns
    const pricePatterns = {
      monthly: /\$(\d+)(?:\.\d{2})?[\s\/]*(?:per\s+)?month/gi,
      annual: /\$(\d+)(?:\.\d{2})?[\s\/]*(?:per\s+)?year/gi,
      free: /free/gi,
      contactSales: /contact\s+sales/gi
    };

    // Extract plan information
    const planSections = this.extractPlanSections(html);

    for (const [planName, section] of Object.entries(planSections)) {
      const plan = this.parsePlanSection(section, planName);
      if (plan) {
        pricing.plans[planName.toLowerCase()] = plan;
      }
    }

    return pricing;
  }

  /**
   * Parse using text search patterns
   */
  parseWithTextSearch(html) {
    // Remove HTML tags and normalize whitespace
    const text = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').toLowerCase();

    const pricing = {
      plans: {},
      enterprise: {},
      api: {}
    };

    // Look for pricing keywords and surrounding context
    const keywords = ['free', 'pro', 'team', 'enterprise', '$20', '$25', 'month', 'contact sales'];

    for (const keyword of keywords) {
      const index = text.indexOf(keyword);
      if (index !== -1) {
        // Extract context around keyword
        const start = Math.max(0, index - 200);
        const end = Math.min(text.length, index + 200);
        const context = text.substring(start, end);

        // Parse context for pricing information
        this.extractPricingFromContext(context, pricing);
      }
    }

    return pricing;
  }

  /**
   * Parse using pattern matching
   */
  parseWithPatternMatching(html) {
    const patterns = {
      plans: /"plans?":\s*\[([^\]]+)\]/gi,
      pricing: /"price":\s*"?(\d+)"?/gi,
      features: /"features?":\s*\[([^\]]+)\]/gi,
      models: /"model":\s*"([^"]+)"/gi
    };

    const pricing = { plans: {}, enterprise: {}, api: {} };

    // Try to find JSON-like structures in the HTML
    for (const [key, pattern] of Object.entries(patterns)) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        // Process matches
        console.log(`Found ${key} pattern:`, match[1]);
      }
    }

    return pricing;
  }

  /**
   * Extract plan sections from HTML
   */
  extractPlanSections(html) {
    const sections = {};

    // Look for common plan container patterns
    const planPatterns = [
      /<div[^>]*class="[^"]*plan[^"]*"[^>]*>(.*?)<\/div>/gis,
      /<section[^>]*class="[^"]*pricing[^"]*"[^>]*>(.*?)<\/section>/gis,
      /<article[^>]*class="[^"]*card[^"]*"[^>]*>(.*?)<\/article>/gis
    ];

    for (const pattern of planPatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        const content = match[1];
        const planName = this.identifyPlanName(content);
        if (planName) {
          sections[planName] = content;
        }
      }
    }

    return sections;
  }

  /**
   * Identify plan name from content
   */
  identifyPlanName(content) {
    const text = content.toLowerCase();

    if (text.includes('free')) return 'Free';
    if (text.includes('pro') && !text.includes('team')) return 'Pro';
    if (text.includes('team')) return 'Team';
    if (text.includes('enterprise')) return 'Enterprise';

    return null;
  }

  /**
   * Parse individual plan section
   */
  parsePlanSection(section, planName) {
    const text = section.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

    // Extract price
    const priceMatch = text.match(/\$(\d+)(?:\.(\d{2}))?/);
    const price = priceMatch ? parseInt(priceMatch[1]) : 0;

    // Extract features
    const features = this.extractFeatures(section);

    return {
      name: planName.toLowerCase(),
      displayName: planName,
      monthlyPrice: price,
      annualPrice: this.calculateAnnualPrice(price),
      currency: 'USD',
      features: features,
      usage: this.extractUsage(text)
    };
  }

  /**
   * Extract features from HTML section
   */
  extractFeatures(section) {
    const features = [];

    // Look for list items or bullet points
    const listPatterns = [
      /<li[^>]*>(.*?)<\/li>/gis,
      /<p[^>]*>(?:•|✓|✔)[^<]*(.*?)<\/p>/gis,
      /(?:•|✓|✔)\s*([^\n\r•✓✔]+)/gi
    ];

    for (const pattern of listPatterns) {
      let match;
      while ((match = pattern.exec(section)) !== null) {
        const feature = match[1].replace(/<[^>]*>/g, '').trim();
        if (feature && feature.length > 3) {
          features.push(feature);
        }
      }
    }

    return features.slice(0, 5); // Limit to 5 features
  }

  /**
   * Extract usage information
   */
  extractUsage(text) {
    const usagePatterns = [
      /(\d+x?\s*more\s+usage)/i,
      /(limited\s+usage)/i,
      /(unlimited\s+usage)/i,
      /(\d+\s+messages?\s+per\s+day)/i
    ];

    for (const pattern of usagePatterns) {
      const match = text.match(pattern);
      if (match) {
        return match[1];
      }
    }

    return 'Standard usage';
  }

  /**
   * Calculate annual price from monthly
   */
  calculateAnnualPrice(monthlyPrice) {
    if (monthlyPrice === 0) return 0;
    // Most services offer ~10% discount for annual
    return Math.round(monthlyPrice * 12 * 0.9);
  }

  /**
   * Extract pricing from context
   */
  extractPricingFromContext(context, pricing) {
    // Implementation for context-based extraction
    // This would analyze the surrounding text for pricing clues
  }

  /**
   * Validate that pricing data is reasonable
   */
  validatePricingData(pricing) {
    if (!pricing || typeof pricing !== 'object') return false;
    if (!pricing.plans || typeof pricing.plans !== 'object') return false;

    // Check that we have at least free and pro plans
    const hasBasicPlans = pricing.plans.free || pricing.plans.pro;

    return hasBasicPlans;
  }

  /**
   * Fallback pricing structure when scraping fails
   */
  getFallbackPricing() {
    console.log('📋 Using fallback pricing structure');

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
        }
      },
      enterprise: {
        name: "enterprise",
        displayName: "Enterprise",
        pricing: "Contact sales",
        contactRequired: true
      },
      api: {
        name: "API",
        description: "Pay per token for API access"
      }
    };
  }
}

export default PricingScraper;