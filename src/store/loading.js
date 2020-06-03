export default {
  state: {
    loading: false,
    todosLoading: false
  },
  mutations: {
    SET_LOADING (state, isLoading) {
      state.loading = isLoading
    },
    SET_TODOS_LOADING (state, isLoading) {
      state.todosLoading = isLoading
    }
  },
  getters: {
    loading: s => s.loading,
    todosLoading: s => s.todosLoading
  }
}
