<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      :theme="theme"
      width="auto"
      :active-name="this.activeName"
      :open-names="[this.openNames]"
      @on-select="handleSelect"
    >
      <template v-for="item in addRouters">
        <template v-if="item.children && item.children.length === 1">
          <MenuItem
            :name="`${item.name}-${item.children[0].name}`"
            :key="`menu-${item.children[0].name}`"
          >
            <Icon v-if="item.meta.icon" :type="item.meta.icon"/>
            {{item.meta.title}}
          </MenuItem>
        </template>
        <template v-else>
          <Submenu :name="item.name" :key="`submenu-${item.name}`" :data="item.name">
            <template slot="title">
              <Icon v-if="item.meta.icon" :type="item.meta.icon"/>
              {{item.meta.title}}
            </template>
            <template v-for="subItems in item.children">
              <MenuItem
                :name="`${item.name}-${subItems.name}`"
                :key="`submenuitem-${subItems.name}`"
                :data="`${item.name}-${subItems.name}`"
              >
                <Icon v-if="subItems.meta.icon" :type="subItems.meta.icon"/>
                {{subItems.meta.title}}
              </MenuItem>
            </template>
          </Submenu>
        </template>
      </template>
    </Menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "SiderMenu",
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    return {
      activeName: "",
      openNames: ""
    };
  },
  mounted: function() {
    this.getActiveName(this.$route.path);
    this.$nextTick(() => {
      this.$refs.menu.updateOpened();
      this.$refs.menu.updateActiveName();
    });
  },
  computed: {
    ...mapGetters(["addRouters"])
  },
  methods: {
    // 当前菜单不支持超过两级的
    handleSelect(name) {
      let toName = name.split("-")[1];
      this.$emit("on-select", toName);
    },
    getActiveName(path) {
      let routeName = path.substr(1, path.length);
      let spliteList = routeName.split("/");
      this.activeName = `${spliteList[0]}-${spliteList[1]}`;
      this.openNames = spliteList[0];
    }
  },
  watch: {
    $route(to, from) {
      this.getActiveName(to.path);
    }
  }
};
</script>

<style lang="scss" scoped>
.side-menu-wrapper {
  user-select: none;
}
</style>


