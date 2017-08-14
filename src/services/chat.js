import Vue from 'vue'

import foodsharing from 'services/foodsharing'
import api from 'services/api'
import { escape, autolink } from 'services/stringUtils'

export const state = {

  // stores just the list, no messages
  conversationList: [],

  // stores conversations by id, including the messages
  conversations: {}

}

export default {

  state,

  send (conversationId, body) {
    return foodsharing.sendMessage(conversationId, body).then(message => {
      this.receiveMessage(message)
    })
  },

  getOrCreateConversationForUser (id) {
    return foodsharing.user2conv(id)
  },

  loadConversation (id) {
    return api.getConversation(id).then(conversation => {
      Vue.set(state.conversations, id, conversation)
      return conversation
    })
  },

  clearConversation (id) {
    Vue.delete(state.conversations, id)
  },

  loadConversationList () {
    return api.getConversationList().then(conversations => {
      // Use array mutation methods so any bindings update
      state.conversationList.splice(0)
      state.conversationList.push.apply(state.conversationList, conversations)
      return state.conversationList
    })
  },

  receiveMessage (message) {
    formatMessage(message)
    let { conversationId } = message
    let conversation = state.conversations[conversationId]
    if (conversation) {
      conversation.messages.push(message)
      conversation.lastMessage = message
      conversation.lastMessageAt = message.sentAt
    }
    conversation = state.conversationList.find(c => c.id === conversationId)
    if (conversation) {
      conversation.lastMessage = message
      conversation.lastMessageAt = message.sentAt
      state.conversationList.sort((a, b) => a.lastMessageAt - b.lastMessageAt)
    }
    else {
      // we don't have this conversation in our list, reload the list
      return this.loadConversationList()
    }
    return Promise.resolve()
  }

}

export function formatMessage (message) {
  // sanitize and autolink. linebreaks are done via CSS
  // safe to output directly to html
  message.formattedBody = autolink(escape(message.body))
}
