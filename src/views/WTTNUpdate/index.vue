<template>
  <div
      v-if="updatedTTN.number && userInfo.surname && transportNames.length">
    <h1 class="w-ttn-update-form-h1">Update TTN</h1>
    <b-row>
      <b-col v-if='sendersNames' class="w-ttn-update-form-col" lg="3" md="12" offset-lg="1" align-self="start">
          <w-form
              @form-submitted="sendData"
              @carrier-selected="getTransportsAndDrivers"
              :number="updatedTTN.number"
              :dischargeDate="updatedTTN.dischargeDate"
              :senders="sendersNames"
              :selectedSender="selectedSender()"
              :carriers="carriersNames"
              :selectedCarrier="selectedCarrier()"
              :transports="transportNames"
              :selectedTransport="selectedTransport()"
              :drivers="driversNames"
              :selectedDriver="selectedDriver()"
              :warehouses="warehousesNames"
              :selectedWarehouse="selectedWarehouse()"
              :dispatcher="userInfo"
              :description="updatedTTN.description"
              :registrationDate="updatedTTN.registrationDate"
              :type="updatedTTN.type"
              :addForm="true"
              submitButtonName="Update"
          ></w-form>
          <b-button
            variant="link"
            to="/ttn"
            class="w-ttn-go-back-link"
            >Go Back
          </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WTTNForm';
    import router from '../../router';

    export default {
        name: 'WUsersUpdateForm',
        components: {
            BRow,
            BCol,
            WForm,
            BButton
        },
        computed: {
            ...mapState([
                'updatedTTN',
                'userInfo',
                'warehousesNames',
                'sendersNames',
                'carriersNames',
                'transportNames',
                'driversNames'
            ]),
            registrationDate() {
                return this.updatedTTN.registrationDate;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            },
        },
        methods: {
            ...mapActions({
                getUpdatedTTNData: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                fetchSendersNames: 'fetchSendersNames',
                fetchCarriersNames: 'fetchCarriersNames',
                fetchTransportNames: 'fetchTransportNames',
                fetchDriversNames: 'fetchDriversNames',
                fetchWarehousesNames: 'fetchWarehousesNames',
            }),
            getTransportsAndDrivers(id) {
                this.fetchTransportNames({ carrierId: id });
                this.fetchDriversNames({ carrierId: id });
            },
            sendData(form) {
                console.log(form);
            },
            selectedSender() {
                return this.sendersNames.find(item => item.id === this.updatedTTN.senderId);
            },
            selectedCarrier() {
                return this.carriersNames.find(item => item.id === this.updatedTTN.carrierId);
            },
            selectedTransport() {
                return this.transportNames.find(item => item.id === this.updatedTTN.transportId);
            },
            selectedDriver() {
                return this.driversNames.find(item => item.id === this.updatedTTN.driverId);
            },
            selectedWarehouse() {
                return this.warehousesNames.find(item => item.id === this.updatedTTN.warehouseId);
            }
        },
        created: async function () {
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchUserInfo();
            await this.fetchWarehousesNames({ companyId: this.userInfo.companyId });
            await this.fetchSendersNames();
            await this.fetchCarriersNames();
            await this.fetchTransportNames({ carrierId: this.updatedTTN.carrierId });
            await this.fetchDriversNames({ carrierId: this.updatedTTN.carrierId });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
