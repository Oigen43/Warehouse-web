<template>
  <b-row>
    <b-col>
      <div class='w-goods-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col class="w-goods-add-form-container" lg="3" md="12" offset-lg="1" align-self="start">
            <w-form
              :number="data.number"
              :registrationDate="data.registrationDate"
              :warehouseManager="data.warehouseManager"
              :date="data.date"
              :addForm="false"
              submitButtonName="Create"
            ></w-form>
          </b-col>
          <b-col v-if="storages" lg="6" md="12" offset-lg="1">
            <b-row class="w-goods-card-container">
              <b-col lg="6" sm="4" v-for="good in goods" v-bind:key="good.id">
                <b-card no-body class="overflow-hidden w-goods-card">
                  <b-card-body>
                    <b-card-title class="mb-0 w-goods-card-text">{{good.name}}</b-card-title>
                    <hr>
                    <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Size:</span>
                      {{good.size}} m<sup><small>2</small></sup>
                    </b-card-text>
                    <b-card-text class="w-goods-card-text"><span
                      class="w-goods-card-text-bold">Recommended storage type:</span>
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
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="w-goods-form-button" variant="dark" size="lg" @click="clickedSubmitButton">Submit</b-button>
          </b-col>
        </b-row>
      </div>
    </b-col>
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

    import WForm from './components/WForm';
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
            BButton,
            WForm
        },
        data() {
            return {
                data: {
                    number: '356',
                    registrationDate: '2019-01-21',
                    warehouseManager: 'Ron Weasley',
                    date: '2019-08-31'
                },
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
            clickedSubmitButton() {
                const chosenStorages = this.goods.map(item => item.storage.id);
                const distinct = (value, index, self) => {
                    return self.indexOf(value) === index;
                };
                const distinctStorages = chosenStorages.filter(distinct);

                const storageFit = function () {
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

                const sizeFit = this.goods.every(function (item) {
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

<style lang="scss" scoped>
  @import './styles.scss';
</style>
