<template>
  <b-row>
  <b-row v-if="storages">
    <b-col lg="3" sm="6" v-for="good in goods" v-bind:key="good.id">
      <b-card no-body class="overflow-hidden w-drivers-card">
        <b-card-body>
          <b-card-title class="mb-0 w-drivers-card-text">{{good.name}}</b-card-title>
          <hr>
          <b-card-text class="w-drivers-card-text"><span class="w-drivers-card-text-bold">Size:</span>
            {{good.size}} m<sup><small>2</small></sup>
          </b-card-text>
          <b-card-text class="w-drivers-card-text"><span
            class="w-drivers-card-text-bold">Recommended storage type:</span>
            {{good.storageType}}
          </b-card-text>
        </b-card-body>
      </b-card>
      <w-multiselect
        :options="storages"
        :multiple="false"
        :custom-label="typeWithCapacity"
        size="lg"
        :allow-empty="false"
        :close-on-select="true"
        :placeholder="placeholder"
        v-model="good.storage"
      ></w-multiselect>
    </b-col>
  </b-row>
  <b-row>
    <b-col>
      <b-button variant="primary" size="lg" @click="clickedSubmitButton">Submit</b-button>
    </b-col>
  </b-row>
  </b-row>
</template>

<script>
    import { mapActions, mapState, mapMutations } from 'vuex';
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardText,
        BButton
    } from 'bootstrap-vue';

    import WMultiselect from '../../components/WMultiselect/index';

    export default {
        name: 'WGoodsForm',
        components: {
            WMultiselect,
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardText,
            BCardBody,
            BButton
        },
        data() {
            return {
                goods: [
                    {
                        id: 1,
                        name: 'apples',
                        size: 20,
                        storageType: 'cold',
                        storage: null
                    },
                    {
                        id: 2,
                        name: 'wine',
                        size: 11,
                        storageType: 'heated',
                        storage: null
                    },
                    {
                        id: 3,
                        name: 'fish',
                        size: 30,
                        storageType: 'refrigerated',
                        storage: null
                    },
                    {
                        id: 4,
                        name: 'bricks',
                        size: 28,
                        storageType: 'outside',
                        storage: null
                    },
                    {
                        id: 5,
                        name: 'cucumbers',
                        size: 21,
                        storageType: 'refrigerated',
                        storage: null
                    },
                ],
                placeholder: 'Please select storage'
            };
        },
        computed: {
            ...mapState([
                'storages',
                'toast'
            ])
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList'
            }),
            ...mapMutations({
                setToast: 'SET_TOAST'
            }),
            typeWithCapacity({ StorageType, storageCapacity }) {
                    return `${StorageType.type} — [${storageCapacity}]`;
            },
            clickedSubmitButton () {
                const chosenStorages = this.goods.map(item => item.storage.id);
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                };
                const distinctStorages = chosenStorages.filter(distinct);

                const storageFit = function() {
                    if (chosenStorages.length === distinctStorages.length) {
                        return true;
                    } else {
                        const newToast = {
                            title: 'Error!',
                            variant: 'danger',
                            message: 'Storage should be unique!'
                        };
                        this.setToast(newToast);

                        return false;
                    }
                }.bind(this);

                const sizeFit = this.goods.every(function(item) {
                    if (+item.storage.storageCapacity < +item.size) {
                        const newToast = {
                            title: 'Error!',
                            variant: 'danger',
                            message: `Storage for ${item.name} is too small. Please choose another one!`
                        };
                        this.setToast(newToast);

                        return false;
                    } else {
                        return true;
                    }
                }.bind(this));
                storageFit() && sizeFit && console.log(this.goods);
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

<style scoped>

</style>
