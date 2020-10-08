require('dotenv').config();
import redirectSSL from 'redirect-ssl';

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/font/nunito/stylesheet.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: "~/plugins/apollo-ws-client.js", mode: "client" }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/apollo'
  ],
  apollo: {
    errorHandler: '~/plugins/apollo-error-handler.js',
    clientConfigs: {
      default:
      {
        httpEndpoint: process.env.GRAPHQL_ENDPOINT,
        wsEndpoint: process.env.WS_GRAPHQL_ENDPOINT,
        httpLinkOptions: {
          credentials: 'same-origin'
        },
        tokenName: 'apollo-token'
      }
    },
    authenticationType: ''
  },
  router: {
    middleware: ['isAuth']
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://nuxt-community.github.io/nuxt-i18n
    [
      'nuxt-i18n',
      {
        locales: ['en', 'br'],
        defaultLocale: 'br',
        vueI18n: {
          fallbackLocale: 'br',
          messages: {
            // Add new locales here
            en: require('./locales/en.json'),
            br: require('./locales/br.json')
          }
        }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },
  serverMiddleware: [
    redirectSSL.create({
      enabled: process.env.NODE_ENV !== 'development'
    }),
  ]
};
