import Vue from 'vue';
import Vuex from 'vuex';

import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import * as constant from '../constants';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem(constant.TOKEN_KEY) || null,
    refreshToken: localStorage.getItem(constant.REFRESH_TOKEN_KEY) || null,
    registrationToken: null,
    roles: JSON.parse(localStorage.getItem(constant.ROLES_LIST)) || null,

    companies: [],
    companiesPageLimit: 1,
    newCompany: {},
    updatedCompany: {},
    deletedCompany: {},

    warehouses: [],
    warehousesPageLimit: 1,
    warehousesNames: null,
    newWarehouse: {},
    updatedWarehouse: {},
    deletedWarehouse: {},

    users: [],
    usersPageLimit: 1,
    newUser: {},
    updatedUser: {},
    deletedUser: {},

    storages: [],
    storagesPageLimit: 1,
    newStorage: {},
    updatedStorage: {},
    deletedStorage: {},
    currentStorage: {},
    storageTypes: [],

    senders: [],
    sendersPageLimit: 1,
    newSender: {},
    updatedSender: {},
    deletedSender: {},

    receivers: [],
    receiversPageLimit: 1,
    newReceiver: {},
    updatedReceiver: {},
    deletedReceiver: {},

    carriers: [],
    carriersPageLimit: 1,
    newCarrier: {},
    updatedCarrier: {},
    deletedCarrier: {},
    currentCarrier: {},

    drivers: [],
    driversPageLimit: 1,
    newDriver: {},
    updatedDriver: {},
    deletedDriver: {},

    transport: [],
    transportPageLimit: 1,
    newTransport: {},
    updatedTransport: {},
    deletedTransport: {},

    TTN: [],
    TTNPageLimit: 1,
    newTTN: {},
    updatedTTN: {},
    userInfo: {},

    goods: [],
    writeOff: {},

    toast: {},
    loading: false
  },
  getters,
  mutations,
  actions
});
