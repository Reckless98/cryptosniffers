<script setup lang="ts">
import { computed, ref } from 'vue'
import { TrendingUp, TrendingDown, Activity, Globe, DollarSign } from 'lucide-vue-next'
import { useCryptoStore } from '@/stores/crypto'

const cryptoStore = useCryptoStore()

const marketStats = computed(() => {
  if (!cryptoStore.cryptocurrencies.length) {
    return { gainers: [], losers: [] }
  }
  
  const cryptos = cryptoStore.cryptocurrencies.slice(0, 10)
  const gainers = cryptos
    .filter(c => c.price_change_percentage_24h > 0)
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .slice(0, 3)
  
  const losers = cryptos
    .filter(c => c.price_change_percentage_24h < 0)
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .slice(0, 3)
  
  return { gainers, losers }
})

const fearGreedIndex = ref(65) // Mock data - in real app would fetch from API

const getFearGreedColor = (value: number) => {
  if (value >= 75) return 'text-green-400'
  if (value >= 55) return 'text-yellow-400'
  if (value >= 45) return 'text-orange-400'
  if (value >= 25) return 'text-red-400'
  return 'text-red-500'
}

const getFearGreedLabel = (value: number) => {
  if (value >= 75) return 'Extreme Greed'
  if (value >= 55) return 'Greed'
  if (value >= 45) return 'Neutral'
  if (value >= 25) return 'Fear'
  return 'Extreme Fear'
}

