import foodsharing from 'services/foodsharing'
import api from 'services/api'

export const state = {

  // stores just the list, no messages
  conversationList: [],

  // stores conversations by id, including the messages
  conversations: {}

}

export default {

  state,

  send (conversationId, body) {
    return foodsharing.sendMessage(conversationId, body).then(msg => {
      this.receiveMessage(convertMessage(msg))
    })
  },

  getOrCreateConversationForUser (id) {
    return foodsharing.user2conv(id)
  },

  loadConversation (id) {
    return api.getConversation(id).then(conversation => {
      conversationDecodeHtmlEntities(conversation)
      state.conversations[id] = conversation
      return conversation
    })
  },

  clearConversation (id) {
    delete state.conversations[id]
  },

  loadConversationList () {
    return api.getConversationList().then(conversations => {
      conversations.forEach(conversationDecodeHtmlEntities)
      state.conversationList = conversations
      return state.conversationList
    })
  },

  receiveMessage (message) {
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
  }

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

/*
 * Foodsharing db has encoded html entities (e.g. "fish &amp; chips")
 *
 * Function to reverse php htmlentities() function
 * Get list of entities by running:
 *
 *   php -r 'var_dump(get_html_translation_table());`
 *
 */
export function decodeHtmlEntities (str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '""')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
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
    body: decodeHtmlEntities(body),
    sentBy: {
      id: parseInt(userId, 10),
      firstName
    },
    messageId: parseInt(messageId, 10),
    conversationId: parseInt(conversationId, 10)
  }
}
