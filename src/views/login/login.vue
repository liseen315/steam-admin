<style lang="scss" scoped>
@import "./login.scss";
</style>

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
import LoginForm from '@/components/loginForm.vue'

export default {
  name: 'Login',
  components: {
    LoginForm
  },
  methods: {
    handleSubmit ({ userName, password }) {
      console.log('----username--', userName, password)
    }
  }
}
</script>
