import Vue from 'vue'

// 权限指令
const access = Vue.directive('access', {
  bind: function (el, binding, vnode) {
    // 获取页面按钮权限
    let permissionList = vnode.context.$route.meta.permission
    // 权限检验
    if (
      permissionList &&
      permissionList.length &&
      !permissionList.includes(binding.value)
    ) {
      el.parentNode.removeChild(el)
    }
  }
})

export default access
