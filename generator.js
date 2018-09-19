const fs = require('fs')
const path = require('path')

module.exports = api => {
  api.render('./template')

  const configPath =
    process.env.VUE_CLI_SERVICE_CONFIG_PATH || api.resolve('vue.config.js')

  if (!fs.existsSync(configPath)) {
    try {
      let template = fs.readFileSync(path.join(__dirname, './lib/vue.config.js'))
      fs.writeFile(configPath, template, function (err) {
        if (err) {
          return console.log(err)
        }
      })
    } catch (e) {
      throw e
    }
  }
}
