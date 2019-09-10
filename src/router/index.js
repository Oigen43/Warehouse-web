import Vue from 'vue';
import Router from 'vue-router';
import WHome from '../views/WHome';
import WCompaniesList from '../views/WCompaniesList';
import WCompaniesAddForm from '../views/WCompaniesAdd';
import WUsersList from '../views/WUsersList';
import WUsersUpdateForm from '../views/WUsersUpdate';
import WUsersAddForm from '../views/WUsersAdd';

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
    },
    {
      path: '/users',
      name: 'users',
      component: WUsersList
    },
    {
      path: '/users/add',
      name: 'usersAddForm',
      component: WUsersAddForm
    },
    {
      path: '/users/update',
      name: 'usersUpdateForm',
      component: WUsersUpdateForm
    }
  ]
});
