<template>
  <div>
  <h1 class="w-ttn-add-form-h1">Create TTN</h1>
  <b-row>
    <b-col class="w-ttn-add-form-col" lg="3" md="12" offset-lg="1" align-self="start">
      <w-form
        :number="number"
        :dischargeDate="dischargeDate"
        :sender="sender"
        :carrier="carrier"
        :transport="transport"
        :driver="driver"
        :dispatcher="dispatcher"
        :description="description"
        :type="type"
        :warehouse="warehouse"
        :addForm="false"
        submitButtonName="Create"
      ></w-form>
      <b-button
        variant="link"
        to="/users"
        class="w-ttn-go-back-link"
      >Go Back
      </b-button>
    </b-col>
    <b-col class="w-ttn-add-form-col" lg="6" md="12" offset-lg="1">
      <w-goods
        @added-good="addGood"
        @updated-good="updateGood"
        @deleted-good="deleteGood"
        :goods="goods"
      ></w-goods>
    </b-col>
  </b-row>
  </div>
</template>

<script>

    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WForm from '../../components/WTtnForm';
    import WGoods from '../../components/WGoodsList';
    export default {
        name: 'WTtnAddForm',
        components: {
            BRow,
            BCol,
            BButton,
            WForm,
            WGoods
        },
        data() {
            return {
                number: '',
                dischargeDate: '',
                sender: '',
                carrier: '',
                transport: '',
                driver: '',
                dispatcher: '',
                description: '',
                type: '',
                goods: [ { name: 'Apples', volume: '400', count: '5', weight: '5', price: '533', recommendation: 'Coldasdasdasd' }, { name: 'Oranges', volume: '300' }, { name: 'Apples', volume: '400' }, { name: 'Oranges', volume: '300' } ],
                warehouse: '',
            };
        },
        methods: {
          addGood(good) {
            this.goods.push(good);
          },
          updateGood(good, index) {
            this.goods.splice(index, 1, good);
          },
          deleteGood(index) {
            this.goods.splice(index, 1);
          }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
