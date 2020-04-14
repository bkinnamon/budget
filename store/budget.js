export const state = () => ({
  start: 0,
  transactions: [
    {
      description: 'First transaction description that is really long',
      amount: 4000,
      isPositive: true
    },
    {
      description: 'Second transaction description that is really long',
      amount: -2000,
      isPositive: false
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
