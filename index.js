const logger = require("./logger.js");
const path = require("path");
const fs = require("fs");

module.exports = api => {
  api.chainWebpack(webpackConfig => {
    webpackConfig.resolve.modules.add(api.resolve("src"));
    webpackConfig.resolve.alias.set("@logs", api.resolve("logs"));
  });

  const configPath =
    process.env.VUE_CLI_SERVICE_CONFIG_PATH || api.resolve("vue.config.js");

  if (!fs.existsSync(configPath)) {
    try {
      let template = fs.readFileSync(path.join(__dirname, "vue.config.js"));
      fs.writeFile(configPath, template, function(err) {
        if (err) {
          return console.log(err);
        }
      });
    } catch (e) {
      throw e;
    }
  }
};

module.exports.logger = logger