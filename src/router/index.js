import Vue from 'vue';
import Router from 'vue-router';
import WHome from '../views/WHome';
import WCompaniesList from '../views/WCompaniesList';
import WCompaniesAddForm from '../views/WCompaniesAddForm';

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
    },
    {
      path: '/companies/add',
      name: 'companiesAddForm',
      component: WCompaniesAddForm
    }
  ]
});
