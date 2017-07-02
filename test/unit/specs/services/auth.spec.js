import chai from 'chai'

import auth from 'services/auth'
import api from 'services/api'
import foodsharing from 'services/foodsharing'
import socket from 'services/socket'
import router from 'src/router'

const sandbox = sinon.sandbox.create()

describe('services/auth', () => {
  afterEach(() => sandbox.restore())
  afterEach(() => socket.disconnect())

  beforeEach(() => {
    // TOD: should probably be a reset function inside services/auth
    Object.assign(auth.state, {
      authenticated: false,
      to: null,
      user: null
    })
  })

  describe('check', () => {
    it('checks login for api and foodsharing', () => {
      let user = { id: 'user1', firstName: 'Peter' }
      sandbox.stub(api, 'checkLogin').resolves(user)
      sandbox.stub(foodsharing, 'checkLogin').resolves(true)
      return auth.check().then(() => {
        expect(api.checkLogin).to.have.been.called
        expect(foodsharing.checkLogin).to.have.been.called
        expect(auth.state.user).to.deep.equal(user)
        expect(auth.state.authenticated).to.be.true
      })
    })

    it('does not check foodsharing if api is not logged in', () => {
      sandbox.stub(api, 'checkLogin').resolves(null)
      sandbox.stub(foodsharing, 'checkLogin').resolves(true)
      return auth.check().then(() => {
        expect(api.checkLogin).to.have.been.called
        expect(foodsharing.checkLogin).to.not.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })

    it('will not assign user if foodsharing check fails', () => {
      sandbox.stub(api, 'checkLogin').resolves({ id: 1 })
      sandbox.stub(foodsharing, 'checkLogin').resolves(false)
      return auth.check().then(() => {
        expect(api.checkLogin).to.have.been.called
        expect(foodsharing.checkLogin).to.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })
  })

  describe('login', () => {
    it('logs into both backends and connects to socket', () => {
      let user = { id: 'user1', firstName: 'james' }
      let email = 'test@test'
      let password = 'testpassword'
      sandbox.stub(api, 'login').resolves({ user })
      sandbox.stub(foodsharing, 'login').resolves()
      sandbox.stub(socket, 'connect').resolves()
      sandbox.stub(router, 'push').resolves()
      return auth.login(email, password).then(() => {
        expect(api.login).to.have.been.calledWith(email, password)
        expect(foodsharing.login).to.have.been.calledWith(email, password)
        expect(socket.connect).to.have.been.called
        expect(router.push).to.have.been.calledWith({ name: 'index' })
        expect(auth.state.user).to.deep.equal(user)
        expect(auth.state.authenticated).to.be.true
      })
    })

    it('will not proceed if api login fails', () => {
      let email = 'invalid'
      let password = 'credentials'
      sandbox.stub(api, 'login').rejects(new Error('invalid user'))
      sandbox.stub(foodsharing, 'login').resolves()
      sandbox.stub(socket, 'connect').resolves()
      sandbox.stub(router, 'push').resolves()
      return auth.login(email, password).then(() => {
        chai.assert.fail(null, null, 'should have failed')
      }).catch(err => {
        if (err.name === 'AssertionError') return Promise.reject(err)
        expect(api.login).to.have.been.calledWith(email, password)
        expect(foodsharing.login).to.not.have.been.called
        expect(socket.connect).to.not.have.been.called
        expect(router.push).to.not.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })
  })

  describe('logout', () => {
    it('will logout of api and disconnect from socket', () => {
      sandbox.stub(api, 'logout').resolves()
      sandbox.stub(socket, 'disconnect').resolves()
      Object.assign(auth.state, {
        user: { id: 'user1' },
        authenticated: true
      })
      return auth.logout().then(() => {
        expect(api.logout).to.have.been.called
        expect(socket.disconnect).to.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })
  })
})
