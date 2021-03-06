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
    companiesArrayDate: [],
    companiesArrayPrices: [],
    currentCompanyId: null,

    warehouses: [],
    warehousesPageLimit: 1,
    warehousesNames: [],
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
    sendersNames: [],
    newSender: {},
    updatedSender: {},
    deletedSender: {},

    receivers: [],
    receiversPageLimit: 1,
    receiversNames: [],
    newReceiver: {},
    updatedReceiver: {},
    deletedReceiver: {},

    carriers: [],
    carriersPageLimit: 1,
    carriersNames: [],
    newCarrier: {},
    updatedCarrier: {},
    deletedCarrier: {},
    currentCarrier: {},

    drivers: [],
    driversPageLimit: 1,
    driversNames: [],
    newDriver: {},
    updatedDriver: {},
    deletedDriver: {},

    transport: [],
    transportPageLimit: 1,
    transportNames: [],
    newTransport: {},
    updatedTransport: {},
    deletedTransport: {},

    TTN: [],
    TTNPageLimit: 1,
    newTTN: {},
    updatedTTN: {},
    userInfo: {},

    goods: [],
    goodsItemInit: {},
    goodsItemComputedVolume: 0,
    storagesComputedCapacity: [],
    writeOff: {},

    toast: {},
    chartDateInterval: {},
    loading: false
  },
  getters,
  mutations,
  actions
});
