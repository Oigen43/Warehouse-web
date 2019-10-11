<template>
    <b-form class="w-ttn-form">
      <b-form-input
        size="lg"
        v-model="form.number"
        required
        placeholder="Number"
        class="w-ttn-form-input"
      ></b-form-input>
      <b-form-input
        size="lg"
        v-model="form.dischargeDate"
        type="date"
        required
        placeholder="Discharge date"
        class="w-ttn-form-input"
      ></b-form-input>
      <b-form-input
        v-if="addForm"
        size="lg"
        v-model="form.registrationDate"
        type="date"
        disabled
        placeholder="Registration date"
        class="w-ttn-form-input"
      ></b-form-input>
      <b-form-textarea
        size="lg"
        v-model="form.description"
        placeholder="Description"
        rows="3"
        max-rows="8"
        no-auto-shrink
        class="w-ttn-form-input"
      ></b-form-textarea>
      <b-button
        type="submit"
        variant="outline-dark"
        size="lg"
        class="w-ttn-form-button">
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton, BFormTextarea } from 'bootstrap-vue';

    import WMultiselect from '../WMultiselect';

    export default {
        name: 'WTtnForm',
        components: {
            BForm,
            BFormInput,
            BButton,
            BFormTextarea,
            WMultiselect
        },
        props: {
            addForm: {
                type: Boolean,
                default: false
            },
            number: {
                type: String
            },
            dischargeDate: {
                type: String
            },
            sender: {
                type: String
            },
            carrier: {
                type: String
            },
            transport: {
                type: String
            },
            driver: {
                type: String
            },
            dispatcher: {
                type: String
            },
            registrationDate: {
                type: String
            },
            description: {
                type: String
            },
            type: {
                type: String
            },
            warehouse: {
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
                    dischargeDate: this.dischargeDate,
                    sender: this.sender,
                    carrier: this.carrier,
                    transport: this.transport,
                    driver: this.driver,
                    dispatcher: this.dispatcher,
                    registrationDate: this.registrationDate,
                    description: this.description,
                    type: this.type,
                    warehouse: this.warehouse
                },
            };
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
