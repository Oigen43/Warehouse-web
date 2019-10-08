<template>
  <b-form @submit.prevent="onSubmit" class="w-senders-form">
    <b-form-input
      size="lg"
      v-model="form.senderName"
      required
      placeholder="Sender name"
      class="w-senders-form-input"
    ></b-form-input>

    <b-form-input
      size="lg"
      v-model="form.upn"
      required
      placeholder="Sender UPN"
      class="w-senders-form-input"
    ></b-form-input>

    <b-form-input
      size="lg"
      v-model="form.countryCode"
      required
      placeholder="Sender country code"
      class="w-senders-form-input"
    ></b-form-input>

    <b-form-input
      v-if="dateDisplay"
      size="lg"
      v-model="form.date"
      type="date"
      placeholder="Sender active date"
      class="w-senders-form-input"
    ></b-form-input>

    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-senders-form-button">
      {{ submitButtonName }}
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WSenderForm',
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
            senderName: {
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
            },
            date: {
                type: String
            },
            dateDisplay: {
                type: Boolean,
                default: true
            }
        },
        data: function () {
            return {
                form: {
                    id: this.id,
                    senderName: this.senderName,
                    upn: this.upn,
                    countryCode: this.countryCode,
                    date: this.date
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
