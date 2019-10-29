<template>
  <b-form @submit.prevent="onSubmit" class="w-drivers-form">
    <label
      class="w-drivers-form-input-label"
      for="driver-name-input">
      Driver first name:
    </label>
    <b-form-input
      id="driver-name-input"
      size="lg"
      v-model="form.firstName"
      required
      class="w-drivers-form-input"
    ></b-form-input>

    <label
      class="w-drivers-form-input-label"
      for="driver-surname-input">
      Driver surname:
    </label>
    <b-form-input
      id="driver-surname-input"
      size="lg"
      v-model="form.surname"
      class="w-drivers-form-input"
    ></b-form-input>

    <label
      class="w-drivers-form-input-label"
      for="driver-passport-number-input">
      Driver passport number:
    </label>
    <b-form-input
      id="driver-passport-number-input"
      size="lg"
      v-model="form.passportNumber"
      required
      class="w-drivers-form-input"
    ></b-form-input>

    <label
      class="w-drivers-form-input-label"
      for="driver-licence-issuing-date-input">
      Driver licence issuing date:
    </label>
    <b-form-input
      id="driver-licence-issuing-date-input"
      size="lg"
      v-model="form.issuingDate"
      type="date"
      required
      class="w-drivers-form-input"
    ></b-form-input>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-drivers-form-button">
      {{submitButtonName}}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WDriverForm',
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
                type: String,
                default: ''
            },
            surname: {
                type: String,
                default: ''
            },
            passportNumber: {
                type: String,
                default: ''
            },
            issuingDate: {
                type: String
            }
        },
        data() {
            return {
                form: {
                    id: this.id,
                    firstName: this.firstName,
                    surname: this.surname,
                    passportNumber: this.passportNumber,
                    issuingDate: this.issuingDate
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
  @import './styles.scss';
</style>
