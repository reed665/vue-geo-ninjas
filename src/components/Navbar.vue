<template>
  <div class="navbar">
    <nav class="deep-purple darken-1">
      <div class="container">
        <router-link :to="{ name: 'gMap' }">GeoNinjas!</router-link>

        <ul class="right">
          <li><router-link :to="{ name: 'signup' }">Signup</router-link></li>
          <li><router-link :to="{ name: 'login' }">Login</router-link></li>
          <li><a href="" @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
    </nav>
  </div>
</template>


<script>
import firebase from 'firebase'

export default {
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
