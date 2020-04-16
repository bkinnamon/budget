<template>
  <div class="input-group">
    <button class="input-group__dropdown" @click="show">
      {{ dropdownText }}
      <Icon icon="chevron-down" />
    </button>
    <label class="input-group__label" :for="$attrs.id">{{ label }}</label>
    <div v-show="open" ref="menu" class="input-group__menu">
      <button class="input-group__menu-item" @click="select(null)">None</button>
      <button
        v-for="option in options"
        :key="option.value"
        class="input-group__menu-item"
        @click="select(option.value)"
      >
        {{ option.text }}
      </button>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon.vue'
export default {
  components: {
    Icon
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      open: false
    }
  },
  computed: {
    dropdownText() {
      return this.options.find((o) => o.value === this.value)?.text || 'None'
    }
  },
  mounted() {
    document.body.addEventListener('click', (event) => {
      if (!this.open) {
        return
      }

      const elRect = this.$el.getBoundingClientRect()
      const menuRect = this.$refs.menu.getBoundingClientRect()

      const rect = {
        bottom: Math.min(elRect.bottom, menuRect.bottom),
        left: Math.min(elRect.left, menuRect.left),
        right: Math.min(elRect.right, menuRect.right),
        top: Math.min(elRect.top, menuRect.top)
      }

      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      ) {
        this.cancel()
      }
    })
  },
  methods: {
    cancel() {
      this.open = false
    },
    select(value) {
      this.$emit('input', value)
      this.cancel()
    },
    show() {
      this.open = true
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  margin: 24px 0;
  position: relative;

  &__select {
    width: 100%;
    padding: 8px 16px;
  }

  &__dropdown {
    background: $c-white;
    border: 1px solid darken($c-white, 10%);
    border-radius: $s-radius;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    padding: 12px 16px 8px 16px;
    text-align: left;
    width: 100%;
  }

  &__label {
    background: $c-white;
    color: lighten($c-black, 30%);
    left: 8px;
    pointer-events: none;
    position: absolute;
    top: -10px;
  }

  &__menu {
    background: $c-white;
    border: 1px solid darken($c-white, 10%);
    border-radius: 0 0 $s-radius $s-radius;
    padding-bottom: 8px;
    position: absolute;
    transform: translate(0, -4px);
    width: 100%;

    &-item {
      background: $c-white;
      border: none;
      cursor: pointer;
      padding: 8px 16px;
      width: 100%;

      &:hover {
        background: darken($c-white, 10%);
      }

      & + & {
        border-top: 1px solid darken($c-white, 10%);
      }
    }
  }
}
</style>
