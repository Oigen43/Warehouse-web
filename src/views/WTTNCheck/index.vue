<template>
  <div v-if="updatedTTN.id" class="w-ttn-check-form-page">
    <h1 class="w-ttn-check-form-h1">Check Goods Consignment Note</h1>
    <b-row>
      <b-col class="w-ttn-check-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @form-submitted="onSubmit"
          :number="updatedTTN.number"
          :dischargeDate="updatedTTN.dischargeDate"
          :sender="updatedTTN.Sender"
          :receiver="updatedTTN.Receiver"
          :carrier="updatedTTN.Carrier.name"
          :transport="updatedTTN.Transport"
          :driver="updatedTTN.Driver"
          :warehouse="updatedTTN.Warehouse.warehouseName"
          :dispatcher="updatedTTN.User"
          :controller="userInfo"
          :description="updatedTTN.description"
          :registrationDate="updatedTTN.registrationDate"
          :type="updatedTTN.type"
        ></w-form>
        <b-button
          variant="link"
          to="/gcn"
          class="w-ttn-check-go-back-link"
        >Go Back
        </b-button>
      </b-col>
      <b-col class="w-ttn-check-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          :goods="goods"
        ></w-goods>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';

    import * as statusesTTN from '../../constants/statuses';
    import router from '../../router';
    import TTNTypes from '../../constants/TTNtypes';
    import WForm from './components/WForm';
    import WGoods from './components/WGoods';

    export default {
        name: 'WTTNCheckForm',
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
                'userInfo'
            ]),
            TTNId() {
                return +this.$route.params.TTNId;
            },
            goods() {
                return this.updatedTTN.Goods;
            },
            isReleaseAllowed() {
                return this.updatedTTN.type === TTNTypes.OUTCOMING_TYPE;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTTNData: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                sendUpdatedTTNData: 'sendUpdatedTTN'
            }),
            async onSubmit() {
                const res = this.isReleaseAllowed ? await this.verifyTTN() : await this.confirmTTN();

                !res.error && this.redirect();
            },
            verifyTTN() {
                const TTN = {
                    id: this.TTNId,
                    status: statusesTTN.VERIFICATION_COMPLETED_STATUS
                };

                return this.sendUpdatedTTNData({ TTN });
            },
            confirmTTN() {
                const TTN = {
                    id: this.TTNId,
                    status: statusesTTN.CONFIRMED_STATUS
                };

                return this.sendUpdatedTTNData({ TTN });
            },
            redirect() {
                router.push('/gcn');
            }
        },
        created: async function () {
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchUserInfo();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
