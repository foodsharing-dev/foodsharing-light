import axios from 'axios'

import foodsharing from 'services/foodsharing'

export default {

  login (email, password) {
    return axios.post('/api/v1/session', {
      email, password
    }).then(({ data: { user } }) => {
      return { user }
    })
  },

  checkLogin () {
    return axios.get('/api/v1/session').then(({ data: { user } }) => {
      return user
    }).catch(err => {
      console.log('checkLogin err', err)
      return null
    })
  },

  logout () {
    return axios.delete('/api/v1/session')
  },

  getConversationList () {
    return axios.get('/api/v1/conversations').then(({ data: { conversations } }) => {
      conversations.forEach(conversationDecodeHtmlEntities)
      return conversations
    })
  },

  getConversation (id) {
    return axios.get(`/api/v1/conversations/${id}`).then(({ data: { conversation } }) => {
      conversationDecodeHtmlEntities(conversation)
      let usersById = {}
      conversation.members.forEach(member => {
        usersById[member.id] = member
      })
      conversation.messages.forEach(message => {
        let member = usersById[message.sentBy.id]
        if (member) {
          message.sentBy = member
        }
      })
      return conversation
    })
  },

  getNextPickupList () {
    return axios.get('/api/v1/pickups/next').then(({ data: { pickups } }) => {
      pickups.forEach(setPickupId)
      return pickups
    })
  },

  getPickup (id) {
    return axios.get(`/api/v1/pickups/${id}`).then(({ data: { pickup } }) => {
      return pickup
    })
  },

  getStoreList () {
    return axios.get('/api/v1/stores').then(({ data: { stores } }) => {
      return stores
    })
  },

  getStore (id) {
    return axios.get(`/api/v1/stores/${id}`).then(({ data: { store } }) => {
      return store
    })
  }
}

export function setPickupId (pickup) {
  pickup.id = [pickup.store.id, pickup.at].join(':')
}

export function conversationDecodeHtmlEntities (conversation) {
  if (conversation.messages) {
    conversation.messages.forEach(message => {
      message.body = foodsharing.decodeHtmlEntities(message.body)
    })
  }
  if (conversation.lastMessage) {
    conversation.lastMessage.body = foodsharing.decodeHtmlEntities(conversation.lastMessage.body)
  }
}
