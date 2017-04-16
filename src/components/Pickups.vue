<template>

  <main-layout>

    <!-- MAIN -->

    <div class="card">
      <div class="card-title bg-primary text-white">
        {{ pickup.datetime }}
      </div>
      <div class="card-content list no-border highlight">
        <router-link tag="div" to="/store/1" class="item two-lines item-link">
          <i class="item-primary">store</i>
          <div class="item-content">
            <div class="item-title">{{ store.name }}</div>
            <div>{{ store.location.street }}, {{ store.location.zip }} {{ store.location.city }}</div>
          </div>
        </router-link>
        <div class="item two-lines">
          <i class="item-primary">shopping_basket</i>
          <div class="item-content">
            <div class="item-title">{{ store.fetchweight }}</div>
            <div>Abholmenge im Schnitt</div>
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
      <hr>
      <div class="list no-border">
        <div class="list-label">4 foodaver comming</div>
        <div class="item two-lines" v-for="n in 3">
          <img class="item-primary" :src="'statics/linux-avatar.png'">
          <div class="item-content has-secondary">
            Gabi
          </div>
          <i slot="target" class="item-secondary">
            more_vert
            <q-popover ref="popover">
              <div class="list">

                <router-link tag="div" to="/chat/1" class="item item-link">
                  <i class="item-primary">chat</i>
                  <div class="item-content">Chat</div>
                </router-link>
                <div class="item item-link">
                  <i class="item-primary">phone</i>
                  <div class="item-content">Call</div>
                </div>

              </div>
            </q-popover>
          </i>
        </div>
      </div>

      <div class="card-actions card-no-top-padding">
        <div class="text-lime">
          13 minutes left
        </div>
        <div class="auto"></div>
        <button class="primary big" @click="cancelPickupDialog()">
          <i class="on-left">cancel</i> cancel pickup
        </button>
      </div>
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
        <q-drawer-link icon="store" to="/store/1" exact v-for="store in stores">
          {{ store.name }}
        </q-drawer-link>
      </div>

    </div>
    <!-- SUBMENU END -->

  </main-layout>
  </div></template>

<script>
  import { Dialog } from 'quasar'

  export default {
    data () {
      return {

        pickup: {
          datetime: 'today, 20:00 h'
        },

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

        cancelPickupDialog () {
          Dialog.create({
            title: 'really?',
            message: 'sure you want to cancel the pickup?',
            buttons: [
              {
                label: 'not sure',
                classes: 'positive on-left'
              },
              {
                label: 'yes sure',
                classes: 'negative'
              }
            ]
          })
        }
      }
    }
  }
</script>

<style lang="styl">
</style>
