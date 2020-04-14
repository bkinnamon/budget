<template>
  <button
    class="btn btn--item"
    :class="item.isPositive ? 'btn--item-positive' : 'btn--item-negative'"
    :title="item.description"
  >
    <div class="description">
      {{ item.description }}
    </div>
    <div class="value">
      <span v-if="item.value !== undefined">{{ item.value | usd }} / </span>
      {{ item.amount | usd }}
    </div>
  </button>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.btn--item {
  border: 1px solid $c-black;
  margin: 16px 0;
  padding: 16px;
  width: 100%;

  &-positive {
    background: lighten($c-info, 50%);
    border-color: $c-info;
  }

  &-negative {
    background: lighten($c-accent, 40%);
    border-color: $c-accent;
  }

  &:hover {
    box-shadow: $shadow;
  }
}

.description {
  flex: 1;
  margin-right: 16px;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
