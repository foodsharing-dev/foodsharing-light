<template>
  <div>
    {{ title }}
    <q-item v-for="{user: u} in users"
           v-on:click="showActionSheetWithIcons(u)">
      <q-item-side :avatar="avatarFor(u)"/>
      <q-item-main>
        <q-item-tile label>{{ u.firstName }}</q-item-tile>
      </q-item-main>
    </q-item>
  </div>
</template>

<script>
  import { ActionSheet, QList, QItem, QItemMain, QItemSide, QItemTile } from 'quasar'

  import defaultAvatar from 'assets/default-avatar.png'

  export default {
    components: {
      ActionSheet,
      QList,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile
    },
    props: ['users', 'title'],
    methods: {
      avatarFor (user) {
        if (user.photo) {
          return '/fs/images/thumb_crop_' + user.photo
        }
        else {
          return defaultAvatar
        }
      },
      showActionSheetWithIcons (user) {
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
              window.location.href = 'tel:' + user.mobile
            }
          })
        }

        ActionSheet.create({
          title: user.firstName,
          gallery: true,
          actions
        })
      }
    }
  }
</script>
<style lang="stylus">
.q-item
  cursor pointer
</style>
