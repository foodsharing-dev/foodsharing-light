<template>
  <div>
    <main-layout>

      <!-- MAIN -->

      <h6>Deine Unterhaltungen</h6>
      <div class="card">
        <div class="list no-border">

          <!-- CHAT ITEM -->
          <router-link tag="div"
                       class="item item-link two-lines"
                       :to="{ name: 'chat', params: { id: conversation.id } }"
                       v-for="conversation in conversations"
                       :key="conversation.id">
            <img class="item-primary" :src="avatarFor(conversation)">
            <div class="item-content has-secondary">
              <div>
                  {{ conversation.name || conversation.lastMessage.sentBy.firstName }}
              </div>
              <div>{{ conversation.lastMessage.body }}</div>
            </div>
            <div class="item-secondary stamp">
              <from-now :date="conversation.lastMessageAt"></from-now>
            </div>
          </router-link>
          <!-- CHAT ITEM END -->

        </div>
      </div>
      <!-- MAIN END-->

    </main-layout>
  </div>
</template>

<script>
  import chat from 'services/chat'
  export default {
    data () {
      return {
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
          return '/statics/default-avatar.png'
        }
      }
    },
    created () {
      chat.loadConversationList().then(conversations => {
        this.conversations = conversations
      })
    }
  }
</script>

<style lang="styl">
</style>
