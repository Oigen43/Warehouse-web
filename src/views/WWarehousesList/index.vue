<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Warehouses</h1>
    <p> {{ list }} </p>
  </div>
</template>

<script>
  import { BContainer, BRow, BCol } from 'bootstrap-vue';
  import WNavigation from '../../components/WNavigation';

  export default {
    name: 'WWarehousesListPage',
    components: {
      WNavigation
    },
    mounted: function() {
      this.$store.dispatch('commitWarehousesList');
      this.list = this.$store.getters.getCompaniesList;
    },
    data: function() {
      return {
        list: null
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
