<template>
  <b-row class="w-home-page">
    <b-col lg="8" sm="12" offset-lg="2">
      <div class="w-content-container">
        <h1 class="w-content-h1">Warehouse Online</h1>
        <h3>Big or small… We can handle it all.</h3>
        <hr>
        <b-button size="lg" variant="outline-dark" class="w-content-button">Get Started!</b-button>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    export default {
        name: 'WHomePage',
        components: {
            BRow,
            BCol,
            BButton
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
