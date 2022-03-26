import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    useRight: ''
  },
  mutations: {
    // state就是仓库中的参数
    // data就是传过来的参数
    setRight(state, data) {
      state.useRight = data
      console.log(data)
    }
  },
  actions: {
  },
  modules: {
  }
})
