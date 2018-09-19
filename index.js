const logger = require('./lib/logger.js')

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    webpackConfig.resolve.modules.add(api.resolve('src'))
    webpackConfig.resolve.alias.set('@logs', api.resolve('logs'))
  })
}

module.exports.logger = logger
