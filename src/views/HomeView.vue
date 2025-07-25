<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { DollarSign, BarChart3, Zap } from 'lucide-vue-next'
import CryptoCard from '@/components/CryptoCard.vue'
import InvestmentRecommendations from '@/components/InvestmentRecommendations.vue'
import MarketOverview from '@/components/MarketOverview.vue'
import { useCryptoStore } from '@/stores/crypto'

const cryptoStore = useCryptoStore()

onMounted(() => {
  cryptoStore.fetchCryptocurrencies()
  cryptoStore.fetchMarketData()
})

const stats = computed(() => [
  {
    title: 'Total Market Cap',
    value: cryptoStore.totalMarketCap,
    change: '+2.4%',
    icon: DollarSign,
    positive: true
  },
  {
    title: 'Total Volume (24h)',
    value: cryptoStore.totalVolume,
    change: '+5.2%',
    icon: BarChart3,
    positive: true
  },
  {
    title: 'Active Cryptocurrencies',
    value: cryptoStore.activeCryptos.toString(),
    change: '+12',
    icon: Zap,
    positive: true
  },
  {
    title: 'Market Dominance BTC',
    value: cryptoStore.btcDominance + '%',
    change: '-0.8%',
    icon: BarChart3,
    positive: false
  }
])
</script>

<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">CryptoSniffers</span>
        </h1>
        <p class="hero-subtitle">
          Advanced cryptocurrency tracking with AI-powered investment insights
        </p>
        <div class="hero-stats">
          <div 
            v-for="stat in stats" 
            :key="stat.title"
            class="stat-card glass"
          >
            <div class="stat-icon">
              <component :is="stat.icon" :size="24" />
            </div>
            <div class="stat-content">
              <h3 class="stat-value">{{ stat.value }}</h3>
              <p class="stat-title">{{ stat.title }}</p>
              <span 
                class="stat-change"
                :class="{ positive: stat.positive, negative: !stat.positive }"
              >
                {{ stat.change }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Market Overview -->
    <section class="market-section">
      <MarketOverview />
    </section>

    <!-- Investment Recommendations -->
    <section class="recommendations-section">
      <InvestmentRecommendations />
    </section>

    <!-- Top Cryptocurrencies -->
    <section class="crypto-grid-section">
      <div class="section-header">
        <h2 class="section-title">Top Cryptocurrencies</h2>
        <p class="section-subtitle">Real-time prices and market data</p>
      </div>
      
      <div class="crypto-grid">
        <TransitionGroup name="fade" appear>
          <CryptoCard
            v-for="crypto in cryptoStore.topCryptos"
            :key="crypto.id"
            :crypto="crypto"
          />
        </TransitionGroup>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-view {
  min-height: 100vh;
  width: 100%;
}

/* Hero Section */
.hero {
  padding: 80px 20px 60px;
  text-align: center;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.03)" stroke-width="1"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
  animation: float 20s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  margin-bottom: 1rem;
  line-height: 1.1;
  letter-spacing: -0.02em;
  animation: slideUp 1s ease-out;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  animation: slideUp 1s ease-out 0.2s both;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Stats Grid */
.hero-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
  animation: slideUp 1s ease-out 0.4s both;
}

.stat-card {
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.5);
}

.stat-icon {
  padding: 1rem;
  border-radius: 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
  text-align: left;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.stat-title {
  font-size: 0.875rem;
  color: #a1a1aa;
  margin-bottom: 0.5rem;
}

.stat-change {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.stat-change.positive {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.stat-change.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

/* Sections */
.market-section,
.recommendations-section,
.crypto-grid-section {
  padding: 4rem 20px;
  max-width: 1400px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #a1a1aa;
}

/* Crypto Grid */
.crypto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .hero {
    padding: 60px 15px 40px;
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .market-section,
  .recommendations-section,
  .crypto-grid-section {
    padding: 3rem 15px;
  }
  
  .crypto-grid {
    grid-template-columns: 1fr;
  }
}
</style>
