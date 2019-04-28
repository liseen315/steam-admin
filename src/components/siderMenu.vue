<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in addRouters">
        <template v-if="item.children && item.children.length === 1">
          <MenuItem :name="getNameOrHref(item,true)" :key="`menu-${item.children[0].name}`">
            <Icon type="md-bug"/>
            {{showTitle(item)}}
          </MenuItem>
        </template>
        <template v-else>
          <Submenu :name="getNameOrHref(item)" :key="`submenu-${item.name}`">
            <template slot="title">
              <Icon type="ios-paper"/>
              {{showTitle(item)}}
            </template>
            <template v-for="subItems in item.children">
              <MenuItem
                :name="subItems.name"
                :key="`submenuitem-${subItems.name}`"
              >{{subItems.meta.title}}</MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import mixin from "../mixin";
export default {
  name: "SiderMenu",
  mixins: [mixin],
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  computed: {
    ...mapGetters(["addRouters"])
  },
  methods: {
    handleSelect(name) {
      this.$emit("on-select", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.side-menu-wrapper {
  user-select: none;
}
</style>


