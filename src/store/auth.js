import * as firebase from 'firebase/app'

export default {
  actions: {
    async login ({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name, surname, avatar }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}/info`).set({
          name,
          surname,
          avatar
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUid () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout ({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
      commit('clearCategories')
      commit('clearTodos')
    }
  }
}
