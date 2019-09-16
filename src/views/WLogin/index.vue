<template>
  <div>
    <w-navigation></w-navigation>
    <b-container>
      <b-row>
        <b-col lg="4" sm="2"></b-col>
        <b-col lg="4" sm="8">
          <h1 class="w-login-form-h1">Login</h1>
          <b-form class="w-login-form" @submit.prevent="login">
            <b-form-input
              id="user-email-input"
              size="lg"
              type="email"
              v-model="form.email"
              required
              placeholder="User email"
              class="w-login-form-input"
            ></b-form-input>

            <b-form-input
              id="user-password-input"
              size="lg"
              type="password"
              v-model="form.password"
              required
              placeholder="User password"
              class="w-login-form-input"
            ></b-form-input>

            <b-button
              type="submit"
              variant="outline-primary"
              size="lg"
              class="w-login-form-button"
            >LOGIN
            </b-button>
          </b-form>
        </b-col>
        <b-col lg="4" sm="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex';
    import {BContainer, BRow, BCol, BForm, BFormInput, BButton} from 'bootstrap-vue';
    import WNavigation from '../../components/WNavigation';
    import router from '../../router';

    export default {
        name: 'WLogin',
        components: {
            BContainer,
            BRow,
            BCol,
            WNavigation,
            BForm,
            BFormInput,
            BButton
        },
        data: function () {
            return {
                form: {
                    email: '',
                    password: ''
                }
            };
        },
        methods: {
            ...mapActions({
                loginUser: 'login'
            }),
            redirect() {
                router.push('/');
            },
            login() {
                this.loginUser(this.form);
                this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
