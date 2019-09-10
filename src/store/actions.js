import api from '../utils/api';
import helpers from '../utils/helpers';
import * as types from './mutation-types';

export default {
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await api.fetchData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);

    commit(types.COMPANIES, res.data.companies);
    commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);
    await api.sendNewCompanyData(req);
  },
  getUpdatedCompany: async ({ commit }, req) => {
    commit(types.SET_UPDATED_COMPANY, req);
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    await api.sendUpdatedCompanyData(req);
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, req) => {
   await api.sendDeletedCompanyData(req);
  },

  setCurrentCompany: async ({ commit }, req) => {
    commit(types.CURRENT_COMPANY, req);
  },

  fetchWarehousesList: async ({ commit }, req) => {
    const res = await api.fetchWarehousesData(req.page, req.perPage, req.companyName);
    const pageLimit = helpers.calculatePageLimit(res.data.warehousesTotal, req.perPage);

    commit(types.WAREHOUSES, res.data.warehouses);
    commit(types.WAREHOUSES_PAGE_LIMIT, pageLimit);
  },
  createWarehouse: async ({ commit }, req) => {
    commit(types.CREATE_WAREHOUSE, req);
    await api.sendNewWarehouseData(req);
  },
  getUpdatedWarehouse: async ({ commit }, req) => {
    commit(types.SET_UPDATED_WAREHOUSE, req);
  },
  sendUpdatedWarehouse: async ({ commit }, req) => {
    await api.sendUpdatedWarehouseData(req);
  },
  deleteWarehouse: async ({ commit }, req) => {
    commit(types.DELETE_WAREHOUSE, req);
  },
  sendDeletedWarehouse: async ({ commit }, req) => {
   await api.sendDeletedWarehouseData(req);
  }
};
