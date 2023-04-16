// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api.cas.ziqiang.net.cn',
        changeOrigin: true,
        prependPath: true,
      },
    },
  },
  typescript: {
    strict: true,
  },
});
