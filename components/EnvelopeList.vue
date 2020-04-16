<template>
  <div class="list">
    <header>
      <h2>Envelopes</h2>
      <button class="btn btn--icon" @click="create">
        <Icon icon="plus" />
      </button>
    </header>
    <ul class="items">
      <li v-for="envelope in envelopeItems" :key="envelope.description">
        <Item
          :item="envelope"
          :positive="envelope.positive"
          @click="edit(envelope)"
        />
      </li>
    </ul>
    <Dialog v-model="dialog" title="Envelope" @close="cancel">
      <template>
        <Textbox id="desc" v-model="current.description" label="Description" />
        <Textbox
          id="amount"
          v-model.number="current.amount"
          label="Amount"
          prepend="$"
          type="number"
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
import Textbox from '@/components/Textbox.vue'

export default {
  components: {
    Dialog,
    Icon,
    Item,
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
      dialog: false,
      current: {}
    }
  },
  computed: {
    envelopeItems() {
      const items = this.envelopes.map((e) => {
        return {
          ...e,
          value: e.amount
        }
      })

      this.transactions.forEach((t) => {
        if (!t.envelope) {
          return
        }
        const e = items.find((i) => t.envelope === i.id)
        if (!e) {
          return
        }
        e.value += t.amount
      })

      items.forEach((i) => {
        if (i.value >= 0) {
          i.positive = true
        } else {
          i.positive = false
        }
      })

      return items
    }
  },
  methods: {
    cancel() {
      this.dialog = false
      this.reset()
    },
    create() {
      this.dialog = true
      this.current = this.newEnvelope()
    },
    destroy() {
      if (
        window.confirm(
          `Are you sure you want to delete the "${this.current.description}" envelope?`
        )
      ) {
        this.$store.dispatch('budget/deleteEnvelope', this.current)
        this.cancel()
      }
    },
    edit(envelope) {
      this.dialog = true
      this.current = envelope
    },
    newEnvelope() {
      return {
        description: '',
        amount: 0
      }
    },
    reset() {
      this.current = {}
    },
    save() {
      this.$store.dispatch('budget/saveEnvelope', this.current)
      this.cancel()
    }
  }
}
</script>
