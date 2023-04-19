import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
  vite: {
    plugins: [
      svgLoader(),
    ],
  },
});
