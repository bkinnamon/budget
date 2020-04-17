export const state = () => ({
  id: null,
  budget: null
})

export const mutations = {
  SET_USER(state, user) {
    state.id = user?.uid || null
    state.budget = user?.budget || null
  }
}

export const actions = {
  login({ commit }, { email, password }) {
    return this.$fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.$fireStore
          .doc(`users/${user.uid}`)
          .get()
          .then((userDoc) => {
            commit('SET_USER', {
              uid: user.uid,
              budget: userDoc.data().budget
            })
          })
      })
  },
  logout({ commit }) {
    this.$fireAuth
      .signOut()
      .then(() => {
        commit('SET_USER', null)
      })
      .catch((error) => {
        console.error(error)
      })
  },
  register({ commit }, { email, password }) {
    return this.$fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        this.$fireStore
          .collection('budgets')
          .add({ start: 0 })
          .then(({ id }) => {
            this.$fireStore.doc(`users/${user.uid}`).set({ budget: id })
            user.budget = id
            commit('SET_USER', user)
          })
      })
  }
}
