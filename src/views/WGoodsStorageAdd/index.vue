<template>
  <b-row>
    <b-col class="w-goods-storage-add" lg="10" offset-lg="1">
      <h1>Choose Storage for Goods</h1>
      <w-goods-storage-form
        @sendData="checkGoodsVolume"
        :goodsId="goodsId"
        :storages="storages"
        :goodsItemInit="goodsItemInit"
        :goodsItemComputedVolume="goodsItemComputedVolume"
        :storagesComputedCapacity="storagesComputedCapacity"
      ></w-goods-storage-form>
    </b-col>
  </b-row>
</template>

<script>
    import Vue from 'vue';
    import { BRow, BCol, ToastPlugin } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';

    import customToasts from '../../constants/customToasts';
    import router from '../../router';
    import WGoodsStorageForm from '../../components/WGoodsStorageForm/index';

    Vue.use(ToastPlugin);

    export default {
        name: 'WGoodsStorageAddForm',
        components: {
            WGoodsStorageForm,
            BRow,
            BCol
        },
        computed: {
            ...mapState([
                'userInfo',
                'storages',
                'goodsItemInit',
                'goodsItemComputedVolume',
                'storagesComputedCapacity'
            ]),
            goodsId() {
                return +this.$route.params.goodsId;
            },
            TTNId() {
                return +this.$route.params.TTNId;
            }
        },
        methods: {
            ...mapActions({
                fetchUserInfo: 'fetchUserInfo',
                fetchAllStorages: 'fetchAllStorages',
                fetchGoodsItemData: 'fetchGoodsItemData',
                sendGoodsStorage: 'sendGoodsStorage'
            }),
            redirect() {
                router.push(`/gcn/${this.TTNId}/storage-goods/`);
            },
            checkGoodsVolume(data, goods) {
                goods ? this.makeToast(customToasts.goodsNotStorage) : this.sendData(data)
            },
            async sendData(data) {
                const res = await this.sendGoodsStorage(data);

                !res.error && this.redirect();
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            }
        },
        created: async function () {
            await this.fetchUserInfo();
            await this.fetchAllStorages(this.userInfo.warehouseId);
            this.fetchGoodsItemData(this.goodsId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
