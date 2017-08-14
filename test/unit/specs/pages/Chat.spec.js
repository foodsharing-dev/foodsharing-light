import Vue from 'vue'
import VueRouter from 'vue-router'

import Chat from 'pages/Chat'
import api from 'services/api'
import auth from 'services/auth'

const sandbox = sinon.sandbox.create()

const router = new VueRouter({
  routes: []
})

describe('pages/Chat.vue', () => {
  let vm

  afterEach(() => sandbox.restore())

  describe('with chats', () => {
    let user1 = {
      id: 30,
      firstName: 'user1'
    }
    let user2 = {
      id: 31,
      firstName: 'user2'
    }

    beforeEach(() => {
      auth.state.user = user1
      sandbox.stub(api, 'getConversation').resolves({
        id: 10,
        members: [user1, user2],
        messages: [
          {
            id: 20,
            sentAt: '2017-08-14T10:42:42.960Z',
            sentBy: user1,
            body: 'hello',
            formattedBody: 'hello'
          },
          {
            id: 21,
            sentAt: '2017-08-14T10:42:42.960Z',
            sentBy: user2,
            body: 'hey',
            formattedBody: 'hey'
          }
        ]
      })
      vm = new Vue({ ...Chat, router }).$mount()
      return Vue.nextTick().then(() => Vue.nextTick())
    })

    it('calls api and sets the conversation data', () => {
      expect(api.getConversation).to.have.been.called
      expect(vm.conversation).to.not.be.null
      expect(vm.conversation.messages.length).to.equal(2)
    })

    it('renders a list of messages', () => {
      expect(vm.conversation.messages.length).to.equal(2)
      expect(vm.$el.querySelectorAll('.chat-message').length).to.equal(2)
    })

    it('renders the expected content', () => {
      expect(vm.$el.textContent).to.contain('hello')
      expect(vm.$el.textContent).to.contain('hey')
      expect(vm.$el.textContent).to.not.contain(user1.firstName)
      expect(vm.$el.textContent).to.not.contain(user2.firstName)
    })

    it('updates when new message added', () => {
      vm.conversation.messages.push({
        id: 22,
        sentAt: '2017-08-14T10:42:42.960Z',
        sentBy: user2,
        body: 'a new message',
        formattedBody: 'a new message'
      })
      return Vue.nextTick().then(() => {
        expect(vm.$el.textContent).to.contain('a new message')
      })
    })
  })
})
