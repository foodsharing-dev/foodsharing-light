import chat from 'services/chat'
import api from 'services/api'

const sandbox = sinon.sandbox.create()

describe('services/chat', () => {
  let getConversationListStub

  afterEach(() => sandbox.restore())

  describe('receiveMessage', () => {
    let message = {
      conversationId: 1,
      body: 'a nice message body!',
      sentAt: 'foo'
    }

    describe('conversation map', () => {
      beforeEach(() => {
        chat.state.conversations[1] = { id: 1, messages: [] }
        getConversationListStub = sandbox
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
        getConversationListStub = sandbox
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
          expect(getConversationListStub).to.have.been.called
        })
      })
    })
  })
})
