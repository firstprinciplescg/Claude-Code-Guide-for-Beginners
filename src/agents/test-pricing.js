#!/usr/bin/env node

/**
 * Simple test for pricing agent functionality
 */

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function testPricingAgent() {
  console.log('🤖 Testing Pricing Agent Components...')

  try {
    // Test 1: Check if pricing.json exists and is valid
    const pricingFile = path.join(__dirname, '../data/pricing.json')
    console.log('📁 Checking pricing file:', pricingFile)

    const data = await fs.readFile(pricingFile, 'utf8')
    const pricing = JSON.parse(data)

    console.log('✅ pricing.json loaded successfully')
    console.log('📊 Current pricing structure:')
    console.log('  - Plans:', Object.keys(pricing.plans || {}))
    console.log('  - Last updated:', pricing.lastUpdated)
    console.log('  - Last checked:', pricing.lastChecked)

    // Test 2: Update last checked timestamp
    pricing.lastChecked = new Date().toISOString()
    await fs.writeFile(pricingFile, JSON.stringify(pricing, null, 2))
    console.log('✅ Updated lastChecked timestamp')

    // Test 3: Create test archive
    const archiveDir = path.join(__dirname, '../data/archives')
    await fs.mkdir(archiveDir, { recursive: true })

    const timestamp = new Date().toISOString().split('T')[0]
    const archiveFile = path.join(archiveDir, `pricing-TEST_${timestamp}.json`)
    await fs.writeFile(archiveFile, JSON.stringify(pricing, null, 2))
    console.log('✅ Created test archive:', path.basename(archiveFile))

    console.log('🎉 All tests passed! Pricing agent infrastructure is working.')

  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testPricingAgent()