<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-warehouses-list-page'>
        <h1>List of Warehouses</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              to="warehouses/add"
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
          <b-col lg="12" sm="12">
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
                'warehousesPageLimit'
            ]),
            routesPermissions: function() {
              return routesPermissions;
            },
            companyId: function() {
                return this.$route.params.companyId;
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
                    companyId: this.companyId
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
                    companyId: this.companyId
                });
            }
        },
        created: function () {
            this.fetchWarehousesList({
                page: this.currentPage,
                perPage: this.perPage,
                companyId: this.companyId
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
