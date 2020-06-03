import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import todos from './todos'
import categories from './category'
import loading from './loading'
import snackbar from './snackbar'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    setError (state, error) {
      state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  getters: {
    error: (s) => s.error
  },
  modules: {
    todos, auth, info, categories, loading, snackbar
  }
})
