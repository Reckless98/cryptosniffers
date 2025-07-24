import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

class CryptoService {
  async getCryptocurrencies(limit = 100, vs_currency = 'usd') {
    try {
      const response = await axios.get(`${BASE_URL}/coins/markets`, {
        params: {
          vs_currency,
          order: 'market_cap_desc',
          per_page: limit,
          page: 1,
          sparkline: false,
          price_change_percentage: '24h,7d'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching cryptocurrencies:', error)
      throw new Error('Failed to fetch cryptocurrency data')
    }
  }

  async getCryptoById(id, vs_currency = 'usd') {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}`, {
        params: {
          localization: false,
          tickers: false,
          market_data: true,
          community_data: false,
          developer_data: false,
          sparkline: true
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching crypto details:', error)
      throw new Error('Failed to fetch cryptocurrency details')
    }
  }

  async getCryptoHistory(id, vs_currency = 'usd', days = 7) {
    try {
      const response = await axios.get(`${BASE_URL}/coins/${id}/market_chart`, {
        params: {
          vs_currency,
          days,
          interval: days <= 1 ? 'hourly' : 'daily'
        }
      })
      return response.data
    } catch (error) {
      console.error('Error fetching crypto history:', error)
      throw new Error('Failed to fetch cryptocurrency history')
    }
  }

  async getGlobalMarketData() {
    try {
      const response = await axios.get(`${BASE_URL}/global`)
      return response.data.data
    } catch (error) {
      console.error('Error fetching global market data:', error)
      throw new Error('Failed to fetch global market data')
    }
  }

  async getTrendingCoins() {
    try {
      const response = await axios.get(`${BASE_URL}/search/trending`)
      return response.data.coins
    } catch (error) {
      console.error('Error fetching trending coins:', error)
      throw new Error('Failed to fetch trending coins')
    }
  }
}

export default new CryptoService()