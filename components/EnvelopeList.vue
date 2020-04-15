<template>
  <div class="list">
    <header>
      <h2>Envelopes</h2>
      <button class="btn btn--icon" @click="create">
        <Icon icon="plus" />
      </button>
    </header>
    <ul class="items">
      <li v-for="envelope in envelopes" :key="envelope.description">
        <Item :item="envelope" />
      </li>
    </ul>
    <Dialog v-model="dialog" title="Envelope">
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
    envelopes: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialog: false,
      envelope: null
    }
  },
  methods: {
    create() {
      this.dialog = true
      this.envelope = this.newEnvelope()
    },
    newEnvelope() {
      return {
        description: '',
        amount: 0
      }
    }
  }
}
</script>
