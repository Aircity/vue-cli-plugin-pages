const logger = require('./logger')
const pages = logger.start()

module.exports = api => {
  if (!api.service.projectOptions.pages) {
    api.service.projectOptions.pages = pages
  }
  api.chainWebpack(webpackConfig => {
    webpackConfig.resolve.modules.add(api.resolve('src'))
    webpackConfig.resolve.alias.set('@logs', api.resolve('logs'))
  })
}
