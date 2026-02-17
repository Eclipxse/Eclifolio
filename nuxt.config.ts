// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@tresjs/nuxt',
    '@vueuse/nuxt',
    '@nuxt/icon'
  ],


  css: [
    '~/assets/css/main.css'
  ],

  build: {
    transpile: ['gsap']
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Eclipxse Portfolio',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'High-end immersive portfolio.' }
      ],
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Inter:wght@300;400;500;600;700&display=swap' }
      ]
    }
  },

  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})