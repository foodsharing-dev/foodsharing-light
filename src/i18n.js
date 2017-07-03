import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: require('strings/en.yml'),
    de: require('strings/de.yml')
  }
})

export default i18n

if (module.hot) {
  module.hot.accept([
    'strings/en.yml',
    'strings/de.yml'
  ], () => {
    i18n.setLocaleMessage('en', require('strings/en.yml'))
    i18n.setLocaleMessage('de', require('strings/de.yml'))
  })
}
