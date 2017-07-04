<template>
  <q-layout ref="layout" view="lHh Lpr fFf">

    <q-toolbar slot="header">
      <q-btn flat icon="menu" @click="$refs.layout.toggleLeft()" />
      <q-toolbar-title class="toolbar-logo">
        <router-link :to="{ name: 'index' }">food<span>sharing {{ currentPage }}</span></router-link>
      </q-toolbar-title>

      <q-tabs slot="navigation">
        <q-route-tab default slot="title" icon="directions_bike" :to="{ name: 'pickups' }" />
        <q-route-tab slot="title" icon="chat" :to="{ name: 'chats' }" />
        <q-route-tab slot="title" icon="shopping_cart" :to="{ name: 'stores' }"  />
      </q-tabs>
      <lang-switcher></lang-switcher>
    </q-toolbar>

    <div slot="left">
      <q-toolbar color="light">
        <q-toolbar-title>
          <h6>{{ user.firstName }} {{ user.lastName }}</h6>
        </q-toolbar-title>
      </q-toolbar>
      <div class="list no-border platform-delimiter">
        <router-link :to="{ name: 'logout' }">
          <q-btn icon="exit_to_app" class="full-width" >
            Logout
          </q-btn>
        </router-link>
      </div>
      <contact></contact>

    </div>

    <div class="layout-view">
      <div class="layout-padding">
        <q-ajax-bar position="bottom"></q-ajax-bar>
        <slot></slot>
      </div>
    </div>

    <div slot="footer">
      <slot name="app-footer"></slot>
    </div>

  </q-layout>

</template>

<script>
  import Contact from '@/Contact.vue'
  import { QAjaxBar, QBtn, QFixedPosition, QLayout, QRouteTab, QTab, QTabs, QToolbar, QToolbarTitle, QTransition } from 'quasar'
  import LangSwitcher from '@/LangSwitcher.vue'
  import auth from 'services/auth'
  export default {
    components: {
      Contact,
      LangSwitcher,
      QAjaxBar,
      QBtn,
      QFixedPosition,
      QLayout,
      QRouteTab,
      QTab,
      QTabs,
      QToolbar,
      QToolbarTitle,
      QTransition
    },
    data () {
      return {
        currentPage: ''
      }
    },
    computed: {
      user () {
        return auth.state.user
      }
    }
  }
</script>

<style lang="stylus" scoped>
.q-toolbar
  height 0rem

.footer
  background-color #f00
</style>
