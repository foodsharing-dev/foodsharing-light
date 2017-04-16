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
                       to="/chat/1"
                       v-for="conversation in conversations"
                       :key="conversation.id">
            <img class="item-primary" :src="conversation.avatar || '/statics/mini_q_avatar.png'">
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

      <!-- SUBMENU -->
      <div slot="submenu">

        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            My Chats
          </q-toolbar-title>
        </div>
      </div>
      <!-- SUBMENU END -->

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
    created () {
      chat.loadConversationList().then(conversations => {
        this.conversations = conversations
      })
    }
  }
</script>

<style lang="styl">
</style>
