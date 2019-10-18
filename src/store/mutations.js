import * as types from './mutation-types';

export default {
  [types.LOGIN](state, data) {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
    state.roles = data.roles;
  },
  [types.LOGOUT](state, initialState) {
    Object.keys(initialState).forEach(key => {
      state[key] = initialState[key];
    });
  },
  [types.SET_REGISTRATION_TOKEN](state, token) {
    state.registrationToken = token;
  },
  [types.REMOVE_REGISTRATION_TOKEN](state) {
    state.registrationToken = null;
  },

  [types.REFRESH_TOKEN](state, refreshToken) {
    state.token = refreshToken;
  },
  [types.UPDATE_TOKENS](state, data) {
    state.token = data.token;
    state.refreshToken = data.refreshToken;
  },

  [types.COMPANIES](state, companies) {
    state.companies = companies;
  },
  [types.COMPANIES_PAGE_LIMIT](state, companiesPageLimit) {
    state.companiesPageLimit = companiesPageLimit;
  },
  [types.CREATE_COMPANY](state, company) {
    state.newCompany = company;
  },
  [types.SET_UPDATED_COMPANY](state, company) {
    state.updatedCompany = company;
  },
  [types.UPDATE_COMPANY](state, company) {
    state.updatedCompany = company;
    state.companies = state.companies.map(item => item.id === company.id ? company : item);
  },
  [types.DELETE_COMPANY](state, company) {
    state.deletedCompany = company;
    state.companies = state.companies.filter(item => item.id !== company.id);
  },
  [types.CLEAN_UPDATED_COMPANY](state) {
    state.updatedCompany = {};
  },

  [types.WAREHOUSES](state, warehouses) {
    state.warehouses = warehouses;
  },
  [types.WAREHOUSES_PAGE_LIMIT](state, warehousesPageLimit) {
    state.warehousesPageLimit = warehousesPageLimit;
  },
  [types.CREATE_WAREHOUSE](state, warehouse) {
    state.newWarehouse = warehouse;
  },
  [types.SET_UPDATED_WAREHOUSE](state, warehouse) {
    state.updatedWarehouse = warehouse;
  },
  [types.UPDATE_WAREHOUSE](state, warehouse) {
    state.updatedWarehouse = warehouse;
    state.warehouses = state.warehouses.map(item => item.id === warehouse.id ? warehouse : item);
  },
  [types.DELETE_WAREHOUSE](state, warehouse) {
    state.deletedWarehouse = warehouse;
    state.warehouses = state.warehouses.filter(item => item.id !== warehouse.id);
  },
  [types.CLEAN_UPDATED_WAREHOUSE](state) {
    state.updatedWarehouse = {};
  },

  [types.USERS](state, users) {
    state.users = users;
  },
  [types.USERS_PAGE_LIMIT](state, usersPageLimit) {
    state.usersPageLimit = usersPageLimit;
  },
  [types.CREATE_USER](state, user) {
    state.newUser = user;
  },
  [types.SET_UPDATED_USER](state, user) {
    state.updatedUser = user;
  },
  [types.UPDATE_USER](state, user) {
    state.updatedUser = user;
    state.users = state.users.map(item => item.id === user.id ? user : item);
  },
  [types.CLEAN_UPDATED_USER](state) {
    state.updatedUser = {};
  },
  [types.DELETE_USER](state, user) {
    state.deletedUser = user;
    state.users = state.users.filter(item => item.id !== user.id);
  },

  [types.CARRIERS](state, carriers) {
    state.carriers = carriers;
  },
  [types.CARRIERS_PAGE_LIMIT](state, carriersPageLimit) {
    state.carriersPageLimit = carriersPageLimit;
  },
  [types.CREATE_CARRIER](state, carrier) {
    state.newCarrier = carrier;
  },
  [types.SET_UPDATED_CARRIER](state, carrier) {
    state.updatedCarrier = carrier;
  },
  [types.UPDATE_CARRIER](state, carrier) {
    state.updatedCarrier = carrier;
    state.carriers = state.carriers.map(item => item.id === carrier.id ? carrier : item);
  },
  [types.DELETE_CARRIER](state, carrier) {
    state.deletedCarrier = carrier;
    state.carriers = state.carriers.filter(item => item.id !== carrier.id);
  },
  [types.CLEAN_UPDATED_CARRIER](state) {
    state.updatedCarrier = {};
  },

  [types.DRIVERS](state, drivers) {
    state.drivers = drivers;
  },
  [types.DRIVERS_PAGE_LIMIT](state, driversPageLimit) {
    state.driversPageLimit = driversPageLimit;
  },
  [types.CREATE_DRIVER](state, driver) {
    state.newDriver = driver;
  },
  [types.SET_UPDATED_DRIVER](state, driver) {
    state.updatedDriver = driver;
  },
  [types.UPDATE_DRIVER](state, driver) {
    state.updatedDriver = driver;
    state.drivers = state.drivers.map(item => item.id === driver.id ? driver : item);
  },
  [types.DELETE_DRIVER](state, driver) {
    state.deletedDriver = driver;
    state.drivers = state.drivers.filter(item => item.id !== driver.id);
  },
  [types.CLEAN_UPDATED_DRIVER](state) {
    state.updatedDriver = {};
  },

  [types.STORAGES](state, storages) {
    state.storages = storages;
  },
  [types.STORAGES_PAGE_LIMIT](state, storagesPageLimit) {
    state.storagesPageLimit = storagesPageLimit;
  },
  [types.CREATE_STORAGE](state, storage) {
    state.newStorage = storage;
  },
  [types.SET_UPDATED_STORAGE](state, storage) {
    state.updatedStorage = storage;
  },
  [types.UPDATE_STORAGE](state, storage) {
    state.updatedStorage = storage;
    state.storages = [ ...state.storages.map(item => item.id === storage.id ? storage : item) ];
  },
  [types.DELETE_STORAGE](state, storage) {
    state.deletedStorage = storage;
    state.storages = state.storages.filter(item => item.id !== storage.id);
  },
  [types.STORAGE_TYPES](state, storageTypes) {
    state.storageTypes = storageTypes;
  },
  [types.CLEAN_UPDATED_STORAGE](state) {
    state.updatedStorage = {};
  },

  [types.SENDERS](state, senders) {
    state.senders = senders;
  },
  [types.SENDERS_PAGE_LIMIT](state, sendersPageLimit) {
    state.sendersPageLimit = sendersPageLimit;
  },
  [types.CREATE_SENDER](state, sender) {
    state.newSender = sender;
  },
  [types.SET_UPDATED_SENDER](state, sender) {
    state.updatedSender = sender;
  },
  [types.UPDATE_SENDER](state, sender) {
    state.updatedSender = sender;
    state.senders = [ ...state.senders.map(item => item.id === sender.id ? sender : item) ];
  },
  [types.DELETE_SENDER](state, sender) {
    state.deletedSender = sender;
    state.senders = state.senders.filter(item => item.id !== sender.id);
  },
  [types.CLEAN_UPDATED_SENDER](state) {
    state.updatedSender = {};
  },

  [types.RECEIVERS](state, receivers) {
    state.receivers = receivers;
  },
  [types.RECEIVERS_PAGE_LIMIT](state, receiversPageLimit) {
    state.receiversPageLimit = receiversPageLimit;
  },
  [types.CREATE_RECEIVER](state, receiver) {
    state.newReceiver = receiver;
  },
  [types.SET_UPDATED_RECEIVER](state, receiver) {
    state.updatedReceiver = receiver;
  },
  [types.UPDATE_RECEIVER](state, receiver) {
    state.updatedReceiver = receiver;
    state.receivers = [ ...state.receivers.map(item => item.id === receiver.id ? receiver : item) ];
  },
  [types.DELETE_RECEIVER](state, receiver) {
    state.deletedReceiver = receiver;
    state.receivers = state.receivers.filter(item => item.id !== receiver.id);
  },
  [types.CLEAN_UPDATED_RECEIVER](state) {
    state.updatedReceiver = {};
  },

  [types.TRANSPORT](state, transport) {
    state.transport = transport;
  },
  [types.TRANSPORT_PAGE_LIMIT](state, transportPageLimit) {
    state.transportPageLimit = transportPageLimit;
  },
  [types.CREATE_TRANSPORT](state, transport) {
    state.newTransport = transport;
  },
  [types.SET_UPDATED_TRANSPORT](state, transport) {
    state.updatedTransport = transport;
  },
  [types.UPDATE_TRANSPORT](state, transport) {
    state.updatedTransport = transport;
    state.transport = [ ...state.transport.map(item => item.id === transport.id ? transport : item) ];
  },
  [types.DELETE_TRANSPORT](state, transport) {
    state.deletedTransport = transport;
    state.transport = state.transport.filter(item => item.id !== transport.id);
  },
  [types.CLEAN_UPDATED_TRANSPORT](state) {
    state.updatedTransport = {};
  },

  [types.TTN](state, TTN) {
    state.TTN = TTN;
  },
  [types.TTN_PAGE_LIMIT](state, TTNPageLimit) {
    state.TTNPageLimit = TTNPageLimit;
  },
  [types.SET_UPDATED_TTN](state, TTN) {
    state.updatedTTN = TTN;
  },
  [types.DELETE_TTN](state, TTN) {
    state.deletedTTN = TTN;
    state.TTN = state.TTN.filter(item => item.id !== TTN.id);
  },
  [types.CLEAN_UPDATED_TTN](state) {
    state.updatedTTN = {};
  },

  [types.GOODS](state, goods) {
    state.goods = goods;
  },
  [types.GOODS_ITEM_INIT](state, goodsItem) {
    state.goodsItemInit = goodsItem;
  },
  [types.GOODS_ITEM_COMPUTED_SIZE](state, goodsItemSize) {
    state.goodsItemComputedSize = goodsItemSize;
  },

  [types.STORAGE_CURRENT_CAPACITY](state, storages) {
    state.storagesComputedCapacity = storages;
  },
  [types.SET_STORAGE_CURRENT_CAPACITY](state, storage) {
    state.storagesComputedCapacity = [ ...state.storagesComputedCapacity.map(item => item.id === storage.id ? Object.assign({}, item, { currentCapacity: storage.capacity }) : item) ];
  },

  [types.SET_TOAST](state, toast) {
    state.toast = toast;
  },

  [types.REQUEST](state) {
    state.loading = true;
  },
  [types.SUCCESS](state) {
    state.loading = false;
  }
};
