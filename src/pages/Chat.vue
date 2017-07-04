<template>
  <main-layout>
    <loading v-if="isLoading"></loading>
    <div v-if="conversation" class="conversation">
      <div v-for="message in conversation.messages"
           :key="message.id"
           v-bind:class="{ 'chat-other': isMe(message), 'chat-you': !isMe(message) }">
        <q-chat-message
          :name="message.sentBy.firstName"
          :avatar="avatarFor(message.sentBy)"
          :stamp="message.sentAt"
          :text="[message.body]"
        />
      </div>
    </div>

    <div slot="app-footer" class="full-width">
      <q-toolbar color="white">
        <q-input v-model="newMessage" class="full-width"
          :after="[{icon: 'send', content: true, handler() { send() } }]" />
      </q-toolbar>
  </div>
  </main-layout>
</template>

<script>
  import Loading from '@/Loading'
  import { Toast, QBtn, QChatMessage, QInput, QToolbar } from 'quasar'
  import chat from 'services/chat'
  import auth from 'services/auth'
  import defaultAvatar from 'assets/default-avatar.png'
  export default {
    components: {
      Loading,
      Toast,
      QBtn,
      QChatMessage,
      QInput,
      QToolbar
    },
    data () {
      return {
        isLoading: false,
        id: null,
        conversation: null,
        newMessage: ''
      }
    },
    computed: {
      user () {
        return auth.state.user
      },
      // TODO store/group chats with 2 people should also return true here
      isMultiChat () {
        return this.conversation && this.conversation.members.length > 2
      }
    },
    methods: {
      isMe (message) {
        return message.sentBy.id === this.user.id
      },
      avatarFor (user) {
        if (user.photo) {
          return '/fs/images/thumb_crop_' + user.photo
        }
        else {
          return defaultAvatar
        }
      },
      send () {
        chat.send(this.id, this.newMessage).then(() => {
          this.newMessage = ''
        })
      }
    },
    created () {
      this.id = this.$route.params.id
      this.isLoading = true
      chat.loadConversation(this.id).then(conversation => {
        Object.assign(this, { conversation })
        this.isLoading = false
      }).catch(err => {
        Toast.create.negative(err.message)
        this.isLoading = false
      })
    },
    destroyed () {
      if (this.id) {
        chat.clearConversation(this.id)
      }
    },
    updated () {
      this.layoutViewScrollToBottom()
    }
  }
</script>

<style lang="stylus" scoped>

.chat-input
  border: none !important
  font-size: 1.1rem
  margin-top: 0.3rem

.chat-footer
  padding: 0 0rem 0 0.5rem
  form
    margin-bottom: 0
  button
    margin: 5px

.chat-message
  p
    // message content should always wrap
    word-break: break-all

    // make the chat bubbles a little bit more space effecient
    padding-top: 5px
    padding-bottom: 5px

    // and make them float a bit lower
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)

.chat-date
  color: #4A3520
  font-size: 0.7rem

.chat-you, .chat-other
  // a bit more compact chat
  margin-top: 30px

.chat-you
  .chat-message
    p
      // override the default chat colours
      background-color: #fff !important;
      color: #4A3520 !important;

// We add an intermediate .image-wrapper element
// as foodsharing profile images are not square
.chat-user
  .image-wrapper
    width: 55px
    height: 55px
    overflow: hidden
    border-radius: 50%
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
    img
      width: 55px
      height: 65px
      border-radius: 0
      box-shadow: none
      position: relative
      bottom: 3px
</style>
