<template>
    <b-row>
      <b-col lg="3" sm="12" offset-lg="4">
        <h1 class="w-user-registration-h1">Registration Completion</h1>
        <b-form class="w-users-form">

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
                    surname: '',
                    patronymic: '',
                    address: '',
                    birthDate: '',
                    login: '',
                    password: ''
                },
            };
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
