<template>
  <b-container class='w-greeting-section'>
    <b-row>
      <b-col><h1>{{ msg }}</h1></b-col>
    </b-row>
    <b-row>
      <b-col><img src='../../../../assets/warehouse-image.svg' width = '150px;' height = '150px;' alt='warehouse-image'></b-col>
    </b-row>
  </b-container>
</template>

<script>
  import { BContainer, BRow, BCol } from 'bootstrap-vue';

  export default {
    name: 'WGreetingSection',
    props: {
      msg: String
    },
    components: {
      BContainer,
      BRow,
      BCol
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
