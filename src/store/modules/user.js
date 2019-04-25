import UserService from '../../service/UserService'
import { getToken, setToken } from '../../utils/index'
import { SET_TOKEN, SET_USERINFO } from '../types'

const state = {
  userName: '',
  userId: '',
  status: 1,
  createName: '',
  createId: '',
  roleName: '', // 角色名称,用于前端进行导航权限判断,前后端协商
  hasGetUserInfo: false // 是否获取到了userInfo
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
      new UserService()
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
    state.roleName = userInfo.roleName
    state.hasGetUserInfo = true
  }
}

export default {
  state,
  actions,
  mutations
}
