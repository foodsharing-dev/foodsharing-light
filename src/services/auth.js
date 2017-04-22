import router from '../router'
import log from 'services/log'
import socket from 'services/socket'
import foodsharing from 'services/foodsharing'
import api from 'services/api'

export const state = {

  // are we currently authenticated?
  authenticated: false,

  // which route to go to after we succeed,
  to: null,

  // currently logged in uesr
  user: null

}

export default {

  state,

  /*
   *  Check if we are already logged in
   */
  check () {
    return api.checkLogin().then(user => {
      if (!user) return false
      return foodsharing.checkLogin().then(fsLoggedIn => {
        if (!fsLoggedIn) return false
        Object.assign(state, { authenticated: true, user })
      })
    })
  },

  login (email, password) {
    return api.login(email, password).then(({ user }) => {
      Object.assign(state, { user })
    }).then(() => {
      // Login to foodsharing
      return foodsharing.login(email, password)
    }).then(() => {
      // Connect to foodsharing websocket
      return socket.connect()
        .catch(err => {
          log.error('failed to connect to foodsharing socket', err)
          return Promise.reject(err)
        })
    }).then(() => {
      state.authenticated = true
      let { name, params } = state.to || {}
      state.to = null
      if (name && params) {
        router.push({ name, params })
      }
      else {
        router.push({ name: 'index' })
      }
    }).catch(err => {
      // Logout then return the original error
      return this.logout()
        .catch(err => log.error('failed to logout', err))
        .then(() => Promise.reject(err))
    })
  },

  logout () {
    // might have more state to clear... could just reload the page...
    Object.assign(state, {
      user: null,
      authenticated: false
    })
    return api.logout().then(() => {
      socket.disconnect()
    })
  }

}
