<template>
  <main-layout>
    <h6>Deine Unterhaltungen</h6>
    <q-card>
        <q-card-main v-if="isLoading">
          <loading/>
        </q-card-main>
        <q-card-main v-else-if="conversations.length > 0">
          <router-link :to="{ name: 'chat', params: { id: conversation.id } }"
            v-for="conversation in conversations"
            key="conversation.id">
            <q-item>
              <q-item-side :avatar="avatarFor(conversation)" />
              <q-item-main class="has-secondary">
                <q-item-tile label class="fs-chat-name" v-if="conversation.name">
                  <strong>{{ conversation.name }}</strong>
                </q-item-tile>
                <q-item-tile label class="fs-chat-name">
                  {{ conversationMembers(conversation) }}
                </q-item-tile>
                <q-item-tile label v-if="conversation.lastMessage">{{ conversation.lastMessage.body }}</q-item-tile>
                <q-item-tile sublabel class="stamp" v-if="conversation.lastMessage">
                  <from-now :date="conversation.lastMessageAt"></from-now>
                </q-item-tile>
                <q-item-tile sublabel class="stamp" v-else>
                  (keine Nachricht)
                </q-item-tile>
              </q-item-main>
            </q-item>
          </router-link>
        </q-card-main>
        <q-card-main v-else>
          Du hast keine Unterhaltungen.
        </q-card-main>
    </q-card>
  </main-layout>
</template>

<script>
  import Loading from '@/Loading'
  import { Toast, QCard, QCardMain, QItem, QItemMain, QItemSide, QItemTile, QList } from 'quasar'
  import chat from 'services/chat'
  import defaultAvatar from 'assets/default-avatar.png'

  export default {
    components: {
      Loading,
      Toast,
      QCard,
      QCardMain,
      QItem,
      QItemTile,
      QItemSide,
      QItemMain,
      QList
    },
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
