import { Platform, Toast } from 'quasar'

import log from 'services/log'

export default {
  receiveToken (token) {
    // maybe needs a device uuid to pair it with?
    // https://cordova.apache.org/docs/en/latest/reference/cordova-plugin-device/index.html
    // ... or just handle removing outdated ones on message push on server like in trustroots
    log.info('would save token to db', token)
  },
  foo () {
    if (Platform.is.cordova) {
      // not sure why cordova.plugins is undefined...
      const FCMPlugin = window.FCMPlugin
      FCMPlugin.getToken(token => {
        log.info('got token!', token)
        if (token) {
          this.receiveToken(token)
        }
      })

      FCMPlugin.onTokenRefresh(token => {
        log.info('token refresh!', token)
        this.receiveToken(token)
      })

      FCMPlugin.onNotification(data => {
        log.info('notification!', data)
        if (data.yay) {
          Toast.create(data.yay)
        }
      })
    }
  }
}
