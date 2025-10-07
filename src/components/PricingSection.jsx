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
          Choose the plan that's right for you. All plans include access to Claude's advanced AI capabilities.
        </p>

        {/* Pricing Disclaimer */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-4">
          <p className="text-sm text-amber-900 dark:text-amber-100">
            <strong>Note:</strong> Pricing information is subject to change. For the most current and detailed pricing, including all tiers and features, please visit{' '}
            <a
              href="https://claude.com/pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-700 dark:text-amber-300 hover:underline font-medium"
            >
              claude.com/pricing
            </a>
            .
          </p>
        </div>

        {lastUpdated && (
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-500">
            <span>Accurate as of:</span>
            <Badge variant="outline" className="text-xs">
              {formatLastUpdated(lastUpdated)}
            </Badge>
          </div>
        )}
      </div>

      {/* Main Plans Grid */}
      {plans && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(plans).map(([key, plan]) => {
            const Icon = getPlanIcon(key)
            const isPopular = key === 'pro'

            return (
              <Card key={key} className={`relative ${isPopular ? 'border-blue-500 shadow-lg scale-105' : ''}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white">Most Popular</Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-2">
                    <div className={`p-3 rounded-full ${isPopular ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-800'}`}>
                      <Icon className={`w-6 h-6 ${isPopular ? 'text-blue-600' : 'text-gray-600 dark:text-gray-400'}`} />
                    </div>
                  </div>

                  <CardTitle className="text-xl">{plan.displayName}</CardTitle>

                  <div className="mt-4">
                    {plan.monthlyPrice === 0 ? (
                      <div className="text-3xl font-bold">Free</div>
                    ) : plan.tiers ? (
                      <div>
                        <span className="text-3xl font-bold">
                          ${plan.monthlyPrice}
                          {Object.keys(plan.tiers).length > 1 && ` - $${Math.max(...Object.values(plan.tiers).map(t => t.monthlyPrice))}`}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                        {plan.billingUnit && (
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {plan.billingUnit}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <span className="text-3xl font-bold">${plan.monthlyPrice}</span>
                        <span className="text-gray-600 dark:text-gray-400">/month</span>
                        {plan.billingUnit && (
                          <div className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                            {plan.billingUnit}
                          </div>
                        )}
                      </div>
                    )}

                    {plan.annualPrice && plan.annualPrice !== plan.monthlyPrice * 12 && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ${plan.annualPrice}/year (save ${(plan.monthlyPrice * 12) - plan.annualPrice})
                      </div>
                    )}
                  </div>

                  {plan.minimumSeats && (
                    <div className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                      Minimum {plan.minimumSeats} seats
                    </div>
                  )}
                </CardHeader>

                <CardContent>
                  {plan.usage && (
                    <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {plan.usage}
                      </p>
                    </div>
                  )}

                  {plan.features && plan.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <Button
                    className="w-full"
                    variant={isPopular ? "default" : "outline"}
                    onClick={() => window.open('https://claude.ai/', '_blank')}
                  >
                    {plan.monthlyPrice === 0 ? 'Get Started' : 'Choose Plan'}
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Enterprise Plan */}
      {enterprise && (
        <Card className="mb-8 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl">{enterprise.displayName}</CardTitle>
                <CardDescription>For large organizations with advanced needs</CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-2xl font-bold text-purple-600 mb-4">
                  {enterprise.pricing}
                </div>

                {enterprise.features && (
                  <ul className="space-y-2">
                    {enterprise.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center justify-center">
                <Button
                  size="lg"
                  onClick={() => window.open('https://claude.ai/contact', '_blank')}
                >
                  Contact Sales
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
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
          Pricing data automatically updated from{' '}
          <a
            href="https://claude.ai/pricing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            claude.ai/pricing
          </a>
          {' • '}
          Last checked: {pricingData?.lastChecked ? formatLastUpdated(pricingData.lastChecked) : 'Unknown'}
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