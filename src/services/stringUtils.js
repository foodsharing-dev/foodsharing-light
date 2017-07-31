export function escape (str) {
  // seems to be buried in VueJS, so just copied to code over
  // https://github.com/vuejs/vue/blob/43485fbc5b779e02122c3b7fc64296a2cfee31f6/src/platforms/web/server/util.js
  return str.replace(/[<>"&]/g, (a) => {
    return {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '&': '&amp;'
    }[a]
  })
}

export function autolink (str) {
  // copied from foodsharing.de frontend code
  // https://gitlab.com/foodsharing-dev/foodsharing/blob/0fbbbac4322cd824378dc007e77e6dbd0e9adf3e/js/autolink.js
  let pattern = /(^|\s)((?:https?|ftp):\/\/([-A-Z0-9+\u0026@#/%?=()~_|!:,.;]*[-A-Z0-9+\u0026@#/%=~()_|]))/gi
  let currentHost = document.location.host

  return str.replace(pattern, (match, space, url, urlWithoutProto) => {
    return space + '<a' +
      ' href="' + url + '"' +
      (urlWithoutProto.split('/', 2)[0] !== currentHost ? ' target="_blank"' : '') +
    '>' + urlWithoutProto + '</a>'
  })
}

export function nl2br (str) {
  return str.replace(/\n/g, '<br>')
}
