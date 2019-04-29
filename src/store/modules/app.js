import { getHomeRoute } from '../../utils'
const state = {
  breadCrumbList: [],
  homeRoute: {}
}

const actions = {}

const mutations = {
  setHomeRoute (state, routes) {
    state.homeRoute = getHomeRoute(routes, 'home')
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
