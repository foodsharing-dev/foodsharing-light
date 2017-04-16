<template>
  <main-layout>

    <div style="text-align: center; padding-top: 30px;">
      <spinner color="#4a3520" :size="48" name="hourglass"></spinner>
    </div>

    <div v-if="conversation" class="conversation">
      <div v-for="message in conversation.messages" v-bind:class="{ 'chat-other': isMe(message), 'chat-you': !isMe(message) }">
        <div class="chat-user">
          <img :src="message.sentBy.photo || '/statics/mini_q_avatar.png'">
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
  import chat from 'services/chat'
  import auth from 'services/auth'
  import log from 'services/log'
  export default {
    data () {
      return {
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

</style>
