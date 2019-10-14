<template>
  <b-row>
    <b-col>
      <div class='w-warehouses-list-page'>
        <h1>List of Warehouses</h1>
        <b-row>
          <b-col>
            <b-button
              variant="dark"
              to="/warehouses/add"
              class="w-warehouses-add-button"
              v-if="hasPermissions(routesPermissions.warehouses.create)"
            >add warehouse
            </b-button>
          </b-col>
        </b-row>
        <div class="warehouses-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :warehousesList="warehouses"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="warehouses-list-pagination">
              <w-pagination
                v-if="warehousesPageLimit > 1"
                :current="currentPage"
                :pageLimit="warehousesPageLimit"
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
        name: 'WWarehousesListPage',
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
                currentPage: 1,
                perPage: 8
            };
        },
        computed: {
            ...mapState([
                'warehouses',
                'warehousesPageLimit',
                'currentCompany'
            ]),
            routesPermissions: function() {
              return routesPermissions;
            }
        },
        methods: {
            ...mapActions({
                fetchWarehousesList: 'fetchWarehousesList',
                sendDeletedWarehouseData: 'sendDeletedWarehouse',
                deletedWarehouseData: 'deleteWarehouse'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchWarehousesList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    companyId: this.currentCompany.id
                });
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedWarehouseData(item.id);
                this.deletedWarehouseData(item);
                if (this.warehouses.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchWarehousesList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    companyId: this.currentCompany.id
                });
            }
        },
        created: function () {
            this.fetchWarehousesList({
                page: this.currentPage,
                perPage: this.perPage,
                companyId: this.currentCompany.id
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
