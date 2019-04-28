import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import sysUser from './modules/sysUser'
import menus from './modules/menus'
import getters from './getters'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sysUser,
    menus
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
