<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="1">
          FS
        </q-toolbar-title>
        <q-tabs slot="navigation">
          <q-tab icon="home" route="/" replace>Home</q-tab>
          <q-tab icon="chat" route="/chats" replace>Chats</q-tab>
          <q-tab icon="store" route="/stores" exact replace>Stores</q-tab>
        </q-tabs>
      </div>
    </slot>
    <!-- HEADER END -->

    <!-- NAVIGATION -->
    <slot name="navigation">

    </slot>
    <!-- NAVIGATION END -->

    <!-- SUBMENU -->
    <slot name="submenu">
      <q-drawer ref="leftDrawer">
        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            Submenu
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="local_florist" to="/sublink" exact>
            Sublink
          </q-drawer-link>
        </div>
      </q-drawer>
    </slot>
    <!-- SUBMENU END -->

    <router-view class="layout-view"></router-view>

    <!--
    <div slot="footer" class="toolbar">
      <div class="auto flex justify-center within-iframe-hide">

      </div>
      <q-toolbar-title :padding="0" class="within-iframe-only">
        Footer
      </q-toolbar-title>
    </div>
    -->
  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        search: ''
      }
    }
  }
</script>
