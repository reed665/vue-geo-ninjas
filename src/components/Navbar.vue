<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'gMap' }" class="brand-logo left">GeoNinjas!</router-link>

        <ul class="right">
          <li v-if="!authUser"><router-link :to="{ name: 'signup' }">Signup</router-link></li>
          <li v-if="!authUser"><router-link :to="{ name: 'login' }">Login</router-link></li>

          <li v-if="authUser"><a href="" @click.prevent class="navbar-email">{{ authUser.email }}</a></li>
          <li v-if="authUser"><a href="" @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      authUser: null,
    }
  },
  created () {
    firebase.auth().onAuthStateChanged(authUser => {
      this.authUser = authUser
    })
  },
  methods: {
    logout () {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push({ name: 'login' })
        })
        .catch(console.error)
    }
  }
}
</script>


<style>
  .navbar-email {
    cursor: default;
  }
</style>
