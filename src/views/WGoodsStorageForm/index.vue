<template>
  <b-row>
    <b-col>
      <div v-if="storages.length && goods.length" class='w-goods-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col class="w-goods-add-form-container" lg="3" md="12" offset-lg="1" align-self="start">
            <w-form
              v-if="updatedTTN.id"
              :number="updatedTTN.number"
              :registrationDate="updatedTTN.registrationDate"
              :dispatcher="updatedTTN.User"
              :isReleaseAllowed="isReleaseAllowed"
              :manager="userInfo"
              @form-submitted="clickedSubmitButton"
            ></w-form>
          </b-col>
          <b-col lg="6" md="12" offset-lg="1">
            <w-card
              @clickedChooseGoodsStorage="clickedChooseGoodsStorage"
              :goods="goods"
              :storages="storages"
            ></w-card>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState, mapMutations } from 'vuex';
    import {
        BRow,
        BCol,
        ToastPlugin
    } from 'bootstrap-vue';

    import * as statusesTTN from '../../constants/statuses';
    import TTNTypes from '../../constants/TTNtypes';
    import customToasts from '../../constants/customToasts';
    import router from '../../router';
    import WForm from './components/WForm';
    import WCard from './components/WCard';

    Vue.use(ToastPlugin);

    export default {
        name: 'WGoodsStorageForm',
        components: {
            BRow,
            BCol,
            WForm,
            WCard
        },
        computed: {
            ...mapState([
                'updatedTTN',
                'userInfo',
                'storages',
                'goods',
                'toast',
                'storagesComputedCapacity'
            ]),
            TTNId() {
                return +this.$route.params.TTNId;
            },
            isReleaseAllowed() {
                return this.updatedTTN.type === TTNTypes.OUTCOMING_TYPE;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedTTN: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                fetchAllStorages: 'fetchAllStorages',
                fetchGoodsList: 'fetchGoodsList',
                sendUpdatedTTNData: 'sendUpdatedTTN',
                releaseGoods: 'releaseGoods'
            }),
            ...mapMutations({
                setStorageCurrentCapacity: 'SET_STORAGE_CURRENT_CAPACITY'
            }),
            clickedSubmitButton() {
                this.goods.some(item => !item.storage.length) ? this.makeToast(customToasts.emptyStorageGoodsForm) : this.sendData();
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
            redirect() {
                router.push('/ttn');
            },
            async sendData() {
                const res = this.isReleaseAllowed ? await this.releaseGoodsStorage() : await this.setInStorageStatus();

                !res.error && this.redirect();
            },
            setInStorageStatus() {
                const TTN = {
                    id: this.TTNId,
                    status: statusesTTN.IN_STORAGE_STATUS
                };

                return this.sendUpdatedTTNData({ TTN });
            },
            changeStorageCurrentCapacity() {
                this.goods.forEach(item => {
                    item.storage.forEach(item => {
                        const capacity = item.GoodsStorage.size + item.currentCapacity;

                        this.setStorageCurrentCapacity({ id: item.id, capacity });
                    });
                });
            },
            async releaseGoodsStorage() {
                await this.changeStorageCurrentCapacity();
                const TTN = {
                    id: this.TTNId,
                    status: statusesTTN.TAKEN_OUT_OF_STORAGE_STATUS
                };

                return this.releaseGoods({ goodsData: this.goods, storageData: this.storagesComputedCapacity, TTN });
            },
            clickedChooseGoodsStorage(item) {
                router.push(`/ttn/${this.TTNId}/storage-goods/${item.id}/add`);
            }
        },
        created: async function () {
            await this.fetchUserInfo();
            await this.getUpdatedTTN(this.TTNId);
            await this.fetchAllStorages(this.userInfo.warehouseId);
            await this.fetchGoodsList(this.TTNId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
