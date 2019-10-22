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
    commit(types.REQUEST);

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
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  logout: async ({ commit }) => {
    localStorage.removeItem(constant.TOKEN_KEY);
    localStorage.removeItem(constant.REFRESH_TOKEN_KEY);
    localStorage.removeItem(constant.ROLES_LIST);
    commit(types.LOGOUT, initialState);
  },
  fetchCompaniesList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.COMPANIES_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.companiesTotal, perPage);

      commit(types.COMPANIES, res.data.companies);
      commit(types.COMPANIES_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createCompany: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_COMPANY, req);

    const res = await api.post(url.COMPANIES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedCompany: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_COMPANY);
    commit(types.REQUEST);

    const res = await api.getById(url.COMPANIES_URL, id);

    commit(types.SET_UPDATED_COMPANY, res.data.companies);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedCompany: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.COMPANIES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteCompany: async ({ commit }, req) => {
    commit(types.DELETE_COMPANY, req);
  },
  sendDeletedCompany: async ({ commit }, companyId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.COMPANIES_URL, { companyId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchWarehousesList: async ({ commit }, req) => {
    commit(types.REQUEST);

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
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchWarehousesNames: async ({ commit }, req) => {
    const res = await api.get(url.WAREHOUSES_URL_NAMES, { companyId: req.companyId });

    if (res.data) {
      commit(types.WAREHOUSES_NAMES, res.data.warehouses);
    }
  },
  createWarehouse: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_WAREHOUSE, req);

    const res = await api.post(url.WAREHOUSES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedWarehouse: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_WAREHOUSE);
    commit(types.REQUEST);

    const res = await api.getById(url.WAREHOUSES_URL, id);

    commit(types.SET_UPDATED_WAREHOUSE, res.data.warehouse);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedWarehouse: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.WAREHOUSES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteWarehouse: async ({ commit }, req) => {
    commit(types.DELETE_WAREHOUSE, req);
  },
  sendDeletedWarehouse: async ({ commit }, warehouseId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.WAREHOUSES_URL, { warehouseId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchUsersList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.USERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.usersTotal, perPage);

      commit(types.USERS, res.data.users);
      commit(types.USERS_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createUser: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_USER, req);

    const res = await api.post(url.USERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedUser: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_USER);
    commit(types.REQUEST);

    const res = await api.getById(url.USERS_URL, id);

    commit(types.SET_UPDATED_USER, res.data.user);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedUser: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.USERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteUser: async ({ commit }, req) => {
    commit(types.DELETE_USER, req);
  },
  sendDeletedUser: async ({ commit }, userId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.USERS_URL, { userId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  sendRegistrationData: async ({ commit }, form) => {
    const res = await api.post(url.CONFIRMATION_URL, { user: form });

    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchStoragesList: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.get(url.STORAGES_URL, {
      page: req.page,
      perPage: req.perPage,
      warehouseId: req.warehouseId
    });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.storagesTotal, req.perPage);

      commit(types.STORAGES, res.data.storages);
      commit(types.STORAGE_CURRENT_CAPACITY, res.data.storages);
      commit(types.STORAGES_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchStorageTypes: async ({ commit }) => {
    commit(types.REQUEST);

    const res = await api.get(url.STORAGE_TYPES_URL);

    if (res.data) {
      commit(types.STORAGE_TYPES, res.data.storageTypes);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createStorage: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_STORAGE, req);

    const res = await api.post(url.STORAGES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedStorage: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_STORAGE);
    commit(types.REQUEST);

    const res = await api.getById(url.STORAGES_URL, id);

    commit(types.SET_UPDATED_STORAGE, res.data.storage);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedStorage: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.STORAGES_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteStorage: async ({ commit }, req) => {
    commit(types.DELETE_STORAGE, req);
  },
  sendDeletedStorage: async ({ commit }, storageId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.STORAGES_URL, { storageId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchSendersList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.SENDERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.sendersTotal, perPage);

      commit(types.SENDERS, res.data.senders);
      commit(types.SENDERS_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchSendersNames: async ({ commit }, req) => {
    const res = await api.get(url.SENDERS_URL_NAMES);

    if (res.data) {
      commit(types.SENDERS_NAMES, res.data.senders);
    }
  },
  createSender: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_SENDER, req);

    const res = await api.post(url.SENDERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedSender: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_SENDER);
    commit(types.REQUEST);

    const res = await api.getById(url.SENDERS_URL, id);

    commit(types.SET_UPDATED_SENDER, res.data.sender);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedSender: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.SENDERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteSender: async ({ commit }, req) => {
    commit(types.DELETE_SENDER, req);
  },
  sendDeletedSender: async ({ commit }, senderId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.SENDERS_URL, { senderId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchReceiversList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.RECEIVERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.receiversTotal, perPage);

      commit(types.RECEIVERS, res.data.receivers);
      commit(types.RECEIVERS_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createReceiver: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_RECEIVER, req);

    const res = await api.post(url.RECEIVERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedReceiver: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_RECEIVER);
    commit(types.REQUEST);

    const res = await api.getById(url.RECEIVERS_URL, id);

    commit(types.SET_UPDATED_RECEIVER, res.data.receiver);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedReceiver: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.RECEIVERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteReceiver: async ({ commit }, req) => {
    commit(types.DELETE_RECEIVER, req);
  },
  sendDeletedReceiver: async ({ commit }, receiverId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.RECEIVERS_URL, { receiverId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchCarriersList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.CARRIERS_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.carriersTotal, perPage);

      commit(types.CARRIERS, res.data.carriers);
      commit(types.CARRIERS_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchCarriersNames: async ({ commit }, req) => {
    const res = await api.get(url.CARRIERS_URL_NAMES);

    if (res.data) {
      commit(types.CARRIERS_NAMES, res.data.carriers);
    }
  },
  createCarrier: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_CARRIER, req);

    const res = await api.post(url.CARRIERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedCarrier: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_CARRIER);
    commit(types.REQUEST);

    const res = await api.getById(url.CARRIERS_URL, id);

    commit(types.SET_UPDATED_CARRIER, res.data.carrier);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedCarrier: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.CARRIERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteCarrier: async ({ commit }, req) => {
    commit(types.DELETE_CARRIER, req);
  },
  sendDeletedCarrier: async ({ commit }, carrierId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.CARRIERS_URL, { carrierId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchDriversList: async ({ commit }, req) => {
    commit(types.CLEAN_DRIVERS);
    commit(types.REQUEST);

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
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchDriversNames: async ({ commit }, req) => {
    const res = await api.get(url.DRIVERS_URL_NAMES, { carrierId: req.carrierId });

    if (res.data) {
      commit(types.DRIVERS_NAMES, res.data.drivers);
    }
  },
  sendDeletedDriver: async ({ commit }, driverId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.DRIVERS_URL, { driverId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  deleteDriver: async ({ commit }, req) => {
    commit(types.DELETE_DRIVER, req);
  },
  getUpdatedDriver: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_DRIVER);
    commit(types.REQUEST);

    const res = await api.getById(url.DRIVERS_URL, id);

    commit(types.SET_UPDATED_DRIVER, res.data.driver);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  createDriver: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_DRIVER, req);

    const res = await api.post(url.DRIVERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedDriver: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.DRIVERS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },

  fetchTransportList: async ({ commit }, req) => {
    commit(types.CLEAN_TRANSPORT);
    commit(types.REQUEST);

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
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchTransportNames: async ({ commit }, req) => {
    const res = await api.get(url.TRANSPORT_URL_NAMES, { carrierId: req.carrierId });

    if (res.data) {
      commit(types.TRANSPORT_NAMES, res.data.transport);
    }
  },
  createTransport: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_TRANSPORT, req);

    const res = await api.post(url.TRANSPORT_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedTransport: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_TRANSPORT);
    commit(types.REQUEST);

    const res = await api.getById(url.TRANSPORT_URL, id);

    commit(types.SET_UPDATED_TRANSPORT, res.data.transport);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedTransport: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.TRANSPORT_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteTransport: async ({ commit }, req) => {
    commit(types.DELETE_TRANSPORT, req);
  },
  sendDeletedTransport: async ({ commit }, transportId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.TRANSPORT_URL, { transportId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },

  fetchTTNList: async ({ commit }, page = 1, perPage = 8) => {
    commit(types.REQUEST);

    const res = await api.get(url.TTN_URL, { page, perPage });

    if (res.data) {
      const pageLimit = helpers.calculatePageLimit(res.data.TTNTotal, perPage);

      commit(types.TTN, res.data.TTN);
      commit(types.TTN_PAGE_LIMIT, pageLimit);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  createTTN: async ({ commit }, req) => {
    commit(types.REQUEST);
    commit(types.CREATE_TTN, req);

    const res = await api.post(url.TTN_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  getUpdatedTTN: async ({ commit }, id) => {
    commit(types.CLEAN_UPDATED_TTN);
    commit(types.REQUEST);

    const res = await api.getById(url.TTN_URL, id);

    commit(types.SET_UPDATED_TTN, res.data.TTN);
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  sendUpdatedTTN: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.TTN_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  },
  deleteTTN: async ({ commit }, req) => {
    commit(types.DELETE_TTN, req);
  },
  sendDeletedTTN: async ({ commit }, TTNId) => {
    commit(types.REQUEST);

    const res = await api.delete(url.TTN_URL, { TTNId });

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  takeOutTTN: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.put(url.TTN_CHANGE_STATUS_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchUserInfo: async ({ commit }, req) => {
    commit(types.REQUEST);
    const res = await api.getUserInfo(url.USER_INFO_URL, req);

    commit(types.USER_INFO, res.data);
    commit(types.SUCCESS);
  },
  fetchGoodsList: async ({ commit }, TTNId) => {
    commit(types.REQUEST);

    const res = await api.get(url.GOODS_URL, { TTNId });

    if (res.data) {
      commit(types.GOODS, res.data.goods);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  fetchGoodsItemData: async ({ commit }, id) => {
    commit(types.REQUEST);

    const res = await api.getById(url.GOODS_URL, id);

    if (res.data) {
      commit(types.GOODS_ITEM_INIT, res.data.goodsItem);
      commit(types.GOODS_ITEM_COMPUTED_VOLUME, res.data.goodsItem.volume);
    }
    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
  },
  sendGoodsStorage: async ({ commit }, req) => {
    commit(types.REQUEST);

    const res = await api.post(url.GOODS_STORAGE_URL, req);

    commit(types.SUCCESS);
    res.toast && commit(types.SET_TOAST, res.toast);
    return res;
  }
};
