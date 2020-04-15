<template>
  <div>
    <div class="balance balance--positive">
      <span>{{ balance | usd }}</span>
      <button class="btn btn--process" @click="process">
        <Icon icon="cogs" />
        Process
      </button>
    </div>
    <div class="lists">
      <TransactionList :transactions="transactions" />
      <EnvelopeList :envelopes="envelopes" :transactions="transactions" />
    </div>
    <Dialog v-model="dialog" title="End of Cycle Processing">
      <template>
        CONTENT
      </template>
      <template v-slot:actions>
        ACTIONS
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import EnvelopeList from '@/components/EnvelopeList.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  components: {
    Dialog,
    Icon,
    EnvelopeList,
    TransactionList
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('budget', ['start', 'transactions', 'envelopes']),
    balance() {
      const balance = this.transactions.reduce((value, t) => {
        return value + t.amount
      }, this.start)
      return balance
    }
  },
  created() {
    this.$store.dispatch('budget/get')
  },
  methods: {
    process() {
      this.dialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.balance {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 64px;
  margin-bottom: 16px;
  position: relative;

  @media screen and (max-width: $b-small) {
    height: 128px;
  }

  &--positive {
    background: lighten($c-info, 50%);
    color: $c-black;
  }

  &--negative {
    background: $c-accent;
    color: $c-white;
  }

  > span {
    font-size: 2rem;
  }

  .btn--process {
    background: $c-primary;
    color: $c-white;
    position: absolute;
    right: 16px;

    &:hover {
      background: darken($c-primary, 2%);
    }

    @media screen and (max-width: $b-small) {
      display: none;
    }
  }
}

.lists {
  display: flex;

  div {
    flex: 0 0 50%;
  }
}
</style>
