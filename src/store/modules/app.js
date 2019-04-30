import { getHomeRoute, getBreadCrumbList } from '../../utils'
const state = {
  breadCrumbList: [],
  homeRoute: {}
}

const actions = {}

const mutations = {
  setBreadCrumb (state, route) {
    state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
  },
  setHomeRoute (state, routes) {
    state.homeRoute = getHomeRoute(routes)
  }
}

const getters = {
  breadCrumbList: state => {
    return state.breadCrumbList
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
