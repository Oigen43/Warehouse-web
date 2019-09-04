import api from '../utils/api';
import helpers from '../utils/helpers';
import * as types from './mutation-types';

export default {
  commitWarehousesList: async({ commit }, page = 1, perPage = 5) => {
    const req = await api.fetchData(page, perPage);
    const pageLimit = helpers.calculatePageLimit(req.companiesTotal, perPage);
    commit(types.COMPANIES, req.companies);
    commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
  }
};
