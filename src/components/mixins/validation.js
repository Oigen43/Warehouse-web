export const validation = {
    methods: {
      checkPermissions: function (roles, rolesPermissions) {
        if (roles) { console.log(roles.some(item => rolesPermissions.includes(item))); }
      }
    }
  };
