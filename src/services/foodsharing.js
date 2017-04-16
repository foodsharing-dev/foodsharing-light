/*
 *  Functions to access existing foodsharing site
 */

import axios from 'axios'

// Must have a proxy configured to forward this path to foodsharing site
// and then remove the prefix
export function prefix (path) {
  return '/fs' + path
}

export default {

  /*
  *  This is so we are a valid user when we connect to the websocket for chat
  */
  login (email, password) {
    // TODO: check for invalid credential failure (hint: it's still 200)
    return axios.request({
      url: prefix('/xhrapp.php?app=login&m=loginsubmit'),
      params: {
        u: email,
        p: password
      }
    })
  },

  sendMessage (conversationId, body) {
    let data = new FormData()
    data.append('c', conversationId)
    data.append('b', body)
    return axios.post(prefix('/xhrapp.php?app=msg&m=sendmsg'), data)
      .then(({ data: { data: { msg } } }) => {
        Object.assign(msg, { cid: conversationId })
        return this.convertMessage(msg)
      })
  },

  /* Get conversation id for a user (will create it if not available)
   */
  user2conv (userId) {
    return axios.request({
      url: prefix('/xhrapp.php?app=msg&m=user2conv'),
      params: {
        fsid: userId
      }
    }).then(({ data: { data: { cid } } }) => {
      return cid
    })
  },

  /*
   * Foodsharing db has encoded html entities (e.g. "fish &amp; chips")
   *
   * Function to reverse php htmlentities() function
   * Get list of entities by running:
   *
   *   php -r 'var_dump(get_html_translation_table());`
   *
   */
  decodeHtmlEntities (str) {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '""')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
  },

  /*
   * Convert message from existing foodsharing format to our format
   * See /api/doc#get--api-v1-conversation-{id}
   */
  convertMessage ({
    time: sentAt,
    body,
    fs_name: firstName,
    fs_id: userId,
    id: messageId,
    cid: conversationId
  }) {
    return {
      // Foodsharing does not return timezone information, but seems to be in UTC
      // Not sure if this works in production or is because of my docker backend...
      sentAt: sentAt + '+0000',
      body: this.decodeHtmlEntities(body),
      sentBy: {
        id: parseInt(userId, 10),
        firstName
      },
      messageId: parseInt(messageId, 10),
      conversationId: parseInt(conversationId, 10)
    }
  }

}