const formatPercentage = (value: number) => {
  const sign = value > 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

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
</script>

<template>
  <div class="market-overview">
    <div class="section-header">
      <h2 class="section-title">
        <Activity :size="32" class="title-icon" />
        Market Overview
      </h2>
      <p class="section-subtitle">
        Real-time market trends and sentiment analysis
      </p>
    </div>

    <div class="overview-grid">
      <!-- Fear & Greed Index -->
      <div class="overview-card glass">
        <div class="card-header">
          <h3 class="card-title">Fear & Greed Index</h3>
          <Globe :size="20" class="card-icon" />
        </div>
        <div class="fear-greed-container">
          <div class="fear-greed-gauge">
            <svg viewBox="0 0 200 120" class="gauge-svg">
              <!-- Background arc -->
              <path
                d="M 30 90 A 70 70 0 0 1 170 90"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                stroke-width="8"
                stroke-linecap="round"
              />
              <!-- Progress arc -->
              <path
                d="M 30 90 A 70 70 0 0 1 170 90"
                fill="none"
                :stroke="getFearGreedColor(fearGreedIndex).replace('text-', '')"
                stroke-width="8"
                stroke-linecap="round"
                :stroke-dasharray="`${(fearGreedIndex / 100) * 219.9} 219.9`"
                class="gauge-progress"
              />
              <!-- Needle -->
              <g transform="translate(100, 90)">
                <circle r="4" fill="currentColor" />
                <line
                  x1="0"
                  y1="0"
                  :x2="Math.cos((fearGreedIndex / 100) * Math.PI - Math.PI) * 60"
                  :y2="Math.sin((fearGreedIndex / 100) * Math.PI - Math.PI) * 60"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </g>
            </svg>
          </div>
          <div class="fear-greed-info">
            <div class="fear-greed-value" :class="getFearGreedColor(fearGreedIndex)">
              {{ fearGreedIndex }}
            </div>
            <div class="fear-greed-label" :class="getFearGreedColor(fearGreedIndex)">
              {{ getFearGreedLabel(fearGreedIndex) }}
            </div>
          </div>
        </div>
      </div>

      <!-- Top Gainers -->
      <div class="overview-card glass">
        <div class="card-header">
          <h3 class="card-title">Top Gainers (24h)</h3>
          <TrendingUp :size="20" class="card-icon text-green-400" />
        </div>
        <div class="movers-list">
          <div
            v-for="crypto in marketStats.gainers"
            :key="crypto.id"
            class="mover-item"
          >
            <div class="mover-info">
              <img :src="crypto.image" :alt="crypto.name" class="mover-image" />
              <div class="mover-details">
                <span class="mover-name">{{ crypto.symbol.toUpperCase() }}</span>
                <span class="mover-price">{{ formatPrice(crypto.current_price) }}</span>
              </div>
            </div>
            <div class="mover-change positive">
              <TrendingUp :size="16" />
              <span>{{ formatPercentage(crypto.price_change_percentage_24h) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Top Losers -->
      <div class="overview-card glass">
        <div class="card-header">
          <h3 class="card-title">Top Losers (24h)</h3>
          <TrendingDown :size="20" class="card-icon text-red-400" />
        </div>
        <div class="movers-list">
          <div
            v-for="crypto in marketStats.losers"
            :key="crypto.id"
            class="mover-item"
          >
            <div class="mover-info">
              <img :src="crypto.image" :alt="crypto.name" class="mover-image" />
              <div class="mover-details">
                <span class="mover-name">{{ crypto.symbol.toUpperCase() }}</span>
                <span class="mover-price">{{ formatPrice(crypto.current_price) }}</span>
              </div>
            </div>
            <div class="mover-change negative">
              <TrendingDown :size="16" />
              <span>{{ formatPercentage(crypto.price_change_percentage_24h) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Market Stats -->
      <div class="overview-card glass">
        <div class="card-header">
          <h3 class="card-title">Global Market Stats</h3>
          <DollarSign :size="20" class="card-icon" />
        </div>
        <div class="market-stats-grid">
          <div class="stat-item">
            <span class="stat-label">Total Market Cap</span>
            <span class="stat-value">{{ cryptoStore.totalMarketCap }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">24h Volume</span>
            <span class="stat-value">{{ cryptoStore.totalVolume }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">BTC Dominance</span>
            <span class="stat-value">{{ cryptoStore.btcDominance }}%</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Active Cryptos</span>
            <span class="stat-value">{{ cryptoStore.activeCryptos.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.market-overview {
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.title-icon {
  color: #667eea;
  filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.3));
}

.section-subtitle {
  font-size: 1.125rem;
  color: #a1a1aa;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
}

.overview-card {
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.overview-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
}

.card-icon {
  color: #667eea;
}

/* Fear & Greed Index */
.fear-greed-container {
  text-align: center;
}

.fear-greed-gauge {
  width: 200px;
  height: 120px;
  margin: 0 auto 1rem;
}

.gauge-svg {
  width: 100%;
  height: 100%;
  color: #667eea;
}

.gauge-progress {
  transition: stroke-dasharray 1s ease-out;
}

.fear-greed-info {
  text-align: center;
}

.fear-greed-value {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.fear-greed-label {
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Movers List */
.movers-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.mover-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  transition: background 0.2s ease;
}

.mover-item:hover {
  background: rgba(255, 255, 255, 0.08);
}

.mover-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.mover-image {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.mover-details {
  display: flex;
  flex-direction: column;
}

.mover-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e2e8f0;
}

.mover-price {
  font-size: 0.75rem;
  color: #a1a1aa;
}

.mover-change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.mover-change.positive {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.mover-change.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Market Stats */
.market-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  text-align: center;
}

.stat-label {
  font-size: 0.75rem;
  color: #a1a1aa;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-size: 1.125rem;
  font-weight: 700;
  color: #e2e8f0;
}

/* Color utilities */
.text-green-400 { color: #10b981; }
.text-yellow-400 { color: #fbbf24; }
.text-orange-400 { color: #fb923c; }
.text-red-400 { color: #ef4444; }
.text-red-500 { color: #dc2626; }

/* Responsive Design */
@media (max-width: 768px) {
  .overview-grid {
    grid-template-columns: 1fr;
  }
  
  .market-stats-grid {
    grid-template-columns: 1fr;
  }
  
  .fear-greed-gauge {
    width: 160px;
    height: 96px;
  }
  
  .fear-greed-value {
    font-size: 1.5rem;
  }
}
</style>