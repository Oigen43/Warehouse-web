<template>
    <b-form @submit.prevent="onSubmit" class="w-ttn-form">
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
      <w-multiselect
        :value="form.selectedSender"
        :options="sendersList"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="senderPlaceholder"
        @input="updateSenderValue"
        class="w-ttn-form-input"
    ></w-multiselect>
      <w-multiselect
        :value="form.selectedCarrier"
        :options="carriersList"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="carrierPlaceholder"
        @input="updateCarrierValue"
        class="w-ttn-form-input"
    ></w-multiselect>
      <w-multiselect
        :value="form.selectedTransport"
        :options="transportsList"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="transportPlaceholder"
        @input="updateTransportValue"
        class="w-ttn-form-input"
    ></w-multiselect>
      <w-multiselect
        :value="form.selectedDriver"
        :options="driversList"
        :multiple="false"
        :searchable="true"
        :taggable="false"
        :placeholder="driverPlaceholder"
        @input="updateDriverValue"
        class="w-ttn-form-input"
    ></w-multiselect>
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
      <b-form-input
        size="lg"
        v-model="form.dispatcher"
        disabled
        class="w-ttn-form-input"
      ></b-form-input>
      <b-form-input
        size="lg"
        v-model="form.warehouse"
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
            selectedSender: {
                type: Object
            },
            senders: {
                type: Array,
                default: function () {
                    return ['A', 'B'];
                }
            },
            selectedCarrier: {
                type: Object
            },
            carriers: {
                type: Array,
                default: function () {
                    return ['A', 'B'];
                }
            },
            selectedTransport: {
                type: Object
            },
            transports: {
                type: Array,
                default: function () {
                    return ['A', 'B'];
                }
            },
            selectedDriver: {
                type: Object
            },
            drivers: {
                type: Array,
                default: function () {
                    return ['A', 'B'];
                }
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
                    selectedSender: this.selectedSender,
                    selectedCarrier: this.selectedCarrier,
                    selectedTransport: this.selectedTransport,
                    selectedDriver: this.selectedDriver,
                    dispatcher: this.dispatcher,
                    registrationDate: this.registrationDate,
                    description: this.description,
                    type: this.type,
                    warehouse: this.warehouse
                },

                sendersList: this.senders,
                senderPlaceholder: 'Please select a sender',
                carriersList: this.carriers,
                carrierPlaceholder: 'Please select a carrier',
                transportsList: this.transports,
                transportPlaceholder: 'Please select a transport',
                driversList: this.drivers,
                driverPlaceholder: 'Please select a driver'
            };
        },
        methods: {
            updateSenderValue(newSender) {
                  this.form.selectedSender = newSender;
            },
            updateCarrierValue(newCarrier) {
                  this.form.selectedCarrier = newCarrier;
            },
            updateTransportValue(newTransport) {
                  this.form.selectedTransport = newTransport;
            },
            updateDriverValue(newDriver) {
                  this.form.selectedDriver = newDriver;
            },
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
