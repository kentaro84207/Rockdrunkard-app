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
    theme: {
      primary: colors.blue.lighten1,
      accent: colors.grey.darken3,
      secondary: colors.amber.darken3,
      info: colors.teal.lighten1,
      warning: colors.amber.base,
      error: colors.deepOrange.accent4,
      success: colors.green.accent3,
      r0: colors.blue.lighten3,
      r1: colors.yellow.lighten1,
      r2: colors.orange.lighten2,
      r3: colors.red.darken1,
      r4: colors.green.darken3,
      r5: colors.grey.lighten5,
      r6: colors.grey.lighten1,
      r7: colors.grey.darken4,
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
