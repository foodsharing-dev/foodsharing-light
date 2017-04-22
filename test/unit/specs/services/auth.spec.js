import auth from 'services/auth'
import api from 'services/api'
import foodsharing from 'services/foodsharing'

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
})
