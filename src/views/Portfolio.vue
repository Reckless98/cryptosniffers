<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">My Portfolio</h1>
        <p class="text-gray-600 dark:text-gray-400">Track your cryptocurrency investments</p>
      </div>
      <router-link to="/cryptocurrencies" class="btn btn-primary">
        Add New Investment
      </router-link>
    </div>

    <!-- Portfolio Overview -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Total Value</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            ${{ formatPrice(totalValue) }}
          </div>
          <div :class="totalProfitLossColor" class="text-sm">
            {{ totalProfitLoss >= 0 ? '+' : '' }}${{ formatPrice(Math.abs(totalProfitLoss)) }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">24h Change</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ formatPercentage(dailyChangePercent) }}%
          </div>
          <div :class="getDailyChangeColor()" class="text-sm">
            {{ dailyChangePercent >= 0 ? '+' : '' }}${{ formatPrice(Math.abs(dailyChangeValue)) }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Total P&L</div>
          <div class="text-2xl font-bold" :class="totalProfitLossColor">
            {{ totalProfitLoss >= 0 ? '+' : '' }}{{ formatPercentage(totalProfitLossPercent) }}%
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            {{ totalProfitLoss >= 0 ? 'Profit' : 'Loss' }}
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-content">
          <div class="text-sm text-gray-600 dark:text-gray-400">Holdings</div>
          <div class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ portfolio.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">Assets</div>
        </div>
      </div>
    </div>

    <!-- Portfolio Allocation Chart -->
    <div v-if="portfolio.length > 0" class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Portfolio Allocation</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Pie chart placeholder -->
          <div class="flex items-center justify-center h-64 bg-gray-100 dark:bg-dark-700 rounded-lg">
            <div class="text-center">
              <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <p class="text-gray-500">Portfolio Chart</p>
            </div>
          </div>
          
          <!-- Allocation breakdown -->
          <div class="space-y-4">
            <div
              v-for="(item, index) in portfolioWithPercentages"
              :key="item.id"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
            >
              <div class="flex items-center space-x-3">
                <div 
                  class="w-4 h-4 rounded-full"
                  :style="{ backgroundColor: getColor(index) }"
                ></div>
                <img :src="item.image" :alt="item.name" class="w-6 h-6 rounded-full">
                <div>
                  <div class="font-semibold text-sm">{{ item.name }}</div>
                  <div class="text-xs text-gray-500 uppercase">{{ item.symbol }}</div>
                </div>
              </div>
              <div class="text-right">
                <div class="font-semibold">{{ item.percentage.toFixed(1) }}%</div>
                <div class="text-sm text-gray-500">${{ formatPrice(item.value) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Holdings Table -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Your Holdings</h2>
      </div>
      <div class="card-content">
        <div v-if="portfolio.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
          </svg>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">No investments yet</h3>
          <p class="text-gray-600 dark:text-gray-400 mb-6">Start building your crypto portfolio by exploring markets</p>
          <router-link to="/cryptocurrencies" class="btn btn-primary">
            Explore Markets
          </router-link>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="border-b border-gray-200 dark:border-dark-700">
              <tr>
                <th class="text-left py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Asset</th>
                <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Holdings</th>
                <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Avg. Price</th>
                <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Current Price</th>
                <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Market Value</th>
                <th class="text-right py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">P&L</th>
                <th class="text-center py-3 px-4 font-semibold text-sm text-gray-600 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in portfolio"
                :key="item.id"
                class="border-b border-gray-100 dark:border-dark-700 hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
              >
                <td class="py-4 px-4">
                  <div class="flex items-center space-x-3">
                    <img :src="item.image" :alt="item.name" class="w-8 h-8 rounded-full">
                    <div>
                      <div class="font-semibold text-gray-900 dark:text-white">{{ item.name }}</div>
                      <div class="text-sm text-gray-500 dark:text-gray-400 uppercase">{{ item.symbol }}</div>
                    </div>
                  </div>
                </td>
                <td class="py-4 px-4 text-right">
                  <div class="font-semibold text-gray-900 dark:text-white">
                    {{ item.amount.toFixed(6) }} {{ item.symbol.toUpperCase() }}
                  </div>
                  <div class="text-sm text-gray-500">
                    ${{ formatPrice(item.amount * item.current_price) }}
                  </div>
                </td>
                <td class="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">
                  ${{ formatPrice(item.purchasePrice) }}
                </td>
                <td class="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">
                  ${{ formatPrice(item.current_price) }}
                </td>
                <td class="py-4 px-4 text-right font-semibold text-gray-900 dark:text-white">
                  ${{ formatPrice(item.amount * item.current_price) }}
                </td>
                <td class="py-4 px-4 text-right">
                  <div :class="getProfitLossColor(item)">
                    {{ getProfitLoss(item) >= 0 ? '+' : '' }}${{ formatPrice(Math.abs(getProfitLoss(item))) }}
                  </div>
                  <div :class="getProfitLossColor(item)" class="text-sm">
                    {{ getProfitLoss(item) >= 0 ? '+' : '' }}{{ formatPercentage(getProfitLossPercent(item)) }}%
                  </div>
                </td>
                <td class="py-4 px-4 text-center">
                  <div class="flex items-center justify-center space-x-2">
                    <router-link
                      :to="`/crypto/${item.id}`"
                      class="btn btn-secondary text-sm px-3 py-1"
                    >
                      View
                    </router-link>
                    <button
                      @click="removeFromPortfolio(item.id)"
                      class="text-red-500 hover:text-red-700 p-1"
                      title="Remove from portfolio"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Investment Tips -->
    <div class="card">
      <div class="card-header">
        <h2 class="text-xl font-bold">Portfolio Insights</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Diversification Score</h3>
            <div class="flex items-center space-x-3">
              <div class="flex-1 bg-gray-200 dark:bg-dark-600 rounded-full h-3">
                <div 
                  class="h-3 rounded-full transition-all duration-300"
                  :class="diversificationScore >= 70 ? 'bg-green-500' : diversificationScore >= 40 ? 'bg-yellow-500' : 'bg-red-500'"
                  :style="{ width: `${diversificationScore}%` }"
                ></div>
              </div>
              <span class="font-semibold">{{ diversificationScore }}/100</span>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getDiversificationTip() }}
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-semibold text-gray-900 dark:text-white">Risk Assessment</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Portfolio Risk</span>
                <span class="font-semibold" :class="getRiskColor()">{{ getRiskLevel() }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600 dark:text-gray-400">Volatility</span>
                <span class="font-semibold text-orange-500">Medium</span>
              </div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getRiskTip() }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue'
import { useCryptoStore } from '@/stores/crypto'
import { format } from 'date-fns'

export default defineComponent({
  name: 'Portfolio',
  setup() {
    const cryptoStore = useCryptoStore()
    
    const portfolio = computed(() => cryptoStore.portfolio)
    const totalValue = computed(() => cryptoStore.getPortfolioValue())
    const totalProfitLoss = computed(() => cryptoStore.getPortfolioProfitLoss())
    
    const totalProfitLossPercent = computed(() => {
      if (portfolio.value.length === 0) return 0
      const totalInvested = portfolio.value.reduce((sum, item) => sum + (item.purchasePrice * item.amount), 0)
      return totalInvested > 0 ? (totalProfitLoss.value / totalInvested) * 100 : 0
    })

    const totalProfitLossColor = computed(() => {
      return totalProfitLoss.value >= 0 ? 'text-green-500' : 'text-red-500'
    })

    const dailyChangeValue = computed(() => {
      return portfolio.value.reduce((sum, item) => {
        const dailyChange = (item.price_change_percentage_24h || 0) / 100
        return sum + (item.current_price * item.amount * dailyChange)
      }, 0)
    })

    const dailyChangePercent = computed(() => {
      if (totalValue.value === 0) return 0
      return (dailyChangeValue.value / totalValue.value) * 100
    })

    const portfolioWithPercentages = computed(() => {
      const total = totalValue.value
      return portfolio.value.map(item => ({
        ...item,
        value: item.current_price * item.amount,
        percentage: total > 0 ? ((item.current_price * item.amount) / total) * 100 : 0
      }))
    })

    const diversificationScore = computed(() => {
      if (portfolio.value.length === 0) return 0
      if (portfolio.value.length === 1) return 20
      if (portfolio.value.length >= 5) return 90
      return portfolio.value.length * 18 // Rough scoring
    })

    const formatPrice = (price) => {
      if (!price) return '0.00'
      return price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    const formatPercentage = (value) => {
      if (!value) return '0.00'
      return value.toFixed(2)
    }

    const getProfitLoss = (item) => {
      const currentValue = item.current_price * item.amount
      const purchaseValue = item.purchasePrice * item.amount
      return currentValue - purchaseValue
    }

    const getProfitLossPercent = (item) => {
      const purchaseValue = item.purchasePrice * item.amount
      const profitLoss = getProfitLoss(item)
      return purchaseValue > 0 ? (profitLoss / purchaseValue) * 100 : 0
    }

    const getProfitLossColor = (item) => {
      const profitLoss = getProfitLoss(item)
      return profitLoss >= 0 ? 'text-green-500' : 'text-red-500'
    }

    const getDailyChangeColor = () => {
      return dailyChangeValue.value >= 0 ? 'text-green-500' : 'text-red-500'
    }

    const getColor = (index) => {
      const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316']
      return colors[index % colors.length]
    }

    const removeFromPortfolio = (cryptoId) => {
      if (confirm('Are you sure you want to remove this asset from your portfolio?')) {
        cryptoStore.removeFromPortfolio(cryptoId)
      }
    }

    const getDiversificationTip = () => {
      if (diversificationScore.value >= 70) {
        return 'Well diversified portfolio! You have good exposure across multiple assets.'
      } else if (diversificationScore.value >= 40) {
        return 'Moderate diversification. Consider adding more assets to reduce risk.'
      } else {
        return 'Low diversification. Consider spreading investments across more cryptocurrencies.'
      }
    }

    const getRiskLevel = () => {
      if (portfolio.value.length === 0) return 'N/A'
      if (portfolio.value.length === 1) return 'High'
      if (portfolio.value.length >= 5) return 'Low'
      return 'Medium'
    }

    const getRiskColor = () => {
      const risk = getRiskLevel()
      if (risk === 'Low') return 'text-green-500'
      if (risk === 'Medium') return 'text-yellow-500'
      if (risk === 'High') return 'text-red-500'
      return 'text-gray-500'
    }

    const getRiskTip = () => {
      const risk = getRiskLevel()
      if (risk === 'Low') {
        return 'Your portfolio has good risk distribution across multiple assets.'
      } else if (risk === 'Medium') {
        return 'Consider adding more assets or rebalancing for better risk management.'
      } else {
        return 'High concentration risk. Diversify across more cryptocurrencies to reduce risk.'
      }
    }

    return {
      portfolio,
      totalValue,
      totalProfitLoss,
      totalProfitLossPercent,
      totalProfitLossColor,
      dailyChangeValue,
      dailyChangePercent,
      portfolioWithPercentages,
      diversificationScore,
      formatPrice,
      formatPercentage,
      getProfitLoss,
      getProfitLossPercent,
      getProfitLossColor,
      getDailyChangeColor,
      getColor,
      removeFromPortfolio,
      getDiversificationTip,
      getRiskLevel,
      getRiskColor,
      getRiskTip
    }
  }
})
</script>