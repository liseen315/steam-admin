import UserService from '../../service/UserService'
import { getToken, setToken } from '../../utils/index'
import { SET_TOKEN } from '../types'
import { resolve } from 'url'
import { reject } from 'q'
const state = {
  userName: '',
  userId: '',
  status: ''
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
      new UserService().getInfo().then(res => {})
    })
  }
}

const mutations = {
  [SET_TOKEN] (state, token) {
    state.token = token
  }
}

export default {
  state,
  actions,
  mutations
}
