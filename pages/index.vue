<template>
  <Splash v-if="!userId" />
  <div v-else class="page--balance">
    <div
      class="balance"
      :class="balance >= 0 ? 'balance--positive' : 'balance--negative'"
    >
      <span>{{ balance | usd }}</span>
      <button class="btn btn--process" @click="show">
        <Icon icon="cogs" />
        Process
      </button>
    </div>
    <div class="lists">
      <div class="lists__container" :style="listStyle">
        <TransactionList :envelopes="envelopes" :transactions="transactions" />
        <EnvelopeList :envelopes="envelopes" :transactions="transactions" />
      </div>
    </div>
    <div class="mobile-tabs">
      <button
        class="btn btn--tab"
        :class="{ 'btn--tab--active': active === 0 }"
        @click="tab(0)"
      >
        <Icon icon="file-invoice-dollar" />
      </button>
      <button
        class="btn btn--tab"
        :class="{ 'btn--tab--active': active === 1 }"
        @click="tab(1)"
      >
        <Icon icon="envelope" />
      </button>
      <button class="btn btn--tab" @click="show">
        <Icon icon="cogs" />
      </button>
    </div>
    <Dialog v-model="dialog" title="End of Cycle Processing">
      <template>
        <p>
          Welcome to the end of cycle processing. This will save the current
          balance and archive all current transactions. You will no longer be
          able to view, edit or delete the current set of transactions.
        </p>
        <p>Are you ready to perform the end of cycle processing?</p>
      </template>
      <template v-slot:actions>
        <button class="btn btn--text" @click="cancel">
          Cancel
        </button>
        <button class="btn btn--primary" @click="process">
          <Icon icon="cogs" />
          <span>Process</span>
        </button>
      </template>
    </Dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'

import Dialog from '~/components/Dialog'
import Icon from '~/components/Icon'
import EnvelopeList from '@/components/EnvelopeList.vue'
import Splash from '@/components/Splash.vue'
import TransactionList from '@/components/TransactionList.vue'

export default {
  components: {
    Dialog,
    Icon,
    EnvelopeList,
    Splash,
    TransactionList
  },
  data() {
    return {
      active: 0,
      dialog: false
    }
  },
  computed: {
    ...mapState('budget', ['start']),
    transactions() {
      return _.cloneDeep(this.$store.state.budget.transactions)
    },
    envelopes() {
      return _.cloneDeep(this.$store.state.budget.envelopes)
    },
    balance() {
      const balance = this.transactions.reduce((value, t) => {
        return value + t.amount
      }, this.start)
      return balance
    },
    listStyle() {
      return `--offset: -${this.active * 100}vw;`
    },
    userId() {
      return this.$store.state.user.id
    }
  },
  watch: {
    userId(id) {
      this.getData()
    }
  },
  methods: {
    cancel() {
      this.dialog = false
    },
    getData() {
      this.$store.dispatch('budget/get')
    },
    process() {
      this.$store.dispatch('budget/process', this.balance)
      this.cancel()
    },
    show() {
      this.dialog = true
    },
    tab(n) {
      this.active = n
    }
  }
}
</script>

<style lang="scss" scoped>
.page--balance {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  width: 100vw;

  .balance {
    align-items: center;
    display: flex;
    flex: 0 0 64px;
    justify-content: center;
    margin-bottom: 16px;
    position: relative;

    @media screen and (max-width: $b-small) {
      flex: 0 0 128px;
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
    --offset: 0vw;
    flex: 1;

    @media screen and (max-width: $b-small) {
      margin-bottom: 48px;
      overflow: hidden;
      width: 100vw;
    }

    &__container {
      display: flex;

      @media screen and (max-width: $b-small) {
        transform: translate(var(--offset), 0);
      }
    }

    div {
      flex: 0 0 50%;

      @media screen and (max-width: $b-small) {
        flex: 0 0 100vw;
      }
    }
  }
}

.mobile-tabs {
  bottom: 0;
  display: none;
  height: 48px;
  left: 0;
  position: fixed;
  right: 0;

  @media screen and (max-width: $b-small) {
    display: flex;
  }

  .btn--tab {
    background: $c-primary;
    color: darken($c-white, 20%);
    border-radius: 0;
    flex: 1;
    margin: 0;
    justify-content: center;

    &--active {
      color: $c-white;
    }
  }
}
</style>
