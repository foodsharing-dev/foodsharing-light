<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button v-if="submenuVisible" class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="1" class="toolbar-logo">
          <router-link v-if="bigScreen" to="/">food<span>sharing {{ currentPage }}</span></router-link>
          <router-link v-if="!bigScreen" to="/"><span>fs</span></router-link>
        </q-toolbar-title>
        <!-- NAVIGATION -->
        <q-tabs slot="navigation">

          <q-tab icon="directions_bike" route="/pickups">Pickups</q-tab>
          <q-tab icon="chat" route="/chats">Chats</q-tab>
          <q-tab icon="store" route="/stores">Stores</q-tab>
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

    <div slot="footer">
      <slot name="app-footer"></slot>
    </div>

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
  import { Utils } from 'quasar'

  export default {
    data () {
      return {
        submenuVisible: false,
        bigScreen: true,
        currentPage: ''
      }
    },
    created () {
      let { height, width } = Utils.dom.viewport()
      console.log(height)
      if (width < 400) {
        this.bigScreen = false
      }
    },
    destroyed () {
    }
  }
</script>
<style>
  @font-face {
    font-family: 'Alfa Slab One';
    src: url('/statics/fonts/alfaslabone/alfaslabone-regular.eot');
    src: url('/statics/fonts/alfaslabone/alfaslabone-regular.eot?#iefix') format('embedded-opentype'),
    url('/statics/fonts/alfaslabone/alfaslabone-regular.woff') format('woff'),
    url('/statics/fonts/alfaslabone/alfaslabone-regular.ttf') format('truetype'),
    url('/statics/fonts/alfaslabone/alfaslabone-regular.svg#alfa_slab_oneregular') format('svg');
    font-weight: normal;
    font-style: normal;

  }
  body {
    background-color: #F1E7C9;
  }
  h1, h2, h3, h4, h5, h6, .toolbar-title, button, .modal-header {
    font-family:'Alfa Slab One';
    font-weight: normal !important;
    color: #4A3520;
  }
  .toolbar-logo a span {
    color: #fff !important;
  }
  .toolbar-logo a:hover, .toolbar-logo a:active, .toolbar-logo a:visited {
    text-decoration: none;
    color: #5ab946;
  }
  .list, .card {
    background-color: #fff;
  }
  .layout-footer {
    background-color: white !important;
  }
</style>
