import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
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

const ifAuthenticated = (to, from, next) => {
  if (store.state.token) {
    next();
    return;
  }
  next('/login');
};

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
      component: WCompaniesList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/add',
      name: 'companiesAddForm',
      component: WCompaniesAddForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/update',
      name: 'companiesUpdateForm',
      component: WCompaniesUpdateForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: WWarehousesList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses/add',
      name: 'warehousesAddForm',
      component: WWarehousesAddForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses/update',
      name: 'warehousesUpdateForm',
      component: WWarehousesUpdateForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users',
      name: 'users',
      component: WUsersList,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/add',
      name: 'usersAddForm',
      component: WUsersAddForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/update',
      name: 'usersUpdateForm',
      component: WUsersUpdateForm,
      beforeEnter: ifAuthenticated,
    }
  ]
});
