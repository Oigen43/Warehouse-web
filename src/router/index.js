import Vue from 'vue';
import Router from 'vue-router';
import WHome from '../views/WHome';
import WCompaniesList from '../views/WCompaniesList';

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
      path: '/companies',
      name: 'companies',
      component: WCompaniesList
    }
  ]
});
