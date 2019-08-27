import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home';
import WarehousesList from '../views/WarehousesList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/warehouses-list',
      name: 'warehouses-list',
      component: WarehousesList
    }
  ]
});
