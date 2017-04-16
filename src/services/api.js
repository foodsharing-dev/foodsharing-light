import axios from 'axios'

import foodsharing from 'services/foodsharing'

export default {

  login (email, password) {
    return axios.post('/api/v1/login', {
      email, password
    }).then(({ data: { user } }) => {
      return { user }
    })
  },

  logout () {
    return axios.post('/api/v1/logout')
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
      return conversation
    })
  }

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
