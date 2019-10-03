<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-storages-list-page'>
        <h1>List of Storage Places</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              to="/storages/add"
              class="w-storages-add-button"
            >add storage
            </b-button>
          </b-col>
        </b-row>
        <div class="w-storages-list">
          <w-list
            :storagesList="storages"
          ></w-list>
        </div>
        <b-row>
          <b-col lg="12" sm="12">
            <div class="w-storages-list-pagination">
              <w-pagination
                v-if="storagesPageLimit > 1"
                :current="currentPage"
                :pageLimit="storagesPageLimit"
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

    import WList from './components/WList';
    import WPagination from '../../components/WPagination';

    export default {
        name: 'WStoragesListPage',
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
                perPage: 5
            };
        },
        computed: {
            ...mapState([
                'storages',
                'storagesPageLimit',
                'currentWarehouse'
            ])
        },
        methods: {
            ...mapActions({
                fetchStoragesList: 'fetchStoragesList',
                sendDeletedStorageData: 'sendDeletedStorage',
                deletedStorageData: 'deleteStorage'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchStoragesList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    warehouseId: this.currentWarehouse.id
                });
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedStorageData(item.id);
                this.deletedStorageData(item);
                if (this.storages.length === 0) {
                    this.currentPage -= 1;
                }
                this.fetchStoragesList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    warehouseId: this.currentWarehouse.id
                });
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: this.currentPage,
                perPage: this.perPage,
                warehouseId: this.currentWarehouse.id
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
