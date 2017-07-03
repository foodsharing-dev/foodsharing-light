<template>
  <q-layout>
    <q-toolbar slot="header">
      <q-icon name="lock" />
      <q-toolbar-title :padding="1" class="toolbar-logo">
        <router-link :to="{ name: 'index' }">food<span>sharing {{ currentPage }}</span></router-link>
      </q-toolbar-title>
      <lang-switcher></lang-switcher>
    </q-toolbar>

    <div class="layout-view">
      <div class="layout-padding">
        <h6>{{ $t('Login.heading') }}</h6>
        <q-card color="white">
          <form v-on:submit.stop.prevent="login()">
            <q-field icon="email">
              <q-input v-autofocus v-model="email" :float-label="$t('Login.form.email')" />
            </q-field>
            <q-field icon="lock">
              <q-input v-model="password" type="password" :float-label="$t('Login.form.password')" />
            </q-field>
            <q-btn big type="submit" color="primary" class="full-width">{{ $t('Login.submit' )}}</q-btn>
          </form>
        </q-card>
        <p v-html="$t('Login.not_registered')"></p>
      </div>
    </div>
  </q-layout>
</template>

<script>
  import { Toast, QBtn, QCard, QField, QIcon, QInput, QToolbar, QToolbarTitle } from 'quasar'
  import auth from 'services/auth'
  import LangSwitcher from '@/LangSwitcher.vue'

  export default {
    components: {
      LangSwitcher,
      QBtn,
      QCard,
      QField,
      QIcon,
      QInput,
      QToolbar,
      QToolbarTitle
    },
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
