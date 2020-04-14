import Vue from 'vue'

Vue.filter('usd', (value) => {
  const prefix = +value < 0 ? '-' : ''
  const amount = Math.abs(+value)
  return `${prefix}$${amount.toLocaleString()}`
})
