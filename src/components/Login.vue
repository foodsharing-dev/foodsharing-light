<template>
  <main-layout>
    <p>Login</p>
    <button @click="login()" class="primary big">Login</button>
  </main-layout>
</template>

<script>
  import auth from '../services/auth'

  export default {
    data () {
      return {}
    },
    methods: {
      login () {
        return auth.login()
      }
    }
  }
</script>

<style lang="styl">
</style>
