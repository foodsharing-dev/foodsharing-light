<template>
  <q-card>
    <q-card-main>
      <q-item>
        <q-item-main>
          <q-item-tile label>Willkommen auf foodsharing light <strong>beta</strong>.</q-item-tile>
        </q-item-main>
      </q-item>
      <q-item>
        <q-item-main>
          <q-item-tile label>Hier gibt's keine Garantie, dass alles funktioniert.</q-item-tile>
          <q-item-tile label>Bitte gib uns Feedback über Fehler und Verbesserungsvorschlage!</q-item-tile>
        </q-item-main>
      </q-item>
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
          <q-item-tile icon="chat" />
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
            <q-item-tile icon="email" />
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
            <q-item-tile icon="email" />
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
          <q-item-tile icon="email" />
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
    </q-card-main>
  </q-card>
</template>
<script>
  import { QCard, QCardMain, QItem, QItemTile, QItemSide, QItemMain } from 'quasar'

  export default {
    components: {
      QCard,
      QCardMain,
      QItem,
      QItemTile,
      QItemSide,
      QItemMain
    }
  }
</script>
