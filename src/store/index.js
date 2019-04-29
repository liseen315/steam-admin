import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import app from './modules/app'
import sysUser from './modules/sysUser'
import menus from './modules/menus'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    sysUser,
    menus
  }
})
