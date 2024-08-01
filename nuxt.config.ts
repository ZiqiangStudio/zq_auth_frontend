import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: '自强统一认证',
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/logo.svg',
        },
      ],
      script: [
        {
          src: 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js',
        },
      ],
    },
  },
  nitro: {
    devProxy: {
      '/api': {
        target: 'https://api.cas.ziqiang.net.cn',
        changeOrigin: true,
        prependPath: true,
      },
    },
    prerender: {
      routes: ['/login', '/certify', '/certify-pending', '/certify-success', '/register', '/reset'],
    },
  },
  typescript: {
    strict: true,
  },
  vite: {
    plugins: [svgLoader()],
  },
});
