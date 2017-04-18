var merge = require('webpack-merge')
var prodEnv = require('./dev.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"TEST"'
})
