<template>
  <div>
    <main-layout>

      <!-- SUBMENU -->
      <div slot="submenu">

          <div class="toolbar light">
            <q-toolbar-title :padding="1">
              My Stores
            </q-toolbar-title>
          </div>

          <div class="list no-border platform-delimiter">
            <q-drawer-link icon="store" to="/store/1" exact>
              My Store 1
            </q-drawer-link>
            <q-drawer-link icon="store" to="/store/2" exact>
              My Store 2
            </q-drawer-link>
            <q-drawer-link icon="store" to="/store/3" exact>
              My Store 3
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
