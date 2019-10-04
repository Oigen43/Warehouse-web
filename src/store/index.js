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
    currentCompany: {},

    warehouses: [],
    warehousesPageLimit: 1,
    newWarehouse: {},
    updatedWarehouse: {},
    deletedWarehouse: {},
    currentWarehouse: {},

    users: [],
    usersPageLimit: 1,
    newUser: {},
    updatedUser: {},
    deletedUser: {},

    storages: [],
    storagesPageLimit: 1,

    senders: [],
    sendersPageLimit: 1,
    newSender: {},
    updatedSender: {},
    deletedSender: {},

    toast: {}
    },
  getters,
  mutations,
  actions
});
