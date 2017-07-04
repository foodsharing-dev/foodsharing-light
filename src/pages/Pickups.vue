<template>
  <main-layout>
    <h6>Deine Abholtermine</h6>
    <q-card color="white">
      <q-card-main v-if="isLoading">
        <loading/>
      </q-card-main>
      <div class="list no-border" v-else-if="pickups.length > 0">
        <router-link v-for="p in pickups"
                     :to="{ name: 'pickup', params: { id: p.id } }"
                     :key="p.id"
                     tag="div"
                     class="item two-lines item-link">
          <div class="item-primary">
            <q-icon name="store" />
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
      <q-card-main v-else>
        <p>Du hast keine pickups. </p>
      </q-card-main>
    </q-card>
  </main-layout>
</template>

<script>
  import { Toast, QCard, QCardMain, QIcon } from 'quasar'
  import api from 'services/api'

  export default {
    components: {
      Toast,
      QCard,
      QCardMain,
      QIcon
    },
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
<style lang="stylus">
@import '~variables'

p
  color $text-color
</style>
