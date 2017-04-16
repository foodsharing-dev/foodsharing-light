<template>

  <main-layout>

    <!-- MAIN -->

    <h6>Abholung {{ store.name }}</h6>
    <div class="card">
      <div class="card-content list no-border highlight">
        <div class="item two-lines">
          <i class="item-primary">alarm</i>
          <div class="item-content">
            <div class="item-title">{{ pickup.datetime }}</div>
            <div>Datum / Uhrzeit</div>
          </div>
        </div>
        <router-link tag="div" to="/store/1" class="item two-lines item-link">
          <i class="item-primary">store</i>
          <div class="item-content">
            <div class="item-title">{{ store.location.street }}, {{ store.location.zip }} {{ store.location.city }}</div>
            <div>Adresse</div>
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
            <div class="item-title">Besinderheiten</div>
            <div>{{ store.info }}</div>
          </div>
        </div>
      </div>
      <hr>
      <div class="list no-border">
        <div class="list-label">{{ pickup.members.length }} foodaver kommen</div>
        <div v-on:click="memberASHandler(m)" class="item two-lines item-link" v-for="m in pickup.members">
          <img class="item-primary" :src="'statics/linux-avatar.png'">
          <div class="item-content">
            {{ m.name }}
          </div>
        </div>
      </div>

      <button class="primary big full-width" @click="cancelPickupDialog()">
        <i class="on-left">cancel</i> Austragen
      </button>
    </div>

    <!-- MAIN END -->


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
            title: 'Sicher?',
            message: 'Willst Du Dich wirklich von der Abholung Abmelden?',
            buttons: [
              {
                label: 'Nein',
                classes: 'positive on-left'
              },
              {
                label: 'Ja',
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
