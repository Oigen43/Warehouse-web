<template>
  <div v-if='carriersNames.length'>
    <h1 class="w-ttn-add-form-h1">Create TTN</h1>
    <b-row>
      <b-col class="w-ttn-add-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @form-submitted="onSubmit"
          @carrier-selected="getTransportsAndDrivers"
          :senders="sendersNames"
          :carriers="carriersNames"
          :transports="transportNames"
          :drivers="driversNames"
          :warehouses="warehousesNames"
          :dispatcher="userInfo"
          :type="type"
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
    import Vue from 'vue';
    import { BRow, BCol, BButton, ToastPlugin } from 'bootstrap-vue';
    import { mapActions, mapMutations, mapState } from 'vuex';

    import * as types from '../../store/mutation-types';
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
                type: 'incoming',
                goods: [],
            };
        },
        computed: {
            ...mapState([
                'userInfo',
                'warehousesNames',
                'sendersNames',
                'carriersNames',
                'transportNames',
                'driversNames'
            ]),
            dispatcher: function () {
                return this.userInfo.firstName;
            }
        },
        methods: {
            ...mapActions({
                fetchUserInfo: 'fetchUserInfo',
                fetchSendersNames: 'fetchSendersNames',
                fetchCarriersNames: 'fetchCarriersNames',
                fetchTransportNames: 'fetchTransportNames',
                fetchDriversNames: 'fetchDriversNames',
                fetchWarehousesNames: 'fetchWarehousesNames',
                sendNewTTN: 'createTTN'
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
            onSubmit(form) {
                helpers.isArrayEmpty(this.goods) ? this.makeToast(customToasts.emptyGoodsList) : this.sendData(form, this.goods);
            },
            async sendData(form, goods) {
                form.registrationDate = new Date();
                const res = await this.sendNewTTN({ TTN: form, goods: goods });
                !res.error && router.push('/ttn');
            },
            getTransportsAndDrivers(id) {
                this.fetchTransportNames({ carrierId: id });
                this.fetchDriversNames({ carrierId: id });
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
        },
        created: async function() {
            this.clearDrivers();
            this.clearTransport();
            await this.fetchUserInfo();
            await this.fetchWarehousesNames({ companyId: this.userInfo.companyId });
            await this.fetchSendersNames();
            await this.fetchCarriersNames();
        },
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
