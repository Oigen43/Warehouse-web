<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Warehouses</h1>
    <p> {{ companies }} </p>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import WNavigation from '../../components/WNavigation';

  export default {
    name: 'WWarehousesListPage',
    components: {
      WNavigation
    },
    created: function() {
      this.fetchWarehousesList();
    },
    methods: {
      ...mapActions({
        fetchWarehousesList: 'commitWarehousesList'
      })
    },
    computed: {
      ...mapGetters({
      companies: 'getCompaniesList'
    })
    },
    data: function() {
      return {
        list: []
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
