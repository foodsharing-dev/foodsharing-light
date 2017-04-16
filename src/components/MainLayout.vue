<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button v-if="submenuVisible" class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="1">
          FS
        </q-toolbar-title>
        <!-- NAVIGATION -->
        <q-tabs slot="navigation">
          <q-tab icon="home" route="/" replace>Home</q-tab>
          <q-tab icon="chat" route="/chats" replace>Chats</q-tab>
          <q-tab icon="directions_bike" route="/pickups">Pickups</q-tab>
          <q-tab icon="store" route="/stores" exact replace>Stores</q-tab>
        </q-tabs>
        <!-- NAVIGATION END -->
      </div>
    </slot>
    <!-- HEADER END -->

    <!-- MAIN -->
    <div class="layout-view">
      <div class="layout-padding">
        <slot></slot>
      </div>
    </div>
    <!-- MAIN END -->


    <!-- SUBMENU -->
    <q-drawer ref="leftDrawer" v-if="submenuVisible">
      <slot name="submenu">

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

      </slot>
    </q-drawer>
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
        submenuVisible: true
      }
    }
  }
</script>
