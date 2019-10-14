import helpers from '../utils/helpers';
import * as types from './mutation-types';
import api from '../utils/api';
import * as url from '../constants/urls';
import * as constant from '../constants';
import initialState from '../constants/initialState';

export default {
  changeToken: async ({ commit }, req) => {
    commit(types.REFRESH_TOKEN, req);
  },
  updateTokens: async ({ commit }, req) => {
    commit(types.UPDATE_TOKENS, req);
  },
  login: async ({ commit }, req) => {
    const res = await api.post(url.LOGIN_URL, req);

    if (res.data) {
      const token = res.data.token;
      const refreshToken = res.data.refreshToken;
      const roles = res.data.roles;
      localStorage.setItem(constant.TOKEN_KEY, token);
      localStorage.setItem(constant.REFRESH_TOKEN_KEY, refreshToken);
      localStorage.setItem(constant.ROLES_LIST, JSON.stringify(roles));
      commit(types.LOGIN, { token, refreshToken, roles });
    }
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  logout: async ({ commit }) => {
    localStorage.removeItem(constant.TOKEN_KEY);
    localStorage.removeItem(constant.ROLES_LIST);
    commit(types.LOGOUT, initialState);
  },
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.COMPANIES_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);

      commit(types.COMPANIES, res.data.companies);
      commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.CREATE_COMPANY, req);

    const res = await api.post(url.COMPANIES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedCompany: async ({ commit }, req) => {
    commit(types.SET_UPDATED_COMPANY, req);
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    const res = await api.put(url.COMPANIES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, companyId) => {
    const res = await api.delete(url.COMPANIES_URL, { companyId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  setCurrentCompany: async ({ commit }, req) => {
    commit(types.CURRENT_COMPANY, req);
  },

  fetchWarehousesList: async ({ commit }, req) => {
    const res = await api.get(url.WAREHOUSES_URL, {
      page: req.page,
      perPage: req.perPage,
      companyId: req.companyId
    });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.warehousesTotal, req.perPage);

      commit(types.WAREHOUSES, res.data.warehouses);
      commit(types.WAREHOUSES_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createWarehouse: async ({ commit }, req) => {
    commit(types.CREATE_WAREHOUSE, req);

    const res = await api.post(url.WAREHOUSES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedWarehouse: async ({ commit }, req) => {
    commit(types.SET_UPDATED_WAREHOUSE, req);
  },
  sendUpdatedWarehouse: async ({ commit }, req) => {
    const res = await api.put(url.WAREHOUSES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteWarehouse: async ({ commit }, req) => {
    commit(types.DELETE_WAREHOUSE, req);
  },
  sendDeletedWarehouse: async ({ commit }, warehouseId) => {
    const res = await api.delete(url.WAREHOUSES_URL, { warehouseId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  setCurrentWarehouse: async ({ commit }, req) => {
    commit(types.CURRENT_WAREHOUSE, req);
  },

  fetchUsersList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.USERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);

      commit(types.USERS, res.data.users);
      commit(types.USERS_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createUser: async ({ commit }, req) => {
    commit(types.CREATE_USER, req);

    const res = await api.post(url.USERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedUser: async ({ commit }, req) => {
    commit(types.SET_UPDATED_USER, req);
  },
  sendUpdatedUser: async ({ commit }, req) => {
    const res = await api.put(url.USERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteUser: async ({ commit }, req) => {
    commit(types.DELETE_USER, req);
  },
  sendDeletedUser: async ({ commit }, userId) => {
    const res = await api.delete(url.USERS_URL, { userId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  sendRegistrationData: async ({ commit }, form) => {
    const res = await api.post(url.CONFIRMATION_URL, { user: form });
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchStoragesList: async ({ commit }, req) => {
    const res = await api.get(url.STORAGES_URL, {
      page: req.page,
      perPage: req.perPage,
      warehouseId: req.warehouseId
    });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.storagesTotal, req.perPage);

      commit(types.STORAGES, res.data.storages);
      commit(types.STORAGES_PAGE_LIMIT, pageLimit);
      res.toast && commit(types.SET_TOAST, res.toast);
    }
  },
  fetchStorageTypes: async ({ commit }) => {
    const res = await api.get(url.STORAGE_TYPES_URL);

    if (res.data) {
      commit(types.STORAGE_TYPES, res.data.storageTypes);
      res.toast && commit(types.SET_TOAST, res.toast);
    }
  },
  createStorage: async ({ commit }, req) => {
    commit(types.CREATE_STORAGE, req);

    const res = await api.post(url.STORAGES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedStorage: async ({ commit }, req) => {
    commit(types.SET_UPDATED_STORAGE, req);
  },
  sendUpdatedStorage: async ({ commit }, req) => {
    const res = await api.put(url.STORAGES_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteStorage: async ({ commit }, req) => {
    commit(types.DELETE_STORAGE, req);
  },
  sendDeletedStorage: async ({ commit }, storageId) => {
    const res = await api.delete(url.STORAGES_URL, { storageId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchSendersList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.SENDERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.sendersTotal, perPage);
      commit(types.SENDERS, res.data.senders);
      commit(types.SENDERS_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createSender: async ({ commit }, req) => {
    commit(types.CREATE_SENDER, req);

    const res = await api.post(url.SENDERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedSender: async ({ commit }, req) => {
    commit(types.SET_UPDATED_SENDER, req);
  },
  sendUpdatedSender: async ({ commit }, req) => {
    const res = await api.put(url.SENDERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteSender: async ({ commit }, req) => {
    commit(types.DELETE_SENDER, req);
  },
  sendDeletedSender: async ({ commit }, senderId) => {
    const res = await api.delete(url.SENDERS_URL, { senderId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchReceiversList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.RECEIVERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.receiversTotal, perPage);
      commit(types.RECEIVERS, res.data.receivers);
      commit(types.RECEIVERS_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createReceiver: async ({ commit }, req) => {
    commit(types.CREATE_RECEIVER, req);

    const res = await api.post(url.RECEIVERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedReceiver: async ({ commit }, req) => {
    commit(types.SET_UPDATED_RECEIVER, req);
  },
  sendUpdatedReceiver: async ({ commit }, req) => {
    const res = await api.put(url.RECEIVERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteReceiver: async ({ commit }, req) => {
    commit(types.DELETE_RECEIVER, req);
  },
  sendDeletedReceiver: async ({ commit }, receiverId) => {
    const res = await api.delete(url.RECEIVERS_URL, { receiverId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchCarriersList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.CARRIERS_URL, { page, perPage });
    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.carriersTotal, perPage);

      commit(types.CARRIERS, res.data.carriers);
      commit(types.CARRIERS_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createCarrier: async ({ commit }, req) => {
    commit(types.CREATE_CARRIER, req);

    const res = await api.post(url.CARRIERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedCarrier: async ({ commit }, req) => {
    commit(types.SET_UPDATED_CARRIER, req);
  },
  sendUpdatedCarrier: async ({ commit }, req) => {
    const res = await api.put(url.CARRIERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteCarrier: async ({ commit }, req) => {
    commit(types.DELETE_CARRIER, req);
  },
  sendDeletedCarrier: async ({ commit }, carrierId) => {
    const res = await api.delete(url.CARRIERS_URL, { carrierId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  setCurrentCarrier: async ({ commit }, req) => {
    commit(types.CURRENT_CARRIER, req);
  },

  fetchDriversList: async ({ commit }, req) => {
    const res = await api.get(url.DRIVERS_URL, {
      page: req.page,
      perPage: req.perPage,
      carrierId: req.carrierId
    });
    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.driversTotal, req.perPage);

      commit(types.DRIVERS, res.data.drivers);
      commit(types.DRIVERS_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  sendDeletedDriver: async ({ commit }, driverId) => {
    const res = await api.delete(url.DRIVERS_URL, { driverId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },
  deleteDriver: async ({ commit }, req) => {
    commit(types.DELETE_DRIVER, req);
  },
  getUpdatedDriver: async ({ commit }, req) => {
    commit(types.SET_UPDATED_DRIVER, req);
  },
  createDriver: async ({ commit }, req) => {
    commit(types.CREATE_DRIVER, req);

    const res = await api.post(url.DRIVERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedDriver: async ({ commit }, req) => {
    const res = await api.put(url.DRIVERS_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },

  fetchTransportList: async ({ commit }, req) => {
    const res = await api.get(url.TRANSPORT_URL, {
      page: req.page,
      perPage: req.perPage,
      carrierId: req.carrierId
    });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.transportTotal, req.perPage);

      commit(types.TRANSPORT, res.data.transport);
      commit(types.TRANSPORT_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createTransport: async ({ commit }, req) => {
    commit(types.CREATE_TRANSPORT, req);

    const res = await api.post(url.TRANSPORT_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedTransport: async ({ commit }, req) => {
    commit(types.SET_UPDATED_TRANSPORT, req);
  },
  sendUpdatedTransport: async ({ commit }, req) => {
    const res = await api.put(url.TRANSPORT_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteTransport: async ({ commit }, req) => {
    commit(types.DELETE_TRANSPORT, req);
  },
  sendDeletedTransport: async ({ commit }, transportId) => {
    const res = await api.delete(url.TRANSPORT_URL, { transportId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchTTNList: async ({ commit }, page = 1, perPage = 8) => {
    const res = await api.get(url.TTN_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.TTNTotal, perPage);

      commit(types.TTN, res.data.TTN);
      commit(types.TTN_PAGE_LIMIT, pageLimit);
    }
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  getUpdatedTTN: async ({ commit }, req) => {
    commit(types.SET_UPDATED_TTN, req);
  },
  deleteTTN: async ({ commit }, req) => {
    commit(types.DELETE_TTN, req);
  },
  sendDeletedTTN: async ({ commit }, TTNId) => {
    const res = await api.delete(url.TTN_URL, { TTNId });

    res.toast && commit(types.SET_TOAST, res.toast);
  },
  takeOutTTN: async ({ commit }, req) => {
    const res = await api.put(url.TTN_URL, req);

    res.toast && commit(types.SET_TOAST, res.toast);
  }
 };
