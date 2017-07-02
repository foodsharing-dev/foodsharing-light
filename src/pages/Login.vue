<template>
  <q-layout>
    <slot name="header">
      <div slot="header" class="toolbar">
        <i>lock</i>
        <q-toolbar-title :padding="1" class="toolbar-logo">
          <router-link :to="{ name: 'index' }">food<span>sharing</span></router-link>
        </q-toolbar-title>
        <lang-switcher></lang-switcher>
      </div>
    </slot>

    <div class="layout-view">
      <div class="layout-padding">
        <h6>{{ $t('Login.heading') }}</h6>
        <div class="card">
          <form v-on:submit.stop.prevent="login()">
            <div class="list">
              <div class="item two-lines">
                <i class="item-primary">email</i>
                <div class="item-content">
                  <input v-autofocus v-model="email" class="full-width" type="email" :placeholder="$t('Login.form.email')">
                </div>
              </div>
              <hr>
              <div class="item two-lines">
                <i class="item-primary">lock</i>
                <div class="item-content">
                  <input v-model="password"  :placeholder="$t('Login.form.password')" type="password" class="full-width">
                </div>
              </div>
            </div>
            <button type="submit" class="primary big full-width">{{ $t('Login.submit' )}}</button>
          </form>
        </div>
        <p v-html="$t('Login.not_registered')"></p>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import auth from 'services/auth'

  export default {
    data () {
      if (process.env.NODE_ENV !== 'production') {
        return {
          email: 'userbot@example.com',
          password: 'userbot'
        }
      }
      else {
        return {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        if (!navigator.cookieEnabled) {
          Toast.create.negative(this.$t('Login.cookiesDisabled'))
        }
        return auth.login(this.email, this.password).catch(() =>
          Toast.create.negative(this.$t('Login.failed')))
      }
    }
  }
</script>
