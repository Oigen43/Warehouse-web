import api from '../utils/api';

export const commitWarehousesList = async({ commit }) => {
    let req = await api.fetchData();
    commit('COMPANIES', req);
};
