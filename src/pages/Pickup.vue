<template>
  <main-layout>
    <div v-if="pickup">
      <h6>Abholung {{ store.name }}</h6>
      <q-card>
        <q-card-main>
          <div class="item two-lines">
            <i class="item-primary">alarm</i>
            <div class="item-content">
              <div><formatted-date :date="pickup.at"></formatted-date></div>
              <div>Datum / Uhrzeit</div>
            </div>
          </div>

          <router-link :to="{ name: 'store', params: { id: store.id } }" class="item two-lines item-link">
            <i class="item-primary">store</i>
            <div class="item-content">
              <div><template v-if="!address">{{ store.name }}</template>{{ address }}</div>
              <div>Adresse</div>
            </div>
          </router-link>

          <div class="item two-lines" v-if="store.notes">
            <i class="item-primary">info</i>
            <div class="item-content">
              <div>{{ store.notes }}</div>
              <div>Besonderheiten</div>
            </div>
          </div>

          <router-link :to="{ name: 'chat', params: { id: store.teamConversation.id } }" class="item item-link" v-if="store.teamConversation.id">
            <i class="item-primary">chat</i>
            <div class="item-content">
              Chat
            </div>
          </router-link>
        </q-card-main>
        <hr>
        <user-list :users=pickup.members title="Abholer"></user-list>
      </q-card>
    </div>
  </main-layout>
</template>

<script>
  import api from 'services/api'
  import UserList from 'components/UserList'
  import { QCard, QCardMain } from 'quasar'
  export default {
    components: {
      UserList,
      QCard,
      QCardMain
    },
    data () {
      return {
        pickup: null,
        store: null
      }
    },
    computed: {
      address () {
        let { store } = this
        if (!store) return
        return [store.street, store.streetNumber, store.zip, store.city]
          .filter(v => v).join(' ')
      }
    },
    created () {
      let { id } = this.$route.params
      api.getPickup(id).then(pickup => {
        this.pickup = pickup
        this.store = pickup.store
      })
    }
  }
</script>
