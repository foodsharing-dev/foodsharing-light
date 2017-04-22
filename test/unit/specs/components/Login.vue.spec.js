import Vue from 'vue'

import Login from 'components/Login'
import auth from 'services/auth'

const sandbox = sinon.sandbox.create()

describe('components/Login.vue', () => {
  let vm, loginStub

  afterEach(() => sandbox.restore())

  beforeEach(() => {
    loginStub = sandbox.stub(auth, 'login').resolves(null)
    vm = new Vue(Login).$mount()
  })

  it('calls the login method on services/auth', () => {
    Object.assign(vm, {
      email: 'test@test.com',
      password: 'testpassword'
    })
    return vm.login().then(() => {
      expect(loginStub).to.have.been.calledWith('test@test.com', 'testpassword')
    })
  })
})
