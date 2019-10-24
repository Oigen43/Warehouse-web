<template>
    <b-form @submit.prevent="onSubmit" class="w-carriers-form">
      <label
        class="w-carriers-form-input-label"
        for="carrier-name-input">
        Carrier name:
      </label>
      <b-form-input
        id="carrier-name-input"
        size="lg"
        v-model="form.name"
        required
        class="w-carriers-form-input"
      ></b-form-input>

      <label
        class="w-carriers-form-input-label"
        for="carrier-tin-input">
        Carrier TIN:
      </label>
      <b-form-input
        id="carrier-tin-input"
        size="lg"
        v-model="form.upn"
        required
        class="w-carriers-form-input"
      ></b-form-input>

      <label
        class="w-carriers-form-input-label"
        for="carrier-country-code-input">
        Carrier country code:
      </label>
      <b-form-input
        id="carrier-country-code-input"
        size="lg"
        v-model="form.countryCode"
        required
        class="w-carriers-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-carriers-form-button">
        {{submitButtonName}}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WCarrierForm',
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
