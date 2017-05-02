<template>
  <div>
    <div class="fs-loading" v-if="isLoading && show">
      <spinner :size="48"></spinner>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

let activeRequestCount = 0

axios.interceptors.request.use(config => {
  activeRequestCount++
  return config
}, err => {
  activeRequestCount--
  return Promise.reject(err)
})

axios.interceptors.response.use(response => {
  activeRequestCount--
  return response
}, err => {
  activeRequestCount--
  return Promise.reject(err)
})

export default {
  data () {
    return { show: false }
  },
  computed: {
    isLoading () {
      return activeRequestCount > 0
    }
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
  padding-top: 30px
  spinner
    color: #4a3520
</style>
