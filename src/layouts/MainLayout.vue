<template>
  <q-layout>

    <!-- HEADER -->
    <slot name="header">
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="1" class="toolbar-logo">
          <router-link :to="{ name: 'index' }">food<span>sharing {{ currentPage }}</span></router-link>
        </q-toolbar-title>
        <!-- NAVIGATION -->
        <q-tabs slot="navigation">
          <q-tab icon="directions_bike" :route="{ name: 'pickups' }"></q-tab>
          <q-tab icon="chat" :route="{ name: 'chats' }"></q-tab>
          <q-tab icon="shopping_cart" :route="{ name: 'stores' }"></q-tab>
        </q-tabs>
        <!-- NAVIGATION END -->
      </div>

    </slot>
    <!-- HEADER END -->

    <q-drawer ref="leftDrawer">
      <slot name="left-drawer">

        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            {{ auth.user.firstName }} {{ auth.user.lastName }}
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="exit_to_app" :to="{ name: 'logout' }" exact>
            Logout
          </q-drawer-link>
        </div>

        <div class="absolute-bottom fs-contact-us">
          <div class="card-content">

            <p>Willkommen auf foodsharing light <strong>beta</strong>.</p>
            <p>Hier gibt's keine Garantie, dass alles funktioniert.</p>
            <p>Bitte gib uns Feedback über Fehler und Verbesserungsvorschlage!</p>

            <div class="list">

              <div class="item">
                <img src="../assets/GitHub-Mark-64px.png" class="item-primary" style="top: 10px; height: 25px; width: 25px;">
                <div class="item-content">
                  <a href="https://github.com/foodsharing-dev/foodsharing-light/issues" target="_blank" class="full-width">
                    Github
                  </a>
                </div>
              </div>

              <div class="item">
                <i class="item-primary">chat</i>
                <div class="item-content">
                  <a href="https://slackin.yunity.org" target="_blank" class="full-width">
                    <div>yunity Slack</div>
                    <div><small>#foodsharing-dev</small></div>
                  </a>
                </div>
              </div>

              <div class="item">
                <i class="item-primary">email</i>
                <div class="item-content">
                  <a href="mailto:fslight@matthias-larisch.de" target="_blank" class="full-width">
                    <div>Email Matthias</div>
                    <div><small>Deutsch / Englisch</small></div>
                  </a>
                </div>
              </div>

              <div class="item">
                <i class="item-primary">email</i>
                <div class="item-content">
                  <a href="mailto:fslight@nicksellen.co.uk" target="_blank" class="full-width">
                    <div>Email Nick</div>
                    <div><small>English</small></div>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

      </slot>
    </q-drawer>

    <!-- MAIN -->

    <div class="layout-view">
      <div class="layout-padding">
        <q-ajax-bar position="bottom"></q-ajax-bar>
        <slot></slot>
      </div>
    </div>
    <!-- MAIN END -->

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
  import auth from 'services/auth'
  export default {
    data () {
      return {
        auth: auth.state,
        currentPage: ''
      }
    }
  }
</script>
