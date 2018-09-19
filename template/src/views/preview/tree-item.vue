<template>
  <li class="drawer-list__item">
    <a
      v-if="item.type==='directory'"
      class="drawer-link mdc-ripple-upgraded"
      href="javascript:;">
      {{ item.name }}
    </a>
    <a
      v-else
      class="drawer-link mdc-ripple-upgraded"
      href="javascript:;"
      @click="handleClick(item.path)">
      {{ item.name }}
    </a>
    <ul
      v-if="item.type==='directory'"
      class="drawer-list drawer-list--sublevel">
      <sidebar-item
        v-for="(item, index) in item.children"
        :item="item"
        :key="index"
        @triggle-click="handleClick"/>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {}
  },
  methods: {
    handleClick (link) {
      this.$emit('triggle-click', link)
    },
    toggle (item) {
      let expanded = !item.expanded
      this.$set(item, 'expanded', expanded)
      this.$forceUpdate()
    }
  }
}
</script>
