import chat from 'services/chat'

// for stubbing
import api from 'services/api'
import foodsharing from 'services/foodsharing'

const sandbox = sinon.sandbox.create()

describe('services/chat', () => {
  let apiGetConversationListStub

  afterEach(() => sandbox.restore())

  afterEach(() => {
    chat.state.conversationList = []
    chat.state.conversations = {}
  })

  describe('receiveMessage', () => {
    let message = {
      conversationId: 1,
      body: 'a nice message body!',
      sentAt: 'foo'
    }

    describe('conversation map', () => {
      beforeEach(() => {
        chat.state.conversations[1] = { id: 1, messages: [] }
        apiGetConversationListStub = sandbox
          .stub(api, 'getConversationList')
          .resolves({ conversations: [] })
      })

      it('adds new message to conversation', () => {
        return chat.receiveMessage(message).then(() => {
          expect(chat.state.conversations[1].messages.length).to.equal(1)
          expect(chat.state.conversations[1].messages[0]).to.deep.equal(message)
        })
      })

      it('sets conversation lastMessage', () => {
        return chat.receiveMessage(message).then(() => {
          expect(chat.state.conversations[1].lastMessage).to.deep.equal(message)
        })
      })

      it('sets conversation lastMessageAt', () => {
        return chat.receiveMessage(message).then(() => {
          expect(chat.state.conversations[1].lastMessageAt).to.equal(message.sentAt)
        })
      })
    })

    describe('conversation list', () => {
      beforeEach(() => {
        chat.state.conversationList.push({ id: 1 })
        apiGetConversationListStub = sandbox
          .stub(api, 'getConversationList')
          .resolves({ conversations: [] })
      })

      it('sets conversation lastMessage', () => {
        return chat.receiveMessage(message).then(() => {
          expect(chat.state.conversationList[0].lastMessage).to.deep.equal(message)
        })
      })

      it('sets conversation lastMessageAt', () => {
        return chat.receiveMessage(message).then(() => {
          expect(chat.state.conversationList[0].lastMessageAt).to.equal(message.sentAt)
        })
      })

      it('requests the list if it is not already there', () => {
        message.conversationId = 2 // for a new conversation!
        return chat.receiveMessage(message).then(() => {
          expect(apiGetConversationListStub).to.have.been.called
        })
      })
    })
  })

  describe('send', () => {
    it('sends to foodsharing and receives resulting message', () => {
      let foodsharingSendMessageStub = sandbox
        .stub(foodsharing, 'sendMessage')
        .callsFake((conversationId, body) => {
          return Promise.resolve({ conversationId, body })
        })
      let chatReceiveMessageStub = sandbox
        .stub(chat, 'receiveMessage')
        .resolves(null)

      return chat.send(1, 'heya').then(() => {
        expect(foodsharingSendMessageStub).to.have.been.calledWith(1, 'heya')
        expect(chatReceiveMessageStub).to.have.been.calledWith({
          conversationId: 1, body: 'heya'
        })
      })
    })
  })

  describe('getOrCreateConversationForUser', () => {
    it('calls foodsharing user2conv', () => {
      let stub = sandbox.stub(foodsharing, 'user2conv').resolves(10)
      return chat.getOrCreateConversationForUser(1).then(conversationId => {
        expect(conversationId).to.equal(10)
        expect(stub).to.have.been.calledWith(1)
      })
    })
  })

  describe('loadConversation', () => {
    it('loads from the api then sets the conversations map', () => {
      let stub = sandbox.stub(api, 'getConversation').resolves({ id: 'convid' })
      return chat.loadConversation(154).then(() => {
        expect(stub).to.have.been.calledWith(154)
        expect(chat.state.conversations[154]).to.deep.equal({ id: 'convid' })
      })
    })
  })

  describe('clearConversation', () => {
    beforeEach(() => {
      chat.state.conversations[1] = { id: 1, messages: [] }
    })
    it('removes the conversation from the map', () => {
      chat.clearConversation(1)
      expect(chat.state.conversations[1]).to.be.undefined
    })
  })
})
