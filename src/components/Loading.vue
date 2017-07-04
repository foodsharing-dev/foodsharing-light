<template>
  <div class="fs-loading">
    <q-spinner v-if="show" :size="48" color="#4a3520" />
  </div>
</template>

<script>
  import { QSpinner } from 'quasar'
  export default {
    components: {
      QSpinner
    },
    data () {
      return { show: false }
    },
    created () {
      this.timer = setTimeout(() => {
        this.show = true
      }, 500)
    },
    destroyed () {
      clearTimeout(this.timer)
    }
  }
</script>

<style lang="stylus" scoped>
.fs-loading
  text-align: center
  svg
    margin: 10px 0
</style>
