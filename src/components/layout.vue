<template>
  <Layout class="main">
    <Sider
      hide-trigger
      collapsible
      :width="240"
      :collapsed-width="64"
      v-model="collapsed"
      class="left-sider"
      :style="{overflow: 'hidden'}"
    >
      <SiderMenu @on-select="turnToPage"></SiderMenu>
    </Sider>
    <Layout>
      <Header class="header-con">
        <HeaderBar>
          <Auth :authAvatar="userAvatar"></Auth>
        </HeaderBar>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <keep-alive>
              <router-view/>
            </keep-alive>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import HeaderBar from "./headerbar";
import Auth from "./auth";
import SiderMenu from "./siderMenu";
export default {
  components: {
    HeaderBar,
    Auth,
    SiderMenu
  },
  data() {
    return {
      collapsed: false,
      userAvatar:
        "https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png"
    };
  },
  methods: {
    turnToPage(routeName) {
      // this.$router.push({
      //   name: routeName
      // });
    }
  }
};
</script>

<style lang="scss" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}

.main {
  height: 100%;
  .logo-con {
    height: 64px;
    padding: 10px;
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
  .header-con {
    background: #fff;
    padding: 0 20px;
    width: 100%;
  }
  .main-layout-con {
    height: 100%;
    overflow: hidden;
  }
  .main-content-con {
    height: calc(100% - 60px);
    overflow: hidden;
  }
  .tag-nav-wrapper {
    padding: 0;
    height: 40px;
    background: #f0f0f0;
  }
  .content-wrapper {
    padding: 18px;
    height: calc(100% - 80px);
    overflow: auto;
  }
}
</style>

<style lang="scss">
.ivu-menu-item > i {
  margin-right: 12px !important;
}
.ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
  margin-right: 8px !important;
}
.collased-menu-dropdown {
  width: 100%;
  margin: 0;
  line-height: normal;
  padding: 7px 0 6px 16px;
  clear: both;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  &:hover {
    background: rgba(100, 100, 100, 0.1);
  }
  & * {
    color: #515a6e;
  }
  .ivu-menu-item > i {
    margin-right: 12px !important;
  }
  .ivu-menu-submenu > .ivu-menu > .ivu-menu-item > i {
    margin-right: 8px !important;
  }
}

.ivu-select-dropdown.ivu-dropdown-transfer {
  max-height: 400px;
}

.left-sider {
  .ivu-layout-sider-children {
    overflow-y: scroll;
    margin-right: -18px;
  }
}
</style>


