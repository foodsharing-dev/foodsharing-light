<template>

  <main-layout>

    <!-- MAIN -->
    <div v-if="pickup">

      <h6>Abholung {{ store.name }}</h6>
      <div class="card">
        <div class="card-content list no-border highlight">
          <div class="item two-lines">
            <i class="item-primary">alarm</i>
            <div class="item-content">
              <div class="item-title">{{ pickup.at }}</div>
              <div>Datum / Uhrzeit</div>
            </div>
          </div>
          <router-link tag="div" :to="{ name: 'store', params: { id: store.id } }" class="item two-lines item-link">
            <i class="item-primary">store</i>
            <div class="item-content">
              <div class="item-title">{{ store.streetNumber }} {{ store.street }}, {{ store.zip }} {{ store.city }}</div>
              <div>Adresse</div>
            </div>
          </router-link>

          <div class="item two-lines">
            <i class="item-primary">info</i>
            <div class="item-content">
              <div class="item-title">Besonderheiten</div>
              <div>{{ store.notes }}</div>
            </div>
          </div>
        </div>
        <hr>
        <div class="list no-border">
          <div class="list-label">{{ pickup.members.length }} foodsaver kommen</div>

          <div v-for="member in pickup.members"
               v-on:click="showActionSheetWithIcons(member)"
               class="item two-lines item-link">
            <img class="item-primary" :src="avatarFor(member)">
            <div class="item-content">
              {{ member.firstName }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- MAIN END -->
  </main-layout>
  </div></template>

<script>
  import { ActionSheet } from 'quasar'

  import api from 'services/api'
  import log from 'services/log'

  export default {
    data () {
      return {
        pickup: null,
        store: null
      }
    },
    methods: {
      avatarFor (user) {
        if (user.photo) {
          return '/fs/images/thumb_crop_' + user.photo
        }
        else {
          return '/statics/default-avatar.png'
        }
      },
      showActionSheetWithIcons ({ user }) {
        let actions = []

        actions.push({
          label: 'Chat',
          icon: 'chat',
          handler: () => {
            this.$router.push({ name: 'userChat', params: { userId: user.id } })
          }
        })

        if (user.mobile) {
          actions.push({
            label: 'Call',
            icon: 'phone',
            handler () {
              // todo
              window.location.href = 'tel:' + user.phone
            }
          })
        }

        ActionSheet.create({
          title: user.firstName,
          gallery: true,
          actions
        })
      }
    },
    created () {
      let { id } = this.$route.params
      log.info('pickup id is', id)
      api.getPickup(id).then(pickup => {
        this.pickup = pickup
        this.store = pickup.store
      })
    }
  }
</script>

<style lang="styl">
</style>
