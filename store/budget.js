export const state = () => ({
  transactions: [
    {
      description: 'First transaction description that is really long',
      amount: 4000,
      isPositive: true
    }
  ],
  envelopes: [
    {
      description: 'Groceries',
      amount: 200,
      value: 125,
      isPositive: false
    }
  ]
})
