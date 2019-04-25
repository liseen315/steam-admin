import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { setTitle, getToken, removeToken, canTurnTo } from '@/utils'
import config from '@/config'
import store from '@/store'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) {
    // 有权限，可访问
    next()
  } else {
    // 无权限，重定向到401页面
    next({ replace: true, name: 'error_401' })
  }
}

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  } else if (!token && to.name === 'login') {
    next()
  } else if (token && to.name === 'login') {
    next({
      name: 'home'
    })
  } else {
    if (store.state.user.hasGetUserInfo) {
      turnTo(to, store.state.user.roleName, next)
    } else {
      store
        .dispatch('getUserInfo')
        .then(res => {
          if (res.code === 0) {
            turnTo(to, res.body.userInfo.roleName, next)
          } else {
            removeToken()
            next({
              name: 'login'
            })
          }
        })
        .catch(err => {
          removeToken()
          next({
            name: 'login'
          })
        })
    }
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
