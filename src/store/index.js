import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import todo from './todos'
import categories from './category'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
  },
  getters: {
    error: (s) => s.error
  },
  modules: {
    todo, auth, info, categories
  }
})
