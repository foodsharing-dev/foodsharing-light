<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <i>lock</i>
        <q-toolbar-title :padding="1">
          Foodsharing Login
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
        <hr>
        <p>Don't a Member yet? <router-link :to="{ name: 'signup' }">Sign up for an account</router-link></p>
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
  import auth from 'services/auth'

  export default {
    data () {
      return {
        email: 'user1@example.com',
        password: 'user1'
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
