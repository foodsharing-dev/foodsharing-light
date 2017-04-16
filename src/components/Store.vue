<template>

  <main-layout>

    <!-- MAIN -->

    <div class="card">
      <div class="card-title bg-primary text-white">
        {{ store.name }}
      </div>
      <div class="card-media">
        <img :src="'statics/map.png'">
        <button class="primary circular"><i>place</i></button>
      </div>
      <div class="card-content list no-border highlight">
        <div class="item two-lines">
          <i class="item-primary">store</i>
          <div class="item-content">
            <div class="item-title">{{ store.name }}</div>
            <div>{{ store.location.street }}, {{ store.location.zip }} {{ store.location.city }}</div>
          </div>
        </div>
        <div class="item two-lines">
          <i class="item-primary">info</i>
          <div class="item-content">
            <div class="item-title">Things to know</div>
            <div>{{ store.info }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="list">
      <div class="list-label">Verantwortliche foodsaver</div>
      <router-link tag="div" to="/chat/1" class="item item-link" v-for="n in 3">
        <img class="item-primary" :src="'statics/boy-avatar.png'">
        <div class="item-content has-secondary">
          Peter
        </div>
        <i class="item-secondary">
          chat_bubble
        </i>
      </router-link>
      <hr>
      <div class="list-label">Team</div>
      <router-link tag="div" to="/chat/1" class="item item-link" v-for="n in 3">
        <img class="item-primary" :src="'statics/linux-avatar.png'">
        <div class="item-content">
          Gabi
        </div>
      </router-link>
    </div>

    <!-- MAIN END -->

    <!-- SUBMENU -->
    <div slot="submenu">

      <div class="toolbar light">
        <q-toolbar-title :padding="1">
          My Stores
        </q-toolbar-title>
      </div>

      <div class="list no-border platform-delimiter">
        <q-drawer-link icon="store" to="/store/1" exact v-for="s in stores">
          {{ s.name }}
        </q-drawer-link>
      </div>

    </div>
    <!-- SUBMENU END -->

  </main-layout>
  </div></template>

<script>

  export default {
    data () {
      return {
        store: {
          id: 1,
          name: 'Coffee Shop',
          location: {
            street: 'Bananastreet 1',
            zip: '12345',
            city: 'Tomatocity'
          },
          fetchweight: '20-30kg',
          info: 'The store Boss has a big nose.',
          members: [
            {
              id: 1,
              name: 'Peter'
            },
            {
              id: 2,
              name: 'Gabi'
            }
          ],
          responsible: [
            {
              id: 1,
              name: 'Peter'
            }
          ]
        },

        stores: [
          {
            id: 1,
            name: 'Store 1'
          },
          {
            id: 2,
            name: 'Store 2'
          },
          {
            id: 3,
            name: 'Store 3'
          }
        ],
      }
    }
  }
</script>

<style lang="styl">
</style>
