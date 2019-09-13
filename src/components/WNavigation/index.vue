<template>
  <div class='w-navigation'>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand>
        <router-link to='/'>
          <img class="logo" alt="logo" src="../../assets/logo.png">
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item>
            <router-link to='/companies'>Companies</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to='/users'>Users</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-button variant="primary" class="my-2 my-sm-0" to="/login" v-if="true">Login</b-button>
          <b-button variant="primary" class="my-2 my-sm-0" v-if="false" @click="logout">Logout</b-button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import {BNav, BNavbar, BNavbarNav, BNavbarBrand, BNavbarToggle, BNavItem, BCollapse, BButton} from 'bootstrap-vue';
    import router from '../../router';

    export default {
        name: 'WNavigation',
        components: {
            BNav,
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
                'isLoggedIn'
            ]),
            isLoggedIn() {
                return this.isLoggedIn
            }
        },
        methods: {
            ...mapActions([
                'logout'
            ]),
            redirect() {
                router.push('/login');
            },
            logout (){
                this.logout().then(() => {
                    this.redirect();
                })
            }
        }
    };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
