<template>
  <div class="input-group">
    <span class="input-group__prepend">
      {{ prepend }}
    </span>
    <input
      class="input-group__input"
      v-bind="$attrs"
      :value="value"
      @input="input"
    />
    <label class="input-group__label" :for="$attrs.id">{{ label }}</label>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    prepend: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    input(event) {
      this.$emit('input', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-group {
  margin: 24px 0;
  position: relative;

  &__prepend {
    left: 4px;
    position: absolute;
    top: calc(50% + 2px);
    transform: translate(0, -50%);
  }

  &__input {
    border: 1px solid darken($c-white, 10%);
    border-radius: $s-radius;
    padding: 12px 16px 8px 16px;
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
}
</style>
