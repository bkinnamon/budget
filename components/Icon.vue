<template>
  <i :class="`fas fa-${icon}`" />
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
i {
  margin: 0 4px;
}
</style>
