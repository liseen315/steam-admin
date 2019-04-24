<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <LoginForm @on-success-valid="handleSubmit"></LoginForm>
          <p class="login-tip">请输入管理员账号-密码</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/loginForm.vue";
import { mapActions } from "vuex";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  methods: {
    ...mapActions(["login"]),
    handleSubmit({ userName, password }) {
      this.login({ userName, password });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-image: url("../assets/images/login-bg.jpg");
  background-size: cover;
  background-position: center;
  position: relative;

  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;

    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }

    .form-con {
      padding: 10px 0 0;
    }

    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>

