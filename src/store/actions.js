import api from '../utils/api';
import * as types from './mutation-types';

export default {
  commitWarehousesList: async({ commit }) => {
    let req = await api.fetchData();
    commit(types.COMPANIES, req);
  }
};
