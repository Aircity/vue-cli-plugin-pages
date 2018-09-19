<template>
  <div class="mdc-body">
    <aside class="mdc-drawer">
      <div class="mdc-drawer__header">
        <h3 class="mdc-drawer__title">Vue-cli-plugin-pages</h3>
        <h6 class="mdc-drawer__subtitle">
          <a href="https://github.com/Aircity/vue-cli-plugin-pages">Github</a>
        </h6>
      </div>
      <div class="mdc-drawer__content">
        <nav class="mdc-list-group">
          <ul class="drawer-list">
            <tree-item
              v-for="(item, index) in getTree"
              :item="item"
              :key="index"
              @triggle-click="load"/>
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
          frameborder="0"/>
      </main>
    </div>
  </div>
</template>

<script>
import './drawer/mdc.drawer.css'
import './app.css'
import { children as Tree } from '@logs/tree'
import Item from './tree-item.vue'

export default {
  name: 'Preview',
  components: {
    'tree-item': Item
  },
  data: () => ({
    Tree: Tree
  }),
  computed: {
    getTree () {
      return this.Tree.filter(item => item.path !== 'preview.html')
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

.mdc-drawer__title {
  margin-bottom: 0;
}

.mdc-drawer__header {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 16px;
}

.drawer-list {
  text-align: left;
}
</style>
