<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Cryptocurrency Markets</h1>
        <p class="text-gray-600 dark:text-gray-400">Real-time prices and market data</p>
      </div>
      <div class="flex items-center space-x-4">
        <select
          v-model="sortBy"
          class="px-3 py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 text-gray-900 dark:text-white"
        >
          <option value="market_cap">Market Cap</option>
          <option value="price">Price</option>
          <option value="volume">Volume</option>
          <option value="change">24h Change</option>
        </select>
        <button
          @click="toggleOrder"
          class="p-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-800 hover:bg-gray-50 dark:hover:bg-dark-700"
        >
          <svg class="w-4 h-4" :class="{ 'rotate-180': sortOrder === 'asc' }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Market Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">$2.1T</div>
          <div class="text-green-500 text-sm">+2.4% (24h)</div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">24h Volume</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">$89.2B</div>
          <div class="text-green-500 text-sm">+5.1% (24h)</div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">BTC Dominance</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">52.3%</div>
          <div class="text-red-500 text-sm">-0.2% (24h)</div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Active Coins</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">8,547</div>
          <div class="text-gray-500 text-sm">Tracked</div>
        </div>
      </div>
    </div>

    <!-- Crypto List -->
    <div class="card">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead class="border-b border-gray-200 dark:border-dark-700">
            <tr>
              <th class="text-left py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">#</th>
              <th class="text-left py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Coin</th>
              <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Price</th>
              <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">24h</th>
              <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">7d</th>
              <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Market Cap</th>
              <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Volume (24h)</th>
              <th class="text-center py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(crypto, index) in sortedCryptos"
              :key="crypto.id"
              class="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
            >
              <td class="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{{ index + 1 }}</td>
              <td class="py-4 px-4">
                <div class="flex items-center space-x-3">
                  <img :src="crypto.image" :alt="crypto.name" class="w-8 h-8 rounded-full">
                  <div>
                    <div class="font-semibold text-gray-900 dark:text-white">{{ crypto.name }}</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400 uppercase">{{ crypto.symbol }}</div>
                  </div>
                </div>
              </td>
              <td class="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">
                ${{ formatPrice(crypto.current_price) }}
              </td>
              <td class="py-4 px-4 text-right">
                <span :class="getChangeColor(crypto.price_change_percentage_24h)">
                  {{ formatPercentage(crypto.price_change_percentage_24h) }}%
                </span>
              </td>
              <td class="py-4 px-4 text-right">
                <span :class="getChangeColor(crypto.price_change_percentage_7d_in_currency)">
                  {{ formatPercentage(crypto.price_change_percentage_7d_in_currency) }}%
                </span>
              </td>
              <td class="py-4 px-4 text-right text-gray-900 dark:text-white">
                ${{ formatLargeNumber(crypto.market_cap) }}
              </td>
              <td class="py-4 px-4 text-right text-gray-900 dark:text-white">
                ${{ formatLargeNumber(crypto.total_volume) }}
              </td>
              <td class="py-4 px-4 text-center">
                <router-link
                  :to="`/crypto/${crypto.id}`"
                  class="btn btn-primary text-sm px-3 py-1"
                >
                  View
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-crypto-600 mx-auto"></div>
      <p class="text-gray-600 dark:text-gray-400 mt-4">Loading market data...</p>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useCryptoStore } from '@/stores/crypto'

export default defineComponent({
  name: 'CryptoList',
  setup() {
    const cryptoStore = useCryptoStore()
    const loading = ref(false)
    const sortBy = ref('market_cap')
    const sortOrder = ref('desc')

    const sortedCryptos = computed(() => {
      const cryptos = [...cryptoStore.cryptocurrencies]
      return cryptos.sort((a, b) => {
        let aVal = a[sortBy.value]
        let bVal = b[sortBy.value]
        
        if (sortBy.value === 'change') {
          aVal = a.price_change_percentage_24h
          bVal = b.price_change_percentage_24h
        }
        
        if (sortOrder.value === 'asc') {
          return aVal - bVal
        }
        return bVal - aVal
      })
    })

    const toggleOrder = () => {
      sortOrder.value = sortOrder.value === 'desc' ? 'asc' : 'desc'
    }

    const formatPrice = (price) => {
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
      if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
      if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
      if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
      if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
      return num.toLocaleString()
    }

    const getChangeColor = (value) => {
      if (!value) return 'text-gray-500'
      return value >= 0 ? 'text-green-500' : 'text-red-500'
    }

    onMounted(async () => {
      loading.value = true
      try {
        await cryptoStore.fetchCryptocurrencies()
      } catch (error) {
        console.error('Failed to fetch cryptocurrencies:', error)
      } finally {
        loading.value = false
      }
    })

    return {
      loading,
      sortBy,
      sortOrder,
      sortedCryptos,
      toggleOrder,
      formatPrice,
      formatPercentage,
      formatLargeNumber,
      getChangeColor
    }
  }
})
</script>