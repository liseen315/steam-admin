import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import sysUser from './modules/sysUser'
import permission from './modules/permission'
import getters from './getters'
const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    sysUser,
    permission
  },
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
