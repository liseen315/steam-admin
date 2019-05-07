import Vue from 'vue'
import store from '../store'

// 权限指令
const access = Vue.directive('access', {
  inserted: function (el, binding, vnode) {
    // 获取用户权限
    let permissionList = store.getters.permissions
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
