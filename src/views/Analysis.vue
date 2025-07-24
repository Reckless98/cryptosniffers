<template>
  <div class="space-y-8">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Market Analysis</h1>
      <p class="text-gray-600 dark:text-gray-400">AI-powered insights and investment recommendations</p>
    </div>

    <!-- Market Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Market Sentiment</h3>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-yellow-600 font-medium">Neutral</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Fear & Greed Index</span>
              <span class="font-semibold">54/100</span>
            </div>
            <div class="w-full bg-gray-200 dark:bg-dark-600 rounded-full h-2">
              <div class="bg-yellow-500 h-2 rounded-full" style="width: 54%"></div>
            </div>
            <p class="text-xs text-gray-500">Market shows balanced sentiment with slight optimism</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Technical Outlook</h3>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-green-600 font-medium">Bullish</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Trend Strength</span>
              <span class="font-semibold text-green-500">Strong</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Support Level</span>
              <span class="font-semibold">$41,200</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Resistance</span>
              <span class="font-semibold">$45,800</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
            <div class="flex items-center space-x-1">
              <div class="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <span class="text-sm text-orange-600 font-medium">Medium</span>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Volatility (30d)</span>
              <span class="font-semibold">3.2%</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 dark:text-gray-400">Correlation Risk</span>
              <span class="font-semibold text-orange-500">Moderate</span>
            </div>
            <p class="text-xs text-gray-500">Standard risk levels for crypto markets</p>
          </div>
        </div>
      </div>
    </div>

    <!-- AI Recommendations -->
    <div class="card">
      <div class="card-header">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold flex items-center">
            <svg class="w-6 h-6 mr-2 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            AI Investment Recommendations
          </h2>
          <span class="text-sm text-gray-500">Updated {{ new Date().toLocaleTimeString() }}</span>
        </div>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Strong Buy -->
          <div class="border-l-4 border-green-500 bg-green-50 dark:bg-green-900/20 p-4 rounded-r-lg">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-green-800 dark:text-green-400">Strong Buy</h3>
              <span class="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-1 rounded">
                Score: 88/100
              </span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <img src="https://assets.coingecko.com/coins/images/4128/large/solana.png" alt="Solana" class="w-6 h-6 rounded-full">
                <div>
                  <div class="font-medium text-sm">Solana (SOL)</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">$98.67</div>
                </div>
              </div>
              <p class="text-sm text-green-700 dark:text-green-300">
                Strong technical momentum with high volume. Breaking key resistance levels.
              </p>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-green-600">Expected: +15-25%</span>
                <span class="text-xs text-gray-500">30d target</span>
              </div>
            </div>
          </div>

          <!-- Buy -->
          <div class="border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-r-lg">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-blue-800 dark:text-blue-400">Buy</h3>
              <span class="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
                Score: 72/100
              </span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png" alt="Ethereum" class="w-6 h-6 rounded-full">
                <div>
                  <div class="font-medium text-sm">Ethereum (ETH)</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">$2,580.75</div>
                </div>
              </div>
              <p class="text-sm text-blue-700 dark:text-blue-300">
                Solid fundamentals with upcoming network upgrades. Good long-term value.
              </p>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-blue-600">Expected: +8-15%</span>
                <span class="text-xs text-gray-500">30d target</span>
              </div>
            </div>
          </div>

          <!-- Hold/Watch -->
          <div class="border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-r-lg">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-semibold text-yellow-800 dark:text-yellow-400">Hold/Watch</h3>
              <span class="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 px-2 py-1 rounded">
                Score: 58/100
              </span>
            </div>
            <div class="space-y-3">
              <div class="flex items-center space-x-2">
                <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png" alt="Bitcoin" class="w-6 h-6 rounded-full">
                <div>
                  <div class="font-medium text-sm">Bitcoin (BTC)</div>
                  <div class="text-xs text-gray-600 dark:text-gray-400">$42,350.25</div>
                </div>
              </div>
              <p class="text-sm text-yellow-700 dark:text-yellow-300">
                Consolidating near resistance. Wait for clear directional break.
              </p>
              <div class="flex items-center space-x-2">
                <span class="text-xs text-yellow-600">Expected: -5% to +10%</span>
                <span class="text-xs text-gray-500">30d range</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Performers -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-bold text-green-600">Top Performers (24h)</h2>
        </div>
        <div class="card-content">
          <div class="space-y-4">
            <div v-for="(crypto, index) in topPerformers" :key="crypto.id" class="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-500">{{ index + 1 }}</span>
                <img :src="crypto.image" :alt="crypto.name" class="w-8 h-8 rounded-full">
                <div>
                  <div class="font-semibold text-sm">{{ crypto.name }}</div>
                  <div class="text-xs text-gray-500 uppercase">{{ crypto.symbol }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold text-green-600">+{{ crypto.change }}%</div>
                <div class="text-xs text-gray-500">${{ crypto.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-bold text-red-600">Biggest Losers (24h)</h2>
        </div>
        <div class="card-content">
          <div class="space-y-4">
            <div v-for="(crypto, index) in topLosers" :key="crypto.id" class="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div class="flex items-center space-x-3">
                <span class="text-sm font-medium text-gray-500">{{ index + 1 }}</span>
                <img :src="crypto.image" :alt="crypto.name" class="w-8 h-8 rounded-full">
                <div>
                  <div class="font-semibold text-sm">{{ crypto.name }}</div>
                  <div class="text-xs text-gray-500 uppercase">{{ crypto.symbol }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold text-red-600">{{ crypto.change }}%</div>
                <div class="text-xs text-gray-500">${{ crypto.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Market Trends -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Market Trends & Insights</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div class="text-center">
            <div class="w-16 h-16 bg-crypto-100 dark:bg-crypto-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">DeFi Revival</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              DeFi tokens showing strong momentum with increased TVL across major protocols.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Institutional Interest</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Major institutions continue accumulating Bitcoin and Ethereum positions.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Layer 2 Growth</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Polygon, Arbitrum, and Optimism seeing increased adoption and transaction volumes.
            </p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg class="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Stablecoin Flows</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              USDC and USDT inflows suggest preparation for market re-entry by traders.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Analysis Tools -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Advanced Analysis Tools</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-crypto-500 transition-colors cursor-pointer">
            <svg class="w-12 h-12 text-crypto-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Technical Scanner</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Scan 1000+ cryptocurrencies for technical patterns and signals.
            </p>
          </div>

          <div class="text-center p-6 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-crypto-500 transition-colors cursor-pointer">
            <svg class="w-12 h-12 text-crypto-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Portfolio Optimizer</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              AI-powered recommendations for optimal portfolio allocation.
            </p>
          </div>

          <div class="text-center p-6 border border-gray-200 dark:border-dark-600 rounded-lg hover:border-crypto-500 transition-colors cursor-pointer">
            <svg class="w-12 h-12 text-crypto-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Risk Calculator</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Calculate risk metrics and position sizing for your investments.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Analysis',
  setup() {
    // Mock data for top performers and losers
    const topPerformers = ref([
      {
        id: 'solana',
        name: 'Solana',
        symbol: 'SOL',
        image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
        change: 12.45,
        price: '98.67'
      },
      {
        id: 'polygon',
        name: 'Polygon',
        symbol: 'MATIC',
        image: 'https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png',
        change: 8.32,
        price: '0.85'
      },
      {
        id: 'chainlink',
        name: 'Chainlink',
        symbol: 'LINK',
        image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png',
        change: 6.78,
        price: '14.25'
      }
    ])

    const topLosers = ref([
      {
        id: 'ripple',
        name: 'XRP',
        symbol: 'XRP',
        image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png',
        change: -5.23,
        price: '0.62'
      },
      {
        id: 'cardano',
        name: 'Cardano',
        symbol: 'ADA',
        image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png',
        change: -3.45,
        price: '0.45'
      },
      {
        id: 'dogecoin',
        name: 'Dogecoin',
        symbol: 'DOGE',
        image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png',
        change: -2.89,
        price: '0.08'
      }
    ])

    return {
      topPerformers,
      topLosers
    }
  }
})
</script>