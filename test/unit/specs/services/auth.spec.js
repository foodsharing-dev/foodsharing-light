import chai from 'chai'

import auth from 'services/auth'
import api from 'services/api'
import foodsharing from 'services/foodsharing'
import socket from 'services/socket'
import router from 'src/router'

const sandbox = sinon.sandbox.create()

describe('services/auth', () => {
  afterEach(() => sandbox.restore())

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
      let apiStub = sandbox.stub(api, 'checkLogin').resolves(user)
      let foodsharingStub = sandbox.stub(foodsharing, 'checkLogin').resolves(true)
      return auth.check().then(() => {
        expect(apiStub).to.have.been.called
        expect(foodsharingStub).to.have.been.called
        expect(auth.state.user).to.deep.equal(user)
        expect(auth.state.authenticated).to.be.true
      })
    })

    it('does not check foodsharing if api is not logged in', () => {
      let apiStub = sandbox.stub(api, 'checkLogin').resolves(null)
      let foodsharingStub = sandbox.stub(foodsharing, 'checkLogin').resolves(true)
      return auth.check().then(() => {
        expect(apiStub).to.have.been.called
        expect(foodsharingStub).to.not.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })

    it('will not assign user if foodsharing check fails', () => {
      let apiStub = sandbox.stub(api, 'checkLogin').resolves({ id: 1 })
      let foodsharingStub = sandbox.stub(foodsharing, 'checkLogin').resolves(false)
      return auth.check().then(() => {
        expect(apiStub).to.have.been.called
        expect(foodsharingStub).to.have.been.called
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
      let apiStub = sandbox.stub(api, 'login').resolves({ user })
      let foodsharingStub = sandbox.stub(foodsharing, 'login').resolves()
      let socketStub = sandbox.stub(socket, 'connect').resolves()
      let routerStub = sandbox.stub(router, 'push').resolves()
      return auth.login(email, password).then(() => {
        expect(apiStub).to.have.been.calledWith(email, password)
        expect(foodsharingStub).to.have.been.calledWith(email, password)
        expect(socketStub).to.have.been.called
        expect(routerStub).to.have.been.calledWith({ name: 'index' })
        expect(auth.state.user).to.deep.equal(user)
        expect(auth.state.authenticated).to.be.true
      })
    })

    it('will not proceed if api login fails', () => {
      let email = 'invalid'
      let password = 'credentials'
      let apiStub = sandbox.stub(api, 'login').rejects(new Error('invalid user'))
      let foodsharingStub = sandbox.stub(foodsharing, 'login').resolves()
      let socketStub = sandbox.stub(socket, 'connect').resolves()
      let routerStub = sandbox.stub(router, 'push').resolves()
      return auth.login(email, password).then(() => {
        chai.assert.fail(null, null, 'should have failed')
      }).catch(err => {
        if (err.name === 'AssertionError') return Promise.reject(err)
        expect(apiStub).to.have.been.calledWith(email, password)
        expect(foodsharingStub).to.not.have.been.called
        expect(socketStub).to.not.have.been.called
        expect(routerStub).to.not.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })
  })

  describe('logout', () => {
    it('will logout of api and disconnect from socket', () => {
      let apiStub = sandbox.stub(api, 'logout').resolves()
      let socketStub = sandbox.stub(socket, 'disconnect').resolves()
      Object.assign(auth.state, {
        user: { id: 'user1' },
        authenticated: true
      })
      return auth.logout().then(() => {
        expect(apiStub).to.have.been.called
        expect(socketStub).to.have.been.called
        expect(auth.state.user).to.be.null
        expect(auth.state.authenticated).to.be.false
      })
    })
  })
})
