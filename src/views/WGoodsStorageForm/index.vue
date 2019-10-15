<template>
  <b-row>
    <b-col>
      <div class='w-goods-storage-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col lg="10" md="12" offset-lg="1">
            <b-row class="w-goods-storage-card-container">
              <b-col lg="4" offset-lg="1">
                <b-card no-body class="overflow-hidden w-goods-storage-card">
                  <b-card-body>
                    <b-card-title class="mb-0 w-goods-storage-card-text">{{goods.name}}</b-card-title>
                    <hr>
                    <b-card-text class="w-goods-storage-card-text"><span class="w-goods-storage-card-text-bold">Size:</span>
                      {{goods.size}} m<sup><small>2</small></sup>
                    </b-card-text>
                    <b-card-text class="w-goods-storage-card-text"><span
                      class="w-goods-storage-card-text-bold">Recommended storage type:</span>
                      {{goods.storageType}}
                    </b-card-text>
                  </b-card-body>
                </b-card>
              </b-col>
              <b-col v-if="storages.length" lg="5" offset-lg="1">
                  <b-list-group class="w-storages-list">
                    <b-list-group-item
                      v-bind:key="storage.id"
                      v-for="storage in storages"
                      :class="storage.clicked ? 'w-storage-chosen' : 'w-storage'"
                      @click="clickedStorage(storage)">
                      {{storage.StorageType.type}} - {{storage.storageCapacity}}
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
            BListGroup,
            BListGroupItem
        },
        data() {
            return {
                goods:
                    {
                        id: 1,
                        name: 'apples',
                        size: 20,
                        storageType: 'cold',
                        storages: []
                    }
            };
        },
        computed: {
            ...mapState([
                'storages'
            ])
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList'
            }),
            clickedStorage(item) {
                console.log(item.clicked);
                if (item.clicked) {
                    item.clicked = false;
                } else {
                    item.clicked = true;
                    if (this.goods.size < item.storageCapacity) {
                        this.goods.storages.push({
                            goodsId: this.goods.id,
                            storageId: item.id,
                            size: this.goods.size
                        });
                        this.goods.size = 0;
                    } else {
                        this.goods.storages.push({
                            goodsId: this.goods.id,
                            storageId: item.id,
                            size: item.storageCapacity
                        });
                        this.goods.size = this.goods.size - item.storageCapacity;
                    }
                }
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: 1,
                perPage: 20,
                warehouseId: 1
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
