const fs = require('fs')
const path = require('path')

module.exports = (api, opts) => {
  api.render('./template')
  if (opts.generate === 'whole') {
    api.render('./example')
  }
  const configPath =
    process.env.VUE_CLI_SERVICE_CONFIG_PATH || api.resolve('vue.config.js')

  if (!fs.existsSync(configPath)) {
    try {
      let template = fs.readFileSync(path.join(__dirname, './vue.config.js'))
      fs.writeFile(configPath, template, function (err) {
        if (err) {
          return console.log(err)
        }
      })
    } catch (e) {
      throw e
    }
  } else {
    //   api.injectImports(configPath, `const logger = require('vue-cli-plugin-pages/logger')`)
    console.log(`You can easy to get pages opition:`)
    console.log(`const logger = require('vue-cli-plugin-pages/logger')`)
    console.log(`const pages = logger.start()`)
  }

  api.onCreateComplete(() => {

    // Linting the generated files
    if (api.hasPlugin('eslint')) {
      // Lint generated/modified files
      try {
        const lint = require('@vue/cli-plugin-eslint/lint')
        lint({
          silent: true
        }, api)
      } catch (e) {
        // No ESLint vue-cli plugin
      }
    }
  })
}