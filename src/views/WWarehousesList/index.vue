<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <b-container >
      <b-row>
        <b-col><h1>List of Warehouses</h1></b-col>
      </b-row>
      <b-row>
        <b-col><w-list/></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import { BContainer, BRow, BCol } from 'bootstrap-vue';
  import WList from './components/WList';
  import WNavigation from '../../components/WNavigation';

  export default {
    name: 'WWarehousesListPage',
    components: {
      WList,
      WNavigation,
      BContainer,
      BRow,
      BCol
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
