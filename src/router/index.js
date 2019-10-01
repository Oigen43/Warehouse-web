import Vue from 'vue';
import Router from 'vue-router';

import api from '../utils/api';
import * as url from '../constants/urls';
import store from '../store';
import routesPermissions from '../constants/routesPermissions';
import WHome from '../views/WHome';
import WLogin from '../views/WLogin';
import WConfirmation from '../views/WConfirmation';
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
  const { authorize } = to.meta;

  if (store.state.token) {
    next();
  } else {
    next('/login');
    return;
  }

  if (store.state.roles.some(item => authorize.includes(item))) {
    next();
  } else {
    next('/');
  }
};

const ifConfirmed = async (to, from, next) => {
  if (!to.query.token) {
    next('/');
  } else {
    store.state.registrationToken = to.query.token;
    const res = await api.get(url.CONFIRMATION_URL, store.state.registrationToken);
    if (res.error) {
      store.state.registrationToken = null;
      next('/');
      return;
    }
    next();
  }
};

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: WHome,
    },
    {
      path: '/login',
      name: 'login',
      component: WLogin
    },
    {
      path: '/confirmation',
      name: 'confirmation',
      component: WConfirmation,
      beforeEnter: ifConfirmed
    },
    {
      path: '/companies',
      name: 'companies',
      component: WCompaniesList,
      meta: { authorize: routesPermissions.companies },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/add',
      name: 'companiesAddForm',
      component: WCompaniesAddForm,
      meta: { authorize: routesPermissions.companies },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/update',
      name: 'companiesUpdateForm',
      component: WCompaniesUpdateForm,
      meta: { authorize: routesPermissions.companies },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: WWarehousesList,
      meta: { authorize: routesPermissions.warehouses },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses/add',
      name: 'warehousesAddForm',
      component: WWarehousesAddForm,
      meta: { authorize: routesPermissions.warehouses },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/warehouses/update',
      name: 'warehousesUpdateForm',
      component: WWarehousesUpdateForm,
      meta: { authorize: routesPermissions.warehouses },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users',
      name: 'users',
      component: WUsersList,
      meta: { authorize: routesPermissions.users },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/add',
      name: 'usersAddForm',
      component: WUsersAddForm,
      meta: { authorize: routesPermissions.users },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/update',
      name: 'usersUpdateForm',
      meta: { authorize: routesPermissions.users },
      component: WUsersUpdateForm,
      beforeEnter: ifAuthenticated,
    }
  ]
});
