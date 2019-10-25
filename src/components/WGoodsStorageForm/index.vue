<template>
  <b-row class="w-goods-storage-card-container">
    <b-col v-if="goodsItemInit.id" lg="4" offset-lg="1">
      <b-card no-body class="overflow-hidden w-goods-storage-card">
        <b-card-body>
          <b-card-title class="mb-0 w-goods-storage-card-text">{{goodsItemInit.name}}</b-card-title>
          <hr>
          <b-card-text class="w-goods-storage-card-text"><span
            class="w-goods-storage-card-text-bold">Volume:</span>
            {{goodsVolume}} / {{goodsItemInit.volume}} m<sup><small>3</small></sup>
            <b-progress
              :max="goodsItemInit.volume"
              :value="goodsVolume"
              variant="info"
              striped>
            </b-progress>
          </b-card-text>
          <b-card-text class="w-goods-storage-card-text"><span
            class="w-goods-storage-card-text-bold">Recommended storage type:</span>
            {{goodsItemInit.recommendation}}
          </b-card-text>
        </b-card-body>
      </b-card>
      <b-button @click="clickedSaveButton" variant="dark" class="w-goods-storage-button">Save</b-button>
      <b-button @click="clickedCancelButton" variant="dark" class="w-goods-storage-button">Cancel</b-button>
    </b-col>
    <b-col v-if="storagesComputed.length" lg="5" offset-lg="1">
      <b-list-group class="w-storages-list">
        <b-list-group-item
          :key="storage.id"
          v-for="storage in storagesComputed"
          @click="clickedStorage(storage)"
          class="w-goods-storage-list-item">
          <div>{{storage.StorageType.type}} - {{storage.currentCapacity}}/{{storage.storageCapacity}}</div>
          <b-progress
            :max="storage.storageCapacity"
            variant="info"
            striped
            class="w-goods-storage-progress-bar">
            <b-progress-bar :value="storage.currentCapacity"></b-progress-bar>
          </b-progress>
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
        BListGroupItem,
        BProgress,
        BProgressBar
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
            BListGroupItem,
            BProgress,
            BProgressBar
        },
        props: {
            storages: {
                type: Array
            },
            goodsId: {
                type: Number
            },
            goodsItemInit: {
                type: Object
            },
            goodsItemComputedVolume: {
                type: Number
            },
            storagesComputedCapacity: {
                type: Array
            }
        },
        data() {
            return {
                goodsStorageData: []
            };
        },
        computed: {
            goodsVolume() {
                return this.goodsItemComputedVolume;
            },
            storagesComputed() {
                return this.storagesComputedCapacity;
            }
        },
        methods: {
            ...mapMutations({
                goodsItemVolume: 'GOODS_ITEM_COMPUTED_VOLUME',
                setStorageCurrentCapacity: 'SET_STORAGE_CURRENT_CAPACITY'
            }),
            clickedStorage({ id, currentCapacity }) {
                if (this.goodsVolume < currentCapacity && !!this.goodsVolume && !!currentCapacity) {
                    const capacity = currentCapacity - this.goodsVolume;

                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: id,
                        size: this.goodsVolume
                    });
                    this.goodsItemVolume(0);
                    this.setStorageCurrentCapacity({ id, capacity });
                } else if (!!this.goodsVolume && !!currentCapacity) {
                    const size = this.goodsItemComputedVolume - currentCapacity;

                    this.goodsStorageData.push({
                        goodsId: this.goodsId,
                        storageId: id,
                        size: currentCapacity
                    });
                    this.goodsItemVolume(size);
                    this.setStorageCurrentCapacity({ id, capacity: 0 });
                }
            },
            clickedSaveButton() {
                this.$emit('sendData', { goodsData: this.goodsStorageData, storageData: this.storagesComputedCapacity });
            },
            clickedCancelButton() {
                const size = this.goodsItemInit.volume;

                this.goodsStorageData = [];
                this.goodsItemVolume(size);
                this.storagesComputedCapacity.forEach(({ id }) => {
                    const capacity = this.storages.find(element => element.id === id).currentCapacity;

                    this.setStorageCurrentCapacity({ id, capacity });
                });
                this.storagesComputedCapacity = this.storages;
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import 'styles';
</style>
