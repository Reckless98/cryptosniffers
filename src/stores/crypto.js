import { defineStore } from 'pinia'
import { ref } from 'vue'
import cryptoService from '@/services/cryptoService'

export const useCryptoStore = defineStore('crypto', () => {
  const cryptocurrencies = ref([])
  const selectedCrypto = ref(null)
  const portfolio = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Mock data for initial demo
  const mockCryptos = [
    {
      id: 'bitcoin',
      symbol: 'btc',
      name: 'Bitcoin',
      image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
      current_price: 42350.25,
      market_cap: 829582947284,
      market_cap_rank: 1,
      total_volume: 18274836549,
      price_change_percentage_24h: 2.45,
      price_change_percentage_7d_in_currency: 8.32,
      last_updated: new Date().toISOString()
    },
    {
      id: 'ethereum',
      symbol: 'eth',
      name: 'Ethereum',
      image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png',
      current_price: 2580.75,
      market_cap: 310285847391,
      market_cap_rank: 2,
      total_volume: 12847593829,
      price_change_percentage_24h: 1.82,
      price_change_percentage_7d_in_currency: 5.67,
      last_updated: new Date().toISOString()
    },
    {
      id: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/large/Tether.png',
      current_price: 1.00,
      market_cap: 95847592847,
      market_cap_rank: 3,
      total_volume: 45847593821,
      price_change_percentage_24h: 0.01,
      price_change_percentage_7d_in_currency: -0.02,
      last_updated: new Date().toISOString()
    },
    {
      id: 'binancecoin',
      symbol: 'bnb',
      name: 'BNB',
      image: 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png',
      current_price: 315.42,
      market_cap: 47285930572,
      market_cap_rank: 4,
      total_volume: 1247593829,
      price_change_percentage_24h: -1.23,
      price_change_percentage_7d_in_currency: 3.45,
      last_updated: new Date().toISOString()
    },
    {
      id: 'solana',
      symbol: 'sol',
      name: 'Solana',
      image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png',
      current_price: 98.67,
      market_cap: 42847592847,
      market_cap_rank: 5,
      total_volume: 2847593829,
      price_change_percentage_24h: 4.52,
      price_change_percentage_7d_in_currency: 12.34,
      last_updated: new Date().toISOString()
    }
  ]

  const fetchCryptocurrencies = async (limit = 100) => {
    loading.value = true
    error.value = null
    
    try {
      // For now, use mock data. In production, use real API
      cryptocurrencies.value = mockCryptos
      // const data = await cryptoService.getCryptocurrencies(limit)
      // cryptocurrencies.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching cryptocurrencies:', err)
    } finally {
      loading.value = false
    }
  }

  const fetchCryptoById = async (id) => {
    loading.value = true
    error.value = null
    
    try {
      // For now, find in mock data
      selectedCrypto.value = cryptocurrencies.value.find(crypto => crypto.id === id) || mockCryptos[0]
      // const data = await cryptoService.getCryptoById(id)
      // selectedCrypto.value = data
    } catch (err) {
      error.value = err.message
      console.error('Error fetching crypto details:', err)
    } finally {
      loading.value = false
    }
  }

  const addToPortfolio = (crypto, amount) => {
    const existingItem = portfolio.value.find(item => item.id === crypto.id)
    
    if (existingItem) {
      existingItem.amount += amount
    } else {
      portfolio.value.push({
        ...crypto,
        amount,
        purchasePrice: crypto.current_price,
        purchaseDate: new Date().toISOString()
      })
    }
  }

  const removeFromPortfolio = (cryptoId) => {
    const index = portfolio.value.findIndex(item => item.id === cryptoId)
    if (index > -1) {
      portfolio.value.splice(index, 1)
    }
  }

  const getPortfolioValue = () => {
    return portfolio.value.reduce((total, item) => {
      return total + (item.current_price * item.amount)
    }, 0)
  }

  const getPortfolioProfitLoss = () => {
    return portfolio.value.reduce((total, item) => {
      const currentValue = item.current_price * item.amount
      const purchaseValue = item.purchasePrice * item.amount
      return total + (currentValue - purchaseValue)
    }, 0)
  }

  return {
    cryptocurrencies,
    selectedCrypto,
    portfolio,
    loading,
    error,
    fetchCryptocurrencies,
    fetchCryptoById,
    addToPortfolio,
    removeFromPortfolio,
    getPortfolioValue,
    getPortfolioProfitLoss
  }
})