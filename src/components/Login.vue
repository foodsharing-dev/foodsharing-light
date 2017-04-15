<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="1">
          Login
        </q-toolbar-title>

      </div>
    </slot>
    <!-- HEADER END -->

    <!-- MAIN -->
    <div class="layout-view">
      <div class="layout-padding">
        <p icon="lock">FS Login</p>
        <button @click="login()" class="primary big">Login</button>
      </div>
    </div>
    <!-- MAIN END -->



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
  import auth from '../services/auth'

  export default {
    data () {
      return {}
    },
    methods: {
      login () {
        return auth.login('user1@example.com', 'user1')
      }
    }
  }
</script>

<style lang="styl">
</style>
