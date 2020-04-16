<template>
  <transition name="fade">
    <div
      v-show="value"
      class="dialog__wrapper"
      :class="{ 'dialog__wrapper--shown': value }"
      @click.self="close"
    >
      <div class="dialog">
        <header class="dialog__header">
          <h3 class="dialog__title">{{ title }}</h3>
          <button class="btn btn--icon dialog__close" @click="close">
            <Icon icon="times" />
          </button>
        </header>
        <section class="dialog__body">
          <slot></slot>
        </section>
        <section class="dialog__actions">
          <slot name="actions"></slot>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
import Icon from '~/components/Icon'

export default {
  components: {
    Icon
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.dialog {
  &__wrapper {
    align-items: center;
    background: $c-overlay;
    bottom: 0;
    display: flex;
    justify-content: center;
    left: 0;
    pointer-events: none;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1000;

    &--shown {
      pointer-events: all;
    }
  }

  border-radius: $s-radius;
  box-shadow: $shadow;
  max-width: 512px;
  overflow: hidden;

  &__header {
    align-items: center;
    background: $c-primary;
    color: $c-white;
    display: flex;
    height: 48px;
    padding: 0 16px;
  }

  &__title {
    flex: 1;
    margin-right: 16px;
  }

  &__close {
    color: $c-white;
  }

  &__body {
    background: $c-white;
    padding: 16px;
  }

  &__actions {
    background: $c-white;
    border-top: 1px solid darken($c-white, 10%);
    display: flex;
    justify-content: flex-end;
    padding: 16px;
  }
}
</style>
