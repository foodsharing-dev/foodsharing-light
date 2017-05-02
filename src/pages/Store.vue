<template>
  <main-layout>
    <loading></loading>
    <template v-if="store">
      <h6>
        {{ store.name }}
      </h6>
      <div class="card">
        <div class="card-content list no-border highlight">
          <div class="item two-lines">
            <i class="item-primary">location_on</i>
            <div class="item-content">
              <div><template v-if="!address">{{ store.name }}</template>{{ address }}</div>
              <div>Adresse</div>
            </div>
          </div>
          <div class="item two-lines" v-if="store.notes">
            <i class="item-primary">info</i>
            <div class="item-content">
              <div>{{ store.notes }}</div>
              <div>Besonderheiten</div>
            </div>
          </div>
          <router-link tag="div" :to="{ name: 'chat', params: { id: store.teamConversation.id } }" class="item item-link" v-if="store.teamConversation.id">
            <i class="item-primary">chat</i>
            <div class="item-content">
              Chat
            </div>
          </router-link>
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
        return [store.street, store.streetNumber, store.zip, store.city]
          .filter(v => v).join(' ')
      }
    },
    created () {
      this.id = this.$route.params.id
      api.getStore(this.id).then(store => {
        this.store = store
      })
    }
  }
</script>
