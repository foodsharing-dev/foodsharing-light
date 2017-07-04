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
              <q-item-tile label><template v-if="!address">{{ store.name }}</template>{{ address }}</q-item-tile>
              <q-item-tile sublabel>Adresse</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item v-if="store.notes">
            <q-item-side>
              <q-item-tile icon="info" />
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{ store.notes }}</q-item-tile>
              <q-item-tile sublabel>Besonderheiten</q-item-tile>
            </q-item-main>
          </q-item>
          <router-link :to="{ name: 'chat', params: { id: store.teamConversation.id } }" class="item item-link" v-if="store.teamConversation.id">
            <q-item>
              <q-item-side>
                <q-item-tile icon="chat" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>Chat</q-item-tile>
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
  import Loading from '@/Loading'
  import api from 'services/api'
  import UserList from 'components/UserList'
  import { QCard, QCardMain, QIcon, QItem, QItemMain, QItemSide, QItemTile, QList } from 'quasar'
  export default {
    components: {
      Loading,
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
<style lang="stylus">

</style>
