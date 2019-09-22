const globby = require('globby')
const prettier = require('prettier')
const makeDir = require('make-dir')
const PATH = require('path')
const del = require('del')
const FS = require('fs')
const dirTree = require('./dirTree.js')

const mergeFileConfig = (item, dirpath) => {
  const configFile = PATH.join(dirpath, 'file.json')
  if (FS.existsSync(configFile)) {
    try {
      const infoJson = JSON.parse(FS.readFileSync(configFile).toString())
      if (infoJson) {
        Object.assign(item, infoJson)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

const getTemplatePath = (dirpath) => {
  const templatePath = PATH.join(dirpath, 'index.html')
  if (FS.existsSync(templatePath)) {
    return templatePath
  } else {
    return 'public/index.html'
  }
}

const relative = (from, to) => {
  return PATH.relative(from, to).replace(/\\/g, '/')
}

module.exports = {
  start () {
    const viewRoot = 'src/views'
    const paths = globby.sync([`${viewRoot}/**/app.js`])
    const chunks = paths.map(path => {
      return PATH.dirname(PATH.relative(viewRoot, path))
        .split(PATH.sep)
        .join('~')
    })
    makeDir.sync('logs')
    del.sync('logs/*.json')

    // generate html-webpack-plugin options
    const htmlFile = 'logs/pages.json'
    let htmlConfig = {}
    paths.forEach((path, index) => {
      const chunk = chunks[index]
      const dirpath = PATH.dirname(path)
      htmlConfig[chunk] = {
        entry: path,
        filename: relative(viewRoot, dirpath) + '.html',
        // template: 'public/index.html'
        template: getTemplatePath(dirpath)
      }
    })

    htmlConfig = JSON.stringify(htmlConfig) !== '{}' ? htmlConfig : null
    if (htmlConfig) {
      const htmlConfigStr = prettier.format(JSON.stringify(htmlConfig), {
        parser: 'json'
      })
      FS.writeFile(htmlFile, htmlConfigStr, function (err) {
        if (err) {
          return console.log(err)
        }
      })
    }
    this.log(viewRoot, paths, chunks)
    return htmlConfig
  },

  log (viewRoot, paths, chunks) {
    // generate view route
    const routeFile = 'logs/location.json'
    const routesPath = paths.map((path, index) => {
      const dirpath = PATH.dirname(path)
      const item = {
        name: chunks[index],
        chunk: chunks[index],
        location: relative(viewRoot, dirpath) + '.html'
      }
      mergeFileConfig(item, dirpath)
      return item
    })
    if (routeFile) {
      const routesPathStr = prettier.format(JSON.stringify({
        route: routesPath
      }), {
        parser: 'json'
      })
      FS.writeFile(routeFile, routesPathStr, function (err) {
        if (err) {
          return console.log(err)
        }
      })
    }
    // generate view Tree
    const logsTree = dirTree(
      viewRoot, {
        basename: /^app.js$/,
        normalizePath: true
      },
      (item, PATH) => {
        const path = item.path
        const dirpath = PATH.dirname(path)
        if (item.type === 'file') {
          item.path = relative(viewRoot, dirpath) + '.html'
          mergeFileConfig(item, dirpath)
        } else if (item.type === 'directory') {
          mergeFileConfig(item, path)
          item.path = '#'
        }
      }
    )
    const treeFile = 'logs/tree.json'
    if (logsTree) {
      const logsTreeStr = prettier.format(JSON.stringify(logsTree), {
        parser: 'json'
      })
      FS.writeFile(treeFile, logsTreeStr, function (err) {
        if (err) {
          return console.log(err)
        }
      })
    }
  }
}
