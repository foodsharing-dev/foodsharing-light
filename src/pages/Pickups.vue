<template>
  <main-layout>
    <h6>Deine Abholtermine</h6>
    <div class="card">
      <div v-if="isLoading" class="card-content">
        <loading/>
      </div>
      <div class="list no-border" v-else-if="pickups.length > 0">
        <router-link v-for="p in pickups"
                     :to="{ name: 'pickup', params: { id: p.id } }"
                     :key="p.id"
                     tag="div"
                     class="item two-lines item-link">
          <div class="item-primary">
            <i>store</i>
          </div>
          <div class="item-content inset has-secondary">
            <div><formatted-date :date="p.at"></formatted-date></div>
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
      <div class="card-content" v-else>
        Du hast keine pickups.
      </div>
    </div>
  </main-layout>
</template>

<script>
  import { Toast } from 'quasar'
  import api from 'services/api'

  export default {
    data () {
      return {
        isLoading: false,
        pickups: []
      }
    },
    created () {
      this.isLoading = true
      api.getNextPickupList().then(pickups => {
        this.pickups = pickups
      }).catch(() => {
        // TODO: translate to German
        Toast.create.negative('Could not load pickups')
      }).then(() => {
        this.isLoading = false
      })
    }
  }
</script>
