export const state = () => ({
  start: 0,
  transactions: [],
  envelopes: []
})

export const mutations = {
  SET_START(state, start) {
    state.start = start
  },
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions
  },
  SET_ENVELOPES(state, envelopes) {
    state.envelopes = envelopes
  }
}

export const actions = {
  get({ commit }) {
    const budgetRef = this.$fireStore.collection('budgets').doc('test')
    budgetRef.onSnapshot((budgetDoc) => {
      commit('SET_START', budgetDoc.data().start)
    })
    budgetRef.collection('transactions').onSnapshot((querySnapshot) => {
      const transactions = []
      querySnapshot.forEach((transactionDoc) => {
        transactions.push({
          ...transactionDoc.data(),
          id: transactionDoc.id
        })
      })
      commit('SET_TRANSACTIONS', transactions)
    })
    budgetRef.collection('envelopes').onSnapshot((querySnapshot) => {
      const envelopes = []
      querySnapshot.forEach((envelopeDoc) => {
        envelopes.push({
          ...envelopeDoc.data(),
          id: envelopeDoc.id
        })
      })
      commit('SET_ENVELOPES', envelopes)
    })
  },
  saveTransaction(_, transaction) {
    if (transaction.id) {
      this.$fireStore
        .doc(`budgets/test/transactions/${transaction.id}`)
        .update(transaction)
    } else {
      this.$fireStore.collection('budgets/test/transactions').add(transaction)
    }
  },
  deleteTransaction(_, transaction) {
    this.$fireStore.doc(`budgets/test/transactions/${transaction.id}`).delete()
  },
  saveEnvelope(_, envelope) {
    if (envelope.id) {
      this.$fireStore.doc(`budgets/test/envelopes/${envelope.id}`).update({
        description: envelope.description,
        amount: envelope.amount
      })
    } else {
      this.$fireStore.collection('budgets/test/envelopes').add(envelope)
    }
  },
  deleteEnvelope(_, envelope) {
    this.$fireStore.doc(`budgets/test/envelopes/${envelope.id}`).delete()
  }
}
