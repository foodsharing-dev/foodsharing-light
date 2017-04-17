<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <i>lock</i>
        <q-toolbar-title :padding="1" class="toolbar-logo">
          <router-link to="/">food<span>sharing</span></router-link>
        </q-toolbar-title>
      </div>
    </slot>
    <!-- HEADER END -->

    <!-- MAIN -->
    <div class="layout-view">
      <div class="layout-padding">
        <h6>Melde Dich an</h6>

        <div class="card">
          <form v-on:submit.stop.prevent="login()">
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
                  <input v-model="password" placeholder="password" type="password" class="full-width">
                </div>
              </div>
            </div>
            <button type="submit" class="primary big full-width">Login</button>
          </form>
        </div>
        <p>Noch nicht dabei? <a href="https://foodsharing.de/" target="_blank">Registrieren</a> musst Du Dich auf der Desktop Version von <a href="https://foodsharing.de/" target="_blank">foodsharing.de</a></p>
      </div>
    </div>
    <!-- MAIN END -->

  </q-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import auth from 'services/auth'

  export default {
    data () {
      return {
        /*
        email: 'userbot@example.com',
        password: 'userbot'
        */
        email: 'user1@example.com',
        password: 'user1'
      }
    },
    methods: {
      login () {
        return auth.login(this.email, this.password).catch(() =>
          Toast.create.negative('Login fehlgeschlagen'))
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
