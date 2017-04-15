<template>

    <main-layout>

      <p>Hello World, on foodsharing light! :-)</p>

      <!-- SUBMENU -->
      <div slot="submenu">

        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            My Account
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="settings" to="/settings" exact>
            Settings
          </q-drawer-link>
          <hr>
          <q-drawer-link icon="lock" to="/login" exact>
            Logout
          </q-drawer-link>
        </div>

      </div>
      <!-- SUBMENU END -->

    </main-layout>
  </div></template>

<script>
  export default {
    data () {
      return {}
    }
  }
</script>

<style lang="styl">
</style>
