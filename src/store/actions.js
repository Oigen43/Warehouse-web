import api from '../utils/api';
import * as types from './mutation-types';

export default {
  commitCompaniesList: async({ commit }) => {
    let req = await api.fetchCompaniesData();
    commit(types.COMPANIES, req);
  }
};
