<script setup lang="ts">
import { computed } from 'vue'
import { TrendingUp, Shield, AlertTriangle, Star, ArrowUp, ArrowDown } from 'lucide-vue-next'
import { useCryptoStore } from '@/stores/crypto'

const cryptoStore = useCryptoStore()

const recommendations = computed(() => cryptoStore.analyzeInvestments())

const getRecommendationColor = (recommendation: string) => {
  switch (recommendation) {
    case 'strong_buy': return 'text-green-400 bg-green-400/10'
    case 'buy': return 'text-green-300 bg-green-300/10'
    case 'hold': return 'text-yellow-400 bg-yellow-400/10'
    case 'sell': return 'text-red-300 bg-red-300/10'
    case 'strong_sell': return 'text-red-400 bg-red-400/10'
    default: return 'text-gray-400 bg-gray-400/10'
  }
}

const getRecommendationText = (recommendation: string) => {
  switch (recommendation) {
    case 'strong_buy': return 'Strong Buy'
    case 'buy': return 'Buy'
    case 'hold': return 'Hold'
    case 'sell': return 'Sell'
    case 'strong_sell': return 'Strong Sell'
    default: return 'Analyze'
  }
}

const getRiskIcon = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return Shield
    case 'medium': return AlertTriangle
    case 'high': return AlertTriangle
    default: return Shield
  }
}

const getRiskColor = (riskLevel: string) => {
  switch (riskLevel) {
    case 'low': return 'text-green-400'
    case 'medium': return 'text-yellow-400'
    case 'high': return 'text-red-400'
    default: return 'text-gray-400'
  }
}
</script>

<template>
  <div class="recommendations-container">
    <div class="section-header">
      <h2 class="section-title">
        <Star :size="32" class="title-icon" />
        Investment Recommendations
      </h2>
      <p class="section-subtitle">
        AI-powered analysis based on multiple market factors
      </p>
    </div>

    <div v-if="recommendations.length === 0" class="loading-state glass">
      <div class="loading-content">
        <div class="loading-spinner"></div>
        <p>Analyzing market data...</p>
      </div>
    </div>

    <div v-else class="recommendations-grid">
      <TransitionGroup name="slide-up" appear>
        <div
          v-for="(rec, index) in recommendations"
          :key="rec.crypto.id"
          class="recommendation-card glass"
          :style="{ '--delay': `${index * 0.1}s` }"
        >
          <!-- Header -->
          <div class="rec-header">
            <div class="crypto-info">
              <img 
                :src="rec.crypto.image" 
                :alt="rec.crypto.name"
                class="crypto-image"
              />
              <div class="crypto-details">
                <h3 class="crypto-name">{{ rec.crypto.name }}</h3>
                <span class="crypto-symbol">{{ rec.crypto.symbol.toUpperCase() }}</span>
              </div>
            </div>
            <div class="score-badge">
              <span class="score-value">{{ rec.score.toFixed(0) }}</span>
              <span class="score-label">Score</span>
            </div>
          </div>

          <!-- Recommendation & Risk -->
          <div class="rec-status">
            <div 
              class="recommendation-badge"
              :class="getRecommendationColor(rec.recommendation)"
            >
              <component 
                :is="rec.recommendation.includes('buy') ? ArrowUp : rec.recommendation.includes('sell') ? ArrowDown : TrendingUp" 
                :size="16" 
              />
              <span>{{ getRecommendationText(rec.recommendation) }}</span>
            </div>
            
            <div class="risk-indicator">
              <component 
                :is="getRiskIcon(rec.risk_level)" 
                :size="16" 
                :class="getRiskColor(rec.risk_level)"
              />
              <span :class="getRiskColor(rec.risk_level)">
                {{ rec.risk_level.charAt(0).toUpperCase() + rec.risk_level.slice(1) }} Risk
              </span>
            </div>
          </div>

          <!-- Price Info -->
          <div class="price-info">
            <div class="current-price">
              ${{ rec.crypto.current_price.toLocaleString(undefined, { 
                minimumFractionDigits: 2, 
                maximumFractionDigits: 6 
              }) }}
            </div>
            <div 
              class="price-change"
              :class="{
                positive: rec.crypto.price_change_percentage_24h > 0,
                negative: rec.crypto.price_change_percentage_24h <= 0
              }"
            >
              {{ rec.crypto.price_change_percentage_24h > 0 ? '+' : '' }}{{ rec.crypto.price_change_percentage_24h.toFixed(2) }}%
            </div>
          </div>

          <!-- Reasons -->
          <div class="reasons">
            <h4 class="reasons-title">Analysis</h4>
            <ul class="reasons-list">
              <li 
                v-for="reason in rec.reasons" 
                :key="reason"
                class="reason-item"
              >
                {{ reason }}
              </li>
            </ul>
          </div>

          <!-- Action Button -->
          <button 
            class="action-button"
            :class="getRecommendationColor(rec.recommendation)"
          >
            View Details
          </button>
        </div>
      </TransitionGroup>
    </div>

    <!-- Disclaimer -->
    <div class="disclaimer glass-dark">
      <AlertTriangle :size="20" class="disclaimer-icon" />
      <p class="disclaimer-text">
        <strong>Disclaimer:</strong> These recommendations are for educational purposes only and should not be considered as financial advice. 
        Always do your own research and consider your risk tolerance before making investment decisions.
      </p>
    </div>
  </div>
</template>

<style scoped>
.recommendations-container {
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
  color: #fbbf24;
  filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.3));
}

.section-subtitle {
  font-size: 1.125rem;
  color: #a1a1aa;
}

.loading-state {
  padding: 3rem;
  text-align: center;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-top: 3px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.recommendations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.recommendation-card {
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  animation: slideUp 0.6s ease-out var(--delay, 0s) both;
}

.recommendation-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px 0 rgba(31, 38, 135, 0.6);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rec-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.crypto-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.crypto-image {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.crypto-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.crypto-symbol {
  font-size: 0.875rem;
  color: #a1a1aa;
  font-weight: 500;
}

.score-badge {
  text-align: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.score-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
}

.score-label {
  display: block;
  font-size: 0.75rem;
  opacity: 0.9;
}

.rec-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  gap: 1rem;
}

.recommendation-badge,
.risk-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
}

.price-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.current-price {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
}

.price-change {
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
}

.price-change.positive {
  color: #10b981;
  background: rgba(16, 185, 129, 0.1);
}

.price-change.negative {
  color: #ef4444;
  background: rgba(239, 68, 68, 0.1);
}

.reasons {
  margin-bottom: 1.5rem;
}

.reasons-title {
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin-bottom: 0.75rem;
}

.reasons-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.reason-item {
  font-size: 0.875rem;
  color: #a1a1aa;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  position: relative;
}

.reason-item::before {
  content: '•';
  position: absolute;
  left: 0;
  color: #667eea;
  font-weight: bold;
}

.action-button {
  width: 100%;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  background: currentColor;
  color: white;
}

.action-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.disclaimer {
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-top: 2rem;
}

.disclaimer-icon {
  color: #fbbf24;
  flex-shrink: 0;
  margin-top: 0.125rem;
}

.disclaimer-text {
  font-size: 0.875rem;
  color: #a1a1aa;
  line-height: 1.6;
}

/* Responsive Design */
@media (max-width: 768px) {
  .recommendations-grid {
    grid-template-columns: 1fr;
  }
  
  .rec-status {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .price-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>