import UserService from '../../service/UserService'
import { getToken, setToken } from '../../utils/index'
import { SET_TOKEN, SET_USERINFO } from '../types'

const state = {
  userName: '',
  userId: '',
  status: 1,
  createName: '',
  createId: '',
  roleName: '', // 用户提供权限访问的角色名称,前后端必须协商并统一
  hasGetUserInfo: false
}
const actions = {
  login ({ commit }, { userName, passWord }) {
    userName = userName.trim()
    return new Promise((resolve, reject) => {
      new UserService()
        .login({ userName, passWord })
        .then(res => {
          if (res.code === 0) {
            setToken(res.body.token)
            commit(SET_TOKEN, res.body.token)
            resolve()
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  },

  getUserInfo ({ commit }) {
    return new Promise((resolve, reject) => {
      new UserService()
        .getInfo()
        .then(res => {
          if (res.code === 0) {
            commit(SET_USERINFO, res.body.userinfo)
            resolve()
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

const mutations = {
  [SET_TOKEN] (state, token) {
    state.token = token
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
