import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/home';
import WarehousesList from '../views/warehousesList';

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
