import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import iView from 'iview'
import { setTitle, getToken } from '@/utils'
import config from '@/config'
import store from '@/store'
const { homeName } = config

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})

const turnTo = (to, access, next) => {
  if (canTurnTo(to.name, access, routes)) next()
  // 有权限，可访问
  else next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
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
    // 自动到home页面
    next({
      name: 'home'
    })
  } else {
    console.log('----跳转到home----2222---')
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
