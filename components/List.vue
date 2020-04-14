<template>
  <div class="list">
    <header>
      <h2>{{ title }}</h2>
      <button class="btn btn--icon">
        <Icon icon="plus" />
      </button>
    </header>
    <ul class="items">
      <li v-for="item in items" :key="item.description">
        <Item :item="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import Icon from '~/components/Icon'
import Item from '~/components/Item'

export default {
  components: {
    Icon,
    Item
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {}
}
</script>

<style lang="scss" scoped>
.list {
  overflow: hidden;
  padding: 16px;

  header {
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 1.5rem;
    }
  }
}

.items {
  border-radius: $s-radius;
  list-style: none;
}
</style>
