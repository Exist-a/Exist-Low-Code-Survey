// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  css: ['~/assets/scss/global.scss'],
  modules:['@nuxt/icon','@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 注入变量文件，确保所有 SCSS 都能访问变量
          additionalData: `@use "~/assets/scss/variable.scss" as *;`
        }
      }
    }
  }
})
