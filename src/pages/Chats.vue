<template>
  <main-layout>
    <h6>Deine Unterhaltungen</h6>
    <div class="card">
      <div v-if="isLoading" class="card-content">
        <loading/>
      </div>
      <div class="list no-border" v-else-if="conversations.length > 0">
        <router-link tag="div"
                     class="item item-link two-lines"
                     :to="{ name: 'chat', params: { id: conversation.id } }"
                     v-for="conversation in conversations"
                     :key="conversation.id">
          <img class="item-primary" :src="avatarFor(conversation)">
            <div class="item-content has-secondary">
              <div class="fs-chat-name">
                  <strong v-if="conversation.name">{{ conversation.name }} </strong>{{ conversationMembers(conversation) }}
              </div>
              <div v-if="conversation.lastMessage">{{ conversation.lastMessage.body }}</div>
            </div>
            <div class="item-secondary stamp" v-if="conversation.lastMessage">
              <from-now :date="conversation.lastMessageAt"></from-now>
            </div>
          <div class="item-secondary stamp" v-else>
            (keine Nachricht)
          </div>
        </router-link>
      </div>
      <div v-else class="card-content">
        Du hast keine Unterhaltungen.
      </div>
    </div>
  </main-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import chat from 'services/chat'
  import defaultAvatar from 'assets/default-avatar.png'

  export default {
    data () {
      return {
        isLoading: false,
        conversations: []
      }
    },
    methods: {
      avatarFor (conversation) {
        let { lastMessage } = conversation
        if (lastMessage && lastMessage.sentBy.photo) {
          return '/fs/images/thumb_crop_' + lastMessage.sentBy.photo
        }
        else {
          return defaultAvatar
        }
      },
      conversationMembers (conversation) {
        return conversation.members.map(m => m.user.firstName).join(', ')
      }
    },
    created () {
      this.isLoading = true
      chat.loadConversationList().then(conversations => {
        this.conversations = conversations
      }).catch(() => {
        // TODO: translate to German
        Toast.create.negative('Could not load conversations')
      }).then(() => {
        this.isLoading = false
      })
    }
  }
</script>

<style lang="stylus" scoped>
.fs-chat-name
  text-overflow: ellipsis
</style>
