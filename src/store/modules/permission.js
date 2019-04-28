import { asyncRouterMap, constantRouterMap } from '@/router/routers'
import { INIT_ROUTER } from '../types'

/**
 * 判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission (menus, route) {
  if (route.menu) {
    /*
     * 如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
     */
    return menus.indexOf(route.menu) > -1
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter (asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    // filter,js语法里数组的过滤筛选方法
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        // 如果这个路由下面还有下一级的话,就递归调用
        route.children = filterAsyncRouter(route.children, menus)
        // 如果过滤一圈后,没有子元素了,这个父级菜单就也不显示了
        return route.children && route.children.length
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const state = {
  addRouters: [] // 动态添加的路由
}

const actions = {
  generateRouters ({ commit }, menuList) {
    return new Promise((resolve, reject) => {
      console.log('--menuList--', menuList)
      // 如果是超级管理员应该开放所有权限
      let accessedRouters
      accessedRouters = filterAsyncRouter(asyncRouterMap, menuList)
      resolve()
    })
  }
}

const mutations = {}

export default {
  state,
  actions,
  mutations
}
