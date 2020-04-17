<template>
  <form @submit.prevent="submit">
    <Dialog :title="type" :value="$attrs.value" @input="$listeners.input">
      <template>
        <Textbox id="email" v-model="email" label="Email" />
        <Textbox
          id="password"
          v-model="password"
          label="Password"
          type="password"
        />
      </template>
      <template v-slot:actions>
        <button class="btn btn--text" type="button" @click="close">
          Cancel
        </button>
        <button class="btn btn--primary" type="submit">
          {{ type | capitalize }}
        </button>
      </template>
    </Dialog>
  </form>
</template>

<script>
import Dialog from '@/components/Dialog.vue'
import Textbox from '@/components/Textbox.vue'

export default {
  components: {
    Dialog,
    Textbox
  },
  props: {
    type: {
      type: String,
      default: 'login'
    }
  },
  data() {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
    login() {
      this.$store
        .dispatch('user/login', { email: this.email, password: this.password })
        .then(() => {
          this.close()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    register() {
      this.$store
        .dispatch('user/register', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.close()
        })
        .catch((error) => {
          console.error(error)
        })
    },
    submit() {
      this[this.type]()
    }
  }
}
</script>

<style lang="scss" scoped></style>
