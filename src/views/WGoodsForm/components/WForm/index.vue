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
      v-model="form.warehouseManager"
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
            warehouseManager: {
                type: String
            },
            date: {
                type: String
            },
            submitButtonName: {
                type: String
            },
        },
        data() {
            return {
                form: {
                    number: this.number,
                    registrationDate: this.registrationDate,
                    warehouseManager: this.warehouseManager,
                    date: this.date
                }
            };
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
