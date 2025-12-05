// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['~/assets/scss/global.scss'],
  modules:['@nuxt/icon', '@pinia/nuxt', 'nuxt-echarts'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/scss/variable.scss" as *;`
        }
      }
    }
  }
})