import UserService from '../../service/UserService'
const state = {
  userName: '',
  userId: '',
  status: '1'
}
const actions = {
  login ({ commit }, { userName, password }) {
    console.log('---login---', userName, password)
    userName = userName.trim()
    new UserService().login({ userName, password }).then(res => {
      console.log('----user-login----', res)
    })
  }
}

const mutations = {}

export default {
  state,
  actions,
  mutations
}
