<template>
  <b-row class="w-goods-card-container">
  <b-col lg="6" sm="4" v-for="good in goods" v-bind:key="good.id">
    <b-card no-body class="overflow-hidden w-goods-card">
      <b-card-body>
        <b-card-title class="mb-0 w-goods-card-text">{{good.name}}</b-card-title>
        <hr>
        <b-card-text class="w-goods-card-text"><span class="w-goods-card-text-bold">Volume:</span>
          {{good.volume}} m<sup><small>3</small></sup>
        </b-card-text>
        <b-card-text class="w-goods-card-text"><span
          class="w-goods-card-text-bold">Recommended storage type:</span>
          {{good.recommendation}}
        </b-card-text>
        <b-card-text v-if="good.storage.length" class="w-goods-card-text"><span
          class="w-goods-card-text-bold">Storages:</span>
          <span v-for="storage in good.storage" :key="storage.id"> № {{storage.id}} </span>
        </b-card-text>
      </b-card-body>
      <b-button
        variant="dark"
        v-if="!good.storage.length"
        @click="clickedChooseGoodsStorage(good)"
        class="w-goods-card-button">Choose Storage
      </b-button>
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
        BCardText,
        BButton
    } from 'bootstrap-vue';

    export default {
        name: 'WCard',
        components: {
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardText,
            BCardBody,
            BButton
        },
        props: {
            goods: {
                type: Array
            },
            storages: {
                type: Array
            }
        },
        computed: {
            TTNId() {
                return +this.$route.params.TTNId;
            }
        },
        methods: {
            clickedChooseGoodsStorage(item) {
                this.$emit('clickedChooseGoodsStorage', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
