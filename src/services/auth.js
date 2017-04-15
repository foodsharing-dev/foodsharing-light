import axios from 'axios'
import router from '../router'

export default {

  state: {
    authenticated: false, // are we currently authenticated?
    to: null // which route to go to after we succeed
  },

  login (username, password) {
    return foodsharingLogin(username, password).then(() => {
      this.state.authenticated = true
      let { name, params } = this.state.to || {}
      this.state.to = null
      if (name && params) {
        router.push({ name, params })
      }
      else {
        router.push({ name: 'index' })
      }
    })
  },

  logout () {
    // might have more state to clear... could just reload the page...
    this.state.authenticated = false
    return Promise.resolve().then(() => {
      router.push({ name: 'index' })
    })
  }

}

/*
*  This is so we are a valid user when we connect to the websocket for chat
*/
export function foodsharingLogin (username, password) {
  return axios.request({
    // url: '/foodsharing/login',
    url: '/fs/xhrapp.php?app=login&m=loginsubmit',
    params: {
      u: username,
      p: password
    }
  })
}
