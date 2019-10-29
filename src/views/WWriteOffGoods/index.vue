<template>
  <div v-if='userInfo.id'>
    <h1 class="w-write-off-form-h1">Write-off of Goods Form</h1>
    <b-row>
      <b-col class="w-write-off-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @form-submitted="onSubmit"
          :TTNId="TTNId"
          :controller="userInfo"
        ></w-form>
        <b-button
          variant="link"
          :to="toGCNCheckLink"
          class="w-write-off-form-go-back-link"
        >Go Back
        </b-button>
      </b-col>
      <b-col v-if="goods.length" class="w-write-off-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          @write-off-good="writeOffGood"
          :goods="goods"
        ></w-goods>
      </b-col>
    </b-row>
  </div>
</template>

<script>
    import Vue from 'vue';
    import { BRow, BCol, BButton, ToastPlugin } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';

    import router from '../../router';
    import TTNTypes from '../../constants/TTNtypes';
    import * as statusesTTN from '../../constants/statuses';
    import customToasts from '../../constants/customToasts';
    import helpers from '../../utils/helpers';
    import WForm from './components/WForm';
    import WGoods from './components/WGoods';

    Vue.use(ToastPlugin);

    export default {
        name: 'WWriteOffForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                writeOffGoods: []
            };
        },
        computed: {
            ...mapState([
                'updatedTTN',
                'userInfo',
                'goods'
            ]),
            dispatcher() {
                return this.userInfo.firstName;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            },
            isReleaseAllowed() {
                return this.updatedTTN.type === TTNTypes.OUTCOMING_TYPE;
            },
            toGCNCheckLink() {
                return `/gcn/${this.TTNId}/check`;
            }
        },
        methods: {
            ...mapActions({
                fetchUserInfo: 'fetchUserInfo',
                fetchGoodsList: 'fetchGoodsList',
                sendNewWriteOffForm: 'createWriteOff',
                getUpdatedTTNData: 'getUpdatedTTN',
                sendUpdatedTTNData: 'sendUpdatedTTN'
            }),
            writeOffGood(good, index) {
                this.writeOffGoods.splice(index, 1, good);
            },
            onSubmit(form) {
                helpers.isArrayEmpty(this.writeOffGoods) ? this.makeToast(customToasts.emptyWriteOffGoodsList) : this.sendData(form, this.writeOffGoods);
            },
            async sendData(form, goods) {
                let res = this.isReleaseAllowed ? await this.verifyTTN() : await this.confirmTTN();
                res = !res.error && await this.sendNewWriteOffForm({ writeOff: form, goods: goods });

                !res.error && router.push('/gcn');
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
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            }
        },
        created: async function() {
            await this.getUpdatedTTNData(this.TTNId);
            await this.fetchUserInfo();
            await this.fetchGoodsList(this.TTNId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
