import * as firebase from 'firebase'

export default {
  state: {
    categories: []
  },
  mutations: {
    setCategories (state, categories) {
      state.categories = categories
    },
    clearCategories (state) {
      state.categories = []
    }
  },
  actions: {
    async fetchCategories ({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories = (await firebase.database()
          .ref(`/users/${uid}/categories`)
          .once('value'))
          .val() || {}
        const newCategories = Object.keys(categories).map((key) => ({ ...categories[key], id: key }))
        commit('setCategories', newCategories)
        return newCategories
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async categoryCreate ({ dispatch, commit }, name) {
      try {
        const uid = await dispatch('getUid')
        const fetchedCategories = await dispatch('fetchCategories')
        if (!fetchedCategories.filter(c => c.name === name).length) {
          const category = await firebase.database()
            .ref(`/users/${uid}/categories`)
            .push({ name })
          const updatedCategories = await dispatch('fetchCategories')
          commit('setCategories', updatedCategories)
          return { name, id: category.key }
        }
      } catch (e) {
        commit('setError', e)
      }
    }
  },
  getters: {
    categories: s => s.categories
  }

}
