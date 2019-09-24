export const validation = {
    methods: {
      checkPermissions: function (roles, rolesPermissions) {
        console.log(roles, rolesPermissions);
        if (roles) { return roles.some(item => rolesPermissions.includes(item)); }
      }
    }
  };
