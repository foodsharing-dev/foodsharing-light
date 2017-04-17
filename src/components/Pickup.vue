<template>

  <main-layout>

    <!-- MAIN -->
    <div v-if="pickup">

      <h6>Abholung {{ store.name }}</h6>
      <div class="card">
        <div class="card-content list no-border highlight">
          <div class="item two-lines">
            <i class="item-primary">alarm</i>
            <div class="item-content">
              <div class="item-title">{{ pickup.at }}</div>
              <div>Datum / Uhrzeit</div>
            </div>
          </div>
          <router-link tag="div" :to="{ name: 'store', params: { id: store.id } }" class="item two-lines item-link">
            <i class="item-primary">store</i>
            <div class="item-content">
              <div class="item-title">{{ store.streetNumber }} {{ store.street }}, {{ store.zip }} {{ store.city }}</div>
              <div>Adresse</div>
            </div>
          </router-link>

          <div class="item two-lines">
            <i class="item-primary">info</i>
            <div class="item-content">
              <div class="item-title">Besonderheiten</div>
              <div>{{ store.notes }}</div>
            </div>
          </div>
        </div>
        <hr>
        <user-list :users=pickup.members title="Abholer"></user-list>
      </div>
    </div>

    <!-- MAIN END -->
  </main-layout>
  </div></template>

<script>
  import api from 'services/api'
  import log from 'services/log'
  import UserList from 'components/UserList'

  export default {
    components: {
      UserList
    },
    data () {
      return {
        pickup: null,
        store: null
      }
    },
    methods: {
    },
    created () {
      let { id } = this.$route.params
      log.info('pickup id is', id)
      api.getPickup(id).then(pickup => {
        this.pickup = pickup
        this.store = pickup.store
      })
    }
  }
</script>

<style lang="styl">
</style>
