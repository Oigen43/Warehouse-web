<template>
  <b-row>
    <b-col>
      <div v-if="storages.length && goods.length" class='w-goods-list-page'>
        <h1 class="w-goods-add-form-h1">Storage Goods Form</h1>
        <b-row>
          <b-col class="w-goods-add-form-container" lg="3" md="12" offset-lg="1" align-self="start">
            <w-form
              v-if="updatedTTN.id"
              :number="updatedTTN.number"
              :registrationDate="updatedTTN.registrationDate"
              :dispatcher="updatedTTN.User"
              :manager="userInfo"
              @form-submitted="clickedSubmitButton"
            ></w-form>
          </b-col>
          <b-col lg="6" md="12" offset-lg="1">
            <w-card
              @clickedChooseGoodsStorage="clickedChooseGoodsStorage"
              :goods="goods"
              :storages="storages"
            ></w-card>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import Vue from 'vue';
    import { mapActions, mapState, mapMutations } from 'vuex';
    import {
        BRow,
        BCol,
        ToastPlugin
    } from 'bootstrap-vue';

    import customToasts from '../../constants/customToasts';
    import router from '../../router';
    import WForm from './components/WForm';
    import WCard from './components/WCard';

    Vue.use(ToastPlugin);

    export default {
        name: 'WGoodsStorageForm',
        components: {
            BRow,
            BCol,
            WForm,
            WCard
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
                fetchAllStorages: 'fetchAllStorages',
                fetchGoodsList: 'fetchGoodsList',
                setInStorageStatus: 'setInStorageTTN'
            }),
            ...mapMutations({
                setToast: 'SET_TOAST'
            }),
            clickedSubmitButton() {
                this.goods.some(item => !item.storage.length) ? this.makeToast(customToasts.emptyStorageGoodsForm) : this.sendData();
            },
            makeToast(toast) {
                this.$bvToast.toast(toast.message, {
                    title: toast.title,
                    variant: toast.variant,
                    solid: true
                });
            },
            redirect() {
                router.push('/ttn');
            },
            sendData() {
                const res = this.setInStorageStatus({ id: this.TTNId });

                !res.error && this.redirect();
            },
            clickedChooseGoodsStorage(item) {
                router.push(`/ttn/${this.TTNId}/storage-goods/${item.id}/add`);
            }
        },
        created: async function () {
            await this.fetchUserInfo();
            await this.getUpdatedTTN(this.TTNId);
            await this.fetchAllStorages(this.userInfo.warehouseId);
            await this.fetchGoodsList(this.TTNId);
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
