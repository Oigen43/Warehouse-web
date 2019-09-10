import api from '../utils/api';
import helpers from '../utils/helpers';
import * as types from './mutation-types';

export default {
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 5) => {
    const res = await api.fetchData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(res.companiesTotal, perPage);

    commit(types.COMPANIES, res.companies);
    commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);
    await api.sendNewCompanyData(req);
  },

  fetchUsersList: async({ commit }, page = 1, perPage = 5) => {
    const res = await api.fetchUsersData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);

    commit(types.USERS, res.data.users);
    commit(types.USERS_PAGE_LIMIT, pageLimit);
  },
  createUser: async({ commit }, req) => {
    commit(types.CREATE_USER, req);
    await api.sendNewUserData(req);
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
