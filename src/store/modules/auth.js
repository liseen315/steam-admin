import AuthService from '../../service/AuthService'
import { getToken, setToken, removeToken } from '../../utils/index'
import { RESET_STATE, SET_USERINFO } from '../types'

const state = {
  userName: '',
  userId: '',
  status: 1,
  createName: '',
  createId: '',
  permision: null, // 权限对象,前端通过这个对象生成Menu以及进行权限判断
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
            commit(SET_USERINFO, res.body.userInfo)
          }
          resolve(res)
        })
        .catch(err => {
          reject(err)
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
    state.createName = ''
    state.createId = ''
    state.hasGetUserInfo = false
  },
  [SET_USERINFO] (state, userInfo) {
    state.userName = userInfo.userName
    state.userId = userInfo.userId
    state.status = userInfo.status
    state.createName = userInfo.createName
    state.createId = userInfo.createId
    state.hasGetUserInfo = true
  }
}

export default {
  state,
  actions,
  mutations
}
