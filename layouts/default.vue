<template>
  <div class="page">
    <header class="header">
      <h1>Budget</h1>
      <div class="header__user">
        <template v-if="$store.state.user.id">
          <span style="margin-right: 8px;">Welcome back!</span>
          <button class="btn btn--text" @click="logout">Logout</button>
        </template>
        <template v-else>
          <button class="btn btn--text" @click="login">Login</button>
          <button class="btn btn--text" @click="register">Register</button>
        </template>
      </div>
    </header>
    <main class="main">
      <nuxt />
    </main>
    <LoginDialog v-model="loginDialog" type="login" />
    <LoginDialog v-model="registerDialog" type="register" />
  </div>
</template>

<script>
import LoginDialog from '@/components/LoginDialog.vue'

export default {
  components: {
    LoginDialog
  },
  data() {
    return {
      loginDialog: false,
      registerDialog: false
    }
  },
  methods: {
    login() {
      this.loginDialog = true
    },
    logout() {
      this.$store.dispatch('user/logout')
    },
    register() {
      this.registerDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: darken($c-white, 10%);
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .header {
    align-items: center;
    background: $c-primary;
    box-shadow: $shadow;
    color: $c-white;
    display: flex;
    flex: 0 0 64px;
    justify-content: space-between;
    padding: 0 32px;
    z-index: 100;

    @media screen and (max-width: $b-small) {
      flex: 0 0 48px;
      padding: 0 16px;
    }

    &__user {
      align-items: center;
      display: flex;
    }

    h1 {
      font-size: 1.25rem;

      @media screen and (max-width: $b-small) {
        font-size: 1rem;
      }
    }

    .btn--text {
      color: $c-white;
    }
  }

  .main {
    background: $c-white;
    display: flex;
    flex: 1;
    max-width: 768px;
    margin: 0 auto;
    width: 100%;
  }
}
</style>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 300;
  transition: 0.2s ease;
}

body {
  color: $c-black;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Comfortaa', sans-serif;
  font-size: 1rem;
  font-weight: 300;
}

p {
  line-height: 1.6rem;
  margin-bottom: 1rem;
}

.btn {
  align-items: center;
  background: darken($c-white, 10%);
  border: none;
  border-radius: $s-radius;
  cursor: pointer;
  display: flex;
  font-size: 1rem;
  padding: 0.5rem 1rem;

  + .btn {
    margin-left: 8px;
  }

  &:hover {
    background: darken($c-white, 20%);
  }

  > span {
    margin: 0 4px;
  }

  &--primary {
    background: $c-accent;
    color: $c-white;

    &:hover {
      background: darken($c-accent, 10%);
    }

    > span {
      font-weight: 500;
    }
  }

  &--text {
    background: none;

    &:hover {
      background: $c-shadow;
    }
  }

  &--icon {
    align-items: center;
    background: none;
    border-radius: 100%;
    display: flex;
    font-weight: 300;
    height: 32px;
    justify-content: center;
    width: 32px;

    &:hover {
      background: $c-shadow;
    }
  }
}

.list {
  overflow: hidden;
  padding: 16px;

  header {
    display: flex;
    justify-content: space-between;

    h2 {
      font-size: 1.5rem;
    }
  }

  .items {
    border-radius: $s-radius;
    list-style: none;
  }
}

.spacer {
  flex: 1;
}

// TRANSITIONS

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
