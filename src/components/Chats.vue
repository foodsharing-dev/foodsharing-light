<template>
  <div>
    <main-layout>


      <!-- MAIN -->
      <div>
        <!-- Message received from peer -->
        <div class="chat-other">
          <div class="chat-user">
            <img src="statics/linux-avatar.png">
          </div>
          <div class="chat-date">
            7 minutes ago
          </div>
          <div class="chat-message">
            <p>
              Blaböla!
            </p>
          </div>
        </div>
        <!-- Message sent by you -->
        <div class="chat-you">
          <div class="chat-user">
            <img src="statics/boy-avatar.png">
          </div>
          <div class="chat-date">
            4 minutes ago
          </div>
          <div class="chat-message">
            <p>
              bla bla bla.
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
          <div class="item two-lines">
            <img class="item-primary" :src="'statics/boy-avatar.png'">
            <div class="item-content has-secondary">
              <div>Peter</div>
              <div>Food, i really need food do you have food? i am...</div>
            </div>
            <div class="item-secondary stamp">
              21:25
            </div>
          </div>
          <!-- CHAT ITEM END -->

          <!-- CHAT ITEM -->
          <div class="item two-lines">
            <img class="item-primary" :src="'statics/linux-avatar.png'">
            <div class="item-content has-secondary">
              <div>Gabi</div>
              <div>Bla bla bla bal balm...</div>
            </div>
            <div class="item-secondary stamp">
              21:25
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
  export default {
    data () {
      return {}
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
