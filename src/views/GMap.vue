<template>
  <div class="gmap container">
    <div class="google-map" id="map"></div>
  </div>
</template>


<script>
import firebase from 'firebase'
import db from '@/firestore'

const oneHour = 60 * 60 * 1000

export default {
  data () {
    return {
      lat: 53,
      lng: -2,
      authUser: null,
    }
  },
  created () {
    this.authUser = firebase.auth().currentUser
  },
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => {
        this.updateUserCoords(pos)
          .then(() => {
            this.renderMap()
          })
          .catch(console.error)
      }, err => {
        console.error(err)
        this.renderMap()
      }, {
        maximumAge: oneHour,
        timeout: 3000,
      })
    } else {
      this.renderMap()
    }
  },
  methods: {
    updateUserCoords (pos) {
      this.lat = pos.coords.latitude
      this.lng = pos.coords.longitude
      return db.collection('users').where('userId', '==', this.authUser.uid).get()
        .then(snapshot => {
          let userSlugId = null
          snapshot.forEach(user => {
            userSlugId = user.id
          })
          return db.collection('users').doc(userSlugId).update({
            geolocation: {
              lat: this.lat,
              lng: this.lng,
            }
          })
        })
    },
    renderMap () {
      const mapEl = document.getElementById('map')
      const map = new google.maps.Map(mapEl, {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
      })

      db.collection('users').get()
        .then(users => {
          users.forEach(user => {
            const data = user.data()
            if (!data.geolocation) {
              return
            }
            const marker = new google.maps.Marker({
              position: {
                lat: data.geolocation.lat,
                lng: data.geolocation.lng,
              },
              title: data.alias,
              map,
            })
            marker.addListener('click', () => {
              this.$router.push({ name: 'profile', params: { userSlug: user.id } })
            })
          })
        })
    }
  }
}
</script>


<style scoped>
  .google-map {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
</style>
