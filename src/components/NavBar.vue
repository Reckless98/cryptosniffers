<template>
  <nav class="bg-white dark:bg-dark-800 shadow-lg border-b border-gray-200 dark:border-dark-700">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and Brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-crypto-600 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1z"/>
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white">CryptoSniffers</span>
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="nav-link"
            :class="{ 'nav-link-active': $route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Theme Toggle & Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <button
            @click="toggleTheme"
            class="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
            aria-label="Toggle theme"
          >
            <svg v-if="isDark" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z"/>
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
            </svg>
          </button>

          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            aria-label="Open menu"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-dark-700">
        <div class="flex flex-col space-y-2">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            @click="closeMobileMenu"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-crypto-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-crypto-400 dark:hover:bg-dark-700 transition-colors"
            :class="{ 'text-crypto-600 bg-crypto-50 dark:text-crypto-400 dark:bg-dark-700': $route.name === item.name }"
          >
            {{ item.label }}
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'NavBar',
  setup() {
    const mobileMenuOpen = ref(false)
    const isDark = ref(false)

    const navigation = [
      { name: 'Home', label: 'Home', to: '/' },
      { name: 'CryptoList', label: 'Markets', to: '/cryptocurrencies' },
      { name: 'Portfolio', label: 'Portfolio', to: '/portfolio' },
      { name: 'Analysis', label: 'Analysis', to: '/analysis' }
    ]

    const toggleMobileMenu = () => {
      mobileMenuOpen.value = !mobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      mobileMenuOpen.value = false
    }

    const toggleTheme = () => {
      isDark.value = !isDark.value
      if (isDark.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    onMounted(() => {
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDark.value = true
        document.documentElement.classList.add('dark')
      }
    })

    return {
      navigation,
      mobileMenuOpen,
      isDark,
      toggleMobileMenu,
      closeMobileMenu,
      toggleTheme
    }
  }
})
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 hover:text-crypto-600 dark:text-gray-300 dark:hover:text-crypto-400 px-3 py-2 rounded-md text-sm font-medium transition-colors;
}

.nav-link-active {
  @apply text-crypto-600 dark:text-crypto-400;
}
</style>