<template>
  <div class='w-companies-list-page'>
    <w-navigation></w-navigation>
    <h1>List of Companies</h1>
    <b-button
      variant="success"
      to="/companies/add"
      class="w-companies-add-button"
    >add company
    </b-button>
    <div class="companies-list-pagination">
      <w-pagination
        v-if="companiesPageLimit > 1"
        :current="currentPage"
        :pageLimit="companiesPageLimit"
        @page-changed="sendRequest"
      ></w-pagination>
    </div>
    <div class="companies-list">
      <w-list
        @delete-button-clicked="clickedDeleteButton"
        :companiesList="companies"
      ></w-list>
    </div>
  </div>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BButton } from 'bootstrap-vue';

    import WNavigation from '../../components/WNavigation';
    import WList from './components/WList';
    import WPagination from '../../components/WPagination';

    export default {
        name: 'WCompaniesListPage',
        components: {
            WNavigation,
            BButton,
            WList,
            WPagination
        },
        data: function () {
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
                fetchCompaniesList: 'fetchCompaniesList',
                sendDeletedCompanyData: 'sendDeletedCompany',
                deletedCompanyData: 'deleteCompany'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchCompaniesList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedCompanyData(item);
                this.deletedCompanyData(item);
                this.fetchCompaniesList(this.currentPage);
            }
        },
        created: function () {
            this.fetchCompaniesList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
