<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <i>lock</i>
        <q-toolbar-title :padding="1" class="toolbar-logo">
          <router-link to="/">food<span>sharing Login</span></router-link>
        </q-toolbar-title>

      </div>
    </slot>
    <!-- HEADER END -->

    <!-- MAIN -->
    <div class="layout-view">
      <div class="layout-padding">
        <h6>Melde Dich an</h6>

        <div class="card">
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
        <p>Noch nicht dabei? <a href="https://foodsharing.de/" target="_blank">Registrieren</a> musst Du Dich auf der Desktop Version von <a href="https://foodsharing.de/" target="_blank">foodsharing.de</a></p>
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
  h1, h2, h3, h4, h5, .toolbar-title, button {
    font-family:'Alfa Slab One';
    font-weight: normal !important;
  }
</style>
