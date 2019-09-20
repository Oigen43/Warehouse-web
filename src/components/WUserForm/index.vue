<template>
    <b-form @submit.prevent="onSubmit" class="w-users-form">
      <b-form-input
        id="user-first-name-input"
        size="lg"
        v-model="form.firstName"
        placeholder="User first name"
        class="w-users-form-input"
      ></b-form-input>

      <b-form-input
        id="user-surname-input"
        size="lg"
        v-model="form.surname"
        required
        placeholder="User surname"
        class="w-users-form-input"
      ></b-form-input>

      <b-form-input
        id="user-patronymic-input"
        size="lg"
        v-model="form.patronymic"
        required
        placeholder="User patronymic"
        class="w-users-form-input"
      ></b-form-input>

      <b-form-input
        id="user-email-input"
        size="lg"
        v-model="form.email"
        required
        type="email"
        placeholder="User email"
        class="w-users-form-input"
      ></b-form-input>

        <b-form-input
          id="user-city-input"
          size="lg"
          v-model="form.address"
          required
          placeholder="User address (city, street, house, flat)"
          class="w-users-form-input"
        ></b-form-input>

      <b-form-input
        id="user-birth-input"
        size="lg"
        v-model="form.birthDate"
        type="date"
        required
        placeholder="User birth date"
        class="w-users-form-input"
      ></b-form-input>

      <b-form-input
        id="user-login-input"
        size="lg"
        v-model="form.login"
        required
        placeholder="User login"
        class="w-users-form-input"
      ></b-form-input>

      <b-form-input
        id="user-password-input"
        size="lg"
        v-model="form.password"
        type="password"
        required
        placeholder="User password"
        class="w-users-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-success"
        size="lg"
        class="w-users-form-button"
      >
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WUserForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            submitButtonName: {
                type: String
            },
            id: {
                type: Number
            },
            firstName: {
                type: String
            },
            surname: {
                type: String
            },
            patronymic: {
                type: String
            },
            email: {
                type: String
            },
            address: {
                type: String
            },
            birthDate: {
                type: String
            },
            login: {
                type: String
            },
            password: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {
                    id: this.id,
                    firstName: this.firstName,
                    surname: this.surname,
                    patronymic: this.patronymic,
                    email: this.email,
                    address: this.address,
                    birthDate: this.birthDate,
                    login: this.login,
                    password: this.password
                }
            };
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted', this.form);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
