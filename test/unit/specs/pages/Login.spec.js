import Vue from 'vue'

import Login from 'pages/Login'
import auth from 'services/auth'

const sandbox = sinon.sandbox.create()

describe('pages/Login.vue', () => {
  let vm

  afterEach(() => sandbox.restore())

  beforeEach(() => {
    sandbox.stub(auth, 'login').resolves(null)
    vm = new Vue(Login).$mount()
  })

  it('calls the login method on services/auth', () => {
    Object.assign(vm, {
      email: 'test@test.com',
      password: 'testpassword'
    })
    return vm.login().then(() => {
      expect(auth.login).to.have.been.calledWith('test@test.com', 'testpassword')
    })
  })
})
