<template>
  <main-layout>
    <loading v-if="isLoading"></loading>
    <template v-if="store">
      <h6>
        {{ store.name }}
      </h6>
      <div class="card">
        <div class="card-content list no-border highlight">
          <router-link tag="div" :to="{ name: 'chat', params: { id: store.teamConversation } }" class="item item-link" v-if="store.teamConversation">
            <i class="item-primary">chat</i>
            <div class="item-content">
              Chat
            </div>
          </router-link>
        </div>
      </div>
      <div class="card">
        <div class="card-title">
          <i class="item-primary">location_on</i>
          Adresse
        </div>
        <div class="card-content">
          <template v-if="!address">{{ store.name }}</template>{{ address }}
        </div>
      </div>
      <div class="card" v-if="store.notes">
        <div class="card-title">
          <i class="item-primary">info</i>
          Besonderheiten
        </div>
        <div class="card-content">
          {{ store.notes }}
        </div>
      </div>
      <div class="card">
        <user-list :users="coordinators" title="Betriebsverantwortliche" />
        <user-list :users="team" title="Team" />
      </div>
    </template>
  </main-layout>
</template>

<script>
  import api from 'services/api'
  import UserList from 'components/UserList'

  export default {
    components: {
      UserList
    },
    data () {
      return {
        isLoading: false,
        store: null
      }
    },
    computed: {
      team () {
        return this.store && this.store.team.filter(team => !team.coordinator)
      },
      coordinators () {
        return this.store && this.store.team.filter(team => team.coordinator)
      },
      address () {
        let { store } = this
        if (!store) return
        return [store.street, store.houseNumber, store.zip, store.city]
          .filter(v => v).join(' ')
      }
    },
    created () {
      this.id = this.$route.params.id
      this.isLoading = true
      api.getStore(this.id).then(store => {
        this.store = store
        this.isLoading = false
      }).catch(() => {
        this.isLoading = false
      })
    }
  }
</script>
