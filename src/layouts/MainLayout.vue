<template>
  <q-layout ref="layout" view="lHh Lpr fff">
    <q-toolbar slot="header">
      <q-btn flat icon="menu" @click="$refs.layout.toggleLeft()" />
      <q-toolbar-title class="toolbar-logo">
        <router-link :to="{ name: 'index' }">food<span>sharing {{ currentPage }}</span></router-link>
      </q-toolbar-title>
      <q-tabs slot="navigation">
        <q-tab slot="title" icon="directions_bike" :route="{ name: 'pickups' }"></q-tab>
        <q-tab slot="title" icon="chat" :route="{ name: 'chats' }"></q-tab>
        <q-tab slot="title" icon="shopping_cart" :route="{ name: 'stores' }"></q-tab>
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
        <q-btn icon="exit_to_app" class="full-width" :to="{ name: 'logout' }" exact>
          Logout
        </q-btn>
      </div>
      <div class="fs-contact-us card-content">
        <q-card color="white">
          <p>Willkommen auf foodsharing light <strong>beta</strong>.</p>
          <p>Hier gibt's keine Garantie, dass alles funktioniert.</p>
          <p>Bitte gib uns Feedback über Fehler und Verbesserungsvorschlage!</p>
        </q-card>
      </div>
      <q-card>
        <q-list>
        <q-item>
          <q-item-side>
            <img src="../assets/GitHub-Mark-64px.png" class="item-primary" style="top: 10px; height: 25px; width: 25px;">
          </q-item-side>
          <q-item-main>
            <q-item-tile label>
              <a href="https://github.com/foodsharing-dev/foodsharing-light/issues" target="_blank" class="full-width">
                Github
              </a>
            </q-item-tile>
          </q-item-main>
        </q-item>
        <q-item>
          <q-item-side>
            <q-item-tile color="red" icon="chat" />
          </q-item-side>
          <q-item-main>
              <q-item-tile label>
                <a href="https://slackin.yunity.org" target="_blank" class="full-width">
                  <div>yunity Slack</div>
                  <div><small>#foodsharing-dev</small></div>
                </a>
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-item-tile color="amber" icon="email" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                <a href="mailto:fslight@matthias-larisch.de" target="_blank" class="full-width">
                  <div>Email Matthias</div>
                  <div><small>Deutsch / Englisch</small></div>
                </a>
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-item-tile color="amber" icon="email" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                <a href="mailto:fslight@nicksellen.co.uk" target="_blank" class="full-width">
                  <div>Email Nick</div>
                  <div><small>English</small></div>
                </a>
              </q-item-tile>
            </q-item-main>
          </q-item>
          <q-item>
            <q-item-side>
              <q-item-tile color="amber" icon="email" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>
                <a href="mailto:nitram@disroot.org" target="_blank" class="full-width">
                  <div>Email Mikato</div>
                  <div><small>Deutsch / Englisch</small></div>
                </a>
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-card>
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
  import { QBtn, QCard, QCardMain, QIcon, QItem, QLayout, QTabs, QTab, QToolbar, QToolbarTitle } from 'quasar'
  import LangSwitcher from '@/LangSwitcher.vue'
  import auth from 'services/auth'
  export default {
    components: {
      LangSwitcher,
      QBtn,
      QCard,
      QCardMain,
      QIcon,
      QItem,
      QLayout,
      QTabs,
      QTab,
      QToolbar,
      QToolbarTitle
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
@import '~variables'

p
  color $text-color

.fs-contact-us
  z-index:-1
  a
    display: block
</style>
