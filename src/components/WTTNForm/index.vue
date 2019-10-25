<template>
    <b-form @submit.prevent="onSubmit" class="w-ttn-form">
      <label
        class="w-ttn-form-input-label"
        for="ttn-number">
        GCN number:
      </label>
      <b-form-input
        id="ttn-number"
        size="lg"
        v-model="form.number"
        type="number"
        min="1"
        required
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
        v-model="form.dischargeDate"
        type="date"
        required
        class="w-ttn-form-input"
      ></b-form-input>

      <label
        v-if="senders.length"
        class="w-ttn-form-input-label"
        for="ttn-sender">
        Sender:
      </label>
      <w-multiselect
        id="ttn-sender"
        v-if="senders.length"
        label="senderName"
        :options="senders"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="senderPlaceholder"
        v-model="form.sender"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        v-if="receivers.length"
        class="w-ttn-form-input-label"
        for="ttn-receiver">
        Receiver:
      </label>
      <w-multiselect
        id="ttn-receiver"
        v-if="receivers.length"
        label="receiverName"
        :options="receivers"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="receiverPlaceholder"
        v-model="form.receiver"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        class="w-ttn-form-input-label"
        for="ttn-carrier">
        Carrier:
      </label>
      <w-multiselect
        id="ttn-carrier"
        label="name"
        :options="carriers"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="carrierPlaceholder"
        v-model="form.carrier"
        @select="clickSelectCarrier"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        v-if="transports.length"
        class="w-ttn-form-input-label"
        for="ttn-transport">
        Transport:
      </label>
      <w-multiselect
        id="ttn-transport"
        v-if="transports.length"
        :custom-label="transportTypeWithNumber"
        :options="transports"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="transportPlaceholder"
        v-model="form.transport"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        v-if="drivers.length"
        class="w-ttn-form-input-label"
        for="ttn-driver">
        Driver:
      </label>
      <w-multiselect
        id="ttn-driver"
        v-if="drivers.length"
        :custom-label="driverNameWithPassport"
        :options="drivers"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="driverPlaceholder"
        v-model="form.driver"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        class="w-ttn-form-input-label"
        for="ttn-warehouse">
        Warehouse:
      </label>
      <w-multiselect
        id="ttn-warehouse"
        label="warehouseName"
        :options="warehouses"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="warehousePlaceholder"
        v-model="form.warehouse"
        class="w-ttn-form-input"
      ></w-multiselect>

      <label
        class="w-ttn-form-input-label"
        for="ttn-description">
        Description:
      </label>
      <b-form-textarea
        id="ttn-description"
        size="lg"
        v-model="form.description"
        rows="2"
        class="w-ttn-form-input"
      ></b-form-textarea>

      <label
        class="w-ttn-form-input-label"
        for="ttn-type">
        GCN type:
      </label>
      <b-form-input
        id="ttn-type"
        size="lg"
        v-model="form.type"
        disabled
        class="w-ttn-form-input"
      ></b-form-input>

      <label
        v-if="addForm"
        class="w-ttn-form-input-label"
        for="ttn-registration date">
        Registration date:
      </label>
      <b-form-input
        id="ttn-registration date"
        v-if="addForm"
        size="lg"
        :value="formattedRegistrationDate"
        disabled
        placeholder="Registration date"
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
        {{ submitButtonName }}
      </b-button>
    </b-form>
</template>

<script>
    import Vue from 'vue';
    import helper from './helper';
    import customToasts from '../../constants/customToasts';

    import { BForm, BFormInput, BButton, BFormTextarea, ToastPlugin } from 'bootstrap-vue';
    import WMultiselect from '../WMultiselect';

    Vue.use(ToastPlugin);

    export default {
        name: 'WTTNForm',
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
            },
            id: {
              type: Number
            },
            number: {
                type: Number
            },
            dischargeDate: {
                type: String
            },
            selectedSender: {
                type: Object
            },
            senders: {
                type: Array
            },
            selectedReceiver: {
                type: Object
            },
            receivers: {
                type: Array
            },
            selectedCarrier: {
                type: Object
            },
            carriers: {
                type: Array
            },
            selectedTransport: {
                type: Object
            },
            transports: {
                type: Array
            },
            selectedDriver: {
                type: Object
            },
            drivers: {
                type: Array,
            },
            dispatcher: {
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
            status: {
                type: String
            },
            selectedWarehouse: {
                type: Object
            },
            warehouses: {
                type: Array
            },
            submitButtonName: {
                type: String
            },
        },
        data() {
            return {
                form: {
                    id: this.id,
                    number: this.number,
                    dischargeDate: this.dischargeDate,
                    sender: this.selectedSender,
                    receiver: this.selectedReceiver,
                    carrier: this.selectedCarrier,
                    transport: this.selectedTransport,
                    driver: this.selectedDriver,
                    dispatcher: this.dispatcher,
                    registrationDate: this.registrationDate,
                    description: this.description,
                    type: this.type,
                    warehouse: this.selectedWarehouse,
                    status: this.status
                },

                senderPlaceholder: 'Please select a sender',
                receiverPlaceholder: 'Please select a receiver',
                carrierPlaceholder: 'Please select a carrier',
                transportPlaceholder: 'Please select a transport',
                driverPlaceholder: 'Please select a driver',
                warehousePlaceholder: 'Please select a warehouse'
            };
        },
        computed: {
            formattedRegistrationDate() {
                return `${this.form.registrationDate.slice(0, 10)} ${this.form.registrationDate.slice(11, 19)}`;
            },
            formattedDispatcherName() {
                return `${this.dispatcher.surname} ${this.dispatcher.firstName}`;
            }
        },
        methods: {
            onSubmit() {
                helper.checkEmptyFields(this.form) ? this.makeToast(customToasts.emptyTTNFields) : this.$emit('form-submitted', this.form);
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
            clickSelectCarrier(selectedOption) {
                this.form.driver = null;
                this.form.transport = null;
                this.$emit('carrier-selected', selectedOption.id);
            },
            driverNameWithPassport({ surname, passportNumber }) {
                return `${surname} - passport: ${passportNumber}`;
            },
            transportTypeWithNumber({ transportType, transportNumber }) {
                return `${transportType} ${transportNumber}`;
            }
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
