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
        <div class="list-label">{{ pickup.members.length }} foodaver comming</div>
        <div v-on:click="memberASHandler(m)" class="item two-lines item-link" v-for="m in pickup.members">
          <img class="item-primary" :src="'statics/linux-avatar.png'">
          <div class="item-content">
            {{ m.name }}
          </div>
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
        <q-drawer-link icon="store" :to="'/store/' + s.id" exact v-for="s in stores">
          {{ s.name }}
        </q-drawer-link>
      </div>

    </div>
    <!-- SUBMENU END -->

  </main-layout>
  </div></template>

<script>
  import { Dialog, ActionSheet } from 'quasar'

  function showActionSheetWithIcons (member) {
    ActionSheet.create({
      title: member.name,
      gallery: true,
      actions: [
        {
          label: 'Call',
          icon: 'phone',
          handler () {
            // todo
          }
        },
        {
          label: 'Chat',
          icon: 'chat',
          handler () {
             // todo
          }
        }
      ]
    })
  }

  export default {
    data () {
      return {

        memberASHandler (member) {
          showActionSheetWithIcons(member)
        },

        pickup: {
          datetime: 'today, 20:00 h',
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

        store: {
          id: 1,
          name: 'Coffee Shop',
          location: {
            street: 'Bananastreet 1',
            zip: '12345',
            city: 'Tomatocity'
          },
          fetchweight: '20-30kg',
          info: 'The store Boss has a big nose.'
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
