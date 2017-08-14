import MockAdapter from 'axios-mock-adapter'
import chai from 'chai'

import api, { axios } from 'services/api'

describe('services/api', () => {
  let mock

  beforeEach(() => {
    mock = new MockAdapter(axios)
  })

  describe('getConversationList', () => {
    it('loads', () => {
      mock.onGet('/api/v1/conversations/').reply(200, {
        results: [{ id: 1 }, { id: 2 }]
      })
      return api.getConversationList().then(conversations => {
        expect(conversations.length).to.equal(2)
      })
    })

    it('decodes html entities in last message body', () => {
      mock.onGet('/api/v1/conversations/').reply(200, {
        results: [{
          id: 1,
          lastMessage: {
            body: 'fish &amp; chips'
          }
        }]
      })
      return api.getConversationList().then(conversations => {
        expect(conversations.length).to.equal(1)
        expect(conversations[0].lastMessage.body).to.equal('fish & chips')
      })
    })
  })

  describe('getConversation', () => {
    it('loads', () => {
      mock.onGet('/api/v1/conversations/1/').reply(200, {
        id: 1, members: [], messages: []
      })
      return api.getConversation(1).then(conversation => {
        expect(conversation.id).to.equal(1)
      })
    })

    it('populates the members', () => {
      mock.onGet('/api/v1/conversations/1/').reply(200, {
        id: 1,
        members: [
          { id: 'user1', firstName: 'user1' }
        ],
        messages: [
          {
            id: 'message1',
            sentBy: {
              id: 'user1'
            },
            body: 'hello'
          }
        ]
      })
      return api.getConversation(1).then(conversation => {
        expect(conversation.id).to.equal(1)
        expect(conversation.messages[0].sentBy.firstName).to.equal('user1')
      })
    })

    it('escapes the html entities in the messages', () => {
      mock.onGet('/api/v1/conversations/1/').reply(200, {
        id: 1,
        members: [
          { user: { id: 'user1', firstName: 'user1' } }
        ],
        messages: [
          {
            id: 'message1',
            sentBy: {
              id: 'user1'
            },
            body: 'love &amp; radio'
          }
        ]
      })
      return api.getConversation(1).then(conversation => {
        expect(conversation.messages[0].formattedBody).to.equal('love &amp; radio')
        expect(conversation.messages[0].body).to.equal('love & radio')
      })
    })
  })

  describe('getNextPickupList', () => {
    it('sets pickup id', () => {
      mock.onGet('/api/v1/pickups/next/').reply(200, [
        { at: 'foo', store: { id: 'store1' } }
      ])
      return api.getNextPickupList().then(pickups => {
        expect(pickups.length).to.equal(1)
        expect(pickups[0].id).to.equal('store1/foo')
      })
    })
  })

  describe('getPickup', () => {
    it('returns pickup with id', () => {
      mock.onGet('/api/v1/pickups/1/').reply(200, {
        at: 'foo', store: { id: 'store1' }
      })
      return api.getPickup(1).then(pickup => {
        expect(pickup.id).to.equal('store1/foo')
      })
    })
  })

  describe('getStoreList', () => {
    it('returns stores', () => {
      mock.onGet('/api/v1/stores/').reply(200, [
        { id: 'store1' }
      ])
      return api.getStoreList().then(stores => {
        expect(stores).to.deep.equal([{ id: 'store1' }])
      })
    })
  })

  describe('getStore', () => {
    it('gets store by id', () => {
      mock.onGet('/api/v1/stores/store1/').reply(200, {
        id: 'store1'
      })
      return api.getStore('store1').then(store => {
        expect(store).to.deep.equal({ id: 'store1' })
      })
    })
  })

  describe('login', () => {
    it('creates session', () => {
      mock.onPost('/api/v1/session/').reply(200, { id: 1 })
      return api.login().then(({ user }) => {
        expect(user.id).to.equal(1)
      })
    })
  })

  describe('logout', () => {
    it('deletes session', () => {
      mock.onDelete('/api/v1/session/').reply(200)
      return api.logout()
    })
  })

  describe('checkLogin', () => {
    it('returns user if session exists', () => {
      mock.onGet('/api/v1/session/').reply(200, { id: 1 })
      return api.checkLogin().then(user => {
        expect(user.id).to.equal(1)
      })
    })

    it('returns null if session does not exist', () => {
      mock.onGet('/api/v1/session/').reply(404)
      return api.checkLogin().then(user => {
        expect(user).to.be.null
      })
    })

    it('return error for other http responses', () => {
      mock.onGet('/api/v1/session/').reply(500)
      return api.checkLogin().then(() => {
        chai.assert.fail(null, null, 'should not have succeeded')
      }).catch(err => {
        if (err.name === 'AssertionError') return Promise.reject(err)
        expect(err.response.status).to.equal(500)
      })
    })
  })
})
