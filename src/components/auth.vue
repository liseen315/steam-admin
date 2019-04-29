<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      {{userInfo.userName}}
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="changepw">更改密码</DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>

    <Modal v-model="changepwModal" width="400" class="change-pw-modal">
      <p slot="header" class="header">
        <span>更改密码</span>
      </p>
      <div class="password-form">
        <Form ref="formPw" :model="formPw" :rules="rulePw" label-position="top">
          <FormItem label="Password" prop="passwd">
            <Input type="password" v-model="formPw.passwd"></Input>
          </FormItem>
          <FormItem label="Confirm" prop="passwdCheck">
            <Input type="password" v-model="formPw.passwdCheck"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="handleSubmit('formPw')">Submit</Button>
        <Button @click="handleReset('formPw')" style="margin-left: 8px">Reset</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Auth",
  props: {
    authAvatar: {
      type: String,
      default: ""
    }
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.formPw.passwdCheck !== "") {
          // 对第二个密码框单独验证
          this.$refs.formPw.validateField("passwdCheck");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formPw.passwd) {
        callback(new Error("两次密码输入不匹配!"));
      } else {
        callback();
      }
    };
    return {
      changepwModal: false,
      formPw: {
        passwd: "",
        passwdCheck: ""
      },
      rulePw: {
        passwd: [{ validator: validatePass, trigger: "blur" }],
        passwdCheck: [{ validator: validatePassCheck, trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  methods: {
    ...mapActions(["handleLogOut", "changePassWord"]),
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.changePassWord(this.formPw.passwd).then(res => {
            if (res.code === 0) {
              setTimeout(() => {
                this.$router.push({
                  name: "login"
                });
              }, 500);
              this.changepwModal = false;
              this.$Message.success("修改密码成功");
            }
          });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    logout() {
      this.handleLogOut().then(res => {
        this.$router.push({
          name: "login"
        });
      });
    },
    showChangeModal() {
      this.changepwModal = true;
    },
    handleClick(name) {
      switch (name) {
        case "logout":
          this.logout();
          break;
        case "changepw":
          this.showChangeModal();
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
.change-pw-modal {
  .header {
    text-align: center;
  }
}
</style>


