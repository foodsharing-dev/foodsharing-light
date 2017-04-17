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

      <div class="list">
        <div class="list-label">Verantwortliche foodsaver</div>
        <router-link tag="div"
                     :to="{ name: 'userChat', params: { userId: m.user.id } }" class="item item-link"
                     v-for="m in store.team"
                     :key="m.user.id">
          <img class="item-primary" :src="'statics/boy-avatar.png'">
          <div class="item-content has-secondary">
            {{ m.user.firstName }}
          </div>
          <i class="item-secondary">
            chat_bubble
          </i>
        </router-link>
        <hr>
        <div class="list-label">Team</div>
        <router-link tag="div"
                     class="item item-link"
                     :to="{ name: 'userChat', params: { userId: m.user.id } }"
                     v-for="m in store.team"
                     :key="m.user.id">
          <img class="item-primary" :src="'statics/linux-avatar.png'">
          <div class="item-content has-secondary">
            {{ m.user.firstName }}
          </div>
          <i class="item-secondary">
            chat_bubble
          </i>
        </router-link>
      </div>
    </template>

    <!-- MAIN END -->


  </main-layout>
  </div></template>

<script>
import api from 'services/api'

export default {
  data () {
    return {
      loading: false,
      store: null
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
