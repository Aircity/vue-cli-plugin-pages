<template>
  <div class="mdc-body">
    <aside class="mdc-drawer">
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">Vue-cli-plugin-pages</h3>
        <h6 class="css-filter-box">
          <input
            v-model="value"
            type="text"
            placeholder="Filter"
            name="filter-text"
            class="css-filter">
        </h6>
      </div>
      <div class="mdc-drawer__content">
        <nav class="mdc-list-group">
          <ul class="drawer-list">
            <tree-item
              v-for="(item, index) in getTree"
              :item="item"
              :key="index"
              @triggle-click="load" />
          </ul>
        </nav>
      </div>
    </aside>
    <div class="mdc-drawer-app-content">
      <main
        id="main-content"
        class="main-content">
        <iframe
          ref="iframe"
          class="iframe"
          title="iframe"
          src="/index.html"
          frameborder="0" />
      </main>
    </div>
  </div>
</template>

<script>
import { children as Tree } from '@logs/tree'
import Item from './tree-item.vue'
import './mdc.drawer.css'

export default {
  name: 'Preview',
  components: {
    'tree-item': Item
  },
  data: () => ({
    Tree: Tree,
    value: ''
  }),
  computed: {
    getTree () {
      return this.Tree.filter(item => item.path !== 'preview.html').filter(
        item => item.name.includes(this.value)
      )
    }
  },
  methods: {
    load (filename) {
      document.getElementsByTagName('iframe')[0].src = `/${filename}`
    }
  }
}
</script>

<style>
html,
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 0;
}

a {
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  color: #00bccc;
  cursor: pointer;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mdc-body {
  display: flex;
  height: 100vh;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.iframe {
  height: 100%;
  width: 100%;
  min-height: 100%;
}

.mdc-drawer__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 16px;
}

.drawer-list {
  text-align: left;
}
.css-filter-box {
  border: 1px solid rgb(236, 236, 236);
  border-radius: 2px;
  position: relative;
  margin-bottom: 0;
}
.css-filter {
  font-size: 12px;
  color: rgb(130, 130, 130);
  display: block;
  width: 100%;
  box-sizing: border-box;
  height: 26px;
  padding: 5px;
  background: rgba(255, 255, 255, 0.1);
  border-width: 0px;
  border-style: none;
  border-color: initial;
  border-image: initial;
  outline: none;
  border-radius: 2px;
}
</style>
