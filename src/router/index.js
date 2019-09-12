import Vue from 'vue';
import Router from 'vue-router';
import WHome from '../views/WHome';
import WLogin from '../views/WLogin';
import WCompaniesList from '../views/WCompaniesList';
import WCompaniesAddForm from '../views/WCompaniesAdd';
import WCompaniesUpdateForm from '../views/WCompaniesUpdate';
import WWarehousesList from '../views/WWarehousesList';
import WWarehousesAddForm from '../views/WWarehousesAdd';
import WWarehousesUpdateForm from '../views/WWarehousesUpdate';
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
      path: '/login',
      name: 'login',
      component: WLogin
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
      path: '/companies/update',
      name: 'companiesUpdateForm',
      component: WCompaniesUpdateForm
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: WWarehousesList
    },
    {
      path: '/warehouses/add',
      name: 'warehousesAddForm',
      component: WWarehousesAddForm
    },
    {
      path: '/warehouses/update',
      name: 'warehousesUpdateForm',
      component: WWarehousesUpdateForm
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
