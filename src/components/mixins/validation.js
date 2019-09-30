import { mapState } from 'vuex';

export const validation = {
  computed: {
    ...mapState([
      'roles',
    ])
  },
  methods: {
    hasPermissions: function (permissions) {
      if (this.roles) {
        return this.roles.some(item => permissions.includes(item));
      }
      return false;
    }
  }
};
