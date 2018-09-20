module.exports = api => {
  api.chainWebpack(webpackConfig => {
    webpackConfig.resolve.modules.add(api.resolve('src'))
    webpackConfig.resolve.alias.set('@logs', api.resolve('logs'))
  })
}
