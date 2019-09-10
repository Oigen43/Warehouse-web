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
  }
};
