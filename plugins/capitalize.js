import Vue from 'vue'

Vue.filter('capitalize', (value) => {
  return value
    .split(' ')
    .map((w) => w[0].toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
})
