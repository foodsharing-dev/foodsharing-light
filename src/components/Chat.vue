<template>
  <div>
    <main-layout>

      <!-- MAIN -->
      <div>
        <div class="chat-other" v-for="message in messages">
          <div class="chat-user">
            <img src="statics/linux-avatar.png">
          </div>
          <div class="chat-date">
            <timeago :since="message.time"></timeago>
          </div>
          <div class="chat-message">
            <p>
              {{ message.body }}
            </p>
          </div>
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

        <div class="list" style="max-width: 400px">

          <!-- CHAT ITEM -->
          <div class="item two-lines item-link" to="'/chat/' + conversation.id" v-for="conversation in conversations">
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
          </div>
          <!-- CHAT ITEM END -->

        </div>

      </div>
      <!-- SUBMENU END -->


      <q-layout>
        <div slot="footer" class="">
          <table class="full-width">
            <tr>
              <td><textarea class="full-width" placeholder="Message"></textarea></td>
              <td class="sendbox"><button class="primary circular">
                <i>send</i>
              </button></td>
            </tr>
          </table>
        </div>
      </q-layout>

    </main-layout>



  </div>



</template>

<script>
  import chatService from 'services/chat'
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
    },
    mounted () {
      chatService.connect()
      chatService.subscribe(message => {
        this.messages.push(message)
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
