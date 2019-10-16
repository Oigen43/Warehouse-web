<template>
  <div class='w-navigation'>
    <b-navbar justified toggleable="lg">
      <b-navbar-brand>
        <router-link to='/'>
          <img class="logo" alt="logo" src="../../assets/logo.png">
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <b-button
              variant="light"
              to='/companies'
              class="w-navigation-link"
              v-if="hasPermissions(routesPermissions.companies.read)">
              Companies
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              @click="clickedWarehousesButton"
              class="w-navigation-link"
              v-if="isWarehousesRoles">
              Warehouse
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/users'
              class="w-navigation-link"
              v-if="hasPermissions(routesPermissions.users.read)">
              Users
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/senders'
              class="w-navigation-link"
              v-if="hasPermissions(routesPermissions.senders.read)">
              Senders
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/receivers'
              class="w-navigation-link"
              v-if="hasPermissions(routesPermissions.receivers.read)">
              Receivers
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/carriers'
              class="w-navigation-link"
              v-if="hasPermissions(routesPermissions.carriers.read)">
              Carriers
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/ttn'
              class="w-navigation-link">
              TTN
            </b-button>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="!registrationToken">
          <b-button
            variant="dark"
            class="w-navigation-button my-2 my-sm-0"
            to="/login"
            v-if="!isAuthorized">
            Login
          </b-button>
          <b-button
            variant="dark"
            class="w-navigation-button my-2 my-sm-0"
            v-if="isAuthorized"
            @click="logout">
            Logout
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
    import { validation } from '../../components/mixins/validation';

    import { mapGetters, mapActions, mapState } from 'vuex';
    import {
        BNavbar,
        BNavbarNav,
        BNavbarBrand,
        BNavbarToggle,
        BNavItem,
        BCollapse,
        BButton
    } from 'bootstrap-vue';

    import router from '../../router';
    import * as userRoles from '../../constants/roles';
    import routesPermissions from '../../constants/routesPermissions';

    export default {
        name: 'WNavigation',
        mixins: [validation],
        components: {
            BNavbar,
            BNavbarNav,
            BNavbarBrand,
            BNavbarToggle,
            BNavItem,
            BCollapse,
            BButton
        },
        computed: {
            ...mapState([
              'registrationToken',
              'updatedUser',
              'userInfo'
            ]),
            ...mapGetters([
                'isAuthorized',
            ]),
            routesPermissions: function() {
              return routesPermissions;
            },
            userRoles() {
                return userRoles;
            },
            isWarehousesRoles() {
                return this.hasPermissions(userRoles.WAREHOUSE_ROLES);
            }
        },
        methods: {
            ...mapActions({
                logoutUser: 'logout',
                getCurrentUser: 'getUpdatedUser'
            }),
            redirect() {
                router.push('/login');
            },
            clickedWarehousesButton() {
                router.push(`companies/${this.userInfo.companyId}/warehouses`);
            },
            async logout() {
                await this.logoutUser();
                this.redirect();
            }
        }
    };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
