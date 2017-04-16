<template>

  <main-layout>

    <!-- MAIN -->
    
    <h6>Deine Abholtermine</h6>
    <div class="card">
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
      </div>
    </div>


    <!-- MAIN END -->


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
