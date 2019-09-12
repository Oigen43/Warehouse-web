import helpers from '../utils/helpers';
import * as types from './mutation-types';
import apiHelper from '../utils/apiHelper';
import * as url from '../constants/url';

export default {
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await apiHelper.get(url.COMPANIES_URL, {
      params: {
        page,
        perPage
      }
    });
    const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);

    commit(types.COMPANIES, res.data.companies);
    commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);
    const res = await apiHelper.post(url.COMPANIES_URL, req);

    commit(types.SET_POPUP, helpers.createPopup(res));
  },
  getUpdatedCompany: async ({ commit }, req) => {
    commit(types.SET_UPDATED_COMPANY, req);
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    const res = await apiHelper.put(url.COMPANIES_URL, req);

    commit(types.SET_POPUP, helpers.createPopup(res));
    return res.data;
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, req) => {
    const res = await apiHelper.delete(url.COMPANIES_URL, req);
    commit(types.SET_POPUP, helpers.createPopup(res));
    return res.data;
  },

  setCurrentCompany: async ({ commit }, req) => {
    commit(types.CURRENT_COMPANY, req);
  },

  fetchWarehousesList: async ({ commit }, req) => {
    const res = await apiHelper.get(url.WAREHOUSE_URL, {
      params: {
        page: req.page,
        perPage: req.perPage,
        companyName: req.companyName
      }
    });
    const pageLimit = helpers.calculatePageLimit(res.data.warehousesTotal, req.perPage);

    commit(types.WAREHOUSES, res.data.warehouses);
    commit(types.WAREHOUSES_PAGE_LIMIT, pageLimit);
  },
  createWarehouse: async ({ commit }, req) => {
    commit(types.CREATE_WAREHOUSE, req);
    const res = await apiHelper.post(url.WAREHOUSE_URL, req);

    commit(types.SET_POPUP, helpers.createPopup(res));
  },
  getUpdatedWarehouse: async ({ commit }, req) => {
    commit(types.SET_UPDATED_WAREHOUSE, req);
  },
  sendUpdatedWarehouse: async ({ commit }, req) => {
    const res = await apiHelper.put(url.WAREHOUSE_URL, req);
    commit(types.SET_POPUP, helpers.createPopup(res));
    return res.data;
  },
  deleteWarehouse: async ({ commit }, req) => {
    commit(types.DELETE_WAREHOUSE, req);
  },
  sendDeletedWarehouse: async ({ commit }, req) => {
    const res = await apiHelper.delete(url.WAREHOUSE_URL, req);
    commit(types.SET_POPUP, helpers.createPopup(res));
    return res.data;
  },

  fetchUsersList: async({ commit }, page = 1, perPage = 5) => {
    const res = await apiHelper.get(url.USERS_URL, {
      params: {
        page,
        perPage
      }
    });
    const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);

    commit(types.USERS, res.data.users);
    commit(types.USERS_PAGE_LIMIT, pageLimit);
  },
  createUser: async({ commit }, req) => {
    commit(types.CREATE_USER, req);
    const res = await apiHelper.post(url.USERS_URL, req);

    commit(types.SET_POPUP, helpers.createPopup(res));
  },
  getUpdatedUser: async({ commit }, req) => {
    commit(types.SET_UPDATED_USER, req);
  },
  sendUpdatedUser: async ({ commit }, req) => {
    const res = await apiHelper.put(url.USERS_URL, req);

    commit(types.SET_POPUP, helpers.createPopup(res));
  },
  deleteUser: async({ commit }, req) => {
    commit(types.DELETE_USER, req);
  },
  sendDeletedUser: async({ commit }, req) => {
    const res = await apiHelper.delete(url.USERS_URL, req);
    commit(types.SET_POPUP, helpers.createPopup(res));
    return res.data;
  }
};
