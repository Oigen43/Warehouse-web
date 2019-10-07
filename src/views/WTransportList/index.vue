<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-transport-list-page'>
        <h1>List of Transport</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              to="/transport/add"
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
          <b-col lg="12" sm="12">
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
                currentPage: 1
            };
        },
        computed: {
            ...mapState([
                'transport',
                'transportPageLimit'
            ])
        },
        methods: {
            ...mapActions({
                fetchTransportList: 'fetchTransportList',
                sendDeletedTransportData: 'sendDeletedTransport',
                deletedTransportData: 'deleteTransport'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchTransportList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedTransportData(item.id);
                this.deletedTransportData(item);
                if (this.transport.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchTransportList(this.currentPage);
            }
        },
        created: function () {
            this.fetchTransportList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
