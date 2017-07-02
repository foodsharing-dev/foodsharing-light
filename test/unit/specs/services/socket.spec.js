import socketio from 'socket.io-client'

import socket, { subscribers } from 'services/socket'
import foodsharing from 'services/foodsharing'

const sandbox = sinon.sandbox.create()

describe('services/socket', () => {
  afterEach(() => sandbox.restore())
  afterEach(() => socket.disconnect())
  afterEach(() => subscribers.splice(0))

  describe('connect', () => {
    it('connects and emits "register"', () => {
      let emit = sandbox.stub().returns()
      let on = sandbox.stub().callsFake((name, fn) => {
        if (name === 'connect') fn()
      })
      sandbox.stub(socketio, 'connect')
        .callsFake(() => ({
          on,
          emit,
          disconnect: () => {}
        }))
      return socket.connect().then(() => {
        expect(socketio.connect).to.have.been.calledWith({ path: '/foodsharing/socket' })
        expect(on).to.have.been.calledTwice
        expect(on).to.have.been.calledWithMatch('connect')
        expect(emit).to.have.been.calledWith('register')
      })
    })

    it('sends "conv" messages to subscribers', () => {
      let spy = sinon.spy()
      socket.subscribe(spy)
      let payload = { o: JSON.stringify({ some: 'message' }) }
      let emit = sandbox.stub().returns()
      let onConvFn
      let on = sandbox.stub().callsFake((name, fn) => {
        if (name === 'connect') fn()
        if (name === 'conv') onConvFn = fn
      })
      sandbox.stub(foodsharing, 'convertMessage').callsFake(msg => msg)
      sandbox.stub(socketio, 'connect')
        .callsFake(() => ({
          on,
          emit,
          disconnect: () => {}
        }))
      return socket.connect().then(() => {
        expect(on).to.have.been.calledWithMatch('conv')
        onConvFn(payload)
        expect(spy).to.have.been.calledWith({
          some: 'message'
        })
      })
    })

    it('can subscribe and unsubscribe', () => {
      let spy = sinon.spy()
      expect(subscribers.length).to.equal(0)
      let unsubscribe = socket.subscribe(spy)
      expect(subscribers.length).to.equal(1)
      subscribers[0]()
      expect(spy).to.have.been.called
      unsubscribe()
      expect(subscribers.length).to.equal(0)
    })
  })
})
