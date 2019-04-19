import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
