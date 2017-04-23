import log from 'services/log'

const sandbox = sinon.sandbox.create()

describe('services/log', () => {
  afterEach(() => sandbox.restore())

  describe('info', () => {
    it('writes to console', () => {
      let logStub = sandbox.stub(console, 'log').returns()
      log.info('a', 'b', 'c', 4)
      expect(logStub).to.have.been.calledWith('a', 'b', 'c', 4)
    })
  })

  describe('error', () => {
    it('writes to console', () => {
      let logStub = sandbox.stub(console, 'error').returns()
      log.error('a', 'b', 'c', 4)
      expect(logStub).to.have.been.calledWith('a', 'b', 'c', 4)
    })
  })
})
