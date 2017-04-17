<template>
  <div>
    <main-layout>

      <!-- MAIN -->
      <h6>Deine Betriebe</h6>
      <div class="card">
        <div class="list no-border">
          <router-link :to="'/store/' + store.id" tag="div" class="item two-lines item-link" v-for="store in stores" :key="store.id">
            <div class="item-primary">
              <i>store</i>
            </div>
            <div class="item-content">
              <div>{{ store.name }}</div>
              <div>
                {{ store.street }} {{ store.streetNumber }}, {{ store.zip }} {{ store.city }}
              </div>
            </div>
          </router-link>
          <hr class="inset">
        </div>
      </div>
      <!-- MAIN END -->

    </main-layout>
  </div>
</template>

<script>
  import api from 'services/api'

  export default {
    data () {
      return {
        stores: []
      }
    },
    methods: {
    },
    created () {
      api.getStoreList().then(stores => {
        this.stores = stores
      })
    }
  }
</script>

<style lang="styl">
</style>
