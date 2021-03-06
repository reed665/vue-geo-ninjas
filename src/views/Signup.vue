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
import firebase from 'firebase'
import functions from 'firebase/functions'
import slugify from 'slugify'
import db from '@/firestore'

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
    },
    checkAlias () {
      return firebase.functions().httpsCallable('checkAlias')
    }
  },
  methods: {
    signup () {
      if (!this.email || !this.password || !this.alias) {
        this.feedback = 'All fields are required'
        return
      }
      this.feedback = ''
      const userRef = db.collection('users').doc(this.slug)
      this.checkAlias({ slug: this.slug })
        .then(({ data }) => {
          const { unique } = data
          if (!unique) {
            return Promise.reject(new Error('This alias already exists'))
          }
          return firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        })
        .then(authUser => {
          const user = {
            alias: this.alias,
            geolocation: null,
            userId: authUser.uid,
          }
          return userRef.set(user)
        })
        .then(() => {
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
