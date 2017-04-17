/*
 *  Functions to access existing foodsharing site
 */

import axios from 'axios'

// Must have a proxy configured to forward this path to foodsharing site
// and then remove the prefix
export function prefix (path) {
  return '/fs' + path
}

export function xhrapp (options) {
  return axios.request({
    url: prefix('/xhrapp.php'),
    ...options
  })
}

export default {

  login (email, password) {
    return xhrapp({
      params: {
        app: 'login',
        m: 'loginsubmit',
        u: email,
        p: password
      }
    }).then(({ data: { script } }) => {
      // Foodsharing endpoint returns a script, we do not eval it but just check
      // it contains signs of success (status is always 1 :/)
      if (!/pulseSuccess/.test(script)) {
        return Promise.reject(new Error('login to desktop foodsharing failed'))
      }
    })
  },

  checkLogin () {
    return xhrapp({
      params: {
        app: 'api',
        m: 'checklogin',
        callback: 'ignored'
      }
    }).then(({ data }) => {
      data = convertJsonp('ignored', data)
      return data.status === 1
    })
  },

  sendMessage (conversationId, body) {
    let data = new FormData()
    data.append('c', conversationId)
    data.append('b', body)
    return xhrapp({
      method: 'POST',
      params: {
        app: 'msg',
        m: 'sendmsg'
      },
      data
    }).then(({ data: { data: { msg } } }) => {
      Object.assign(msg, { cid: conversationId })
      return this.convertMessage(msg)
    })
  },

  /* Get conversation id for a user (will create it if not available)
   */
  user2conv (userId) {
    return xhrapp({
      params: {
        app: 'msg',
        m: 'user2conv',
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
    fs_id: userId,
    fs_name: firstName,
    fs_photo: photo,
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
        firstName,
        photo
      },
      messageId: parseInt(messageId, 10),
      conversationId: parseInt(conversationId, 10)
    }
  }

}

export function convertJsonp (name, value) {
  return JSON.parse(value.replace(new RegExp(`^${name}\\(`), '').replace(/\);$/, ''))
}
