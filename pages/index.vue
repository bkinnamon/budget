<template>
  <div>
    <div class="balance balance--negative">
      <span>{{ -1199.99 | usd }}</span>
      <button class="btn btn--process" @click="process">
        <Icon icon="cogs" />
        Process
      </button>
    </div>
    <div class="lists">
      <List title="Transactions" :items="transactions" />
      <List title="Envelopes" :items="envelopes" />
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
import List from '~/components/List'

export default {
  components: {
    Dialog,
    Icon,
    List
  },
  data() {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState('budget', ['transactions', 'envelopes'])
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
  background: $c-accent;
  color: $c-white;
  display: flex;
  justify-content: center;
  height: 64px;
  margin-bottom: 16px;
  position: relative;

  @media screen and (max-width: $b-small) {
    height: 128px;
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
