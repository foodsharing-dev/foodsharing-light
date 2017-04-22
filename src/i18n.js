import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'de',
  messages: {
    en: require('./messages/en.yml'),
    de: require('./messages/de.yml')
  }
})

export default i18n

if (module.hot) {
  module.hot.accept([
    './messages/en.yml',
    './messages/de.yml'
  ], () => {
    i18n.setLocaleMessage('en', require('./messages/en.yml'))
    i18n.setLocaleMessage('de', require('./messages/de.yml'))
  })
}
