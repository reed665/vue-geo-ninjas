<template>
  <div class="gmap container">
    <div class="google-map" id="map"></div>
  </div>
</template>


<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      lat: 53,
      lng: -2,
      user: null,
    }
  },
  created () {
    this.user = firebase.auth().currentUser
  },
  mounted () {
    this.renderMap()
    console.log('>> current user', this.user)
  },
  methods: {
    renderMap () {
      const mapEl = document.getElementById('map')
      const map = new google.maps.Map(mapEl, {
        center: { lat: this.lat, lng: this.lng },
        zoom: 6,
        maxZoom: 15,
        minZoom: 3,
        streetViewControl: false,
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
