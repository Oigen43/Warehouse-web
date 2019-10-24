<template>
  <b-form @submit.prevent="onSubmit" class="w-receivers-form">
    <label
      class="w-receivers-form-input-label"
      for="receiver-name-input">
      Receiver name:
    </label>
    <b-form-input
      id="receiver-name-input"
      size="lg"
      v-model="form.receiverName"
      required
      class="w-receivers-form-input"
    ></b-form-input>

    <label
      class="w-receivers-form-input-label"
      for="receiver-tin-input">
      Receiver TIN:
    </label>
    <b-form-input
      id="receiver-tin-input"
      size="lg"
      v-model="form.upn"
      required
      class="w-receivers-form-input"
    ></b-form-input>

    <label
      class="w-receivers-form-input-label"
      for="receiver-country-code-input">
      Receiver country code:
    </label>
    <b-form-input
      id="receiver-country-code-input"
      size="lg"
      v-model="form.countryCode"
      required
      class="w-receivers-form-input"
    ></b-form-input>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-receivers-form-button">
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WReceiverForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            submitButtonName: {
                type: String,
            },
            id: {
                type: Number
            },
            receiverName: {
                type: String,
                default: '',
            },
            upn: {
                type: String,
                default: '',
            },
            countryCode: {
                type: String,
                default: '',
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    receiverName: this.receiverName,
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
