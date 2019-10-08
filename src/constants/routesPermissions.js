import * as roles from './roles';

export default {
  companies: {
    create: [roles.SYSTEM_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
    update: [roles.COMPANY_ADMIN_ROLE],
    delete: [roles.SYSTEM_ADMIN_ROLE]
  },
  warehouses: {
    create: [roles.COMPANY_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
    update: [roles.COMPANY_ADMIN_ROLE],
    delete: [roles.COMPANY_ADMIN_ROLE]
  },
  storages: {
    create: [roles.COMPANY_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE, roles.COMPANY_ADMIN_ROLE],
    update: [roles.COMPANY_ADMIN_ROLE],
    delete: [roles.COMPANY_ADMIN_ROLE]
  },
  senders: {
    create: [roles.SYSTEM_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE],
    update: [roles.SYSTEM_ADMIN_ROLE],
    delete: [roles.SYSTEM_ADMIN_ROLE]
  },
  carriers: {
    create: [roles.SYSTEM_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE],
    update: [roles.SYSTEM_ADMIN_ROLE],
    delete: [roles.SYSTEM_ADMIN_ROLE]
  },
  drivers: {
    create: [roles.SYSTEM_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE],
    update: [roles.SYSTEM_ADMIN_ROLE],
    delete: [roles.SYSTEM_ADMIN_ROLE]
  },
  users: {
    create: [roles.SYSTEM_ADMIN_ROLE],
    read: [roles.SYSTEM_ADMIN_ROLE],
    update: [roles.SYSTEM_ADMIN_ROLE],
    delete: [roles.SYSTEM_ADMIN_ROLE]
  },
};
