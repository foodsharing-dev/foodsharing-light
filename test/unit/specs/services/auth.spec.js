describe('services/auth', () => {
  let auth

  beforeEach(() => {
    let path = require.resolve('services/auth')
    if (require.cache[path]) {
      delete require.cache[path]
    }
    auth = require('services/auth').default
  })

  it('is initialized as unauthenticated', () => {
    expect(auth.state.authenticated).to.be.false
  })
})
