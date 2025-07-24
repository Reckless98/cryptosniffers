<template>
  <div class="space-y-8">
    <!-- Hero Section -->
    <section class="text-center py-12">
      <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
        Smart Crypto
        <span class="text-crypto-600">Investment</span>
        Tracker
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
        Make informed cryptocurrency investment decisions with real-time data, AI-powered analysis, and personalized recommendations.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link to="/cryptocurrencies" class="btn btn-primary px-8 py-3 text-lg">
          Explore Markets
        </router-link>
        <router-link to="/analysis" class="btn btn-secondary px-8 py-3 text-lg">
          View Analysis
        </router-link>
      </div>
    </section>

    <!-- Features Grid -->
    <section class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="card">
        <div class="card-content">
          <div class="w-12 h-12 bg-crypto-100 dark:bg-crypto-900 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Real-Time Tracking</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Monitor cryptocurrency prices and market movements in real-time with live data from major exchanges.
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="w-12 h-12 bg-crypto-100 dark:bg-crypto-900 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Smart Analysis</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Get AI-powered investment insights based on technical indicators, market sentiment, and historical data.
          </p>
        </div>
      </div>

      <div class="card">
        <div class="card-content">
          <div class="w-12 h-12 bg-crypto-100 dark:bg-crypto-900 rounded-lg flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-crypto-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Portfolio Management</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Track your investments, monitor performance, and get personalized recommendations for portfolio optimization.
          </p>
        </div>
      </div>
    </section>

    <!-- Market Overview -->
    <section class="card">
      <div class="card-header">
        <h2 class="text-2xl font-bold">Market Overview</h2>
      </div>
      <div class="card-content">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-crypto-600 mb-2">₿ 42,350</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bitcoin</div>
            <div class="text-green-500 text-sm">+2.4%</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-crypto-600 mb-2">Ξ 2,580</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Ethereum</div>
            <div class="text-green-500 text-sm">+1.8%</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-crypto-600 mb-2">2.1T</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Market Cap</div>
            <div class="text-green-500 text-sm">+0.9%</div>
          </div>
        </div>
        <div class="mt-6 text-center">
          <router-link to="/cryptocurrencies" class="btn btn-primary">
            View All Markets
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home'
})
</script>