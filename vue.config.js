const logger = require('vue-cli-plugin-pages/logger')
const pages = logger.start()

module.exports = {
  pages: pages,
  devServer: {
    open: true,
    openPage: 'preview.html'
  }
}
