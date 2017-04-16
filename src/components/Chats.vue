<template>
  <div>
    <main-layout>

      <!-- MAIN -->
      <div>

        <div class="list no-border">

          <!-- CHAT ITEM -->
          <router-link tag="div" class="item item-link two-lines" to="/chat/1" v-for="conversation in conversations">
            <img class="item-primary" :src="conversation.avatar">
            <div class="item-content has-secondary">
              <div>
                <span v-for="participant in conversation.participants">
                  {{ participant.userName }}
                </span>
              </div>
              <div>{{ conversation.lastMessage.body }}</div>
            </div>
            <div class="item-secondary stamp">
              <timeago :since="conversation.lastMessage.time"></timeago>
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

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="settings" to="/logout" exact>
            Dummy Chat
          </q-drawer-link>

        </div>

      </div>
      <!-- SUBMENU END -->

    </main-layout>

  </div>
</template>

<script>
  export default {
    data () {
      return {

        // Active conversation things

        messages: [{
          time: Date.now(),
          body: 'heya'
        }],

        // All conversations

        conversations: [
          {
            id: 1,
            avatar: 'statics/linux-avatar.png',
            lastMessage: {
              body: 'Food, i really need food do you have food? i am so hungry, I have been coding all day',
              time: Date.now()
            },
            participants: [
              {
                userName: 'James'
              }
            ]
          },
          {
            id: 2,
            avatar: 'statics/boy-avatar.png',
            lastMessage: {
              body: 'Bla bla bla bal balm...',
              time: Date.now()
            },
            participants: [
              {
                userName: 'Gabi'
              }
            ]
          }
        ]

      }
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
