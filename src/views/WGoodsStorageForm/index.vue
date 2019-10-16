<template>
  <b-row>
    <b-col>
      <div class='w-goods-storage-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col lg="10" md="12" offset-lg="1">
            <b-row class="w-goods-storage-card-container">
              <b-col v-if="goodsName" lg="4" offset-lg="1">
                <b-card no-body class="overflow-hidden w-goods-storage-card">
                  <b-card-body>
                    <b-card-title class="mb-0 w-goods-storage-card-text">{{goodsName}}</b-card-title>
                    <hr>
                    <b-card-text class="w-goods-storage-card-text"><span
                      class="w-goods-storage-card-text-bold">Size:</span>
                      {{goodsSize}} m<sup><small>2</small></sup>
                    </b-card-text>
                    <b-card-text class="w-goods-storage-card-text"><span
                      class="w-goods-storage-card-text-bold">Recommended storage type:</span>
                      {{goodsStorageType}}
                    </b-card-text>
                  </b-card-body>
                </b-card>
                <b-button variant="dark" class="w-goods-storage-button">Save</b-button>
                <b-button variant="dark" class="w-goods-storage-button">Cancel</b-button>
              </b-col>
              <b-col v-if="storages.length" lg="5" offset-lg="1">
                <b-list-group class="w-storages-list">
                  <b-list-group-item
                    v-bind:key="storage.id"
                    v-for="storage in storages"
                    :class="storage.clicked ? 'w-storage-chosen' : 'w-storage'"
                    @click="clickedStorage(storage)">
                    {{storage.StorageType.type}} - {{storage.currentCapacity}}
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardText,
        BButton,
        BListGroup,
        BListGroupItem
    } from 'bootstrap-vue';

    export default {
        name: 'WGoodsStorageForm',
        components: {
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardText,
            BCardBody,
            BButton,
            BListGroup,
            BListGroupItem
        },
        data() {
            return {
                goodsStorageData: []
            };
        },
        computed: {
            ...mapState([
                'storages',
                'goodsItem'
            ]),
            goodsId() {
                return +this.$route.params.goodsId;
            },
            goodsName() {
                return this.goodsItem.name;
            },
            goodsSize() {
                return this.goodsItem.size;
            },
            goodsStorageType() {
                return this.goodsItem.storageType;
            }
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList',
                fetchGoodsItemData: 'fetchGoodsItemData'
            }),
            clickedStorage(item) {
                if (this.goodsSize < item.currentCapacity) {
                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: item.id,
                        size: this.goodsSize
                    });
                } else {
                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: item.id,
                        size: item.currentCapacity
                    });
                }
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
