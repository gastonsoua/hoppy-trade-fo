const pkg = require('./package')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  env: {
    NODE_ENV: process.env.NODE_ENV,
    baseURL: process.env.baseURL,
  },
  mode: 'spa',

  /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
  ssr: true,

  /*
       ** Nuxt target
       ** See https://nuxtjs.org/api/configuration-target
       */
  target: 'server',

  server: {
    port: 9010
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Vue Material Admin Template',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {
        hid: 'description', name: 'description', content: 'Vue Material Admin Template is a \n' +
          '    Google Material Design inspired admin dashboard template built with Vue and Vuetify.'
      }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ],
    script: [
      {src: 'https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js'}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3adced'},

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/theme.styl',
    '~/assets/style/app.styl',
    'font-awesome/css/font-awesome.css',
    'roboto-fontface/css/roboto/roboto-fontface.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify',
    '@/plugins/vee-validate',
    '@/plugins/axios.js',
    '@/plugins/set-guest-uuid.js',
  ],
  router: {},
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt',
  ],
  axios: {
    baseURL: process.env.baseURL,
  },
  auth: {
    strategies: {
      local: {
        user: {
          property: "data"
        },
        endpoints: {
          login: {
            url: '/login',
            method: 'post',
          },
          user: {
            url: '/user',
            method: 'get',
          },
          logout: {
            url: '/logout',
            method: 'post',
          },
        },
      },
    },
    redirect: {
      login: '/login',
      logout: '/',
      home: '/',
    },
  },


  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },

    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
