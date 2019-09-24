import helpers from '../utils/helpers';
import * as types from './mutation-types';
import api from '../utils/api';
import * as url from '../constants/urls';
import * as constant from '../constants';
import initialState from '../constants/initialState';

export default {
  login: async ({ commit }, req) => {
    const res = await api.post(url.LOGIN_URL, req);
    if (res.data) {
      const token = res.data.token;
      const roles = res.data.roles;
      localStorage.setItem(constant.TOKEN_KEY, token);
      localStorage.setItem(constant.ROLES_LIST, roles);
      commit(types.LOGIN, { token, roles });
    }
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  logout: async ({ commit }) => {
    localStorage.removeItem(constant.TOKEN_KEY);
    localStorage.removeItem(constant.ROLES_LIST);
    commit(types.LOGOUT, initialState);
  },
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await api.get(url.COMPANIES_URL, { page, perPage });
    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);
      commit(types.COMPANIES, res.data.companies);
      commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
      res.toast && commit(types.SET_TOAST, res.toast);
    }
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);

    const res = await api.post(url.COMPANIES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedCompany: async ({ commit }, req) => {
    commit(types.SET_UPDATED_COMPANY, req);
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    const res = await api.put(url.COMPANIES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, req) => {
    const res = await api.delete(url.COMPANIES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  setCurrentCompany: async ({ commit }, req) => {
    commit(types.CURRENT_COMPANY, req);
  },

  fetchWarehousesList: async ({ commit }, req) => {
    const res = await api.get(url.WAREHOUSES_URL, {
      page: req.page,
      perPage: req.perPage,
      companyId: req.companyId
    });
    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.warehousesTotal, req.perPage);
      commit(types.WAREHOUSES, res.data.warehouses);
      commit(types.WAREHOUSES_PAGE_LIMIT, pageLimit);
      res.toast && commit(types.SET_TOAST, res.toast);
    }
  },
  createWarehouse: async ({ commit }, req) => {
    commit(types.CREATE_WAREHOUSE, req);

    const res = await api.post(url.WAREHOUSES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedWarehouse: async ({ commit }, req) => {
    commit(types.SET_UPDATED_WAREHOUSE, req);
  },
  sendUpdatedWarehouse: async ({ commit }, req) => {
    const res = await api.put(url.WAREHOUSES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteWarehouse: async ({ commit }, req) => {
    commit(types.DELETE_WAREHOUSE, req);
  },
  sendDeletedWarehouse: async ({ commit }, req) => {
    const res = await api.delete(url.WAREHOUSES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchUsersList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await api.get(url.USERS_URL, { page, perPage });
    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);
      commit(types.USERS, res.data.users);
      commit(types.USERS_PAGE_LIMIT, pageLimit);
      res.toast && commit(types.SET_TOAST, res.toast);
    }
  },
  createUser: async ({ commit }, req) => {
    commit(types.CREATE_USER, req);

    const res = await api.post(url.USERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedUser: async ({ commit }, req) => {
    commit(types.SET_UPDATED_USER, req);
  },
  sendUpdatedUser: async ({ commit }, req) => {
    const res = await api.put(url.USERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteUser: async ({ commit }, req) => {
    commit(types.DELETE_USER, req);
  },
  sendDeletedUser: async ({ commit }, req) => {
    const res = await api.delete(url.USERS_URL, req);
    res.toast && commit(types.SET_TOAST, res.toast);
  }
};
