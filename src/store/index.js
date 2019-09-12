import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [],
    companiesPageLimit: 1,
    newCompany: {},
    updatedCompany: {},
    deletedCompany: {},
    currentCompany: null,

    warehouses: [],
    warehousesPageLimit: 1,
    newWarehouse: {},
    updatedWarehouse: {},
    deletedWarehouse: {},

    users: [],
    usersPageLimit: 1,
    newUser: {},
    updatedUser: {},
    deletedUser: {},

    popup: {}
  },
  getters,
  mutations,
  actions
});
