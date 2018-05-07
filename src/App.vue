<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>


<script>
import Navbar from '@/components/Navbar.vue'

export default {
  components: { Navbar },  
}
</script>


<style>
body {
  background: #ddd;
}
input:focus {
  border-bottom: 1px solid #673ab7 !important;
  box-shadow: 0 1px 0 0 #673ab7 !important;
}
</style>
