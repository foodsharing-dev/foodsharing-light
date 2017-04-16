<template>

  <main-layout>

    <!-- MAIN -->

    <div class="card">
      <div class="card-title bg-primary text-white">
        your pickups
      </div>
      <div class="card-content card-force-top-padding">
        <div class="list no-border">
          <router-link :to="'/pickup/' + p.id" tag="div" class="item two-lines item-link" v-for="p in pickups">
            <div class="item-primary">
              <i>store</i>
            </div>
            <div class="item-content inset has-secondary">
              <div>{{ p.datetime }}</div>
              <div>
                <span>{{ p.store.name }}</span><br>
                {{ p.store.location.street }}, {{ p.store.zip }} {{ p.store.city }}
              </div>
            </div>
            <div class="item-secondary stamp">
              3 minutes left
            </div>
          </router-link>
          <hr class="inset">
        </div>
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
        <q-drawer-link icon="store" :to="'/store/' + store.id" exact v-for="store in stores">
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

        pickups: [
          {
            id: 1,
            datetime: 'today, 20:00 h',
            store: {
              id: 1,
              name: 'Coffee Shop',
              location: {
                street: 'Bananastreet 1',
                zip: '12345',
                city: 'Tomatocity'
              }
            }
          },
          {
            id: 2,
            datetime: 'tomorrow, 12:00 h',
            store: {
              id: 1,
              name: 'Banana Shop',
              location: {
                street: 'Mangostreet 1',
                zip: '12345',
                city: 'Tomatocity'
              }
            }
          }
        ],

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
