<template>
  <div class="signup container">
    <form class="card-panel" @submit.prevent="signup">
      <h2 class="signup-title center deep-purple-text">Signup</h2>

      <div class="field">
        <label for="email">Email</label>
        <input type="email" name="email" v-model="email">
      </div>

      <div class="field">
        <label for="password">Password</label>
        <input type="password" name="password" v-model="password">
      </div>

      <div class="field">
        <label for="alias">Alias</label>
        <input type="text" name="alias" v-model="alias">
      </div>

      <p v-if="feedback" class="red-text center">{{ feedback }}</p>

      <div class="field center">
        <button type="submit" class="btn deep-purple">Signup</button>
      </div>
    </form>
  </div>
</template>


<script>
import slugify from 'slugify'

export default {
  data () {
    return {
      email: '',
      password: '',
      alias: '',
      feedback: '',
    }
  },
  computed: {
    slug () {
      return slugify(this.alias, {
        replacement: '-',
        remove: /[$*_+~.()'"!\-:@]/g,
        lower: true,
      })
    }
  },
  methods: {
    signup () {
      if (!this.alias) {
        this.feedback = 'You must enter an alias'
        return
      }
      console.log(this.slug)
    }
  }
}
</script>


<style scoped>
  .signup {
    max-width: 400px;
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .signup-title {
    font-size: 2.4em;
  }

  .field {
    margin-bottom: 16px;
  }
</style>
