<template>
  <aside class="mdc-drawer">
    <div class="mdc-drawer__header">
      <h3 class="mdc-drawer__title">Vue-cli-plugin-pages</h3>
      <h6 class="mdc-drawer__subtitle">
        <a href="https://github.com/Aircity/vue-cli-plugin-pages">Github</a>
      </h6>
    </div>
    <div class="mdc-drawer__content">
      <nav class="mdc-list-group">
        <ul id="slide-menu">
          <tree-item :item="item"
                     v-for="(item, index) in getTree"
                     :key="index"></tree-item>
        </ul>
      </nav>

    </div>
  </aside>
</template>

<script>
import "./drawer/mdc.drawer.css"
import "./reset.css"
import "./tree.css"
import { children as Tree } from "@logs/tree"
import Item from "./tree-item.vue"

export default {
  name: "preview",
  components: {
    "tree-item": Item,
  },
  data: () => ({
    Tree: Tree,
  }),
  computed: {
    getTree() {
      return this.Tree.filter(item => item.path !== "preview.html")
    },
  },
}
</script>

<style>
html,
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
  margin: 0;
}
</style>
