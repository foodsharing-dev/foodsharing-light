// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import VueTimeago from 'vue-timeago'

import router from './router'
import auth from 'services/auth'
import socket from 'services/socket'
import chat from 'services/chat'

Vue.use(Quasar) // Install Quasar Framework

Vue.use(VueTimeago, {
  locale: 'en-US',
  locales: {
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})

// TODO: make a less hacky way to logout
// this way is just because I couldn't work out how to make it logout from
// a <q-drawer-link> component, so I made a route...
router.afterEach((to, from) => {
  if (to.name === 'logout') {
    auth.logout()
  }
})

// wireup socket to chats
// TODO: make it unsubscribe
socket.subscribe(message => {
  chat.receiveMessage(message)
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
