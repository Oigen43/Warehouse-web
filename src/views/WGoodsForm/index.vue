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
          <b-col v-if="storages.length" lg="6" md="12" offset-lg="1">
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
                  <b-button v-if="!good.storages.length" @click="clickedGoodsCard(good)">Choose Storage
                  </b-button>
                  <b-button v-if="good.storages.length" @click="clickedGoodsCard(good)">Change Storage
                  </b-button>
                </b-card>
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

    import router from '../../router';
    import WForm from './components/WForm';

    export default {
        name: 'WGoodsForm',
        components: {
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
                }
            };
        },
        computed: {
            ...mapState([
                'storages',
                'goods',
                'toast'
            ])
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList',
                fetchGoodsList: 'fetchGoodsList'
            }),
            ...mapMutations({
                setToast: 'SET_TOAST'
            }),
            clickedSubmitButton() {
                // console.log(this.goods);
            },
            clickedGoodsCard(item) {
                router.push(`/goods-form/${item.id}`);
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: 1,
                perPage: 20,
                warehouseId: 1
            });
            this.fetchGoodsList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
