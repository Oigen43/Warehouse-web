<template>
  <div>
  <h1 class="w-ttn-add-form-h1">Create TTN</h1>
  <b-row>
    <b-col v-if='senders' class="w-ttn-add-form-col" lg="3" md="12" offset-lg="1" align-self="start">
      <w-form
        @form-submitted="sendData"
        @carrier-selected="getTransportsAndDrivers"
        :number="number"
        :dischargeDate="dischargeDate"
        :senders="senders"
        :carriers="carriers"
        :transports="transport"
        :drivers="drivers"
        :dispatcher="userInfo.surname"
        :description="description"
        :type="type"
        :warehouses="warehouses"
        :addForm="false"
        submitButtonName="Create"
      ></w-form>
      <b-button
        variant="link"
        to="/ttn"
        class="w-ttn-go-back-link"
      >Go Back
      </b-button>
    </b-col>
    <b-col class="w-ttn-add-form-col" lg="6" md="12" offset-lg="1">
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
    import { mapActions, mapState } from 'vuex';

    import WForm from '../../components/WTTNForm';
    import WGoods from '../../components/WGoodsList';
    export default {
        name: 'WTtnAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                number: '',
                dischargeDate: '',
                description: '',
                type: 'incoming',
                goods: [],
            };
        },
        computed: {
          ...mapState([
                'userInfo',
                'senders',
                'carriers',
                'transport',
                'drivers',
                'warehouses'
            ]),
            dispatcher: function() {
              return this.userInfo.firstName;
            }
        },
        methods: {
          ...mapActions({
              fetchUserInfo: 'fetchUserInfo',
              fetchSendersList: 'fetchSendersList',
              fetchCarriersList: 'fetchCarriersList',
              fetchTransportList: 'fetchTransportList',
              fetchDriversList: 'fetchDriversList',
              fetchWarehousesList: 'fetchWarehousesList',
              sendNewStorageData: 'createStorage'
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
          sendData(form) {
              form.registrationDate = new Date().toLocaleString();
          },
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
          }
        },
        created: function() {
            this.fetchUserInfo();
            this.fetchWarehousesList({
                page: 1,
                perPage: 20,
                companyId: this.userInfo.companyId
            });
            this.fetchSendersList();
            this.fetchCarriersList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
