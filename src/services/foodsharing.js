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
        return msg
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
    }).then(({ data: { cid } }) => {
      return cid
    })
  }

}
