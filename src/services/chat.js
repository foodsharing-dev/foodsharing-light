import axios from 'axios'

import log from 'services/log'

export const state = {
  conversations: {}
}

export default {

  state,

  send (conversationId, body) {
    let data = new FormData()
    data.append('c', conversationId)
    data.append('b', body)
    return axios.post('/fs/xhrapp.php?app=msg&m=sendmsg', data)
      .then(({ data: { data: { msg } } }) => {
        Object.assign(msg, { cid: conversationId })
        this.receiveMessage(convertMessage(msg))
      })
  },

  loadConversation (id) {
    return axios.get(`/api/v1/conversation/${id}`).then(({ data: { conversation } }) => {
      state.conversations[id] = conversation
      return conversation
    })
  },

  receiveMessage (message) {
    let { conversationId } = message
    let conversation = state.conversations[conversationId]
    if (conversation) {
      conversation.messages.push(message)
      conversation.lastMessage = message
    }
    else {
      log.info('no conversation found for', conversationId)
    }
  }

}

export function fetchConversationList () {
  return axios.get('/api/v1/converations').then(({ data: { conversations } }) => {
    Object.assign(state, { conversations })
  })
}

export function ensureConversation (id) {
  let conversation = state.conversations[id]
  if (conversation) {
    return Promise.resolve(conversation)
  }
  else {
    // must fetch it
    return axios.get(`/api/v1/conversation/${id}`).then(({ data: { conversation } }) => {
      state.conversations[id] = conversation
      return conversation
    })
  }
}

/*
 * Convert message from existing foodsharing format to our format
 * See /api/doc#get--api-v1-conversation-{id}
 */
export function convertMessage ({
  time: sentAt,
  body,
  fs_name: firstName,
  fs_id: userId,
  id: messageId,
  cid: conversationId
}) {
  return {
    sentAt,
    body,
    sentBy: {
      id: parseInt(userId, 10),
      firstName
    },
    messageId: parseInt(messageId, 10),
    conversationId: parseInt(conversationId, 10)
  }
}
