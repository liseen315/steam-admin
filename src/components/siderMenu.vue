<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu ref="menu" :theme="theme" width="auto" @on-select="handleSelect">
      <template v-for="item in addRouters">
        <template v-if="item.children && item.children.length === 1">
          <MenuItem
            :name="getNameOrHref(item,true)"
            :key="`menu-${item.children[0].name}`"
          >{{showTitle(item)}}</MenuItem>
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
    <!-- <Menu :theme="theme">
      <Submenu name="1">
        <template slot="title">
          <Icon type="ios-paper"/>内容管理
        </template>
        <MenuItem name="1-1">文章管理</MenuItem>
        <MenuItem name="1-2">评论管理</MenuItem>
        <MenuItem name="1-3">举报管理</MenuItem>
      </Submenu>
      <Submenu name="2">
        <template slot="title">
          <Icon type="ios-people"/>用户管理
        </template>
        <MenuItem name="2-1">新增用户</MenuItem>
        <MenuItem name="2-2">活跃用户</MenuItem>
      </Submenu>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats"/>统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
    </Menu>-->
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
      console.log("----选择的菜单---", name);
    }
  }
};
</script>

<style lang="scss" scoped>
.side-menu-wrapper {
  user-select: none;
}
</style>


