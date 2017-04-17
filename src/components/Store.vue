<template>

  <main-layout>

    <!-- MAIN -->
    <loading v-if="loading" />
    <template v-else-if="!loading && store">
      <h6>
        {{ store.name }}
      </h6>
      <div class="card">
        <div class="card-content list no-border highlight">
          <div class="item two-lines">
            <i class="item-primary">location_on</i>
            <div class="item-content">
              <div class="item-title">Adresse</div>
              <div>{{ store.street }} {{ store.streetNumber }}, {{ store.zip }} {{ store.city }}</div>
            </div>
          </div>
          <div class="item two-lines">
            <i class="item-primary">info</i>
            <div class="item-content">
              <div class="item-title">Besonderheiten</div>
              <div>{{ store.notes }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <user-list :users="coordinators" title="Betriebsverantwortliche" />
        <user-list :users="team" title="Team" />
      </div>


    </template>

    <!-- MAIN END -->


  </main-layout>
  </div></template>

<script>
import api from 'services/api'
import UserList from 'components/UserList'

export default {
  components: {
    UserList
  },
  data () {
    return {
      loading: false,
      store: null
    }
  },
  computed: {
    team () {
      return this.store ? this.store.team.filter(team => !team.coordinator) : []
    },
    coordinators () {
      return this.store ? this.store.team.filter(team => team.coordinator) : []
    }
  },
  methods: {
  },
  created () {
    this.id = this.$route.params.id
    this.loading = true
    api.getStore(this.id).then(store => {
      this.store = store
      this.loading = false
    })
  }
}
</script>

<style lang="styl">
</style>
