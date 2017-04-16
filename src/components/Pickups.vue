<template>

  <main-layout>

    <!-- MAIN -->

    <div v-if="pickups.length === 0">
      <div class="card">
        <div class="card-title bg-primary text-white">
          You have no upcoming pickups!
        </div>
      </div>
    </div>

    <div class="card" v-if="pickups.length > 0">
      <div class="card-title bg-primary text-white">
        your pickups
      </div>
      <div class="card-content card-force-top-padding">
        <div class="list no-border">
          <router-link :to="'/pickup/' + p.id"
                       tag="div"
                       class="item two-lines item-link"
                       v-for="p in pickups"
                       :key="p.id">
            <div class="item-primary">
              <i>store</i>
            </div>
            <div class="item-content inset has-secondary">
              <div>{{ p.datetime }}</div>
              <div>
                <span>{{ p.store.name }}</span><br>
                {{ p.store.streetNumber }} {{ p.store.street }}, {{ p.store.zip }} {{ p.store.city }}
              </div>
            </div>
            <div class="item-secondary stamp">
              <from-now :date="p.at"></from-now>
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
        <q-drawer-link icon="store"
                       exact
                       v-for="store in stores"
                       :key="store.id"
                       :to="'/store/' + store.id">
          {{ store.name }}
        </q-drawer-link>
      </div>

    </div>
    <!-- SUBMENU END -->

  </main-layout>
  </div></template>

<script>
  import api from 'services/api'

  export default {
    data () {
      return {
        pickups: []
      }
    },
    created () {
      api.getNextPickupList().then(pickups => {
        this.pickups = pickups
      })
    }
  }
</script>

<style lang="styl">
</style>
