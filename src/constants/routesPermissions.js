import * as roles from './roles';

const routesPermissions = {
  companies: [roles.ADMIN_ROLE, roles.USER_ROLE],
  warehouses: [roles.ADMIN_ROLE, roles.USER_ROLE],
  users: [roles.ADMIN_ROLE],
  storages: [roles.ADMIN_ROLE, roles.USER_ROLE]
};

module.exports = routesPermissions;
