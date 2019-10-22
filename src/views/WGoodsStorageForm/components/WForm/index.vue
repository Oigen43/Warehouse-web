<template>
  <b-form @submit.prevent="onSubmit" class="w-goods-form">
    <b-form-input
      size="lg"
      v-model="form.number"
      type="number"
      disabled
      placeholder="TTN Number"
      class="w-goods-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.registrationDate"
      type="date"
      disabled
      placeholder="Registration date"
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
    <b-form-input
      size="lg"
      v-model="form.date"
      type="date"
      required
      placeholder="Storage date"
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
                type: String
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
        data() {
            return {
                form: {
                    number: this.number,
                    registrationDate: this.registrationDate,
                    dispatcher: this.dispatcher,
                    manager: this.manager,
                    date: this.date
                }
            };
        },
        computed: {
            formattedDispatcherName() {
                return `${this.dispatcher.surname} ${this.dispatcher.firstName}`;
            },
            formattedManagerName() {
                return `${this.manager.surname} ${this.manager.firstName}`;
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
