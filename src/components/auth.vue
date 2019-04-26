<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Avatar :src="authAvatar"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="changepw">更改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Auth",
  props: {
    authAvatar: {
      type: String,
      default: ""
    }
  },
  methods: {
    ...mapActions(["handleLogOut"]),
    logout() {
      this.handleLogOut().then(res => {
        this.$router.push({
          name: "login"
        });
      });
    },
    changepw() {},
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "changepw":
          this.changepw();
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  &-avatar-dropdown {
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
    .ivu-badge-dot {
      top: 16px;
    }
  }
}
</style>


