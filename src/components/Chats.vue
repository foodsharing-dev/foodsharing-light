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
                       v-for="conversation in conversations">
            <img class="item-primary" :src="conversation.avatar || '/statics/mini_q_avatar.png'">
            <div class="item-content has-secondary">
              <div>
                  {{ conversation.name || conversation.lastMessage.sentBy.firstName }}
              </div>
              <div>{{ conversation.lastMessage.body }}</div>
            </div>
            <div class="item-secondary stamp">
              <timeago :since="conversation.lastMessageAt"></timeago>
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
  .layout-footer {
    background: white !important;
    padding-left:8px;

  }
  .sendbox {
    width:56px;
  }
</style>
