import * as types from './mutation-types';

export default {
  [types.LOGIN](state, data) {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
    state.roles = data.roles;
  },
  [types.LOGOUT](state, initialState) {
    Object.keys(initialState).forEach(key => {
      state[key] = initialState[key];
    });
  },
  [types.REMOVE_REGISTRATION_TOKEN](state) {
    state.registrationToken = null;
  },

  [types.REFRESH_TOKEN](state, refreshToken) {
    state.token = refreshToken;
  },
  [types.UPDATE_TOKENS](state, data) {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
  },

  [types.COMPANIES](state, companies) {
    state.companies = companies;
  },
  [types.COMPANIES_PAGE_LIMIT](state, companiesPageLimit) {
    state.companiesPageLimit = companiesPageLimit;
  },
  [types.CREATE_COMPANY](state, company) {
    state.newCompany = company;
  },
  [types.SET_UPDATED_COMPANY](state, company) {
    state.updatedCompany = company;
  },
  [types.UPDATE_COMPANY](state, company) {
    state.updatedCompany = company;
    state.companies = [ ...state.companies.map(item => item.id === company.id ? company : item) ];
  },
  [types.DELETE_COMPANY](state, company) {
    state.deletedCompany = company;
    state.companies = state.companies.filter(item => item.id !== company.id);
  },

  [types.CURRENT_COMPANY](state, company) {
    state.currentCompany = company;
  },

  [types.WAREHOUSES](state, warehouses) {
    state.warehouses = warehouses;
  },
  [types.WAREHOUSES_PAGE_LIMIT](state, warehousesPageLimit) {
    state.warehousesPageLimit = warehousesPageLimit;
  },
  [types.CREATE_WAREHOUSE](state, warehouse) {
    state.newWarehouse = warehouse;
  },
  [types.SET_UPDATED_WAREHOUSE](state, warehouse) {
    state.updatedWarehouse = warehouse;
  },
  [types.UPDATE_WAREHOUSE](state, warehouse) {
    state.updatedWarehouse = warehouse;
    state.warehouses = [ ...state.warehouses.map(item => item.id === warehouse.id ? warehouse : item) ];
  },
  [types.DELETE_WAREHOUSE](state, warehouse) {
    state.deletedWarehouse = warehouse;
    state.warehouses = state.warehouses.filter(item => item.id !== warehouse.id);
  },

  [types.CURRENT_WAREHOUSE](state, warehouse) {
    state.currentWarehouse = warehouse;
  },

  [types.USERS](state, users) {
    state.users = users;
  },
  [types.USERS_PAGE_LIMIT](state, usersPageLimit) {
    state.usersPageLimit = usersPageLimit;
  },
  [types.CREATE_USER](state, user) {
    state.newUser = user;
  },
  [types.SET_UPDATED_USER](state, user) {
    state.updatedUser = user;
  },
  [types.UPDATE_USER](state, user) {
    state.updatedUser = user;
    state.users = [...state.users.map(item => item.id === user.id ? user : item)];
  },
  [types.DELETE_USER](state, user) {
    state.deletedUser = user;
    state.users = state.users.filter(item => item.id !== user.id);
  },

  [types.STORAGES](state, storages) {
    state.storages = storages;
  },
  [types.STORAGES_PAGE_LIMIT](state, storagesPageLimit) {
    state.storagesPageLimit = storagesPageLimit;
  },

  [types.SET_TOAST](state, toast) {
    state.toast = toast;
  }
};
