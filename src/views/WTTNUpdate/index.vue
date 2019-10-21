<template>
  <div
      v-if="transportNames.length">
    <h1 class="w-ttn-update-form-h1">Update TTN</h1>
    <b-row>
      <b-col v-if='sendersNames' class="w-ttn-update-form-col" lg="3" md="12" offset-lg="1" align-self="start">
          <w-form
              @form-submitted="sendData"
              @carrier-selected="getTransportsAndDrivers"
              :id="updatedTTN.id"
              :number="updatedTTN.number"
              :dischargeDate="updatedTTN.dischargeDate"
              :senders="sendersNames"
              :selectedSender="updatedTTN.Sender"
              :carriers="carriersNames"
              :selectedCarrier="updatedTTN.Carrier"
              :transports="transportNames"
              :selectedTransport="updatedTTN.Transport"
              :drivers="driversNames"
              :selectedDriver="updatedTTN.Driver"
              :warehouses="warehousesNames"
              :selectedWarehouse="updatedTTN.Warehouse"
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
      <b-col class="w-ttn-update-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          @added-good="addGood"
          @updated-good="updateGood"
          @deleted-good="deleteGood"
          :goods="goods"
        ></w-goods>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapState, mapMutations, mapActions } from 'vuex';
    import * as types from '../../store/mutation-types';
    import router from '../../router';

    import WForm from '../../components/WTTNForm';
    import WGoods from '../../components/WGoodsList';

    export default {
        name: 'WUsersUpdateForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
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
            goods() {
              return this.updatedTTN.goods.data.goods;
            }
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
                sendUpdatedTTNData: 'sendUpdatedTTN'
            }),
            ...mapMutations({
              clearDrivers: types.CLEAN_DRIVERS_NAMES,
              clearTransport: types.CLEAN_TRANSPORT_NAMES,
            }),
            addGood(good) {
                this.goods.push(good);
            },
            updateGood(good, index) {
                this.goods.splice(index, 1, good);
            },
            deleteGood(index) {
                this.goods.splice(index, 1);
            },
            async sendData(form) {
                const res = await this.sendUpdatedTTNData({ TTN: form, goods: this.goods });
                !res.error && router.push('/ttn');
            },
            getTransportsAndDrivers(id) {
                this.fetchTransportNames({ carrierId: id });
                this.fetchDriversNames({ carrierId: id });
            }
        },
        created: async function () {
            this.clearDrivers();
            this.clearTransport();
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchUserInfo();
            await this.fetchWarehousesNames({ companyId: this.userInfo.companyId });
            await this.fetchSendersNames();
            await this.fetchCarriersNames();
            await this.fetchDriversNames({ carrierId: this.updatedTTN.carrierId });
            await this.fetchTransportNames({ carrierId: this.updatedTTN.carrierId });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
