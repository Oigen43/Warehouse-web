<template>
  <div class='w-navigation'>
    <b-navbar justified toggleable="lg" type="light" variant="light">
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
              v-if="hasPermissions('companies')"
            >
              Companies
            </b-button>
          </b-nav-item>
          <b-nav-item>
            <b-button
              variant="light"
              to='/users'
              class="w-navigation-link"
              v-if="hasPermissions('users')"
            >
              Users
            </b-button>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-button
            variant="dark"
            class="w-navigation-button my-2 my-sm-0"
            to="/login"
            v-if="!isAuthorized"
          >
            Login
          </b-button>
          <b-button
            variant="dark"
            class="w-navigation-button my-2 my-sm-0"
            v-if="isAuthorized"
            @click="logout"
          >
            Logout
          </b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
    import { validation } from '../../components/mixins/validation';

    import { mapGetters, mapActions } from 'vuex';
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
            ...mapGetters([
                'isAuthorized',
            ])
        },
        methods: {
            ...mapActions({
                logoutUser: 'logout'
            }),
            redirect() {
                router.push('/login');
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
