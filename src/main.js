
import Vue from 'vue'
import Quasar, { Toast } from 'quasar'
import moment from 'moment'

import router from './router'
import i18n from 'i18n'
import auth from 'services/auth'
import socket from 'services/socket'
import chat from 'services/chat'
import FromNow from 'components/FromNow'
import FormattedDate from 'components/FormattedDate'
import Loading from 'components/Loading'
import LangSwitcher from 'components/LangSwitcher'
import MainLayout from 'layouts/MainLayout'

import autofocus from 'directives/autofocus'

import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}

Vue.use(Quasar) // Install Quasar Framework

// global components
Vue.component('from-now', FromNow)
Vue.component('formatted-date', FormattedDate)
Vue.component('loading', Loading)
Vue.component('lang-switcher', LangSwitcher)
Vue.component('main-layout', MainLayout)

Vue.directive('autofocus', autofocus)

// this is better than having it in the component, but not by much
Vue.prototype.layoutViewScrollToBottom = () => {
  let el = document.querySelector('.layout-view')
  el.scrollTop = el.scrollHeight
}

moment.locale('de')

// wireup socket to chats
// TODO: make it unsubscribe
socket.subscribe(message => {
  chat.receiveMessage(message)
})

Quasar.start(() => {
  auth.check().catch(err => {
    Toast.create.negative('Auth check error. ' + err.message)
  }).then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#q-app',
      i18n,
      router,
      render: h => h(require('./App'))
    })
  })
})
