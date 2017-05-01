<template>
  <q-layout>
    <slot name="header">
      <div slot="header" class="toolbar">
        <button class="hide-on-drawer-visible" @click="$refs.leftDrawer.open()">
          <i>menu</i>
        </button>
        <i>assignment</i>
        <q-toolbar-title :padding="1">
          Foodsharing Signup
        </q-toolbar-title>
      </div>
    </slot>

    <div class="layout-view">
      <div class="layout-padding">
        <q-stepper @finish="finish()" ref="stepper">
          <q-step title="personal information">
            <div class="list">
              <div class="item two-lines">
                <i class="item-primary">email</i>
                <div class="item-content">
                  <input v-model="email" class="full-width" placeholder="E-Mail Address">
                </div>
              </div>
              <hr>
              <div class="item two-lines">
                <i class="item-primary">face</i>
                <div class="item-content">
                  <input v-model="name" placeholder="your name" class="full-width">
                </div>
              </div>
            </div>
          </q-step>

          <!-- Step specifying when user should be able to jump to next step -->
          <q-step title="Take a strong Password" :ready="ready">
            <div class="list">
              <div class="item two-lines">
                <i class="item-primary">lock</i>
                <div class="item-content">
                  <input type="password" v-model="pass1" class="full-width" placeholder="Password">
                </div>
              </div>
              <hr>
              <div class="item two-lines">
                <i class="item-primary">lock</i>
                <div class="item-content">
                  <input type="password" v-model="pass2" placeholder="retype password" class="full-width">
                </div>
              </div>
            </div>
          </q-step>
          <q-step title="upload avatar">
            <q-uploader :url="upload" :extensions="'.gif,.jpg,.jpeg,.png'"></q-uploader>
          </q-step>
        </q-stepper>
      </div>
    </div>
  </q-layout>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        name: '',
        pass1: '',
        pass2: ''
      }
    },
    methods: {
      finish () {
        console.log('finish signup...')
      }
    }
  }
</script>
