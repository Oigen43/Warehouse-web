<template>
    <b-form @submit.prevent="onSubmit" class="w-carriers-form">
      <b-form-input
        id="carrier-name-input"
        size="lg"
        v-model="form.name"
        required
        placeholder="Carrier name"
        class="w-carrier-form-input"
      ></b-form-input>

      <b-form-input
        id="carrier-unp-input"
        size="lg"
        v-model="form.unp"
        required
        placeholder="Carrier unp"
        class="w-carrier-form-input"
      ></b-form-input>

      <b-form-input
        id="carrier-country-code-input"
        size="lg"
        v-model="form.countryCode"
        required
        placeholder="Carrier country code"
        class="w-carrier-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-carriers-form-button"
      >
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
            unp: {
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
                    unp: this.unp,
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
  @import 'styles';
</style>
