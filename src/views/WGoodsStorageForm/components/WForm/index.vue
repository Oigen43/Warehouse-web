<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-form">
    <b-form-input
      size="lg"
      v-model="number"
      type="number"
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="formattedRegistrationDate"
      type="date"
      disabled
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="formattedDispatcherName"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="formattedManagerName"
      class="w-goods-form-input"
    ></b-form-input>
  </b-form>
</template>

<script>
    import { BForm, BFormInput } from 'bootstrap-vue';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormInput
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
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
