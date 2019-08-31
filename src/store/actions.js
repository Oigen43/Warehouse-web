import api from '../utils/api';
import * as mutationTypes from './mutation-types';

export const commitWarehousesList = async({ commit }) => {
    let req = await api.fetchData();
    commit(mutationTypes.COMPANIES, req);
};
