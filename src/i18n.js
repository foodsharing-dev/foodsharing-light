import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: require('locales/en.yml'),
    de: require('locales/de.yml')
  }
})

export default i18n

if (module.hot) {
  module.hot.accept([
    'locales/en.yml',
    'locales/de.yml'
  ], () => {
    i18n.setLocaleMessage('en', require('locales/en.yml'))
    i18n.setLocaleMessage('de', require('locales/de.yml'))
  })
}
