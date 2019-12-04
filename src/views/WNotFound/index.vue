<template>
  <b-row>
    <b-col lg="8" offset-lg="2" class="w-not-found-content-container">
      <h1 class="w-not-found-h1">404 Page Not Found</h1>
      <h3>Sorry, we can't find the page you're looking for.</h3>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol } from 'bootstrap-vue';

    export default {
        name: 'WNotFound',
        components: {
            BRow,
            BCol
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
