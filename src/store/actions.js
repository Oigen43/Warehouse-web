import api from '../utils/api';
import * as types from './mutation-types';

export default {
  commitWarehousesList: async({ commit }, page) => {
    let req = await api.fetchData(page);
    commit(types.COMPANIES, req.companies);
    commit(types.PAGE_LIMIT, req.pageLimit);
  }
};
