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
          <div class="item two-lines item-link" v-for="conversation in conversations">
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

      <div slot="footer" class="toolbar">
        <div class="auto flex justify-center within-iframe-hide">
          <button v-go-back="'/showcase'">
            <i class="on-left animate-blink">
              replay
            </i>
            Back to Showcase
          </button>
        </div>
        <q-toolbar-title :padding="0" class="within-iframe-only">
          Footer
        </q-toolbar-title>
      </div>

    </main-layout>

    <q-layout>
      <div slot="footer">

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
