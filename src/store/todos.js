// import * as firebase from 'firebase'

export default {
  state: {
    todos: []
  },
  mutations: {
    setTodos ({ dispatch, commit }, todos) {
    }
  },
  actions: {
    async fetchTodos () {
    }
  },
  getters: {
    todos: s => s.todos
  }
}
