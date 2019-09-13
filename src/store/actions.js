import axios from 'axios';
import api from '../utils/api';
import helpers from '../utils/helpers';
import * as types from './mutation-types';

export default {
  login: async ({ commit }, req) => {
    try {
      commit(types.LOGIN_REQUEST);
      const res = await api.login(req);
      const token = res.data.token;
      const user = res.data.user;

      axios.defaults.headers.common['Authorization'] = token;
      commit(types.LOGIN_SUCCESS, token, user);
    } catch {
      commit(types.LOGIN_ERROR);
      localStorage.removeItem('token')
    }
  },
  logout: async ({ commit }) => {
    commit(types.LOGOUT);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization']
  },
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await api.fetchData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);

    commit(types.COMPANIES, res.data.companies);
    commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);
    const res = await api.sendNewCompanyData(req);

    commit(types.SET_POPUP, res);
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
    const res = await api.sendNewWarehouseData(req);

    commit(types.SET_POPUP, res);
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
  },

  fetchUsersList: async({ commit }, page = 1, perPage = 5) => {
    const res = await api.fetchUsersData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);

    commit(types.USERS, res.data.users);
    commit(types.USERS_PAGE_LIMIT, pageLimit);
  },
  createUser: async({ commit }, req) => {
    commit(types.CREATE_USER, req);
    const res = await api.sendNewUserData(req);

    commit(types.SET_POPUP, res);
  },
  getUpdatedUser: async({ commit }, req) => {
    commit(types.SET_UPDATED_USER, req);
  },
  sendUpdatedUser: async ({ commit }, req) => {
    await api.sendUpdatedUserData(req);
  },
  deleteUser: async({ commit }, req) => {
    commit(types.DELETE_USER, req);
  },
  sendDeletedUser: async({ commit }, req) => {
    await api.sendDeletedUserData(req);
  }
};
