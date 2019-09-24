import { mapState } from 'vuex';

export const validation = {
  computed: {
    ...mapState([
      'roles',
    ])
  },
  methods: {
    checkPermissions: function (rolesPermissions) {
      if (this.roles) {
        return this.roles.some(item => rolesPermissions.includes(item));
        }
      return false;
      }
    }
};
