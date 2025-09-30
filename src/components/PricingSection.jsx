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
      // In development, load from public folder
      // In production, this would be bundled or served from API
      const response = await fetch('/src/data/pricing.json')
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
      {api && api.models && (
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
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Model</th>
                    <th className="text-right py-2">Input</th>
                    <th className="text-right py-2">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(api.models).map(([modelName, model]) => (
                    <tr key={modelName} className="border-b border-gray-100 dark:border-gray-800">
                      <td className="py-3 font-medium">{modelName}</td>
                      <td className="text-right py-3">${model.inputPrice}</td>
                      <td className="text-right py-3">${model.outputPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                All prices {api.models[Object.keys(api.models)[0]]?.unit || 'per million tokens'}
              </p>
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
    lastUpdated: "2025-01-23",
    lastChecked: new Date().toISOString(),
    plans: {
      free: {
        name: "free",
        displayName: "Claude Free",
        monthlyPrice: 0,
        annualPrice: 0,
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
      displayName: "Enterprise",
      pricing: "Contact sales",
      features: [
        "Everything in Team",
        "Highest usage limits",
        "Enterprise-grade security",
        "Enhanced support"
      ]
    },
    api: {
      name: "API",
      description: "Pay per token for API access",
      models: {
        "claude-3-5-sonnet": {
          inputPrice: 3.00,
          outputPrice: 15.00,
          unit: "per million tokens"
        }
      }
    }
  }
}

export default PricingSection