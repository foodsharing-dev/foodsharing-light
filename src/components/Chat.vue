<template>
  <main-layout>

    <div v-if="conversation" class="conversation">
      <div v-for="message in conversation.messages"
           v-bind:class="{ 'chat-other': isMe(message), 'chat-you': !isMe(message) }">
        <div class="chat-user">
          <img src="statics/linux-avatar.png">
        </div>
        <div class="chat-date">
          <timeago :since="message.sentAt"></timeago>
        </div>
        <div class="chat-message">
          <p>
            {{ message.body }}
          </p>
        </div>
      </div>
    </div>

    <div slot="app-footer">
      <table class="full-width">
        <tr>
          <td><textarea class="full-width" placeholder="Message" v-model="newMessage"></textarea></td>
          <td class="sendbox"><button class="primary circular" @click="send()">
            <i>send</i>
          </button></td>
        </tr>
      </table>
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
      chat.loadConversation(this.id).then(conversation => {
        Object.assign(this, { conversation })
      })
    },
    updated () {
      // auto scroll to bottom...
      // TODO: this is using global selector, bad!
      let el = document.querySelector('.layout-view')
      el.scrollTop = el.scrollHeight
    }
  }
</script>

<style lang="styl">
  .layout-footer {
    background: white !important;
    padding-left:8px;

  }
  .sendbox {
    width:56px;
  }
</style>
