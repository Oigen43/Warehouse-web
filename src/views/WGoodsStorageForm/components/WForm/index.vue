<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-form">
    <label
      class="w-goods-form-input-label"
      for="goods-ttn-number">
      GCN number:
    </label>
    <b-form-input
      id="goods-ttn-number"
      size="lg"
      v-model="number"
      type="number"
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-registration-date">
      GCN registration date:
    </label>
    <b-form-input
      id="goods-ttn-registration-date"
      size="lg"
      v-model="formattedRegistrationDate"
      type="date"
      disabled
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-dispatcher">
      Dispatcher:
    </label>
    <b-form-input
      id="goods-ttn-dispatcher"
      size="lg"
      disabled
      v-model="formattedDispatcherName"
      class="w-goods-form-input"
    ></b-form-input>

    <label
      class="w-goods-form-input-label"
      for="goods-ttn-manager">
      Manager:
    </label>
    <b-form-input
      id="goods-ttn-manager"
      size="lg"
      disabled
      v-model="formattedManagerName"
      class="w-goods-form-input"
    ></b-form-input>
    <b-button
      v-if="!isReleaseAllowed"
      type="submit"
      class="w-goods-form-button"
      variant="outline-dark"
      size="lg">
      SUBMIT
    </b-button>
    <b-button
      v-if="isReleaseAllowed"
      type="submit"
      class="w-goods-form-button"
      variant="outline-dark"
      size="lg">
      RELEASE
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton } from 'bootstrap-vue';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormInput,
            BButton
        },
        props: {
            number: {
                type: Number
            },
            registrationDate: {
                type: String
            },
            dispatcher: {
                type: Object
            },
            manager: {
                type: Object
            },
            isReleaseAllowed: {
                type: Boolean
            }
        },
        computed: {
            formattedDispatcherName() {
                return `${this.dispatcher.surname} ${this.dispatcher.firstName}`;
            },
            formattedManagerName() {
                return `${this.manager.surname} ${this.manager.firstName}`;
            },
            formattedRegistrationDate() {
                return `${this.registrationDate.slice(0, 10)}`;
            }
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted');
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
