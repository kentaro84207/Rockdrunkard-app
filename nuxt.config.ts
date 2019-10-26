import { Configuration } from '@nuxt/types'
import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
const { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID } = process.env

const config: Configuration = {
  mode: 'spa',
  srcDir: 'app/',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ,
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
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
    '~/assets/css/reset.css',
    '~/assets/css/base.css',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/firebase.ts' },
    { src: '~/plugins/auth.ts' }
  ],
  /*
  ** Nuxt.js modules
  */
  buildModules: [
    ['@nuxt/typescript-build', {
      typeCheck: true,
      ignoreNotFoundWarnings: true
    }]
  ],
  modules: [
    '@nuxtjs/vuetify',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
  ],
  extends: [
    '@nuxtjs/eslint-config-typescript'
  ],
  styleResources: {
    scss: [
      '~/assets/scss/foundation/_variable.scss',
    ]
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: process.env.DATABASEURL
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      themes: {
        light: {
          primary: colors.indigo.darken2,
          accent: colors.amber.accent1,
          secondary: colors.cyan.lighten4,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.purple.darken4,
          bg: colors.lightBlue.lighten5,
          r0: colors.blue.darken2,
          r1: colors.yellow.darken2,
          r2: colors.orange.darken1,
          r3: colors.red.darken1,
          r4: colors.green.darken3,
          r5: '#fff',
          r6: colors.grey.lighten1,
          r7: colors.grey.darken4,
        }
      }
    }
  },
  router: {
    middleware: 'authenticated'
  },
  env: {
    APIKEY,
    AUTHDOMAIN,
    DATABASEURL,
    PROJECTID,
    STORAGEBUCKET,
    MESSAGINGSENDERID,
  }
  // env: envSet,
  /*
  ** Build configuration
  */
  // build: {
  //   /*
  //   ** You can extend webpack config here
  //   */
  //   extend(config, ctx) {
  //   }
  // }
}

export default config
