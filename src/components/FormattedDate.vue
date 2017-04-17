<script>
  import moment from 'moment'
  export default {
    props: {
      date: {
        required: true
      }
    },
    render (h) {
      return h('span', {}, moment(this.date).calendar())
    }
  }
</script>
