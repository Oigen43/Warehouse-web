import Vue from 'vue';
import Router from 'vue-router';
import WHome from '../views/WHome';
import WarehousesList from '../views/WWarehousesList';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: WHome
    },
    {
      path: '/warehouses-list',
      name: 'warehouses-list',
      component: WarehousesList
    }
  ]
});
