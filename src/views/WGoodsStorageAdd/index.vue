<template>
  <b-row>
    <b-col class="w-goods-storage-update" lg="10" offset-lg="1">
      <h1>Choose Storage for Goods</h1>
      <w-goods-storage-form
        @sendData="sendData"
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
    import { BRow, BCol } from 'bootstrap-vue';
    import { mapState, mapActions } from 'vuex';

    import router from '../../router';
    import WGoodsStorageForm from '../../components/WGoodsStorageForm/index';

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
                router.push(`/ttn/${this.TTNId}/storage-goods/`);
            },
            async sendData(data) {
                const res = await this.sendGoodsStorage(data);

                !res.error && this.redirect();
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
