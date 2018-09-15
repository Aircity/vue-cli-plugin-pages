const globby = require("globby");
const jsonfile = require("jsonfile");
const makeDir = require("make-dir");
const PATH = require("path");
const del = require("del");
const FS = require("fs");
const dirTree = require("./dirTree.js");

const mergeFileConfig = (item, dirpath) => {
  let configFile = PATH.join(dirpath, "file.json");
  if (FS.existsSync(configFile)) {
    try {
      let infoJson = jsonfile.readFileSync(configFile);
      if (infoJson) {
        Object.assign(item, infoJson);
      }
    } catch (err) {
      console.log(err);
    }
  }
};

module.exports =  () => {
  const viewRoot = "src/views";
  const paths = globby.sync([`${viewRoot}/*/app.js`]);
  const chunks = paths.map(path => {
    return PATH.dirname(PATH.relative(viewRoot, path))
      .split(PATH.sep)
      .join("_");
  });
  makeDir.sync("logs");
  del.sync("logs/*.json");
  // generate view route
  const routeFile = "logs/route.json";
  const routePaths = paths.map((path, index) => {
    const dirpath = PATH.dirname(path);
    let item = {
      name: chunks[index],
      chunk: chunks[index],
      location: dirpath + ".html"
    };
    mergeFileConfig(item, dirpath);
    return item;
  });
  FS.writeFile(routeFile, {}, function(err) {
    if (err) {
      return console.log(err);
    }
    jsonfile.writeFile(routeFile, { route: routePaths }, { spaces: 2 });
  });

  // generate html-webpack-plugin options
  const htmlFile = "logs/template.json";
  let htmlConfig = {};
  paths.forEach((path, index) => {
    const chunk = chunks[index];
    htmlConfig[chunk] = {
      entry: path,
      filename: chunk + ".html",
      template: "public/index.html"
    };
  });

  htmlConfig = JSON.stringify(htmlConfig) !== "{}" ? htmlConfig : null;
  if (htmlConfig) {
    FS.writeFile(htmlFile, {}, function(err) {
      if (err) {
        return console.log(err);
      }
      jsonfile.writeFile(htmlFile, htmlConfig, { spaces: 2 });
    });
  }

  // generate view Tree
  const logsTree = dirTree(
    viewRoot,
    { basename: /^app.js$/, normalizePath: true },
    (item, PATH) => {
      const path = item.path;
      const dirpath = PATH.dirname(path);
      if (item.type === "file") {
        item.path = dirpath + ".html";
        mergeFileConfig(item, dirpath);
      } else if (item.type === "directory") {
        mergeFileConfig(item, path);
        item.path = "#";
      }
    }
  );
  const treeFile = "logs/tree.json";
  if (logsTree) {
    FS.writeFile(treeFile, {}, function(err) {
      if (err) {
        return console.log(err);
      }
      jsonfile.writeFile(treeFile, { tree: logsTree }, { spaces: 2 });
    });
  }
  return htmlConfig;
}
