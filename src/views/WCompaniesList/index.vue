<template>
  <div class='w-companies-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Companies</h1>
    <b-button to="/companies/add" class="w-companies-add-button">add company</b-button>
    <w-pagination :current="currentPage" :pageLimit="companiesPageLimit" @page-changed="sendRequest"></w-pagination>
    <w-list :companiesList="companies"></w-list>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import WNavigation from '../../components/WNavigation';
  import WList from './components/WList';
  import { BButton } from 'bootstrap-vue';
  import WPagination from '../../components/WPagination';

  export default {
    name: 'WCompaniesListPage',
    components: {
      WNavigation,
      BButton,
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
        fetchCompaniesList: 'fetchCompaniesList'
      }),
      sendRequest(page) {
        this.currentPage = page;
        this.fetchCompaniesList(this.currentPage);
      },
    },
    created: function() {
      this.fetchCompaniesList();
    }
  };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
