import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'

import foodsharing, { convertJsonp } from 'services/foodsharing'

describe('services/foodsharing', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  describe('login', () => {
    let email = 'test@test.com'
    let password = 'mypassword'
    it('checks for "pulseSuccess" in script', () => {
      mock.onGet('/fs/xhrapp.php', {
        params: {
          app: 'login',
          m: 'loginsubmit',
          u: email,
          p: password
        }
      }).reply(200, {
        script: 'pulseSuccess'
      })
      return foodsharing.login(email, password).then(result => {
        expect(result).to.be.undefined
      })
    })

    it('returns error if "pulseSuccess" not in script', () => {
      mock.onGet('/fs/xhrapp.php', {
        params: {
          app: 'login',
          m: 'loginsubmit',
          u: email,
          p: password
        }
      }).reply(200, {
        script: '200 status, but not the text we are looking for'
      })
      return foodsharing.login(email, password).then(result => {
        chai.assert.fail(null, null, 'should not have succeeded')
      }).catch(err => {
        if (err.name === 'AssertionError') return Promise.reject(err)
        expect(err.message).to.equal('login to desktop foodsharing failed')
      })
    })
  })

  describe('checkLogin', () => {
    it('checks for status is jsonp response', () => {
      mock.onGet('/fs/xhrapp.php', {
        params: {
          app: 'api',
          m: 'checklogin',
          callback: 'ignored'
        }
      }).reply(200, 'ignored({ "status": 1 });')
      return foodsharing.checkLogin().then(result => {
        expect(result).to.be.true
      })
    })

    it('returns false if status is not 1', () => {
      mock.onGet('/fs/xhrapp.php', {
        params: {
          app: 'api',
          m: 'checklogin',
          callback: 'ignored'
        }
      }).reply(200, 'ignored({ "status": 2 });')
      return foodsharing.checkLogin().then(result => {
        expect(result).to.be.false
      })
    })
  })

  describe('sendMessage', () => {
    const body = 'cats &amp; dogs'
    beforeEach(() => {
      mock.onPost('/fs/xhrapp.php').reply(({ data }) => {
        expect(data.constructor).to.equal(FormData)
        expect(data.get('c')).to.equal('1')
        expect(data.get('b')).to.equal(body)
        return [200, {
          data: {
            msg: {
              id: 'messageid',
              time: '5pm',
              body,
              fs_id: 'fsid1',
              fs_name: 'my first name',
              fs_photo: 'myphoto.jpg'
            }
          }
        }]
      })
    })
    it('posts message with form data', () => {
      return foodsharing.sendMessage(1, body).then(message => {
        expect(message).to.be.ok
      })
    })
    it('decodes htmlentities in message response', () => {
      return foodsharing.sendMessage(1, body).then(message => {
        expect(message.body).to.equal('cats & dogs')
      })
    })
  })

  describe('user2conv', () => {
    it('returns conversation id', () => {
      mock.onGet('/fs/xhrapp.php', {
        params: {
          app: 'msg',
          m: 'user2conv',
          fsid: 'user1'
        }
      }).reply(200, {
        data: {
          cid: 5
        }
      })
      return foodsharing.user2conv('user1').then(id => {
        expect(id).to.equal(5)
      })
    })
  })

  describe('convertMessage', () => {
    let msg = {
      time: 'some time',
      body: 'cats &amp; dogs',
      fs_id: '1',
      fs_name: 'myname',
      fs_photo: 'aphoto.jpg',
      id: '5',
      cid: '10'
    }
    let convertedMsg = {
      messageId: 5,
      conversationId: 10,
      sentBy: {
        id: 1,
        firstName: 'myname',
        photo: 'aphoto.jpg'
      },
      body: 'cats & dogs',
      sentAt: 'some time'
    }
    it('works nicely :)', () => {
      expect(foodsharing.convertMessage(msg)).to.deep.equal(convertedMsg)
    })
  })

  describe('convertJsonp', () => {
    let data = {
      name: 'nick',
      age: 84,
      hobbies: ['football', 'plants']
    }

    beforeEach(() => {
      window.somename = () => {
        chai.assert.fail(null, null, 'should not eval')
      }
    })

    it('converts into json', () => {
      let value = `somename(${JSON.stringify(data)});`
      let result = convertJsonp('somename', value)
      expect(result).to.deep.equal(data)
    })

    it('allows omission of end semicolon', () => {
      let value = `somename(${JSON.stringify(data)})`
      let result = convertJsonp('somename', value)
      expect(result).to.deep.equal(data)
    })

    it('does not eval value', () => {
      expect(() => {
        convertJsonp('unused', 'somename("oops")')
      }).to.throw(/JSON/) // some error about JSON (specific error depends on browser)
    })
  })
})
