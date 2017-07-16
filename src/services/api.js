import Axios from 'axios'
import decodeHtmlEntities from 'services/decodeHtmlEntities'
import camelCase from 'camelcase'

const axios = Axios.create({
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFTOKEN'
})

axios.interceptors.response.use(response => {
  response.data = camelizeKeys(response.data)
  return response
})

export default {

  login (email, password) {
    return axios.post('/api/v1/session/', {
      email, password
    }).then(({ data: { user } }) => {
      return { user }
    })
  },

  checkLogin () {
    return axios.get('/api/v1/session/').then(({ data: user }) => {
      return user
    }).catch(err => {
      if (err.response && err.response.status === 404) {
        // 404 means we have no current session
        return null
      }
      else {
        // actually an error
        return Promise.reject(err)
      }
    })
  },

  logout () {
    return axios.delete('/api/v1/session/')
  },

  getConversationList () {
    return axios.get('/api/v1/conversations/').then(({ data: conversations }) => {
      conversations.forEach(conversationDecodeHtmlEntities)
      return conversations
    })
  },

  getConversation (id) {
    return axios.get(`/api/v1/conversations/${id}/`).then(({ data: conversation }) => {
      conversationDecodeHtmlEntities(conversation)
      return conversation
    })
  },

  getNextPickupList () {
    return axios.get('/api/v1/pickups/next/').then(({ data: pickups }) => {
      console.log('pickups:', pickups)
      pickups.forEach(setPickupId)
      return pickups
    })
  },

  getPickup (id) {
    return axios.get(`/api/v1/pickups/${id}/`).then(({ data: pickup }) => {
      setPickupId(pickup)
      return pickup
    })
  },

  getStoreList () {
    return axios.get('/api/v1/stores/').then(({ data: stores }) => {
      return stores
    })
  },

  getStore (id) {
    return axios.get(`/api/v1/stores/${id}/`).then(({ data: store }) => {
      return store
    })
  }
}

export function setPickupId (pickup) {
  pickup.id = [pickup.store.id, pickup.at].join('/')
}

export function conversationDecodeHtmlEntities (conversation) {
  if (conversation.messages) {
    conversation.messages.forEach(message => {
      message.body = decodeHtmlEntities(message.body)
    })
  }
  if (conversation.lastMessage) {
    conversation.lastMessage.body = decodeHtmlEntities(conversation.lastMessage.body)
  }
}

export function isObject (x) {
  return typeof x === 'object' &&
    x !== null &&
    !(x instanceof RegExp) &&
    !(x instanceof Error) &&
    !(x instanceof Date)
}

export function camelizeKeys (val) {
  if (isObject(val)) {
    if (Array.isArray(val)) {
      return val.map(camelizeKeys)
    }
    else {
      let newVal = {}
      for (const key of Object.keys(val)) {
        newVal[camelCase(key)] = camelizeKeys(val[key])
      }
      return newVal
    }
  }
  else {
    return val
  }
}
