<template>
  <b-row>
    <b-col>
      <div class='w-companies-list-page'>
        <h1>List of Companies</h1>
        <b-row>
          <b-col>
            <b-button
              variant="dark"
              to="/companies/add"
              class="w-companies-add-button"
              v-if="hasPermissions(routesPermissions.companies.create)"
            >add company
            </b-button>
          </b-col>
        </b-row>
        <div class="companies-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :companies="companies"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="companies-list-pagination">
              <w-pagination
                v-if="companiesPageLimit > 1"
                :current="currentPage"
                :pageLimit="companiesPageLimit"
                @page-changed="sendRequest"
              ></w-pagination>
            </div>
          </b-col>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton } from 'bootstrap-vue';

    import { validation } from '../../components/mixins/validation';
    import routesPermissions from '../../constants/routesPermissions';
    import WList from './components/WList';
    import WPagination from '../../components/WPagination';

    export default {
        name: 'WCompaniesListPage',
        mixins: [validation],
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
            ]),
            routesPermissions: function() {
              return routesPermissions;
            }
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
                await this.sendDeletedCompanyData(item.id);
                this.deletedCompanyData(item);
                if (this.companies.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
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
