import * as types from './mutation-types';

export default {
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
    state.companies = [ ...state.companies.map(item => item.companyName === company.companyName ? company : item) ];
  },
  [types.DELETE_COMPANY](state, company) {
    state.deletedCompany = company;
    const index = state.companies.findIndex(item => item.companyName === company.companyName);
    state.companies = [ ...state.companies.splice(index, 1) ];
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
    state.warehouses = [ ...state.warehouses.map(item => item.warehouseName === warehouse.warehouseName ? warehouse : item) ];
  },
  [types.DELETE_WAREHOUSE](state, warehouse) {
    state.deletedWarehouse = warehouse;
    const index = state.warehouses.findIndex(item => item.warehouseName === warehouse.warehouseName);
    state.warehouses = [ ...state.warehouses.splice(index, 1) ];
  },
};
