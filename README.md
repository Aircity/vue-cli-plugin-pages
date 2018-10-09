English | [简体中文](./README-zh_CN.md)

# vue-cli-plugin-pages

This is a vue-cli 3.x plugin to build multi-page application.

## 🔗 Table of contents

* [Features](#-features)
* [Usage](#-usage)


## ✨ Features

* Generate multi-page [pages](https://cli.vuejs.org/config/#pages) config.(Get the entries and filenames through `src/views/**/app.js`)
``
{
  "index": {
    "entry": "src/views/index/app.js",
    "filename": "index.html",
    "template": "public/index.html"
  },
  "preview": {
    "entry": "src/views/preview/app.js",
    "filename": "preview.html",
    "template": "public/index.html"
  },
  "multi-page~home": {
    "entry": "src/views/multi-page/home/app.js",
    "filename": "multi-page/home.html",
    "template": "public/index.html"
  },
  "multi-page~subpage": {
    "entry": "src/views/multi-page/subpage/app.js",
    "filename": "multi-page/subpage.html",
    "template": "public/index.html"
  }
}
``

* Generate multi-page location to `logs/route.json`.
```
{
  "route": [
    { "name": "Index Page", "chunk": "index", "location": "index.html" },
    { "name": "Index Page", "chunk": "preview", "location": "preview.html" },
    {
      "name": "Home Page",
      "chunk": "multi-page~home",
      "location": "multi-page/home.html"
    },
    {
      "name": "Subpage",
      "chunk": "multi-page~subpage",
      "location": "multi-page/subpage.html"
    }
  ]
}
```

* Generate multi-page directory tree to `logs/tree.json`.

```
{
  "path": "#",
  "name": "views",
  "children": [
    {
      "path": "index.html",
      "name": "Index Page",
      "children": [],
      "size": 135,
      "type": "file",
      "extension": ".js",
      "merged": true
    },
    {
      "path": "#",
      "name": "Multi Page",
      "children": [
        {
          "path": "multi-page/home.html",
          "name": "Home Page",
          "children": [],
          "size": 135,
          "type": "file",
          "extension": ".js",
          "merged": true
        },
        {
          "path": "multi-page/subpage.html",
          "name": "Subpage",
          "children": [],
          "size": 135,
          "type": "file",
          "extension": ".js",
          "merged": true
        }
      ],
      "size": 270,
      "type": "directory"
    },
    {
      "path": "preview.html",
      "name": "Index Page",
      "children": [],
      "size": 135,
      "type": "file",
      "extension": ".js",
      "merged": true
    }
  ],
  "size": 540,
  "type": "directory"
}

```

## 🔨 Usage

:warning: Make sure you have vue-cli 3.x.x:

```
vue --version
```

If you don't have a project created with vue-cli 3.x yet:

```
vue create my-new-app
```

Navigate to the newly created project folder and add the cli plugin:

```
cd my-new-app
vue add pages
```

Start your app:

```
npm run serve
```
