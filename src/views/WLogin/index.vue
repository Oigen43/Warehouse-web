<template>
  <div>
    <w-navigation></w-navigation>
    <b-container>
      <b-row>
        <b-col lg="4" sm="2"></b-col>
        <b-col lg="4" sm="8">
          <h1 class="w-login-form-h1">Login</h1>
          <b-form class="w-login-form">
            <b-form-input
              id="user-email-input"
              size="lg"
              required
              type="email"
              placeholder="User email"
              class="w-login-form-input"
            ></b-form-input>

            <b-form-input
              id="user-password-input"
              size="lg"
              type="password"
              required
              placeholder="User password"
              class="w-login-form-input"
            ></b-form-input>

            <b-button
              type="submit"
              variant="outline-primary"
              size="lg"
              class="w-login-form-button"
            >LOGIN</b-button>
          </b-form>
        </b-col>
        <b-col lg="4" sm="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
    import {BContainer, BRow, BCol, BForm, BFormInput, BButton} from 'bootstrap-vue';
    import WNavigation from '../../components/WNavigation';

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
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
