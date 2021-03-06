import { escape, autolink, decodeHtmlEntities } from 'services/stringUtils'

describe('services/stringUtils', () => {
  it('escape', () => {
    expect(escape('<script>')).to.equal('&lt;script&gt;')
    expect(escape('\n')).to.equal('\n')
  })

  it('autolink', () => {
    expect(autolink('http://yunity.org')).to.equal('<a href="http://yunity.org" target="_blank">yunity.org</a>')
  })

  context('decodeHtmlEntities', () => {
    let pairs = [
      ['&amp;', '&']
    ]
    pairs.forEach(([from, to]) => {
      it(`converts "${from}" -> "${to}"`, () => {
        expect(decodeHtmlEntities(from)).to.equal(to)
      })
    })
  })
})
