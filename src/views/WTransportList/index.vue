<template>
  <b-row>
    <b-col>
      <div class='w-transport-list-page'>
        <h1>List of Transport</h1>
        <b-row>
          <b-col>
            <b-button
              variant="dark"
              to="transport/add"
              class="w-transport-add-button"
            >add transport
            </b-button>
          </b-col>
        </b-row>
        <div class="w-transport-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :transport="transport"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="w-transport-list-pagination">
              <w-pagination
                v-if="transportPageLimit > 1"
                :current="currentPage"
                :pageLimit="transportPageLimit"
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
        name: 'WTransportListPage',
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
                'transport',
                'transportPageLimit'
            ]),
            carrierId: function() {
                return this.$route.params.carrierId;
            }
        },
        methods: {
            ...mapActions({
                fetchTransportList: 'fetchTransportList',
                sendDeletedTransportData: 'sendDeletedTransport',
                deletedTransportData: 'deleteTransport'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchTransportList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    carrierId: this.carrierId
                });
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedTransportData(item.id);
                this.deletedTransportData(item);
                if (this.transport.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchTransportList({
                    page: this.currentPage,
                    perPage: this.perPage,
                    carrierId: this.carrierId
                });
            }
        },
        created: function () {
            this.fetchTransportList({
                page: this.currentPage,
                perPage: this.perPage,
                carrierId: this.carrierId
            });
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
