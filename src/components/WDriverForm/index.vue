<template>
  <b-form @submit.prevent="onSubmit" class="w-drivers-form">
    <b-form-input
      id="driver-name-input"
      size="lg"
      v-model="form.firstName"
      required
      placeholder="Driver first name"
      class="w-driver-form-input"
    ></b-form-input>

    <b-form-input
      id="driver-surname-input"
      size="lg"
      v-model="form.surname"
      placeholder="Driver surname"
      class="w-drivers-form-input"
    ></b-form-input>

    <b-form-input
      id="driver-passport-number-input"
      size="lg"
      v-model="form.passportNumber"
      required
      placeholder="Driver passport number"
      class="w-drivers-form-input"
    ></b-form-input>

    <b-form-input
      id="driver-issuing-date-input"
      size="lg"
      v-model="form.issuingDate"
      type="date"
      required
      placeholder="Driver issuing date"
      class="w-drivers-form-input"
    ></b-form-input>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-drivers-form-button">
      <b-spinner v-if="loading" class="w-drivers-form-button-spinner"></b-spinner>
      {{submitButtonName}}
    </b-button>
  </b-form>
</template>

<script>
    import { mapState } from 'vuex';
    import { BForm, BFormInput, BSpinner, BButton } from 'bootstrap-vue';

    export default {
        name: 'WDriverForm',
        components: {
            BForm,
            BFormInput,
            BSpinner,
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
        computed: {
            ...mapState([
                'loading'
            ])
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
