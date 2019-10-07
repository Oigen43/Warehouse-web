import * as roles from './roles';

export default {
  companies: [roles.ADMIN_ROLE, roles.USER_ROLE],
  warehouses: [roles.ADMIN_ROLE, roles.USER_ROLE],
  users: [roles.ADMIN_ROLE],
  storages: [roles.COMPANY_ADMIN_ROLE],
  senders: [roles.ADMIN_ROLE]
};
