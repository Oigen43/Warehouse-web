<template>
  <b-form @submit.prevent="onSubmit" class="w-ttn-check-form">
    <b-form-input
      size="lg"
      v-model="form.number"
      disabled
      placeholder="Number"
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.dischargeDate"
      type="date"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.sender"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.carrier"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="transportTypeWithNumber"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      v-if="driver"
      size="lg"
      v-model="driverNameWithPassport"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      v-model="form.warehouse"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-textarea
      size="lg"
      v-model="form.description"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-textarea>
    <b-form-input
      size="lg"
      v-model="form.type"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="formattedDispatcherName"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="formattedControllerName"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-button
      variant="outline-dark"
      size="lg"
      @click="clickedWriteOffButton"
    class="w-ttn-check-form-button">
      WRITE-OFF
    </b-button>
    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-ttn-check-form-button w-ttn-check-form-submit-button">
      CONFIRM
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BButton, BFormTextarea } from 'bootstrap-vue';

    import router from '../../../../router';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormInput,
            BButton,
            BFormTextarea
        },
        props: {
            number: {
                type: Number
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
                type: Object
            },
            driver: {
                type: Object
            },
            dispatcher: {
                type: Object
            },
            controller: {
                type: Object
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
            }
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
                    controller: this.controller,
                    registrationDate: this.registrationDate,
                    description: this.description,
                    type: this.type,
                    warehouse: this.warehouse,
                    status: 'checked'
                }
            };
        },
        computed: {
            formattedRegistrationDate() {
                return `${this.form.registrationDate.slice(0, 10)} ${this.form.registrationDate.slice(11, 19)}`;
            },
            formattedDispatcherName() {
                return `${this.dispatcher.surname} ${this.dispatcher.firstName}`;
            },
            formattedControllerName() {
                return `${this.controller.surname} ${this.controller.firstName}`;
            },
            transportTypeWithNumber() {
                return `${this.transport.transportType} ${this.transport.transportNumber}`;
            },
            driverNameWithPassport() {
                return `${this.driver.surname} - passport: ${this.driver.passportNumber}`;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            }
        },
        methods: {
            onSubmit() {
                this.$emit('form-submitted');
            },
            clickedWriteOffButton() {
                router.push(`/ttn/${this.TTNId}/write-off`);
            },
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
