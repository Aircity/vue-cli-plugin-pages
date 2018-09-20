<template>
  <li class="drawer-list__item">
    <a
      v-if="item.type==='directory'"
      class="drawer-link mdc-ripple-upgraded"
      href="javascript:;">
      <svg
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2v-2h-2V9h2zm-4 10H4V5h14v14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"/>
      </svg>
      <span>{{ item.name }}</span>
    </a>
    <a
      v-else
      class="drawer-link mdc-ripple-upgraded"
      href="javascript:;"
      @click="handleClick(item.path)">
      <svg
        focusable="false"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        aria-hidden="true">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
      </svg>
      <span>
        {{ item.name }}
      </span>
    </a>
    <ul
      v-if="item.type==='directory'"
      class="drawer-list drawer-list--sublevel">
      <sidebar-item
        v-for="(item, index) in item.children"
        :item="item"
        :key="index"
        @triggle-click="handleClick" />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: Object
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

<style>
.drawer-heading {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.938rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-decoration: inherit;
  text-transform: inherit;
  font-weight: 500;
  color: #202124;
  margin-bottom: 5px;
  padding: 12px 24px;
  font-size: 1rem;
}

.drawer-list {
  font-family: Roboto Mono;
  font-weight: 500;
}

.drawer-list__item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 42px;
}

.drawer-list--sublevel .drawer-list__item {
  border-left: none;
}

.drawer-list--sublevel .drawer-link {
  padding-left: 48px;
}

.drawer-list__item--active > .drawer-link {
  font-weight: 500;
  color: #202124;
  position: relative;
}

.drawer-link {
  font-family: Roboto, sans-serif;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-size: 0.938rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  text-decoration: inherit;
  text-transform: inherit;
  --mdc-ripple-fg-size: 0;
  --mdc-ripple-left: 0;
  --mdc-ripple-top: 0;
  --mdc-ripple-fg-scale: 1;
  --mdc-ripple-fg-translate-end: 0;
  --mdc-ripple-fg-translate-start: 0;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  will-change: transform, opacity;
  position: relative;
  padding: 12px 24px 12px 24px;
  font-size: 1rem;
  letter-spacing: normal;
  overflow: hidden;
  color: #616161;
  display: flex;
  align-items: center;
}

.drawer-link,
.drawer-link:active,
.drawer-link:focus,
.drawer-link:hover {
  text-decoration: none;
}

.drawer-link:after,
.drawer-link:before {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
}

.drawer-link:before {
  transition: opacity 15ms linear;
  z-index: 1;
}

.drawer-link.mdc-ripple-upgraded:before {
  transform: scale(var(--mdc-ripple-fg-scale, 1));
}

.drawer-link.mdc-ripple-upgraded:after {
  top: 0;
  left: 0;
  transform: scale(0);
  transform-origin: center center;
}

.drawer-link.mdc-ripple-upgraded--unbounded:after {
  top: var(--mdc-ripple-top, 0);
  left: var(--mdc-ripple-left, 0);
}

.drawer-link.mdc-ripple-upgraded--foreground-activation:after {
  animation: 225ms mdc-ripple-fg-radius-in forwards,
    75ms mdc-ripple-fg-opacity-in forwards;
}

.drawer-link.mdc-ripple-upgraded--foreground-deactivation:after {
  animation: 0.15s mdc-ripple-fg-opacity-out;
  transform: translate(var(--mdc-ripple-fg-translate-end, 0))
    scale(var(--mdc-ripple-fg-scale, 1));
}

.drawer-link:after,
.drawer-link:before {
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
}

.drawer-link.mdc-ripple-upgraded:after {
  width: var(--mdc-ripple-fg-size, 100%);
  height: var(--mdc-ripple-fg-size, 100%);
}

.drawer-link:after,
.drawer-link:before {
  background-color: #000;
}

.drawer-link:hover:before {
  opacity: 0.04;
}

.drawer-link.mdc-ripple-upgraded--background-focused:before,
.drawer-link:not(.mdc-ripple-upgraded):focus:before {
  opacity: 0.12;
}

.drawer-link:not(.mdc-ripple-upgraded):after {
  transition: opacity 0.15s linear;
}

.drawer-link:not(.mdc-ripple-upgraded):active:after {
  transition-duration: 75ms;
  opacity: 0.16;
}

.drawer-link.mdc-ripple-upgraded {
  --mdc-ripple-fg-opacity: 0.16;
}

.drawer-link.mdc-ripple-upgraded--background-focused:before,
.drawer-link:not(.mdc-ripple-upgraded):focus:before {
  transition-duration: 75ms;
  opacity: 0;
}

.drawer-link:hover {
  color: #202124;
}

.drawer-link--no-list {
  display: block;
  padding-left: 24px;
}

.drawer-list__item .drawer-list .drawer-link {
  padding-left: 48px;
}

.drawer-list__item .drawer-list__item .drawer-list .drawer-link {
  padding-left: 72px;
}

.drawer-link svg {
  margin-right: 16px;
}
</style>
