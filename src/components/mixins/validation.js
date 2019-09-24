export const validation = {
  methods: {
    checkPermissions: function (rolesString, rolesPermissions) {
      if (rolesString) {
        const roles = rolesString.split(',');
        return roles.some(item => rolesPermissions.includes(item));
        }
      return false;
      }
    }
};
