import axios from 'axios'
import router from '../router'
import log from 'services/log'
import socket from 'services/socket'

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

  login (email, password) {
    axios.post('/api/v1/login', {
      email, password
    }).then(({ data: { user } }) => {
      Object.assign(state, { user })
    }).then(() => {
      // Login to foodsharing, then connect to it's websocket
      return foodsharingLogin(email, password)
        .then(() => socket.connect())
        .catch(err => log.error('failed to connect to socket', err))
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
    return axios.post('/api/v1/logout').then(() => {
      socket.disconnect()
      router.push({ name: 'index' })
    })
  }

}

/*
*  This is so we are a valid user when we connect to the websocket for chat
*/
export function foodsharingLogin (email, password) {
  return axios.request({
    // url: '/foodsharing/login',
    url: '/fs/xhrapp.php?app=login&m=loginsubmit',
    params: {
      u: email,
      p: password
    }
  })
}
