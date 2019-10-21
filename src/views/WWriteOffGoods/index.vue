<template>
  <div v-if='userInfo.surname'>
    <h1 class="w-write-off-form-h1">Write-off of Goods Form</h1>
    <b-row>
      <b-col class="w-write-off-form-col" lg="3" md="12" offset-lg="1" align-self="start">
        <w-form
          @form-submitted="sendData"
          :controller="userInfo"
          :registrationDate="registrationDate"
        ></w-form>
        <b-button
          variant="link"
          to="/ttn"
          class="w-write-off-form-go-back-link"
        >Go Back
        </b-button>
      </b-col>
      <b-col v-if="goods.length" class="w-write-off-form-col" lg="6" md="12" offset-lg="1">
        <w-goods
          @updated-good="updateGood"
          :goods="goods"
        ></w-goods>
      </b-col>
    </b-row>
  </div>
</template>

<script>

    import { BRow, BCol, BButton } from 'bootstrap-vue';
    import { mapActions, mapState } from 'vuex';
    import router from '../../router';

    import WForm from './components/WForm';
    import WGoods from './components/WGoods';

    export default {
        name: 'WWriteOffForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                writeOffGoods: [],
                registrationDate: '23-10-2019'
            };
        },
        computed: {
          ...mapState([
                'userInfo',
                'goods'
            ]),
            dispatcher: function() {
              return this.userInfo.firstName;
            }
        },
        methods: {
          ...mapActions({
              fetchUserInfo: 'fetchUserInfo',
              fetchGoodsList: 'fetchGoodsList',
              sendNewWriteOffForm: 'createWriteOff'
          }),
          updateGood(good, index) {
              this.writeOffGoods.splice(index, 1, good);
          },
          async sendData(form) {
              const res = await this.sendNewWriteOffForm({ writeOff: form, goods: this.writeOffGoods });
              !res.error && router.push('/ttn');
          }
        },
        created: async function() {
            await this.fetchUserInfo();
            await this.fetchGoodsList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
