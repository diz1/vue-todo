export default {
  state: {
    snackbar: {
      visible: false,
      message: ''
    }
  },
  mutations: {
    SET_SNACKBAR (state, snackbar) {
      state.snackbar = { ...snackbar }
    }
  },
  getters: {
    snackbar: s => s.snackbar
  }
}
