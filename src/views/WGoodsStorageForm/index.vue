<template>
  <b-row>
    <b-col>
      <div class='w-goods-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col class="w-goods-add-form-container" lg="3" md="12" offset-lg="1" align-self="start">
            <w-form
              :number="updatedTTN.number"
              :registrationDate="updatedTTN.registrationDate"
              :dispatcher="updatedTTN.User"
              :manager="userInfo"
            ></w-form>
          </b-col>
          <b-col v-if="storages.length && goods.length" lg="6" md="12" offset-lg="1">
            <w-card
              @clickedChooseGoodsStorage="clickedChooseGoodsStorage"
              :goods="goods"
              :storages="storages"
            ></w-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button class="w-goods-form-button" variant="dark" size="lg" @click="clickedSubmitButton">Submit
            </b-button>
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
        BButton
    } from 'bootstrap-vue';

    import router from '../../router';
    import WForm from './components/WForm';
    import WCard from './components/WCard';

    export default {
        name: 'WGoodsStorageForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WCard
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
                'updatedTTN',
                'userInfo',
                'storages',
                'goods',
                'toast'
            ]),
            TTNId() {
                return +this.$route.params.TTNId;
            },
        },
        methods: {
            ...mapActions({
                getUpdatedTTN: 'getUpdatedTTN',
                fetchUserInfo: 'fetchUserInfo',
                fetchStoragesList: 'fetchStoragesList',
                fetchGoodsList: 'fetchGoodsList'
            }),
            ...mapMutations({
                setToast: 'SET_TOAST'
            }),
            clickedSubmitButton() {
                // console.log(this.goods);
            },
            clickedChooseGoodsStorage(item) {
                router.push(`/ttn/${this.TTNId}/storage-goods/${item.id}/add`);
            }
        },
        created: async function () {
            await this.fetchUserInfo();
            await this.getUpdatedTTN(this.TTNId);
            await this.fetchStoragesList({
                page: 1,
                perPage: 20,
                warehouseId: this.userInfo.warehouseId
            });
            await this.fetchGoodsList(this.TTNId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
