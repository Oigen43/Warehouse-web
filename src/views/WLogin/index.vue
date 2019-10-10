<template>
      <b-row>
        <b-col class="w-login-form" lg="4" sm="12" offset-lg="4">
          <h1 class="w-login-form-h1">Login</h1>
          <b-form @submit.prevent="login">
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
              variant="dark"
              size="lg"
              class="w-login-form-button"
            >LOGIN
            </b-button>
          </b-form>
        </b-col>
      </b-row>
</template>

<script>
    import { mapActions } from 'vuex';
    import { BRow, BCol, BForm, BFormInput, BButton } from 'bootstrap-vue';

    import router from '../../router';

    export default {
        name: 'WLogin',
        components: {
            BRow,
            BCol,
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
            async login() {
                const res = await this.loginUser(this.form);
                !res.error && this.redirect();
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
