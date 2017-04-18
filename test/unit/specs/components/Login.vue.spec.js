import Vue from 'vue'

describe('components/Login.vue', () => {
  let vm, login

  beforeEach(() => {
    login = sinon.stub().returns(Promise.resolve())
    let Login = require('!!vue-loader?inject!components/Login.vue')({
      'services/auth': { login }
    })
    vm = new Vue(Login).$mount()
  })

  it('calls the login method on services/auth', () => {
    Object.assign(vm, {
      email: 'test@test.com',
      password: 'testpassword'
    })
    return vm.login().then(() => {
      expect(login).to.have.been.calledWith('test@test.com', 'testpassword')
    })
  })
})
