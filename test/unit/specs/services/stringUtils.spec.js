import { escape, autolink, nl2br } from 'services/stringUtils'

describe('services/stringUtils', () => {
  it('escape', () => {
    expect(escape('<script>')).to.equal('&lt;script&gt;')
    expect(escape('\n')).to.equal('\n')
  })

  it('autolink', () => {
    expect(autolink('http://yunity.org')).to.equal('<a href="http://yunity.org" target="_blank">yunity.org</a>')
  })

  it('nl2br', () => {
    expect(nl2br('hello\nworld\n')).to.equal('hello<br>world<br>')
  })
})
