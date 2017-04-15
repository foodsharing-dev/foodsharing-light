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

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="face" to="/chats" exact>
            Peter
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
      return {}
    }
  }
</script>

<style lang="styl">
</style>
