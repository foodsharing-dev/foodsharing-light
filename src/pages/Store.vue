<template>
  <main-layout>
    <loading v-if="isLoading"></loading>
    <template v-if="store">
      <h6>
        {{ store.name }}
      </h6>
      <q-card>
        <q-card-main>
          <q-item>
            <q-item-side>
              <q-item-tile icon="location_on" />
            </q-item-side>
            <q-item-main>
              <div><template v-if="!address">{{ store.name }}</template>{{ address }}</div>
              <div>Adresse</div>
            </q-item-main>
          </q-item>
          <q-item v-if="store.notes">
            <q-item-side>
              <q-item-tile icon="info" />
            </q-item-side>
            <q-item-main>
              <div>{{ store.notes }}</div>
              <div>Besonderheiten</div>
            </q-item-main>
          </q-item>
          <router-link tag="div" :to="{ name: 'chat', params: { id: store.teamConversation.id } }" class="item item-link" v-if="store.teamConversation.id">
            <q-item>
              <q-item-side>
                <q-item-tile icon="chat" />
              </q-item-side>
              <q-item-main>
                Chat
              </q-item-main>
            </q-item>
          </router-link>
        </q-card-main>
      </q-card>
      <q-card>
        <q-card-main>
          <user-list :users="coordinators" title="Betriebsverantwortliche" />
          <user-list :users="team" title="Team" />
        </q-card-main>
      </q-card>
    </template>
  </main-layout>
</template>

<script>
  import api from 'services/api'
  import UserList from 'components/UserList'
  import { QCard, QCardMain, QIcon, QItem, QItemMain, QItemSide, QItemTile, QList } from 'quasar'
  export default {
    components: {
      UserList,
      QCard,
      QCardMain,
      QIcon,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QList
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
        return [store.street, store.streetNumber, store.zip, store.city]
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
