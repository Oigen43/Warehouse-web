<template>
      <b-row class="w-goods-storage-card-container">
        <b-col v-if="goodsItemInit.name" lg="4" offset-lg="1">
          <b-card no-body class="overflow-hidden w-goods-storage-card">
            <b-card-body>
              <b-card-title class="mb-0 w-goods-storage-card-text">{{goodsItemInit.name}}</b-card-title>
              <hr>
              <b-card-text class="w-goods-storage-card-text"><span
                class="w-goods-storage-card-text-bold">Size:</span>
                {{goodsSize}} / {{goodsItemInit.size}} m<sup><small>2</small></sup>
              </b-card-text>
              <b-card-text class="w-goods-storage-card-text"><span
                class="w-goods-storage-card-text-bold">Recommended storage type:</span>
                {{goodsItemInit.storageType}}
              </b-card-text>
            </b-card-body>
          </b-card>
          <b-button @click="clickedSaveButton" variant="dark" class="w-goods-storage-button">Save</b-button>
          <b-button @click="clickedCancelButton" variant="dark" class="w-goods-storage-button">Cancel</b-button>
        </b-col>
        <b-col v-if="storages.length" lg="5" offset-lg="1">
          <b-list-group class="w-storages-list">
            <b-list-group-item
              :key="storage.id"
              v-for="storage in storages"
              :active="storage.active"
              @click="clickedStorage(storage)">
              {{storage.StorageType.type}} - {{storage.currentCapacity}}
            </b-list-group-item>
          </b-list-group>
        </b-col>
      </b-row>
</template>

<script>
    import { mapMutations } from 'vuex';
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
        props: {
            storages: {
                type: Array,
            },
            goodsId: {
                type: Number
            },
            goodsItemInit: {
                type: Object
            },
            goodsItemComputedSize: {
                type: Number
            }
        },
        data() {
            return {
                goodsStorageData: []
            };
        },
        computed: {
            goodsSize() {
                return this.goodsItemComputedSize;
            }
        },
        methods: {
            ...mapMutations({
                goodsItemSize: 'GOODS_ITEM_COMPUTED_SIZE',
                setStorageActive: 'SET_STORAGE_ACTIVE'
            }),
            clickedStorage(item) {
                this.setStorageActive(item.id)

                if (this.goodsSize < item.currentCapacity) {
                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: item.id,
                        size: this.goodsSize
                    });
                    const size = 0;
                    this.goodsItemSize(size);
                } else {
                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: item.id,
                        size: item.currentCapacity
                    });
                    const size = this.goodsItemComputedSize - item.currentCapacity;
                    this.goodsItemSize(size);
                }
                console.log(this.goodsStorageData)
            },
            clickedSaveButton() {
                this.$emit('sendData', { data: this.goodsStorageData });
            },
            clickedCancelButton() {
                this.goodsStorageData = [];
                const size = this.goodsItemInit.size;
                this.goodsItemSize(size);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
