<template>
  <q-select type="list" v-model="locale" :options="langOptions"></q-select>
</template>

<script>
  import i18n from '../i18n'
  export default {
    data () {
      return {
        locale: i18n.locale,
        langOptions: [
          { value: 'de', label: 'Deutsch' },
          { value: 'en', label: 'English' }
        ]
      }
    },
    watch: {
      locale (val) {
        i18n.locale = val
      }
    }
  }
</script>
