import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from 'components/MainLayout'

import auth from 'services/auth'

Vue.use(VueRouter)

// global components
Vue.component('main-layout', MainLayout)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

/*
 Is this needed to do some live reload stuff?
 function load (component) {
 return () => System.import(`components/${component}.vue`)
 }
 */

const protectRoute = (to, from, next) => {
  if (auth.state.authenticated) {
    next()
  }
  else {
    next()
    auth.state.to = to
    next({ name: 'login' })
  }
}

const redirectIfLoggedIn = (to, from, next) => {
  if (auth.state.authenticated) {
    next({ name: 'index' })
  }
  else {
    next()
  }
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { name: 'index', path: '/', component: load('Index'), beforeEnter: protectRoute }, // Default
    { name: 'login', path: '/login', component: load('Login'), beforeEnter: redirectIfLoggedIn }, // Login
    { name: 'logout', path: '/logout', component: load('Login') }, // Login
    { path: '/stores', component: load('Stores'), beforeEnter: protectRoute }, // Stores
    { path: '/chats', component: load('Chats'), beforeEnter: protectRoute }, // Chats
    { path: '*', component: load('Error404') } // Not found
  ]
})
