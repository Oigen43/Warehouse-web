<template>
  <b-container class='greetingSection'>
    <b-row>
      <b-col><h1>{{ msg }}</h1></b-col>
    </b-row>
    <b-row>
      <b-col><img src='../../../../assets/warehouse-image.svg' width = '150px;' height = '150px;' alt='warehouse-image'></b-col>
    </b-row>
  </b-container>
</template>

<script>
  export default {
    name: 'greetingSection',
    props: {
      msg: String
    }
  };
</script>

<style lang='scss' scoped>
  @import './styles.scss';
</style>
