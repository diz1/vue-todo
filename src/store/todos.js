import firebase from 'firebase'

export default {
  state: {
    todos: []
  },
  mutations: {
    setTodos (state, todos) {
      state.todos = todos
    },
    clearTodos (state) {
      state.todos = []
    }
  },
  actions: {
    async fetchTodos ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const todos = await (await firebase.database()
          .ref(`/users/${uid}/todos`)
          .once('value'))
          .val() || []
        const newTodos = await Object.keys(todos).map((key) => ({ ...todos[key], uid: key }))
        commit('setTodos', newTodos)
        return newTodos
      } catch (e) {
        commit('setError', e)
      }
    },
    async createTodo ({ dispatch, commit }, todo) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/todos`)
          .push({
            ...todo,
            completed: false
          })
        const todos = await dispatch('fetchTodos')
        commit('setTodos', todos)
      } catch (e) {
        commit('setError', e)
      }
    },
    async updateTodo ({ dispatch, commit }, todo) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database()
          .ref(`/users/${uid}/todos/${todo.uid}`)
          .update({ ...todo })
        const todos = await dispatch('fetchTodos')
        commit('setTodos', todos)
      } catch (e) {
        commit('setError', e)
      }
    },
    // async completeTodo ({ commit, dispatch }, todo) {
    //   console.log(1) // TODO
    // },
    async deleteTodo ({ commit, dispatch }, { id }) {
      try {
        const uid = await dispatch('getUid')
        // const todos = this.getters.todos.filter(todo => todo.id !== id)
        await firebase.database()
          .ref(`/users/${uid}/todos/${id}`)
          .remove()
        const todos = await dispatch('fetchTodos')
        commit('setTodos', todos)
      } catch (e) {
        commit('setError', e)
      }
    }
  },
  getters: {
    todos: s => s.todos,
    completedTodos: s => s.todos.map(todo => todo.completed)
  }
}
