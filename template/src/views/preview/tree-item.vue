<template>
  <li class="drawer-list__item">
    <a v-if="item.type==='directory'"
       class="drawer-link mdc-ripple-upgraded"
       href="javascript:;">
      {{item.name}}
    </a>
    <a v-else
       class="drawer-link mdc-ripple-upgraded"
       href="javascript:;"
       @click="handleClick(item.path)">
      {{item.name}}
    </a>
    <ul class="drawer-list drawer-list--sublevel"
        v-if="item.type==='directory'">
      <sidebar-item :item="item"
                    @triggle-click="handleClick"
                    v-for="(item, index) in item.children"
                    :key="index"></sidebar-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: "sidebar-item",
  props: {
    item: {}
  },
  methods: {
    handleClick(link) {
      this.$emit("triggle-click", link);
    },
    toggle(item) {
      let expanded = !item.expanded;
      this.$set(item, "expanded", expanded);
      this.$forceUpdate();
    }
  }
};
</script>
