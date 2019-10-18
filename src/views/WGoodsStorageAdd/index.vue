<template>
  <b-row>
    <b-col class="w-goods-storage-update" lg="10" offset-lg="1">
      <h1>Choose Storage for Goods</h1>
      <w-goods-storage-form
        @sendData="sendData"
        :goodsId="goodsId"
        :storages="storages"
        :goodsItemInit="goodsItemInit"
        :goodsItemComputedSize="goodsItemComputedSize"
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
                'storages',
                'goodsItemInit',
                'goodsItemComputedSize',
                'storagesComputedCapacity'
            ]),
            goodsId() {
                return +this.$route.params.goodsId;
            },
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList',
                fetchGoodsItemData: 'fetchGoodsItemData',
                sendGoodsStorage: 'sendGoodsStorage'
            }),
            redirect() {
                router.push('/goods-form');
            },
            async sendData(data) {
                const res = await this.sendGoodsStorage(data);
                !res.error && this.redirect();
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: 1,
                perPage: 20,
                warehouseId: 1
            });
            this.fetchGoodsItemData(this.goodsId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
