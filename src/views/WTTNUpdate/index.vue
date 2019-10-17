<template>
  <div v-if="updatedTTN.number">
    <h1 class="w-ttn-update-form-h1">Update TTN</h1>
    <b-row>
      <b-col v-if='senders' class="w-ttn-update-form-col" lg="3" md="12" offset-lg="1" align-self="start">
          <w-form
              @form-submitted="sendData"
              @carrier-selected="getTransportsAndDrivers"
              :number="updatedTTN.number"
              :dischargeDate="updatedTTN.dischargeDate"
              :senders="senders"
              :carriers="carriers"
              :transports="transport"
              :drivers="drivers"
              :dispatcher="userInfo"
              :description="updatedTTN.description"
              :registrationDate="`${registrationDate.slice(0,10)} ${registrationDate.slice(11, 19)}`"
              :type="updatedTTN.type"
              :warehouses="warehouses"
              :addForm="true"
              submitButtonName="Create"
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
                'senders',
                'carriers',
                'transport',
                'drivers',
                'warehouses'
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
                fetchSendersList: 'fetchSendersList',
                fetchCarriersList: 'fetchCarriersList',
                fetchTransportList: 'fetchTransportList',
                fetchDriversList: 'fetchDriversList',
                fetchWarehousesList: 'fetchWarehousesList',
            }),
            getTransportsAndDrivers(id) {
              this.fetchTransportList({
                  page: 1,
                  perPage: 20,
                  carrierId: id
              });
              this.fetchDriversList({
                  page: 1,
                  perPage: 20,
                  carrierId: id
              });
          },
            sendData(form) {
                console.log(form);
            }
        },
        created: async function () {
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchWarehousesList({
                page: 1,
                perPage: 20,
                companyId: this.userInfo.companyId
            });
            await this.fetchSendersList();
            await this.fetchCarriersList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
