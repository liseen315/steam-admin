import AuthService from '../../service/AuthService'
import { getToken, setToken, removeToken } from '../../utils/index'
import { RESET_STATE, SET_USERINFO } from '../types'
import store from '..'
import { router, createRouter } from '../../router'

const state = {
  userName: '',
  userId: '',
  status: 1,
  roleName: '',
  menus: [], // 菜单列表
  permissions: [], // 权限列表
  hasGetUserInfo: false // 是否获取到了userInfo
}
const actions = {
  login ({ commit }, { userName, passWord }) {
    userName = userName.trim()
    return new Promise((resolve, reject) => {
      new AuthService()
        .login({ userName, passWord })
        .then(res => {
          if (res.code === 0) {
            setToken(res.body.token)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      new AuthService()
        .getInfo()
        .then(res => {
          if (res.code === 0) {
            commit(SET_USERINFO, res.body)
            store
              .dispatch('generateRouters', {
                menus: state.menus,
                roleName: state.roleName
              })
              .then(() => {
                router.matcher = createRouter().matcher
                router.addRoutes(store.getters.addRouters)
                resolve(res)
              })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  changePassWord ({ commit }, newPassWord) {
    return new Promise((resolve, reject) => {
      new AuthService().changePassWord(newPassWord).then(res => {
        if (res.code === 0) {
          removeToken()
          resolve(res)
        }
      })
    })
  },

  handleLogOut ({ commit }) {
    return new Promise((resolve, reject) => {
      new AuthService()
        .logout()
        .then(res => {
          if (res.code === 0) {
            removeToken()
            commit(RESET_STATE)
            // store.dispatch('resetRouters')
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [RESET_STATE] (state) {
    state.userName = ''
    state.userId = ''
    state.status = 1
    state.menus = []
    state.roleName = ''
    state.permissions = []
    state.hasGetUserInfo = false
  },
  [SET_USERINFO] (state, userInfo) {
    state.userName = userInfo.userName
    state.userId = userInfo.userId
    state.status = userInfo.status
    state.roleName = userInfo.roleName
    state.menus = userInfo.menus
    state.permissions = userInfo.permissions
    state.hasGetUserInfo = true
  }
}

const getters = {
  userInfo: state => {
    return state
  },
  menus: state => {
    return state.menus
  },
  permissions: state => {
    return state.permissions
  },
  hasGetUserInfo: state => {
    return state.hasGetUserInfo
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
