import Vue from 'vue'
import Vuex from 'vuex'

import CinemaModule from './modules/CinemaModule'
import CityModule from './modules/CityModule'
import TabbarModule from './modules/TabbarModule'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // vuex持久化插件
  plugins: [createPersistedState()],

  // 公共状态
  state: {

  },
  // 集中式修改状态  --会被监控(vue dev-tools插件会记录每次修改的值)
  mutations: {

  },
  // 处理异步
  actions: {

  },
  // 各个模块
  modules: {
    CinemaModule,
    CityModule,
    TabbarModule
  }
})
