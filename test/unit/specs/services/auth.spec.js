describe('auth service', () => {
  let auth

  beforeEach(() => {
    // TODO: delete more stuff than this...
    let path = require.resolve('services/auth')
    if (require.cache[path]) {
      delete require.cache[path]
    }
    auth = require('services/auth').default
  })

  it('exists', () => {
    expect(auth).to.be.ok
  })

  it('is initialized as unauthenticated', () => {
    expect(auth.state.authenticated).to.be.false
  })
})
