import Vue from 'vue';
import Router from 'vue-router';

import api from '../utils/api';
import * as url from '../constants/urls';
import store from '../store';
import * as types from '../store/mutation-types';
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
import WStoragesList from '../views/WStoragesList';
import WStoragesAddForm from '../views/WStoragesAdd';
import WStoragesUpdateForm from '../views/WStoragesUpdate';
import WSendersList from '../views/WSendersList';
import WSendersAddForm from '../views/WSendersAdd';
import WSendersUpdateForm from '../views/WSendersUpdate';
import WReceiversList from '../views/WReceiversList';
import WReceiversAddForm from '../views/WReceiversAdd';
import WReceiversUpdateForm from '../views/WReceiversUpdate';
import WCarriersList from '../views/WCarriersList';
import WCarriersAddForm from '../views/WCarriersAdd';
import WCarriersUpdateForm from '../views/WCarriersUpdate';
import WDriversList from '../views/WDriversList';
import WDriversAddForm from '../views/WDriversAdd';
import WDriversUpdateForm from '../views/WDriversUpdate';
import WTransportList from '../views/WTransportList';
import WTransportAddForm from '../views/WTransportAdd';
import WTransportUpdateForm from '../views/WTransportUpdate';
import WTTNList from '../views/WTTNList';
import WNotFound from '../views/WNotFound';
import WTTNAddForm from '../views/WTTNAdd';
import WTTNUpdateForm from '../views/WTTNUpdate';

Vue.use(Router);

const ifAuthenticated = (to, from, next) => {
  const { authorize } = to.meta;

  if (!store.state.token) {
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
    store.commit(types.SET_REGISTRATION_TOKEN, to.query.token);
    const res = await api.get(url.CONFIRMATION_URL, store.state.registrationToken);
    if (res.error) {
      store.commit(types.REMOVE_REGISTRATION_TOKEN);
      res.toast && store.commit(types.SET_TOAST, res.toast);
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
      path: '/refresh',
      name: 'refresh'
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
      meta: { authorize: routesPermissions.companies.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/add',
      name: 'companiesAddForm',
      component: WCompaniesAddForm,
      meta: { authorize: routesPermissions.companies.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/update',
      name: 'companiesUpdateForm',
      component: WCompaniesUpdateForm,
      meta: { authorize: routesPermissions.companies.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses',
      name: 'warehouses',
      component: WWarehousesList,
      meta: { authorize: routesPermissions.warehouses.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses/add',
      name: 'warehousesAddForm',
      component: WWarehousesAddForm,
      meta: { authorize: routesPermissions.warehouses.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses/:warehouseId/update',
      name: 'warehousesUpdateForm',
      component: WWarehousesUpdateForm,
      meta: { authorize: routesPermissions.warehouses.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users',
      name: 'users',
      component: WUsersList,
      meta: { authorize: routesPermissions.users.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/add',
      name: 'usersAddForm',
      component: WUsersAddForm,
      meta: { authorize: routesPermissions.users.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/users/:userId/update',
      name: 'usersUpdateForm',
      meta: { authorize: routesPermissions.users.update },
      component: WUsersUpdateForm,
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers',
      name: 'carriers',
      component: WCarriersList,
      meta: { authorize: routesPermissions.carriers.read },
      beforeEnter: ifAuthenticated
    },
    {
      path: '/carriers/add',
      name: 'carriersAddForm',
      component: WCarriersAddForm,
      meta: { authorize: routesPermissions.carriers.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/update',
      name: 'carriersUpdateForm',
      component: WCarriersUpdateForm,
      meta: { authorize: routesPermissions.carriers.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/drivers',
      name: 'drivers',
      component: WDriversList,
      meta: { authorize: routesPermissions.drivers.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/drivers/add',
      name: 'driversAddForm',
      component: WDriversAddForm,
      meta: { authorize: routesPermissions.drivers.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/drivers/:driverId/update',
      name: 'driversUpdateForm',
      component: WDriversUpdateForm,
      meta: { authorize: routesPermissions.drivers.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses/:warehouseId/storages',
      name: 'storages',
      component: WStoragesList,
      meta: { authorize: routesPermissions.storages.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses/:warehouseId/storages/add',
      name: 'WStoragesAddForm',
      component: WStoragesAddForm,
      meta: { authorize: routesPermissions.storages.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/companies/:companyId/warehouses/:warehouseId/storages/:storageId/update',
      name: 'WStoragesUpdateForm',
      component: WStoragesUpdateForm,
      meta: { authorize: routesPermissions.storages.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/senders',
      name: 'senders',
      component: WSendersList,
      meta: { authorize: routesPermissions.senders.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/senders/add',
      name: 'sendersAddForm',
      component: WSendersAddForm,
      meta: { authorize: routesPermissions.senders.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/senders/:senderId/update',
      name: 'sendersUpdateForm',
      component: WSendersUpdateForm,
      meta: { authorize: routesPermissions.senders.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/receivers',
      name: 'receivers',
      component: WReceiversList,
      meta: { authorize: routesPermissions.receivers.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/receivers/add',
      name: 'receiversAddForm',
      component: WReceiversAddForm,
      meta: { authorize: routesPermissions.receivers.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/receivers/:receiverId/update',
      name: 'receiversUpdateForm',
      component: WReceiversUpdateForm,
      meta: { authorize: routesPermissions.receivers.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/transport',
      name: 'transport',
      component: WTransportList,
      meta: { authorize: routesPermissions.transport.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/transport/add',
      name: 'transportAddForm',
      component: WTransportAddForm,
      meta: { authorize: routesPermissions.transport.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/carriers/:carrierId/transport/:transportId/update',
      name: 'transportUpdateForm',
      component: WTransportUpdateForm,
      meta: { authorize: routesPermissions.transport.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/ttn',
      name: 'TTN',
      component: WTTNList,
      meta: { authorize: routesPermissions.TTN.read },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/ttn/add',
      name: 'TTNAddForm',
      component: WTTNAddForm,
      meta: { authorize: routesPermissions.TTN.create },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/ttn/:TTNId/update',
      name: 'TTNUpdateForm',
      component: WTTNUpdateForm,
      meta: { authorize: routesPermissions.TTN.update },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '/ttn/:TTNId/addOut',
      name: 'TTNAddOutForm',
      component: WTTNAddForm,
      meta: { authorize: routesPermissions.TTN.out },
      beforeEnter: ifAuthenticated,
    },
    {
      path: '*',
      component: WNotFound,
    },
  ]
});
