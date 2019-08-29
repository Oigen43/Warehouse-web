<template>
    <b-container class='w-warehouses-list-page'>
      <b-row>
        <b-col><h1>List of Warehouses</h1></b-col>
      </b-row>
      <b-row>
        <b-col><w-list/></b-col>
      </b-row>
    </b-container>
</template>

<script>
  import { BContainer, BRow, BCol } from 'bootstrap-vue';
  import WList from './components/WList';

  export default {
    name: 'WWarehousesListPage',
    components: {
      WList,
      BContainer,
      BRow,
      BCol
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
