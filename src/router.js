import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/List.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/warehouses-list',
      name: 'warehouses-list',
      component: About
    }
  ]
});
