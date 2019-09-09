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
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
    await api.sendDeletedCompanyData(req);
  }
};
