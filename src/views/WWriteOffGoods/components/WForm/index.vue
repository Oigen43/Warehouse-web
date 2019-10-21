<template>
    <b-form @submit.prevent="onSubmit" class="w-write-off-form">
      <b-form-input
        size="lg"
        v-model="form.number"
        type="number"
        min="1"
        number
        required
        placeholder="Number"
        class="w-write-off-form-input"
      ></b-form-input>
      <b-form-input
        size="lg"
        v-model="form.registrationDate"
        disabled
        placeholder="Registration date"
        class="w-write-off-form-input"
      ></b-form-input>
      <b-form-input
        size="lg"
        :value="`${controller.surname} ${controller.firstName}`"
        disabled
        class="w-write-off-form-input"
      ></b-form-input>
      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-write-off-form-button">
        CONFIRM
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
            controller: {
                type: Object
            },
            registrationDate: {
                type: String
            },
            submitButtonName: {
                type: String
            }
        },
        data() {
            return {
                form: {
                    number: null,
                    controller: this.controller,
                    registrationDate: this.registrationDate,
                    TTNId: 1
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
