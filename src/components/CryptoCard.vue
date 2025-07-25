<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, TrendingDown } from 'lucide-vue-next'
import type { Cryptocurrency } from '@/stores/crypto'

interface Props {
  crypto: Cryptocurrency
}

const props = defineProps<Props>()

const priceChange = computed(() => props.crypto.price_change_percentage_24h)
const isPositive = computed(() => priceChange.value > 0)

const formatPrice = (price: number) => {
  if (price < 0.01) {
    return `$${price.toFixed(6)}`
  } else if (price < 1) {
    return `$${price.toFixed(4)}`
  }
  return `$${price.toLocaleString(undefined, { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`
}

const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`
  } else if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`
  } else if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`
  }
  return `$${marketCap.toFixed(0)}`
}

const formatVolume = (volume: number) => {
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`
  } else if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`
  }
  return `$${volume.toFixed(0)}`
}

const generateSparklinePoints = (prices: number[]) => {
  if (!prices || prices.length === 0) return ''
  
  const width = 164
  const height = 40
  const padding = 4
  
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceRange = maxPrice - minPrice
  
  return prices
    .map((price, index) => {
      const x = (index / (prices.length - 1)) * (width - 2 * padding) + padding
      const y = height - padding - ((price - minPrice) / priceRange) * (height - 2 * padding)
      return `${x},${y}`
    })
    .join(' ')
}
</script>

<template>
  <div class="crypto-card glass">
    <div class="crypto-header">
      <div class="crypto-info">
        <img 
          :src="crypto.image" 
          :alt="crypto.name"
          class="crypto-image"
        />
        <div class="crypto-details">
          <h3 class="crypto-name">{{ crypto.name }}</h3>
          <span class="crypto-symbol">{{ crypto.symbol.toUpperCase() }}</span>
          <span class="crypto-rank">#{{ crypto.market_cap_rank }}</span>
        </div>
      </div>
    </div>

    <div class="crypto-price">
      <div class="price-main">
        <span class="current-price">{{ formatPrice(crypto.current_price) }}</span>
        <div 
          class="price-change"
          :class="{ positive: isPositive, negative: !isPositive }"
        >
          <component 
            :is="isPositive ? TrendingUp : TrendingDown" 
            :size="16" 
          />
          <span>{{ Math.abs(priceChange).toFixed(2) }}%</span>
        </div>
      </div>
    </div>

    <div class="crypto-stats">
      <div class="stat-row">
        <span class="stat-label">Market Cap</span>
        <span class="stat-value">{{ formatMarketCap(crypto.market_cap) }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">24h Volume</span>
        <span class="stat-value">{{ formatVolume(crypto.total_volume) }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">24h High</span>
        <span class="stat-value">{{ formatPrice(crypto.high_24h) }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">24h Low</span>
        <span class="stat-value">{{ formatPrice(crypto.low_24h) }}</span>
      </div>
    </div>

    <!-- Mini Sparkline Chart -->
    <div v-if="crypto.sparkline_in_7d?.price" class="sparkline">
      <svg 
        viewBox="0 0 164 40" 
        class="sparkline-svg"
        :class="{ positive: isPositive, negative: !isPositive }"
      >
        <polyline
          :points="generateSparklinePoints(crypto.sparkline_in_7d.price)"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </div>
</template>



<style scoped>
.crypto-card {
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.crypto-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
}

.crypto-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.crypto-card:hover::before {
  opacity: 1;
}

.crypto-header {
  margin-bottom: 1rem;
}

.crypto-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.crypto-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.crypto-details {
  flex: 1;
  min-width: 0;
}

.crypto-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
  truncate: true;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.crypto-symbol {
  font-size: 0.875rem;
  color: #a1a1aa;
  font-weight: 500;
  margin-right: 0.5rem;
}

.crypto-rank {
  font-size: 0.75rem;
  color: #64748b;
  background: rgba(100, 116, 139, 0.2);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
}

.crypto-price {
  margin-bottom: 1.5rem;
}

.price-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e2e8f0;
}

.price-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.75rem;
  border-radius: 8px;
  flex-shrink: 0;
}

.price-change.positive {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.price-change.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.crypto-stats {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  color: #a1a1aa;
}

.stat-value {
  font-size: 0.875rem;
  color: #e2e8f0;
  font-weight: 500;
}

.sparkline {
  height: 40px;
  margin-top: 1rem;
}

.sparkline-svg {
  width: 100%;
  height: 100%;
  opacity: 0.8;
}

.sparkline-svg.positive {
  color: #10b981;
}

.sparkline-svg.negative {
  color: #ef4444;
}

/* Responsive Design */
@media (max-width: 640px) {
  .crypto-card {
    padding: 1rem;
  }
  
  .current-price {
    font-size: 1.25rem;
  }
  
  .price-main {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .price-change {
    align-self: flex-end;
  }
}
</style>