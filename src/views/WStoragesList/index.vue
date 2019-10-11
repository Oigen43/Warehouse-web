<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-storages-list-page'>
        <h1>List of Storage Places</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              @click="clickedAddButton"
              class="w-storages-add-button"
              v-if="hasPermissions(routesPermissions.storages.create)"
            >add storage
            </b-button>
          </b-col>
        </b-row>
        <div class="w-storages-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
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

    import { validation } from '../../components/mixins/validation';
    import routesPermissions from '../../constants/routesPermissions';
    import WList from './components/WList';
    import WPagination from '../../components/WPagination';
    import router from '../../router';

    export default {
        name: 'WStoragesListPage',
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
                'storages',
                'storagesPageLimit'
            ]),
            routesPermissions: function () {
                return routesPermissions;
            },
            warehouseId: function () {
                return this.$route.params.warehouseId;
            }
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
                    warehouseId: this.warehouseId
                });
            },
            clickedAddButton() {
                router.push('storages/add');
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
                    warehouseId: this.warehouseId
                });
            }
        },
        created: function () {
            this.fetchStoragesList({
                page: this.currentPage,
                perPage: this.perPage,
                warehouseId: this.warehouseId
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
