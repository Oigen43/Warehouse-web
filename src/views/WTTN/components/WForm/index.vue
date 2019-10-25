<template>
  <b-form class="w-ttn-form">
    <label
      class="w-ttn-form-input-label"
      for="ttn-number">
      GCN number:
    </label>
    <b-form-input
      id="ttn-number"
      size="lg"
      :value="number"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      class="w-ttn-form-input-label"
      for="ttn-discharge-date">
      Discharge date:
    </label>
    <b-form-input
      id="ttn-discharge-date"
      size="lg"
      :value="dischargeDate"
      type="date"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      v-if="sender"
      class="w-ttn-form-input-label"
      for="ttn-sender">
      Sender:
    </label>
    <b-form-input
      id="ttn-sender"
      v-if="sender"
      size="lg"
      :value="senderName"
      disabled
      class="w-check-form-input"
    ></b-form-input>

    <label
      v-if="receiverName"
      class="w-ttn-form-input-label"
      for="ttn-receiver">
      Receiver:
    </label>
    <b-form-input
      id="ttn-receiver"
      v-if="receiver"
      size="lg"
      :value="receiverName"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      v-if="carrier"
      class="w-ttn-form-input-label"
      for="ttn-carrier">
      Carrier:
    </label>
    <b-form-input
      id="ttn-carrier"
      size="lg"
      :value="carrierName"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      class="w-ttn-form-input-label"
      for="ttn-transport">
      Transport:
    </label>
    <b-form-input
      id="ttn-transport"
      size="lg"
      :value="transportTypeWithNumber"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      v-if="driver"
      class="w-ttn-form-input-label"
      for="ttn-driver">
      Driver:
    </label>
    <b-form-input
      id="ttn-driver"
      v-if="driver"
      size="lg"
      :value="driverNameWithPassport"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      class="w-ttn-form-input-label"
      for="ttn-warehouse">
      Warehouse:
    </label>
    <b-form-input
      id="ttn-warehouse"
      size="lg"
      :value="warehouseName"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      class="w-ttn-form-input-label"
      for="ttn-description">
      Description:
    </label>
    <b-form-textarea
      id="ttn-description"
      size="lg"
      :value="description"
      disabled
      class="w-ttn-form-input"
    ></b-form-textarea>

    <label
      class="w-ttn-form-input-label"
      for="ttn-ttn-type">
      GCN type:
    </label>
    <b-form-input
      id="ttn-ttn-type"
      size="lg"
      :value="type"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>

    <label
      class="w-ttn-form-input-label"
      for="ttn-dispatcher">
      Dispatcher:
    </label>
    <b-form-input
      id="ttn-dispatcher"
      size="lg"
      :value="formattedDispatcherName"
      disabled
      class="w-ttn-form-input"
    ></b-form-input>
    <b-button
      type="submit"
      variant="outline-dark"
      size="lg"
      class="w-ttn-form-button">
      DOWNLOAD
    </b-button>
  </b-form>
</template>

<script>
    import { BForm, BFormInput, BFormTextarea, BButton } from 'bootstrap-vue';

    export default {
        name: 'WForm',
        components: {
            BForm,
            BFormInput,
            BFormTextarea,
            BButton
        },
        props: {
            id: {
                type: Number
            },
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
                type: Object
            },
            transport: {
                type: Object
            },
            driver: {
                type: Object,
            },
            dispatcher: {
                type: Object
            },
            description: {
                type: String
            },
            type: {
                type: String
            },
            status: {
                type: String
            },
            warehouse: {
                type: Object
            }
        },
        computed: {
            formattedRegistrationDate() {
                return `${this.form.registrationDate.slice(0, 10)} ${this.form.registrationDate.slice(11, 19)}`;
            },
            formattedDispatcherName() {
                return `${this.dispatcher.surname} ${this.dispatcher.firstName}`;
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
            warehouseName() {
                return this.warehouse.warehouseName;
            },
            carrierName() {
                return this.carrier.name;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
