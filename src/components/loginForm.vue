<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem :show-message="showError" :error="submitError">
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "账号不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "liseen",
        password: ""
      },
      showError: false,
      submitError: ""
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  mounted: function() {
    console.log("---组件已经挂载---");
  },
  methods: {
    ...mapActions(["login", "getUserInfo"]),

    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          let userName = this.form.userName;
          let passWord = this.form.password;
          this.login({ userName, passWord }).then(res => {
            if (res.code === 0) {
              this.getUserInfo().then(res => {
                this.$router.push({
                  name: "home"
                });
              });
            } else {
              // 错误
              this.showError = true;
              this.submitError = res.message;
            }
          });
        }
      });
    }
  }
};
</script>
