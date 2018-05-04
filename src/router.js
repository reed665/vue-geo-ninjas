import Vue from 'vue';
import Router from 'vue-router';

import GMap from './views/GMap.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'gMap',
      component: GMap,
    },
  ],
});
