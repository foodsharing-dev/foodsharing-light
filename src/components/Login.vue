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


        <div class="list">
          <div class="item two-lines">
            <i class="item-primary">email</i>
            <div class="item-content">
              <input v-model="email" class="full-width" placeholder="E-Mail Address">
            </div>
          </div>
          <hr>
          <div class="item two-lines">
            <i class="item-primary">lock</i>
            <div class="item-content">
              <input v-model="password" placeholder="password" class="full-width">
            </div>
          </div>
        </div>
        <button @click="login()" class="primary big full-width">Login</button>
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
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      login () {
        return auth.login(this.email, this.password)
      }
    }
  }
</script>

<style lang="styl">
</style>
