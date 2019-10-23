<template>
  <b-form @submit.prevent="onSubmit" class="w-ttn-check-form">
    <b-form-input
      size="lg"
      :value="number"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="dischargeDate"
      type="date"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      v-if="sender"
      size="lg"
      :value="senderName"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      v-if="receiver"
      size="lg"
      :value="receiverName"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="carrier"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="transportTypeWithNumber"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      v-if="driver"
      size="lg"
      :value="driverNameWithPassport"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-input
      size="lg"
      :value="warehouse"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-input>
    <b-form-textarea
      size="lg"
      :value="description"
      disabled
      class="w-ttn-check-form-input"
    ></b-form-textarea>
    <b-form-input
      size="lg"
      :value="type"
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
                type: Object
            },
            receiver: {
                type: Object
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
            senderName() {
                return this.sender.senderName;
            },
            receiverName() {
                return this.receiver.receiverName;
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
