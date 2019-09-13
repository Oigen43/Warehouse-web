<template>
  <b-container>
    <b-row>
      <b-col lg="2"></b-col>
      <b-col lg="8" sm="12">
        <div class="w-content-container">
          <h1 class="w-content-h1">Warehouse Online</h1>
          <h3>Big or small… We can handle it all.</h3>
          <hr>
          <b-button size="lg" variant="outline-dark" class="w-content-button">Get Started!</b-button>
        </div>
      </b-col>
      <b-col lg="2"></b-col>
    </b-row>
  </b-container>
</template>

<script>
    import { BContainer, BRow, BCol, BButton } from 'bootstrap-vue';

    export default {
        name: 'WContent',
        components: {
            BContainer,
            BRow,
            BCol,
            BButton
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
