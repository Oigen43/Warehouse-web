<template>
  <b-row>
    <b-col xl="4" lg="6" sm="4" v-for="good in goods" v-bind:key="good.id">
      <b-card no-body class="w-goods-card">
        <b-card-body>
          <b-card-title class="w-goods-card-text">{{ good.name }}</b-card-title>
          <hr>
          <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Count:</span>
            {{good.count}}
          </b-card-text>
          <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Volume:</span>
            {{good.volume}} m<sup><small>2</small></sup>
          </b-card-text>
          <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Weight:</span>
            {{good.weight}} kg
          </b-card-text>
          <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Price:</span>
            {{good.price}} $
          </b-card-text>
        </b-card-body>
        <b-card-footer class="w-goods-card-footer">
          <b-button
            v-b-modal.modal-write-off-goods
            class="w-goods-update-card-button"
            variant="dark"
            size="sm"
            @click="clickedUpdateButton(good)">
            Write-Off
          </b-button>
        </b-card-footer>
      </b-card>
    </b-col>
    <b-modal ref="modal-write-off-goods" id="modal-write-off-goods" title="Write-Off Goods" hide-footer>
      <w-form
        @form-submitted="writeOffGoods"
        :name="currentGood.name"
        :volume="currentGood.volume"
        :count="currentGood.count"
        :weight="currentGood.weight"
        :price="currentGood.price"
      ></w-form>
    </b-modal>
  </b-row>
</template>

<script>
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardText,
        BCardFooter,
        BButton
    } from 'bootstrap-vue';

    import WForm from '../../components/WGoodsForm';

    export default {
        name: 'WGoodsList',
        components: {
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardText,
            BCardBody,
            BCardFooter,
            BButton,
            WForm
        },
        data() {
            return {
                currentGood: '',
                currentGoodIndex: 0
            };
        },
        props: ['goods'],
        methods: {
            writeOffGoods(form) {
                this.$emit('write-off-good', form, this.currentGoodIndex);
                this.$refs['modal-write-off-goods'].hide();
            },
            clickedUpdateButton(good) {
                this.currentGood = good;
                this.currentGoodIndex = this.goods.indexOf(good);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
