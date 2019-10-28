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
            @active-button-clicked="clickedActiveButton"
            @change-price-button-clicked="clickedChangePriceButton"
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
        <b-row>
          <b-modal
            ref="change-price"
            id="modal-prevent-closing"
            title="Enter price"
            @ok="submitModal"
          >
            <b-form-input
              id="name-input"
              v-model="price"
              placeholder="price"
              required
            ></b-form-input>
          </b-modal>
        </b-row>
      </div>
    </b-col>
  </b-row>
</template>

<script>
    import { mapActions, mapState } from 'vuex';
    import { BRow, BCol, BButton, BFormInput, BModal } from 'bootstrap-vue';

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
            WPagination,
            BFormInput,
            BModal
        },
        data: function () {
            return {
                currentPage: 1,
                price: null
            };
        },
        computed: {
            ...mapState([
                'companies',
                'companiesPageLimit',
                'currentCompanyId'
            ]),
            routesPermissions: function() {
              return routesPermissions;
            }
        },
        methods: {
            ...mapActions({
                fetchCompaniesList: 'fetchCompaniesList',
                sendDeletedCompanyData: 'sendDeletedCompany',
                deletedCompanyData: 'deleteCompany',
                updateCompanyActive: 'updateActiveCompany',
                setCurrentCompanyId: 'setCurrentCompanyId',
                changeCompanyPrice: 'changeCompanyPrice'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchCompaniesList(this.currentPage);
            },
            async submitModal() {
                await this.changeCompanyPrice({ companyId: this.currentCompanyId, price: this.price });
            },
            async clickedActiveButton(item) {
                await this.updateCompanyActive(item);
                await this.fetchCompaniesList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedCompanyData(item.id);
                this.deletedCompanyData(item);
                if (this.companies.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchCompaniesList(this.currentPage);
            },
            async clickedChangePriceButton(item) {
                await this.setCurrentCompanyId(item.id);
                this.$refs['change-price'].show();
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
