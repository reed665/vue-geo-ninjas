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
import firebase from 'firebase'

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
      if (!this.email || !this.password) {
        this.feedback = 'Please fill in both fields'
        return
      }
      this.feedback = ''
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(authUser => {
          this.$router.push({ name: 'gMap' })
        })
        .catch(err => {
          if (!err) return
          this.feedback = (typeof err === 'string') ? err : err.message
        })
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
