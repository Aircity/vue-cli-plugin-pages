<template>
  <li :class="{'selected': item.expanded}">
    <a href="javascript:void(0);"
       class="collapsible-header"
       v-if="item.children.length>0"
       @click="toggle(item)">
      <!-- <i class="material-icons">folder</i> -->
      {{item.name}}
    </a>
    <a :href="item.path"
       v-else>
      <!-- <i class="material-icons">dashboard</i> -->
      {{item.name}}
    </a>
    <ul class="collapsible-body"
        v-if="item.children.length>0">
      <sidebar-item :item="item"
                    v-for="(item, index) in item.children"
                    :key="index"
                    @triggle-click="handleClick"></sidebar-item>
    </ul>
  </li>
</template>

<script>
export default {
  name: "sidebar-item",
  props: {
    item: null,
  },
  methods: {
    handleClick(link) {
      this.$emit("triggle-click", link)
    },
    toggle(item) {
      let expanded = !item.expanded
      this.$set(item, "expanded", expanded)
      this.$forceUpdate()
    },
  },
}
</script>
