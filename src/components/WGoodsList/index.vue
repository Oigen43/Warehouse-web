<template>
    <b-row>
      <b-col xl ="4" lg="6" sm="4">
        <b-card no-body class="overflow-hidden w-goods-card w-goods-add-card">
          <b-button
            v-b-modal.modal-add-goods
            type="submit"
            variant="outline-dark"
            size="lg"
            class="w-good-form-button">
            ADD ITEM
          </b-button>
        </b-card>
        <b-modal ref="modal-add-goods" id="modal-add-goods" hide-header hide-footer>
          <w-form
            @form-submitted="addGood"
            headerName='Add new item'
            submitButtonName='ADD ITEM'
          ></w-form>
        </b-modal>
      </b-col>
      <b-col xl ="4" lg="6" sm="4" v-for="good in goods" v-bind:key="good.id">
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
              {{good.volume}} $
            </b-card-text>
            <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Recommendation:</span>
              {{good.recommendation}}
            </b-card-text>
          </b-card-body>
          <b-card-footer class="w-goods-card-footer">
            <b-button
              v-b-modal.modal-update-goods
              class="w-goods-update-card-button"
              variant="dark"
              size="sm"
              @click="clickedUpdateButton(good)">
              Update
            </b-button>
            <b-modal ref="modal-update-goods" id="modal-update-goods" hide-header hide-footer>
              <w-form
                @form-submitted="addGood"
                headerName='Add new item'
                submitButtonName='ADD ITEM'
              ></w-form>
            </b-modal>
            <b-button
              class="w-goods-delete-card-button"
              variant="light"
              size="sm">
              ✕
            </b-button>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
</template>

<script>
    import Vue from 'vue';
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardText,
        BCardFooter,
        BButton,
        ModalPlugin
    } from 'bootstrap-vue';

    import WForm from '../../components/WGoodsForm';

    Vue.use(ModalPlugin);

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
        props: ['goods'],
        methods: {
          clickedUpdateButton(good) {
            console.log(good);
          },
          addGood(form) {
            this.$emit('added-good', form);
            this.$refs['modal-add-goods'].hide();
          },
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
