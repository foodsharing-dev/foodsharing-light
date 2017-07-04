<template>
  <main-layout>
    <h6>
      Deine Betriebe
    </h6>
    <q-card>
        <loading v-if="isLoading"/>
        <template v-else-if="stores.length > 0">
        <q-list>
          <router-link :to="'/store/' + store.id" v-for="store in stores" :key="store.id">
            <q-item>
              <q-item-side>
                <q-item-tile icon="store" />
              </q-item-side>
              <q-item-main>
                <q-item-tile label>{{ store.name }}</q-item-tile>
                <q-item-tile sublabel>{{ formatAddress(store) }}</q-item-tile>
              </q-item-main>
            </q-item>
          </router-link>
        </q-list>
        </template>
        <template v-else-if="stores">
          Du bist in keinem Betrieb. Verwende die Desktop Version, um einem Betrieb beizutreten.
        </template>
    </q-card>
  </main-layout>
</template>

<script>
  import Loading from '@/Loading'
  import { Toast, QCard, QCardMain, QIcon, QItem, QItemMain, QItemSide, QItemTile, QList } from 'quasar'

  import api from 'services/api'

  export default {
    components: {
      Loading,
      Toast,
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
        stores: []
      }
    },
    methods: {
      formatAddress (store) {
        return [store.street, store.streetNumber, store.zip, store.city]
          .filter(v => v).join(' ')
      }
    },
    created () {
      this.isLoading = true
      api.getStoreList().then(stores => {
        this.stores = stores
      }).catch(() => {
        // TODO: translate to German
        Toast.create.negative('Could not load stores')
      }).then(() => {
        this.isLoading = false
      })
    }
  }
</script>
<style lang="stylus">

</style>
