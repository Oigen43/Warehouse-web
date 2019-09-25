import { mapState } from 'vuex';
import routesPermissions from '../../constants/routesPermissions';

export const validation = {
  computed: {
    ...mapState([
      'roles',
    ])
  },
  methods: {
    hasPermissions: function (route) {
      if (this.roles) {
        return this.roles.some(item => routesPermissions[route].includes(item));
      }
      return false;
    }
  }
};
