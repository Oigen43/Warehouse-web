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
      disabled
      v-model="formattedDispatcherName"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      disabled
      v-model="formattedManagerName"
      class="w-goods-form-input"
    ></b-form-input>
    <b-button
      type="submit"
      class="w-goods-form-button"
      variant="outline-dark"
      size="lg">
      SUBMIT
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
