import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './routers'
import iView from 'iview'
import { setTitle, getToken, removeToken } from '@/utils'
import store from '@/store'

Vue.use(Router)
const router = new Router({
  routes: constantRouterMap,
  mode: 'history'
})

// router.beforeEach((to, from, next) => {
//   iView.LoadingBar.start()
//   const token = getToken()
//   if (!token && to.name !== 'login') {
//     next({
//       name: 'login'
//     })
//   } else if (!token && to.name === 'login') {
//     next()
//   } else if (token && to.name === 'login') {
//     next({
//       name: 'home'
//     })
//   } else {
//     if (store.state.user.hasGetUserInfo) {
//       next()
//     } else {
//       store
//         .dispatch('getUserInfo')
//         .then(res => {
//           if (res.code === 0) {
//             next()
//           } else {
//             removeToken()
//             next({
//               name: 'login'
//             })
//           }
//         })
//         .catch(err => {
//           removeToken()
//           next({
//             name: 'login'
//           })
//         })
//     }
//   }
// })

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
