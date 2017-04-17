<template>
  <main-layout>

    <div v-if="loading" style="text-align: center; padding-top: 30px;">
      <spinner color="#4a3520" :size="48" name="hourglass"></spinner>
    </div>

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
          <p>{{ message.body }}</p>
        </div>
      </div>
    </div>

    <div slot="app-footer" class="chat-footer">
      <form class="row small-gutter" v-on:submit.stop.prevent="send()">
        <div class="auto">
          <input type="text" class="chat-input full-width" v-model="newMessage">
        </div>
        <div>
          <button class="primary circular" type="submit">
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
  import log from 'services/log'
  export default {
    data () {
      return {
        loading: false,
        id: null,
        conversation: null,
        newMessage: ''
      }
    },
    computed: {
      user: () => auth.state.user
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
          return '/statics/mini_q_avatar.png'
        }
      },
      send () {
        log.info('send message', this.newMessage)
        chat.send(this.id, this.newMessage).then(() => {
          this.newMessage = ''
        })
      }
    },
    created () {
      this.id = this.$route.params.id
      this.loading = true
      chat.loadConversation(this.id).then(conversation => {
        this.loading = false
        Object.assign(this, { conversation })
      }).catch(err => {
        this.loading = false
        Toast.create.negative(err.message)
      })
    },
    destroyed () {
      if (this.id) {
        chat.clearConversation(this.id)
      }
    },
    mounted () {
      // autofocus
      this.$el.querySelector('input').focus()
    },
    updated () {
      // auto scroll to bottom...
      // TODO: this is using global selector, bad!
      let el = document.querySelector('.layout-view')
      el.scrollTop = el.scrollHeight
    }
  }
</script>

<style lang="styl" scoped>

.chat-input
  border: none !important
  font-size: 1.5rem !important
  margin-top: 0.3rem

.chat-footer
  padding: 0.5rem 0.5rem 0 0.5rem

.chat-message
  p
   word-break: break-all

.chat-date
  color: #4A3520 !important

.chat-you
  .chat-message
    p
      background-color: #fff !important;
      color: #4A3520 !important;

/*
  We add an intermediate .image-wrapper element
  as foodsharing profile images are not square
*/
.chat-user
  .image-wrapper
    width: 65px
    height: 65px
    overflow: hidden
    border-radius: 50%
    box-shadow: 0 2px 6px rgba(0,0,0,0.3)
    img
      width: 65px !important
      height: 80px !important
      border-radius: 0 !important
      box-shadow: none !important
      position: relative
      bottom: 5px

</style>
