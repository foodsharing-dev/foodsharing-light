import Vue from 'vue'
import VueRouter from 'vue-router'
import MainLayout from 'components/MainLayout'

import auth from 'services/auth'
import log from 'services/log'
import chat from 'services/chat'

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
    // { name: 'index', path: '/', component: load('Pickups'), beforeEnter: protectRoute }, // Default
    { name: 'index', path: '/', redirect: { name: 'pickups' }, beforeEnter: protectRoute }, // Default
    { name: 'login', path: '/login', component: load('Login'), beforeEnter: redirectIfLoggedIn }, // Login
    { name: 'signup', path: '/signup', component: load('Signup') }, // Signup
    { name: 'logout', path: '/logout', component: load('Login') }, // Logout
    { name: 'pickups', path: '/pickups', component: load('Pickups'), beforeEnter: protectRoute }, // Stores
    { path: '/pickup/:id', component: load('Pickup'), beforeEnter: protectRoute }, // Stores
    { path: '/stores', component: load('Stores'), beforeEnter: protectRoute }, // Stores
    { path: '/store/:id', component: load('Store'), beforeEnter: protectRoute }, // Chats
    { path: '/chats', component: load('Chats'), beforeEnter: protectRoute }, // Chats
    { name: 'chat', path: '/chat/:id', component: load('Chat'), beforeEnter: protectRoute }, // Chats
    {
      name: 'userChat',
      path: '/users/:userId/chat',
      beforeEnter: (to, from, next) => {
        let { userId } = to.params
        log.info('opening user chat for', userId)
        chat.getOrCreateConversationForUser(userId).then(conversationId => {
          next({ name: 'chat', params: { id: conversationId } })
        }).catch(err => {
          log.error('could not get/create chat for user', err)
          next({ name: 'index' })
        })
      }
    }, // Chats
    { path: '*', component: load('Error404') } // Not found
  ]
})
