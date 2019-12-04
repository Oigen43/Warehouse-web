<template>
  <b-row>
    <b-col lg="8" offset-lg="2">
      <div class="w-empty-table-jumbotron">
        <h1 class="w-empty-table-h1">There are no elements yet!</h1>
        <hr v-if="insert">
        <h3 v-if="insert">
          You can add elements here!
        </h3>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { BRow, BCol } from 'bootstrap-vue';

    export default {
        name: 'WEmptyTable',
        components: {
            BRow,
            BCol
        },
        props: ['insert']
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
