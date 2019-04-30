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
    return menus.indexOf(route.meta.menu) > -1
  } else if (route.meta.hideInMenu) {
    return false
  } else {
    return true
  }
}
/**
 * 递归过滤异步路由表，返回符合用户菜单权限的路由表 这里还需要优化hideInMenu
 * @param asyncRouterMap
 * @param menus
 */
function filterAsyncRouter (asyncRouterMap, menus) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(menus, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menus)
        return route.children && route.children.length
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const state = {
  addRouters: [],
  routers: constantRouterMap
}

const actions = {
  generateRouters ({ commit }, parms) {
    console.log('--menuList--', parms)
    // 如果是超级管理员应该开放所有权限
    return new Promise((resolve, reject) => {
      let accessedRouters
      accessedRouters = filterAsyncRouter(
        _.cloneDeep(asyncRouterMap),
        parms.menus
      )

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
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  },
  [REST_ROUTERS] (state) {
    state.addRouters = []
  }
}

const getters = {
  permission_routers: state => {
    return state.routers
  },
  addRouters: state => {
    return state.addRouters
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
