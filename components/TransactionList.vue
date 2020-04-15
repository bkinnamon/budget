<template>
  <div class="list">
    <header>
      <h2>Transactions</h2>
      <button class="btn btn--icon" @click="dialog = true">
        <Icon icon="plus" />
      </button>
    </header>
    <ul class="items">
      <li v-for="transaction in transactions" :key="transaction.description">
        <Item :item="transaction" :positive="transaction.amount >= 0" />
      </li>
    </ul>
    <Dialog v-model="dialog" title="Transaction">
      <template>
        THE FORM FOR THE THING
      </template>
      <template v-slot:actions>
        <button class="btn btn--text">Cancel</button>
        <button class="btn btn--primary">
          <Icon icon="save" />
          <span>Save</span>
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Icon from '@/components/Icon.vue'
import Item from '@/components/Item.vue'

export default {
  components: {
    Dialog,
    Icon,
    Item
  },
  props: {
    transactions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    newTransaction() {
      return {
        description: '',
        amount: 0,
        envelope: null
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
