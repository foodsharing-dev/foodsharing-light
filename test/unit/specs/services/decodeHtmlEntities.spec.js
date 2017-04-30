import decodeHtmlEntities from 'services/decodeHtmlEntities'

describe('services/decodeHtmlEntities', () => {
  let pairs = [
    ['&amp;', '&']
  ]
  pairs.forEach(([from, to]) => {
    it(`converts "${from}" -> "${to}"`, () => {
      expect(decodeHtmlEntities(from)).to.equal(to)
    })
  })
})
