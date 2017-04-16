<script>
  import moment from 'moment'
  export default {
    props: {
      date: {
        required: true
      }
    },
    data () {
      return {
        fromNow: ''
      }
    },
    methods: {
      update () {
        this.fromNow = moment(this.date).fromNow()
      }
    },
    created () {
      this.update()
      this.timer = setInterval(() => {
        this.update()
      }, 5000)
    },
    destroyed () {
      clearInterval(this.timer)
    },
    render (h) {
      return h('span', {}, this.fromNow)
    }
  }
</script>
