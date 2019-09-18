<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-companies-list-page'>
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
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import WList from './components/WList';
    import WPagination from '../../components/WPagination';

    export default {
        name: 'WCompaniesListPage',
        components: {
            BRow,
            BCol,
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
                console.log(this.companies)
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
