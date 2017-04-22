import socketio from 'socket.io-client'

import log from 'services/log'
import foodsharing from 'services/foodsharing'

export let io = null
export const subscribers = []

export default {

  /*
   * Subscribe to the websocket receive all messages
   * Returns an unsubscribe function
   */
  subscribe (fn) {
    subscribers.push(fn)
    return () => {
      let idx = subscribers.indexOf(fn)
      if (idx !== -1) subscribers.splice(idx, 1)
    }
  },

  /*
   * Connects to the socket.io socket if not already
   * Returns a promise that resolves when connected
   */
  connect () {
    if (io) return Promise.resolve()
    return new Promise((resolve, reject) => {
      io = socketio.connect({ path: '/foodsharing/socket' })
      io.on('connect', () => {
        io.emit('register')
        log.info('connected to websocket!')
        resolve()
      })
      io.on('conv', data => {
        if (!data.o) return
        let message = foodsharing.convertMessage(JSON.parse(data.o))
        subscribers.forEach(fn => fn(message))
      })
    })
  },

  /*
   * Disconnect from socket.io
   */
  disconnect () {
    if (!io) return
    io.disconnect()
    io = null
  }
}
