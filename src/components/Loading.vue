<template>
  <div class="fs-loading">
    <spinner v-if="show" :size="48" color="#4a3520" />
  </div>
</template>

<script>
  export default {
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
