<template>
    <b-row>
      <b-col lg="3" sm="12" offset-lg="4">
        <h1 class="w-user-registration-h1">Registration Completion</h1>
        <b-form @submit.prevent="onSubmit" class="w-users-form">
          <b-form-input
            size="lg"
            v-model="form.surname"
            placeholder="User surname"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            v-model="form.patronymic"
            placeholder="User patronymic"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            v-model="form.address"
            placeholder="User address (city, street, house, flat)"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            v-model="form.birthDate"
            type="date"
            placeholder="User birth date"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            v-model="form.login"
            required
            placeholder="User login"
            class="w-users-form-input"
          ></b-form-input>

          <b-form-input
            size="lg"
            v-model="form.password"
            type="password"
            required
            placeholder="User password"
            class="w-users-form-input"
          ></b-form-input>

          <b-button
            type="submit"
            variant="outline-dark"
            size="lg"
            class="w-users-form-button"
          >
          Complete
          </b-button>
        </b-form>
      </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import * as types from '../../store/mutation-types';
    import router from '../../router';
    import { BRow, BCol, BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WConfirmation',
        components: {
          BRow,
          BCol,
          BForm,
          BFormInput,
          BButton
        },
        data() {
            return {
                form: {
                    surname: null,
                    patronymic: null,
                    address: null,
                    birthDate: null,
                    login: null,
                    password: null
                },
            };
        },
        methods: {
            ...mapActions({
              sendData: 'sendRegistrationData'
            }),
            ...mapMutations({
              removeToken: types.REMOVE_REGISTRATION_TOKEN
            }),
            async onSubmit() {
                await this.sendData(this.form);
                router.push('/login');
            }
        },
          beforeDestroy() {
            this.removeToken();
          }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
