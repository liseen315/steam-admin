import { asyncRouterMap, constantRouterMap } from '../../router/config'
import { SET_ROUTERS, REST_ROUTERS } from '../types'
import _ from 'lodash'
/**
 * 判断用户是否拥有此菜单
 * @param menus
 * @param route
 */
function hasPermission (menus, route) {
  if (route.meta.menu) {
    /*
     * 如果这个路由有menu属性,就需要判断用户是否拥有此menu权限
     */
    return menus.indexOf(route.meta.menu) > -1
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
  addRouters: null,
  routers: null
}

const actions = {
  generateRouters ({ commit }, parms) {
    console.log('--menuList--', parms)
    // 如果是超级管理员应该开放所有权限

    return new Promise((resolve, reject) => {
      let accessedRouters
      if (parms.roleName === 'super_admin') {
        accessedRouters = _.cloneDeep(asyncRouterMap)
      } else {
        accessedRouters = filterAsyncRouter(
          _.cloneDeep(asyncRouterMap),
          parms.menus
        )
      }
      commit(SET_ROUTERS, accessedRouters)
      resolve()
    })
  },
  resetRouters ({ commit }) {
    commit(REST_ROUTERS)
  }
}

const mutations = {
  [SET_ROUTERS] (state, routers) {
    console.log('---routers--', routers)
    state.addRouters = routers
    // state.routers = constantRouterMap.concat(routers)
  },
  [REST_ROUTERS] (state) {
    state.addRouters = []
  }
}

export default {
  state,
  actions,
  mutations
}
