import Vue from 'vue';
import Router from 'vue-router';

import GMap from './views/GMap.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gMap',
      component: GMap,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup,
    },
  ],
});
