<template>
  <div class="list no-border">
    <div class="list-label">{{ title }}</div>

    <div v-for="{user: u} in users"
         v-on:click="showActionSheetWithIcons(u)"
         class="item two-lines item-link">
      <img class="item-primary" :src="avatarFor(u)">
      <div class="item-content">
        {{ u.firstName }}
      </div>
    </div>
  </div>
</template>

<script>
  import { ActionSheet } from 'quasar'

  export default {
    props: ['users', 'title'],
    data () {
      return {

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
