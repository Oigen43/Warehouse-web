<template>
  <div v-if='carriersNames.length'>
    <h1 class="w-ttn-add-form-h1">Create Goods Consignment Note</h1>
    <b-row>
      <b-col class="w-ttn-add-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @form-submitted="onSubmit"
          @carrier-selected="getTransportsAndDrivers"
          :id="id"
          :senders="sendersNames"
          :receivers="receiversNames"
          :carriers="carriersNames"
          :transports="transportNames"
          :drivers="driversNames"
          :warehouses="warehousesNames"
          :dispatcher="userInfo"
          :type="type"
          :status="status"
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
          :type="type"
        ></w-goods>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { BRow, BCol, BButton, ToastPlugin } from 'bootstrap-vue';
    import { mapActions, mapMutations, mapState } from 'vuex';

    import * as types from '../../store/mutation-types';
    import TTNTypes from '../../constants/TTNtypes';
    import * as statusesTTN from '../../constants/statuses';
    import router from '../../router';
    import customToasts from '../../constants/customToasts';
    import helpers from '../../utils/helpers';
    import WForm from '../../components/WTTNForm';
    import WGoods from '../../components/WGoodsList';

    Vue.use(ToastPlugin);

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
                id: null,
                type: null,
                status: null,
                goods: [],
            };
        },
        computed: {
            ...mapState([
                'updatedTTN',
                'userInfo',
                'warehousesNames',
                'sendersNames',
                'receiversNames',
                'carriersNames',
                'transportNames',
                'driversNames'
            ]),
            TTNId() {
                return +this.$route.params.TTNId;
            },
            dispatcher: function () {
                return this.userInfo.firstName;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTTNData: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                fetchSendersNames: 'fetchSendersNames',
                fetchReceiversNames: 'fetchReceiversNames',
                fetchCarriersNames: 'fetchCarriersNames',
                fetchTransportNames: 'fetchTransportNames',
                fetchDriversNames: 'fetchDriversNames',
                fetchWarehousesNames: 'fetchWarehousesNames',
                sendNewTTN: 'createTTN'
            }),
            ...mapMutations({
                clearDrivers: types.CLEAN_DRIVERS_NAMES,
                clearTransport: types.CLEAN_TRANSPORT_NAMES,
                clearSenders: types.CLEAN_SENDERS_NAMES,
                clearReceivers: types.CLEAN_RECEIVERS_NAMES,
            }),
            async checkTypeAndStatus() {
                if (!this.TTNId) {
                    this.type = TTNTypes.INCOMING_TYPE;
                    this.status = statusesTTN.REGISTERED_STATUS;
                } else {
                    this.id = this.TTNId;
                    this.type = TTNTypes.OUTCOMING_TYPE;
                    this.status = statusesTTN.RELEASE_ALLOWED_STATUS;
                    await this.getUpdatedTTNData(this.id);
                    this.goods = this.updatedTTN.goods.data.goods;
                }
            },
            addGood(good) {
                this.goods.push(good);
            },
            updateGood(good, index) {
                this.goods.splice(index, 1, good);
            },
            deleteGood(index) {
                this.goods.splice(index, 1);
            },
            getTransportsAndDrivers(id) {
                this.fetchTransportNames({ carrierId: id });
                this.fetchDriversNames({ carrierId: id });
            },
            onSubmit(form) {
                helpers.isArrayEmpty(this.goods) ? this.makeToast(customToasts.emptyGoodsList) : this.sendData(form, this.goods);
            },
            async sendData(form, goods) {
                form.registrationDate = new Date();
                const TTN = {
                    id: form.id,
                    status: statusesTTN.ARCHIVED_STATUS
                };

                const res = form.type === TTNTypes.INCOMING_TYPE ? await this.sendNewTTN({ newTTN: form, goods: goods }) : await this.sendNewTTN({ newTTN: form, TTN, goods: goods });

                !res.error && router.push('/ttn');
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
        },
        created: async function () {
            this.checkTypeAndStatus();
            this.clearSenders();
            this.clearReceivers();
            this.clearDrivers();
            this.clearTransport();
            await this.fetchUserInfo();
            await this.fetchWarehousesNames({ companyId: this.userInfo.companyId });
            this.type === 'incoming' ? await this.fetchSendersNames() : await this.fetchReceiversNames();
            await this.fetchCarriersNames();
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
