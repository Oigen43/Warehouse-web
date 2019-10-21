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
            {{good.volume}} $
          </b-card-text>
          <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Recommendation:</span>
            {{good.recommendation}}
          </b-card-text>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
    import {
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardText
    } from 'bootstrap-vue';

    export default {
        name: 'WGoods',
        components: {
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardText,
            BCardBody
        },
        props: ['goods']
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
