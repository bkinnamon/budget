export const state = () => ({
  id: null
})

export const mutations = {
  SET_USER_ID(state, id) {
    state.id = id
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return this.$fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER_ID', user.uid)
      })
  },
  logout({ commit }) {
    this.$fireAuth
      .signOut()
      .then(() => {
        commit('SET_USER_ID', null)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  register({ commit }, { email, password }) {
    return this.$fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        commit('SET_USER_ID', user.uid)
      })
  }
}
