<template>
  <b-row>
    <b-col>
      <div class="w-drivers-list-page">
        <h1>List of Drivers</h1>
        <b-row>
          <b-col>
            <b-button
              to="drivers/add"
              class="w-drivers-add-button"
              variant="dark">
              add driver
            </b-button>

          </b-col>
        </b-row>
        <div class="drivers-list">
          <w-list
            :drivers="drivers"
            @delete-button-clicked="clickedDeleteButton"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="drivers-list-pagination">
              <w-pagination
                v-if="driversPageLimit > 1"
                :current="currentPage"
                :pageLimit="driversPageLimit"
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

    import WPagination from '../../components/WPagination';
    import WList from './components/WList';

    export default {
        name: 'WDriversListPage',
        components: {
            BRow,
            BCol,
            WPagination,
            WList,
            BButton
        },
        data() {
            return {
                currentPage: 1,
                perPage: 8
            };
        },
        computed: {
            ...mapState([
                'drivers',
                'driversPageLimit'
            ]),
            carrierId: function() {
                return this.$route.params.carrierId;
            }
        },
        methods: {
            ...mapActions({
                fetchDriversList: 'fetchDriversList',
                sendDeletedDriverData: 'sendDeletedDriver',
                deletedDriverData: 'deleteDriver'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchDriversList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    carrierId: this.carrierId
                });
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedDriverData(item.id);
                this.deletedDriverData(item);
                if (this.drivers.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchDriversList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    carrierId: this.carrierId
                });
            }
        },
        created: function () {
            this.fetchDriversList({
                page: this.currentPage,
                perPage: this.perPage,
                carrierId: this.carrierId
            });
        }
    };
</script>

<style lsng="scss" scoped>
  @import './styles.scss';
</style>
