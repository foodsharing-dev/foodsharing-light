<template>
  <main-layout>
    <loading v-if="isLoading"></loading>

    <div v-if="conversation" class="conversation">
      <div v-for="message in conversation.messages"
           :key="message.id"
           v-bind:class="{ 'chat-other': isMe(message), 'chat-you': !isMe(message) }">
        <div class="chat-user">
          <div class="image-wrapper">
            <img :src="avatarFor(message.sentBy)">
          </div>
        </div>
        <div class="chat-date">
          <from-now :date="message.sentAt"></from-now>
        </div>
        <div class="chat-message">
          <p>
            <strong v-if="isMultiChat">{{ message.sentBy.firstName }}<br></strong>
            <span v-html="message.formattedBody"></span>
          </p>
        </div>
      </div>
    </div>

    <div slot="app-footer" class="chat-footer">
      <form class="row small-gutter" v-on:submit.stop.prevent="send()">
        <div class="auto">
          <input type="text" class="chat-input full-width" v-autofocus v-model="newMessage">
        </div>
        <div>
          <button type="submit" class="primary circular small">
            <i>send</i>
          </button>
        </div>
      </form>
    </div>
  </main-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import chat from 'services/chat'
  import auth from 'services/auth'
  import defaultAvatar from 'assets/default-avatar.png'
  export default {
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
        this.conversation = conversation
        this.isLoading = false
      }).catch(err => {
        console.log(err)
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
    // handle newlines with CSS
    white-space: pre-line

    // long strings (e.g. URLs) should not break the layout
    width: 100%
    overflow-wrap: break-word
    word-wrap: break-word

    // make the chat bubbles a little bit more space effecient
    padding-top: 5px
    padding-bottom: 5px

    // and make them float a bit lower
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)

// the <a> is not rendered by Vue's template engine, skip the scope
// https://vue-loader.vuejs.org/en/features/scoped-css.html
.chat-other .chat-message p >>> a
  // default background is green, same as links. make them black instead
  color: black
  &:hover
    transition opacity 0.4s
    opacity: 0.3

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
