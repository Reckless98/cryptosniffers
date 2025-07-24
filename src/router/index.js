import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import CryptoList from '@/views/CryptoList.vue'
import CryptoDetail from '@/views/CryptoDetail.vue'
import Portfolio from '@/views/Portfolio.vue'
import Analysis from '@/views/Analysis.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'CryptoSniffers - Smart Crypto Investment Tracker'
    }
  },
  {
    path: '/cryptocurrencies',
    name: 'CryptoList',
    component: CryptoList,
    meta: {
      title: 'Cryptocurrency Prices - CryptoSniffers'
    }
  },
  {
    path: '/crypto/:id',
    name: 'CryptoDetail',
    component: CryptoDetail,
    props: true,
    meta: {
      title: 'Crypto Details - CryptoSniffers'
    }
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio,
    meta: {
      title: 'My Portfolio - CryptoSniffers'
    }
  },
  {
    path: '/analysis',
    name: 'Analysis',
    component: Analysis,
    meta: {
      title: 'Market Analysis - CryptoSniffers'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'CryptoSniffers'
  next()
})

export default router