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
    const res = await api.sendNewCompanyData(req);

    commit(types.CREATE_COMPANY_RESPONSE, res.message);
  },
  getUpdatedCompany: async ({ commit }, req) => {
    commit(types.GET_UPDATED_COMPANY, req);
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    const res = await api.sendUpdatedCompanyData(req);

    commit(types.UPDATE_COMPANY_RESPONSE, res.message);
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, req) => {
    const res = await api.sendDeletedCompanyData(req);

    commit(types.DELETE_COMPANY_RESPONSE, res.message);
  }
};
