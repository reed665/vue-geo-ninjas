<template>
  <div class="login container">
    <form class="card-panel" @submit.prevent="login">
      <h2 class="login-title center deep-purple-text">Login</h2>

      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>

      <p v-if="feedback" class="red-text center">{{ feedback }}</p>

      <div class="field center">
        <button type="submit" class="btn deep-purple">Login</button>
      </div>
    </form>
  </div>
</template>


<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      feedback: '',
    }
  },
  methods: {
    login () {
      console.log(this.email, this.password)
    }
  }
}
</script>


<style scoped>
  .login {
    max-width: 400px;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .login-title {
    font-size: 2.4em;
  }

  .field {
    margin-bottom: 16px;
  }
</style>
