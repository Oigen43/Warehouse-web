<template>
    <b-form @submit.prevent="onSubmit" class="w-companies-form">
      <b-form-input
        id="company-name-input"
        size="lg"
        v-model="form.companyName"
        :disabled="submitButtonName === 'UPDATE COMPANY'"
        required
        placeholder="Company name"
        class="w-companies-form-input"
      ></b-form-input>

      <b-form-input
        id="company-address-input"
        size="lg"
        v-model="form.address"
        required
        placeholder="Company address"
        class="w-companies-form-input"
      ></b-form-input>

      <b-form-input
        id="company-description-input"
        size="lg"
        v-model="form.description"
        required
        placeholder="Company description"
        class="w-companies-form-input"
      ></b-form-input>

      <b-button
        type="submit"
        variant="outline-success"
        size="lg"
        class="w-companies-form-button"
      >
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WCompanyForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            submitButtonName: {
                type: String,
            },
            companyName: {
                type: String,
                default: '',
            },
            address: {
                type: String,
                default: '',
            },
            description: {
                type: String,
                default: '',
            }
        },
        data: function () {
            return {
                form: {
                    companyName: this.companyName,
                    address: this.address,
                    description: this.description
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
