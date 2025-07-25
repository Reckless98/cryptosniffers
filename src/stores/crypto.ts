import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'
import { mockCryptoData, mockMarketData } from './mockData'

export interface Cryptocurrency {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null | {
    times: number
    currency: string
    percentage: number
  }
  last_updated: string
  sparkline_in_7d?: {
    price: number[]
  }
  price_change_percentage_7d_in_currency?: number
}

export interface MarketData {
  total_market_cap: { usd: number }
  total_volume: { usd: number }
  market_cap_percentage: { btc: number }
  active_cryptocurrencies: number
}

export interface InvestmentRecommendation {
  crypto: Cryptocurrency
  score: number
  reasons: string[]
  risk_level: 'low' | 'medium' | 'high'
  recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell' | 'strong_sell'
}

export const useCryptoStore = defineStore('crypto', () => {
  const cryptocurrencies = ref<Cryptocurrency[]>([])
  const marketData = ref<MarketData | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Base URL for CoinGecko API
  const API_BASE = 'https://api.coingecko.com/api/v3'

  // Computed values
  const topCryptos = computed(() => 
    cryptocurrencies.value.slice(0, 12)
  )

  const totalMarketCap = computed(() => {
    if (!marketData.value) return '$0'
    const value = marketData.value.total_market_cap.usd
    return formatCurrency(value)
  })

  const totalVolume = computed(() => {
    if (!marketData.value) return '$0'
    const value = marketData.value.total_volume.usd
    return formatCurrency(value)
  })

  const btcDominance = computed(() => {
    if (!marketData.value) return '0'
    return marketData.value.market_cap_percentage.btc.toFixed(1)
  })

  const activeCryptos = computed(() => {
    return marketData.value?.active_cryptocurrencies || 0
  })

  // Helper function to format currency
  function formatCurrency(value: number): string {
    if (value >= 1e12) {
      return `$${(value / 1e12).toFixed(2)}T`
    } else if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(2)}B`
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(2)}M`
    } else if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(2)}K`
    }
    return `$${value.toFixed(2)}`
  }

  // Fetch cryptocurrencies
  async function fetchCryptocurrencies() {
    loading.value = true
    error.value = null

    try {
      const response = await axios.get(
        `${API_BASE}/coins/markets`,
        {
          params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 50,
            page: 1,
            sparkline: true,
            price_change_percentage: '7d'
          }
        }
      )
      cryptocurrencies.value = response.data
    } catch (err: unknown) {
      // Use mock data when API fails
      const apiError = err as Error
      console.warn('API failed, using mock data:', apiError.message)
      cryptocurrencies.value = mockCryptoData as Cryptocurrency[]
      error.value = null // Don't show error when using mock data
    } finally {
      loading.value = false
    }
  }

  // Fetch market data
  async function fetchMarketData() {
    try {
      const response = await axios.get(`${API_BASE}/global`)
      marketData.value = response.data.data
    } catch (err: unknown) {
      // Use mock data when API fails
      const apiError = err as Error
      console.warn('Market API failed, using mock data:', apiError.message)
      marketData.value = mockMarketData
    }
  }

  // Investment analysis algorithm
  function analyzeInvestments(): InvestmentRecommendation[] {
    if (!cryptocurrencies.value.length) return []

    return cryptocurrencies.value
      .slice(0, 20)
      .map(crypto => {
        const factors = analyzeFactors(crypto)
        const score = calculateInvestmentScore(factors)
        const recommendation = getRecommendation(score)
        const riskLevel = getRiskLevel(crypto, factors)
        const reasons = generateReasons(crypto, factors)

        return {
          crypto,
          score,
          reasons,
          risk_level: riskLevel,
          recommendation
        }
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
  }

  // Analyze various factors for a cryptocurrency
  function analyzeFactors(crypto: Cryptocurrency) {
    const marketCapScore = getMarketCapScore(crypto.market_cap)
    const volumeScore = getVolumeScore(crypto.total_volume, crypto.market_cap)
    const priceChangeScore = getPriceChangeScore(crypto.price_change_percentage_24h)
    const weeklyChangeScore = getPriceChangeScore(crypto.price_change_percentage_7d_in_currency || 0)
    const rankScore = getRankScore(crypto.market_cap_rank)
    const volatilityScore = getVolatilityScore(crypto)
    
    return {
      marketCapScore,
      volumeScore,
      priceChangeScore,
      weeklyChangeScore,
      rankScore,
      volatilityScore
    }
  }

  // Calculate investment score based on multiple factors
  function calculateInvestmentScore(factors: {
    marketCapScore: number
    volumeScore: number
    priceChangeScore: number
    weeklyChangeScore: number
    rankScore: number
    volatilityScore: number
  }): number {
    const weights = {
      marketCapScore: 0.2,
      volumeScore: 0.2,
      priceChangeScore: 0.15,
      weeklyChangeScore: 0.15,
      rankScore: 0.15,
      volatilityScore: 0.15
    }

    return (
      factors.marketCapScore * weights.marketCapScore +
      factors.volumeScore * weights.volumeScore +
      factors.priceChangeScore * weights.priceChangeScore +
      factors.weeklyChangeScore * weights.weeklyChangeScore +
      factors.rankScore * weights.rankScore +
      factors.volatilityScore * weights.volatilityScore
    ) * 100
  }

  // Helper scoring functions
  function getMarketCapScore(marketCap: number): number {
    if (marketCap > 100e9) return 1.0 // $100B+
    if (marketCap > 10e9) return 0.8   // $10B+
    if (marketCap > 1e9) return 0.6    // $1B+
    if (marketCap > 100e6) return 0.4  // $100M+
    return 0.2
  }

  function getVolumeScore(volume: number, marketCap: number): number {
    const volumeRatio = volume / marketCap
    if (volumeRatio > 0.3) return 1.0
    if (volumeRatio > 0.2) return 0.8
    if (volumeRatio > 0.1) return 0.6
    if (volumeRatio > 0.05) return 0.4
    return 0.2
  }

  function getPriceChangeScore(change: number): number {
    if (change > 10) return 1.0
    if (change > 5) return 0.8
    if (change > 0) return 0.6
    if (change > -5) return 0.4
    if (change > -10) return 0.2
    return 0.1
  }

  function getRankScore(rank: number): number {
    if (rank <= 10) return 1.0
    if (rank <= 25) return 0.8
    if (rank <= 50) return 0.6
    if (rank <= 100) return 0.4
    return 0.2
  }

  function getVolatilityScore(crypto: Cryptocurrency): number {
    const range = crypto.high_24h - crypto.low_24h
    const volatility = range / crypto.current_price
    
    // Lower volatility gets higher score for stability
    if (volatility < 0.05) return 1.0  // <5% volatility
    if (volatility < 0.1) return 0.8   // <10% volatility
    if (volatility < 0.15) return 0.6  // <15% volatility
    if (volatility < 0.2) return 0.4   // <20% volatility
    return 0.2
  }

  function getRecommendation(score: number): InvestmentRecommendation['recommendation'] {
    if (score >= 80) return 'strong_buy'
    if (score >= 65) return 'buy'
    if (score >= 45) return 'hold'
    if (score >= 30) return 'sell'
    return 'strong_sell'
  }

  function getRiskLevel(crypto: Cryptocurrency, factors: {
    marketCapScore: number
    volumeScore: number
    priceChangeScore: number
    weeklyChangeScore: number
    rankScore: number
    volatilityScore: number
  }): InvestmentRecommendation['risk_level'] {
    const marketCapRisk = crypto.market_cap < 1e9 ? 2 : crypto.market_cap < 10e9 ? 1 : 0
    const volatilityRisk = factors.volatilityScore < 0.4 ? 2 : factors.volatilityScore < 0.7 ? 1 : 0
    const rankRisk = crypto.market_cap_rank > 50 ? 2 : crypto.market_cap_rank > 25 ? 1 : 0
    
    const totalRisk = marketCapRisk + volatilityRisk + rankRisk
    
    if (totalRisk >= 4) return 'high'
    if (totalRisk >= 2) return 'medium'
    return 'low'
  }

  function generateReasons(crypto: Cryptocurrency, factors: {
    marketCapScore: number
    volumeScore: number
    priceChangeScore: number
    weeklyChangeScore: number
    rankScore: number
    volatilityScore: number
  }): string[] {
    const reasons: string[] = []
    
    if (factors.marketCapScore >= 0.8) {
      reasons.push('Strong market capitalization')
    }
    
    if (factors.volumeScore >= 0.8) {
      reasons.push('High trading volume indicates strong liquidity')
    }
    
    if (factors.priceChangeScore >= 0.8) {
      reasons.push('Positive 24h price momentum')
    }
    
    if (factors.weeklyChangeScore >= 0.8) {
      reasons.push('Strong weekly performance')
    }
    
    if (factors.rankScore >= 0.8) {
      reasons.push('Top market position')
    }
    
    if (factors.volatilityScore >= 0.8) {
      reasons.push('Low volatility provides stability')
    }
    
    if (crypto.market_cap_rank <= 5) {
      reasons.push('Blue chip cryptocurrency')
    }
    
    if (reasons.length === 0) {
      reasons.push('Requires careful analysis before investment')
    }
    
    return reasons.slice(0, 3) // Limit to 3 reasons
  }

  return {
    cryptocurrencies,
    marketData,
    loading,
    error,
    topCryptos,
    totalMarketCap,
    totalVolume,
    btcDominance,
    activeCryptos,
    fetchCryptocurrencies,
    fetchMarketData,
    analyzeInvestments,
    formatCurrency
  }
})