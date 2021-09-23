import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/simpeg/roemani.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css',
    'typeface-roboto/index.css',
    '@mdi/font/css/materialdesignicons.css',
    '@/assets/css/index.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/auth',
    '@/plugins/repository',
    '@/plugins/alert',
    '@/plugins/baseurl',
    '@/plugins/antd-ui',
    '@/plugins/other-ui',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'http://localhost:8000/api/',
    headers: {
      common: {
        Accept: 'application/json, text/plain, */*',
      },
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    source: '@/static/roemani.png',
    fileName: 'roemani.png',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['vue-excel-editor'],
  },
  loading: {
    color: 'white',
  },
  router: {
    base: '/simpeg/',
    middleware: ['auth', 'maintenance'],
  },
  server: {
    port: 3000, // default: 3000
    host: '0.0.0.0', // default: localhost,
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'token',
          maxAge: 60 * 60,
        },
        refreshToken: {
          property: 'token',
          data: 'token',
          maxAge: 60 * 60 * 24,
        },
        user: {
          property: 'user',
        },
        endpoints: {
          login: { url: 'login', method: 'post' },
          logout: { url: 'logout', method: 'post' },
          user: { url: 'user', method: 'get' },
          refresh: { url: 'refresh', method: 'post' },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/login',
      callback: '/login',
      home: '/',
    },
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000/simpeg',
  },
}
