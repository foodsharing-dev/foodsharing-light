import router from '../router'

export default {

  state: {
    authenticated: false, // are we currently authenticated?
    to: null // which route to go to after we succeed
  },

  login (username, password) {
    return Promise.resolve().then(() => {
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
