<template>
    <b-form @submit.prevent="onSubmit" class="w-users-form">
      <b-form-input
        id="user-first-name-input"
        size="lg"
        v-model="form.firstName"
        :disabled="submitButtonName === 'UPDATE USER'"
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

      <b-form>
        <b-form-input
          id="user-city-input"
          size="lg"
          v-model="form.address.city"
          required
          placeholder="User city"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-street-input"
          size="lg"
          v-model="form.address.street"
          required
          placeholder="User street"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-house-input"
          size="lg"
          v-model="form.address.house"
          required
          type="number"
          placeholder="User house"
          class="w-users-form-input"
        ></b-form-input>

        <b-form-input
          id="user-flat-input"
          size="lg"
          v-model="form.address.flat"
          required
          type="number"
          placeholder="User flat"
          class="w-users-form-input"
        ></b-form-input>
      </b-form>

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
            city: {
                type: String
            },
            street: {
                type: String
            },
            house: {
                type: Number
            },
            flat: {
                type: Number
            },
            birthDate: {
                type: String
            },
            login: {
                type: String
            },
            password: {
                type: Number
            }
        },
        data() {
            return {
                form: {
                    firstName: this.firstName,
                    surname: this.surname,
                    patronymic: this.patronymic,
                    email: this.email,
                    address: {
                        city: this.city,
                        street: this.street,
                        house: this.house,
                        flat: this.flat
                    },
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
