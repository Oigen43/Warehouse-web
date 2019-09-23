export const TOKEN_KEY = 'AUTH_TOKEN';
export const ROLES_LIST = 'ROLES_LIST';
export const initialState = {
  token: '',
  roles: '',

  companies: [],
  companiesPageLimit: 1,
  newCompany: {},
  updatedCompany: {},
  deletedCompany: {},
  currentCompany: null,

  warehouses: [],
  warehousesPageLimit: 1,
  newWarehouse: {},
  updatedWarehouse: {},
  deletedWarehouse: {},

  users: [],
  usersPageLimit: 1,
  newUser: {},
  updatedUser: {},
  deletedUser: {},

  toast: {}
};
