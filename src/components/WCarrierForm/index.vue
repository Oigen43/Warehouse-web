<template>
    <b-form @submit.prevent="onSubmit" class="w-carriers-form">
      <b-form-input
        id="carrier-name-input"
        size="lg"
        v-model="form.name"
        required
        placeholder="Carrier name"
        class="w-carriers-form-input"
      ></b-form-input>

      <b-form-input
        id="carrier-upn-input"
        size="lg"
        v-model="form.upn"
        required
        placeholder="Payer's account number"
        class="w-carriers-form-input"
      ></b-form-input>

      <b-form-input
        id="carrier-country-code-input"
        size="lg"
        v-model="form.countryCode"
        required
        placeholder="Carrier country code"
        class="w-carriers-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-carriers-form-button">
        <b-spinner v-if="loading" class="w-carriers-form-button-spinner"></b-spinner>
        {{submitButtonName}}
      </b-button>
    </b-form>
</template>

<script>
    import { mapState } from 'vuex';
    import { BForm, BFormInput, BSpinner, BButton } from 'bootstrap-vue';

    export default {
        name: 'WCarrierForm',
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
            name: {
                type: String,
                default: ''
            },
            upn: {
                type: String,
                default: ''
            },
            countryCode: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                form: {
                    id: this.id,
                    name: this.name,
                    upn: this.upn,
                    countryCode: this.countryCode
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
