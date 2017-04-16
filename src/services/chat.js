import socketio from 'socket.io-client'

// TODO: handle hot loading unsubscribe/resubscribing...

export default {
  io: null,
  subscribers: [],

  /*
  *  Subscribe to receive messages
  *  Returns a function that will unsubscribe you
  */
  subscribe (fn) {
    this.subscribers.push(fn)
    return () => {
      let idx = this.subscribers.indexOf(fn)
      if (idx !== -1) this.subscribers.splice(idx, 1)
    }
  },

  /*
  * Connects to the socket.io socket if not already
  * Returns a promise that resolves when connected
  */
  connect () {
    if (this.io) return Promise.resolve()
    return new Promise((resolve, reject) => {
      this.io = socketio({ path: '/foodsharing/socket' })
      this.io.on('connect', () => {
        this.io.emit('register')
        resolve()
      })
      this.io.on('conv', data => {
        if (!data.o) return
        let message = JSON.parse(data.o)
        this.subscribers.forEach(fn => fn(mapMessage(message)))
      })
    })
  }

}

/*
* Convert message from foodsharing socket.io API format to our format
*/
export function mapMessage ({
  time,
  body,
  fs_name: userName,
  fs_id: userId,
  id: messageId,
  cid: conversationId
}) {
  return {
    time, body, userName, userId, messageId, conversationId
  }
}
