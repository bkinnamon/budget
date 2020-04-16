<template>
  <div class="list">
    <header>
      <h2>Transactions</h2>
      <button class="btn btn--icon" @click="create">
        <Icon icon="plus" />
      </button>
    </header>
    <ul class="items">
      <li
        v-for="transaction in transactionItems"
        :key="transaction.description"
      >
        <Item
          :item="transaction"
          :positive="transaction.amount >= 0"
          @click="edit(transaction)"
        />
      </li>
    </ul>
    <Dialog v-model="dialog" title="Transaction">
      <template>
        <Textbox id="desc" v-model="current.description" label="Description" />
        <Textbox
          id="amount"
          v-model.number="current.amount"
          label="Amount"
          prepend="$"
          type="number"
        />
        <Select
          v-model="current.envelope"
          label="Envelope"
          :options="envelopeOptions"
        />
      </template>
      <template v-slot:actions>
        <button v-show="current.id" class="btn btn--icon" @click="destroy">
          <Icon icon="trash" />
        </button>
        <div class="spacer"></div>
        <button class="btn btn--text" @click="cancel">Cancel</button>
        <button class="btn btn--primary" @click="save">
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
import Select from '@/components/Select.vue'
import Textbox from '@/components/Textbox.vue'

export default {
  components: {
    Dialog,
    Icon,
    Item,
    Select,
    Textbox
  },
  props: {
    envelopes: {
      type: Array,
      default() {
        return []
      }
    },
    transactions: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      current: {},
      dialog: false
    }
  },
  computed: {
    envelopeOptions() {
      return this.envelopes.map((e) => {
        return {
          text: e.description,
          value: e.id
        }
      })
    },
    transactionItems() {
      return [...this.transactions]
    }
  },
  methods: {
    cancel() {
      this.dialog = false
      this.reset()
    },
    create() {
      this.dialog = true
      this.current = this.newTransaction()
    },
    destroy() {
      if (
        window.confirm(
          `Are you sure you want to delete the ${this.current.description} transaction?`
        )
      ) {
        this.$store.dispatch('budget/deleteTransaction', this.current)
        this.cancel()
      }
    },
    edit(transaction) {
      this.dialog = true
      this.current = transaction
    },
    newTransaction() {
      return {
        description: '',
        amount: 0,
        envelope: null
      }
    },
    reset() {
      this.current = {}
    },
    save() {
      console.log(this.current)
      this.$store.dispatch('budget/saveTransaction', this.current)
      this.cancel()
    }
  }
}
</script>

<style lang="scss" scoped></style>
