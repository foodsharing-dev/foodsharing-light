<template>
  <div class="fs-loading">
    <spinner :size="48" v-if="show"></spinner>
  </div>
</template>

<script>
export default {
  data () {
    return { show: false }
  },
  mounted () {
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
  padding-top: 30px
  spinner
    color: #4a3520
</style>
