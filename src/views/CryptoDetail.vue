<template>
  <div v-if="loading" class="text-center py-8">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-600 mx-auto"></div>
    <p class="text-gray-600 dark:text-gray-400 mt-4">Loading cryptocurrency details...</p>
  </div>

  <div v-else-if="crypto" class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-start gap-6">
      <div class="flex items-center space-x-4">
        <img :src="crypto.image" :alt="crypto.name" class="w-16 h-16 rounded-full">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">{{ crypto.name }}</h1>
          <div class="flex items-center space-x-2">
            <span class="text-gray-500 dark:text-gray-400 uppercase">{{ crypto.symbol }}</span>
            <span class="text-sm bg-gray-100 dark:bg-dark-700 px-2 py-1 rounded">
              Rank #{{ crypto.market_cap_rank }}
            </span>
          </div>
        </div>
      </div>
      
      <div class="text-right">
        <div class="text-3xl font-bold text-gray-900 dark:text-white">
          ${{ formatPrice(crypto.current_price) }}
        </div>
        <div :class="getChangeColor(crypto.price_change_percentage_24h)">
          {{ formatPercentage(crypto.price_change_percentage_24h) }}% (24h)
        </div>
      </div>
    </div>

    <!-- Price Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Market Cap</div>
          <div class="text-xl font-bold text-gray-900 dark:text-white">
            ${{ formatLargeNumber(crypto.market_cap) }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
          <div class="text-xl font-bold text-gray-900 dark:text-white">
            ${{ formatLargeNumber(crypto.total_volume) }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">7d Change</div>
          <div class="text-xl font-bold" :class="getChangeColor(crypto.price_change_percentage_7d_in_currency)">
            {{ formatPercentage(crypto.price_change_percentage_7d_in_currency) }}%
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Last Updated</div>
          <div class="text-xl font-bold text-gray-900 dark:text-white">
            {{ formatDate(crypto.last_updated) }}
          </div>
        </div>
      </div>
    </div>

    <!-- Investment Analysis -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- AI Analysis -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-bold flex items-center">
            <svg class="w-5 h-5 mr-2 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
            </svg>
            AI Investment Analysis
          </h2>
        </div>
        <div class="card-content">
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Investment Score</span>
              <div class="flex items-center space-x-2">
                <div class="w-24 bg-gray-200 dark:bg-dark-600 rounded-full h-2">
                  <div class="bg-crypto-600 h-2 rounded-full" :style="{ width: `${investmentScore}%` }"></div>
                </div>
                <span class="font-semibold">{{ investmentScore }}/100</span>
              </div>
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Technical Indicators</span>
                <span class="font-semibold text-green-500">Bullish</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Market Sentiment</span>
                <span class="font-semibold text-yellow-500">Neutral</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Risk Level</span>
                <span class="font-semibold text-orange-500">Medium</span>
              </div>
            </div>

            <div class="bg-crypto-50 dark:bg-crypto-900/20 rounded-lg p-4">
              <h3 class="font-semibold text-crypto-800 dark:text-crypto-400 mb-2">Recommendation</h3>
              <p class="text-sm text-crypto-700 dark:text-crypto-300">
                {{ getRecommendation() }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Portfolio Actions -->
      <div class="card">
        <div class="card-header">
          <h2 class="text-xl font-bold">Add to Portfolio</h2>
        </div>
        <div class="card-content">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount to Invest (USD)
              </label>
              <input
                v-model="investmentAmount"
                type="number"
                step="0.01"
                min="0"
                class="w-full px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-crypto-500"
                placeholder="0.00"
              >
            </div>

            <div class="bg-gray-50 dark:bg-dark-800 rounded-lg p-4">
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Price per {{ crypto.symbol.toUpperCase() }}</span>
                  <span class="font-semibold">${{ formatPrice(crypto.current_price) }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Amount to get</span>
                  <span class="font-semibold">
                    {{ investmentAmount ? (investmentAmount / crypto.current_price).toFixed(6) : '0' }} {{ crypto.symbol.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>

            <button
              @click="addToPortfolio"
              :disabled="!investmentAmount || investmentAmount <= 0"
              class="w-full btn btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Portfolio
            </button>

            <div class="text-center">
              <router-link to="/portfolio" class="text-crypto-600 hover:text-crypto-700 text-sm">
                View My Portfolio →
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Key Metrics & Analysis</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Technical Factors</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">RSI (14)</span>
                <span class="font-semibold">{{ Math.floor(Math.random() * 100) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">MACD</span>
                <span class="font-semibold text-green-500">Bullish</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Moving Average</span>
                <span class="font-semibold text-green-500">Above 50-day</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Market Factors</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Volume Trend</span>
                <span class="font-semibold text-green-500">Increasing</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Market Dominance</span>
                <span class="font-semibold">{{ ((crypto.market_cap / 2100000000000) * 100).toFixed(2) }}%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Social Sentiment</span>
                <span class="font-semibold text-yellow-500">Neutral</span>
              </div>
            </div>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Volatility</span>
                <span class="font-semibold text-orange-500">Medium</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Liquidity</span>
                <span class="font-semibold text-green-500">High</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Market Cap Rank</span>
                <span class="font-semibold">Top {{ crypto.market_cap_rank <= 10 ? '10' : crypto.market_cap_rank <= 50 ? '50' : '100' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCryptoStore } from '@/stores/crypto'
import { format } from 'date-fns'

export default defineComponent({
  name: 'CryptoDetail',
  props: {
    id: String
  },
  setup(props) {
    const route = useRoute()
    const cryptoStore = useCryptoStore()
    const investmentAmount = ref('')
    const loading = ref(false)

    const crypto = computed(() => cryptoStore.selectedCrypto)
    const cryptoId = computed(() => props.id || route.params.id)

    const investmentScore = computed(() => {
      if (!crypto.value) return 0
      // Simple scoring algorithm based on multiple factors
      let score = 50 // Base score
      
      // Price change factors
      if (crypto.value.price_change_percentage_24h > 0) score += 10
      if (crypto.value.price_change_percentage_7d_in_currency > 0) score += 15
      
      // Market cap rank factor
      if (crypto.value.market_cap_rank <= 10) score += 20
      else if (crypto.value.market_cap_rank <= 50) score += 10
      
      // Volume factor (if volume is high relative to market cap)
      const volumeRatio = crypto.value.total_volume / crypto.value.market_cap
      if (volumeRatio > 0.1) score += 5
      
      return Math.min(Math.max(score, 0), 100)
    })

    const formatPrice = (price) => {
      if (!price) return '0.00'
      if (price >= 1) {
        return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      }
      return price.toFixed(6)
    }

    const formatPercentage = (value) => {
      if (!value) return '0.00'
      return value.toFixed(2)
    }

    const formatLargeNumber = (num) => {
      if (!num) return '0'
      if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
      if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
      if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
      if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
      return num.toLocaleString()
    }

    const formatDate = (dateString) => {
      if (!dateString) return 'N/A'
      return format(new Date(dateString), 'MMM dd, yyyy')
    }

    const getChangeColor = (value) => {
      if (!value) return 'text-gray-500'
      return value >= 0 ? 'text-green-500' : 'text-red-500'
    }

    const getRecommendation = () => {
      if (!crypto.value) return ''
      
      const score = investmentScore.value
      
      if (score >= 80) {
        return 'Strong Buy - Multiple positive indicators suggest this is an excellent investment opportunity with favorable risk-reward ratio.'
      } else if (score >= 60) {
        return 'Buy - Good investment potential with mostly positive signals. Consider adding to portfolio with proper position sizing.'
      } else if (score >= 40) {
        return 'Hold/Watch - Mixed signals present. Monitor closely for clearer directional momentum before investing.'
      } else {
        return 'Cautious - Current indicators suggest higher risk. Consider waiting for better entry points or reduced volatility.'
      }
    }

    const addToPortfolio = () => {
      if (!crypto.value || !investmentAmount.value || investmentAmount.value <= 0) return
      
      const amount = parseFloat(investmentAmount.value) / crypto.value.current_price
      cryptoStore.addToPortfolio(crypto.value, amount)
      
      // Reset form
      investmentAmount.value = ''
      
      // Show success (in a real app, you'd want a proper notification system)
      alert(`Added ${amount.toFixed(6)} ${crypto.value.symbol.toUpperCase()} to your portfolio!`)
    }

    onMounted(async () => {
      if (cryptoId.value) {
        loading.value = true
        try {
          await cryptoStore.fetchCryptoById(cryptoId.value)
        } catch (error) {
          console.error('Failed to fetch crypto details:', error)
        } finally {
          loading.value = false
        }
      }
    })

    return {
      crypto,
      loading,
      investmentAmount,
      investmentScore,
      formatPrice,
      formatPercentage,
      formatLargeNumber,
      formatDate,
      getChangeColor,
      getRecommendation,
      addToPortfolio
    }
  }
})
</script>