<template>
  <div class='w-warehouses-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Warehouses</h1>
    <w-pagination :current="currentPage" :pageLimit="companiesPageLimit" @page-changed="sendRequest"></w-pagination>
    <w-list :companiesList="companies"></w-list>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import WNavigation from '../../components/WNavigation';
  import WList from './components/WList';
  import WPagination from '../../components/WPagination';

  export default {
    name: 'WWarehousesListPage',
    components: {
      WNavigation,
      WList,
      WPagination
    },
    data: function() {
      return {
        currentPage: 1
      };
    },
    computed: {
      ...mapState([
        'companies',
        'companiesPageLimit'
      ])
    },
    methods: {
      ...mapActions({
        fetchWarehousesList: 'commitWarehousesList'
      }),
      sendRequest(page) {
        this.currentPage = page;
        this.fetchWarehousesList(this.currentPage);
      },
    },
    created: function() {
      this.fetchWarehousesList();
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
