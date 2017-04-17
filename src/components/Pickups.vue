<template>
  <main-layout>

    <!-- MAIN -->

    <h6>Deine Abholtermine</h6>
    <div class="card">
      <div class="list no-border">
        <router-link v-for="p in pickups"
                     :to="{ name: 'pickup', params: { id: p.id } }"
                     :key="p.id"
                     tag="div"
                     class="item two-lines item-link">
          <div class="item-primary">
            <i>store</i>
          </div>
          <div class="item-content inset has-secondary">
            <div>{{ formatDate(p.at) }}</div>
            <div>
              <span>{{ p.store.name }}</span><br>
              {{ p.store.streetNumber }} {{ p.store.street }}, {{ p.store.zip }} {{ p.store.city }}
            </div>
          </div>
          <div class="item-secondary stamp">
            <from-now :date="p.at"></from-now>
          </div>
        </router-link>
      </div>
    </div>

    <!-- MAIN END -->

  </main-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import moment from 'moment'

  import api from 'services/api'

  export default {
    data () {
      return {
        pickups: [],
        loading: false
      }
    },
    methods: {
      formatDate (val) {
        return moment(val).calendar()
      }
    },
    created () {
      this.loading = true
      api.getNextPickupList().then(pickups => {
        this.pickups = pickups
      }).catch(() => {
        // TODO: translate to German
        Toast.create.negative('Could not load pickups')
      }).then(() => {
        this.loading = false
      })
    }
  }
</script>

<style lang="styl">
</style>
