import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Check, ExternalLink, Zap, Users, Building, Code } from 'lucide-react'

/**
 * Dynamic pricing section that reads from pricing.json
 * Updates automatically when pricing agent detects changes
 */
const PricingSection = ({ className = "" }) => {
  const [pricingData, setPricingData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadPricingData()
  }, [])

  const loadPricingData = async () => {
    try {
      // Load from public folder - works in both dev and production
      const response = await fetch('/pricing.json')
      if (!response.ok) {
        throw new Error('Failed to load pricing data')
      }
      const data = await response.json()
      setPricingData(data)
    } catch (err) {
      console.error('Error loading pricing data:', err)
      setError(err.message)
      // Fallback to embedded data
      setPricingData(getFallbackPricingData())
    } finally {
      setLoading(false)
    }
  }

  const formatLastUpdated = (dateString) => {
    if (!dateString) return 'Unknown'

    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  const getPlanIcon = (planName) => {
    const icons = {
      free: Zap,
      pro: Users,
      max: Zap,
      team: Building,
      enterprise: Building
    }
    return icons[planName] || Code
  }

  if (loading) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Loading pricing information...</p>
        </div>
      </div>
    )
  }

  if (error && !pricingData) {
    return (
      <div className={`${className}`}>
        <div className="text-center py-8">
          <p className="text-red-600 dark:text-red-400">Error loading pricing data: {error}</p>
        </div>
      </div>
    )
  }

  const { plans, enterprise, api, lastUpdated } = pricingData

  return (
    <section className={`${className}`} data-section="pricing">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Claude Pricing
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
          Understanding the costs and features of Claude's main subscription tiers for individual users.
        </p>

        {/* Pricing Disclaimer */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            <strong>Reference Only:</strong> This pricing information is provided for reference. For complete details, team plans, and enterprise options, visit{' '}
            <a
              href="https://claude.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 dark:text-blue-300 hover:underline font-medium"
            >
              claude.com/pricing
            </a>
            .
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500 mb-4">
            <span>Accurate as of:</span>
            <Badge variant="outline" className="text-xs">
              {formatLastUpdated(lastUpdated)}
            </Badge>
          </div>
        )}
      </div>

      {/* Individual Plans Grid */}
      {plans && (
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(plans)
            .filter(([key]) => ['free', 'pro', 'max'].includes(key))
            .map(([key, plan]) => {
              const Icon = getPlanIcon(key)

              return (
                <Card key={key} className="border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </div>
                      <CardTitle className="text-xl">{plan.displayName}</CardTitle>
                    </div>

                    <div className="mt-2">
                      {plan.monthlyPrice === 0 ? (
                        <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Free</div>
                      ) : plan.tiers ? (
                        <div>
                          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                            From ${plan.monthlyPrice}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                      ) : (
                        <div>
                          <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">${plan.monthlyPrice}</span>
                          <span className="text-gray-600 dark:text-gray-400">/month</span>
                        </div>
                      )}

                      {plan.annualPrice && plan.annualPrice > 0 && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          ${plan.annualPrice}/year when billed annually
                        </div>
                      )}
                    </div>

                    {plan.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        {plan.description}
                      </p>
                    )}
                  </CardHeader>

                  <CardContent>
                    {plan.features && plan.features.length > 0 && (
                      <ul className="space-y-2">
                        {plan.features.slice(0, 6).map((feature, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              )
            })}

          {/* Team and Enterprise Card */}
          <Card className="border border-gray-200 dark:border-gray-700">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Building className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <CardTitle className="text-xl">Team & Enterprise</CardTitle>
              </div>

              <div className="mt-2">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">From $25</span>
                  <span className="text-gray-600 dark:text-gray-400">/person/month</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                For teams and organizations
              </p>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Team collaboration features</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Central billing and administration</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Enterprise security options</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-green-600 dark:text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">SSO and compliance features</span>
                </li>
              </ul>

              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <a
                  href="https://claude.com/pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  See full Team & Enterprise details →
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* API Pricing */}
      {api && (
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900">
                <Code className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{api.name} Pricing</CardTitle>
                <CardDescription>{api.description}</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-4">
              {/* Simplified Model Overview */}
              {api.models && (
                <div className="grid md:grid-cols-3 gap-4">
                  {Object.entries(api.models).map(([modelKey, model]) => {
                    // Handle both simple and tiered pricing
                    const inputPriceDisplay = model.pricing === 'tiered' && model.tiers
                      ? `$${model.tiers.small.inputPrice}-${model.tiers.large.inputPrice}`
                      : `$${model.inputPrice}`;
                    const outputPriceDisplay = model.pricing === 'tiered' && model.tiers
                      ? `$${model.tiers.small.outputPrice}-${model.tiers.large.outputPrice}`
                      : `$${model.outputPrice}`;

                    return (
                      <div key={modelKey} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                          {model.displayName}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                          {model.description}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Input:</span>
                            <span className="font-medium">{inputPriceDisplay}/MTok</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-400">Output:</span>
                            <span className="font-medium">{outputPriceDisplay}/MTok</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Additional API Features Note */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Additional Features:</strong> Prompt caching, batch processing (50% discount), web search, and code execution available.{' '}
                  <a
                    href="https://claude.com/pricing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 dark:text-blue-300 hover:underline font-medium"
                  >
                    See full API pricing details →
                  </a>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Data Source Attribution */}
      <div className="mt-6 text-center text-xs text-gray-500 dark:text-gray-500">
        <p>
          Information sourced from{' '}
          <a
            href="https://claude.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            claude.com/pricing
          </a>
          {lastUpdated && (
            <>
              {' • '}
              Updated: {formatLastUpdated(lastUpdated)}
            </>
          )}
        </p>
      </div>
    </section>
  )
}

/**
 * Fallback pricing data when dynamic loading fails
 */
function getFallbackPricingData() {
  return {
    lastUpdated: "2025-10-07",
    lastChecked: new Date().toISOString(),
    notice: "Pricing subject to change. Visit claude.com/pricing for the most current information.",
    plans: {
      free: {
        name: "free",
        displayName: "Claude Free",
        monthlyPrice: 0,
        annualPrice: 0,
        features: [
          "Chat on web, iOS, Android, and on your desktop",
          "Generate code and visualize data",
          "Analyze text and images"
        ],
        usage: "Limited conversations per day"
      },
      pro: {
        name: "pro",
        displayName: "Claude Pro",
        monthlyPrice: 20,
        annualPrice: 200,
        features: [
          "More usage*",
          "Access Claude Code directly in your terminal",
          "Access to unlimited projects",
          "Access to Research"
        ],
        usage: "More usage than free"
      },
      max: {
        name: "max",
        displayName: "Claude Max",
        monthlyPrice: 100,
        features: [
          "5x or 20x more usage than Pro*",
          "Higher output limits",
          "Early access to features"
        ],
        usage: "5x or 20x more usage than Pro"
      }
    },
    enterprise: {
      displayName: "Enterprise",
      pricing: "Contact sales",
      features: [
        "Everything in Team, plus:",
        "More usage*",
        "Enhanced context window",
        "Enterprise-grade security"
      ]
    },
    api: {
      name: "API",
      description: "Pay-as-you-go pricing per million tokens",
      models: {
        "opus-4.1": {
          displayName: "Opus 4.1",
          description: "Powerful model for complex tasks",
          inputPrice: 15,
          outputPrice: 75,
          unit: "per million tokens"
        },
        "sonnet-4.5": {
          displayName: "Sonnet 4.5",
          description: "Most intelligent model",
          pricing: "tiered",
          tiers: {
            small: { inputPrice: 3, outputPrice: 15 },
            large: { inputPrice: 6, outputPrice: 22.50 }
          },
          unit: "per million tokens"
        },
        "haiku-3.5": {
          displayName: "Haiku 3.5",
          description: "Fastest, most cost-effective",
          inputPrice: 0.80,
          outputPrice: 4,
          unit: "per million tokens"
        }
      }
    }
  }
}

export default PricingSection