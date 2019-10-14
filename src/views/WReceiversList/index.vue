<template>
  <b-row>
    <b-col>
      <div class='w-receivers-list-page'>
        <h1>List of Receivers</h1>
        <b-row>
          <b-col>
            <b-button
              variant="dark"
              to="/receivers/add"
              class="w-receivers-add-button"
            >add receiver
            </b-button>
          </b-col>
        </b-row>
        <div class="w-receivers-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :receivers="receivers"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="w-receivers-list-pagination">
              <w-pagination
                v-if="receiversPageLimit > 1"
                :current="currentPage"
                :pageLimit="receiversPageLimit"
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
        name: 'WReceiverListPage',
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
                'receivers',
                'receiversPageLimit'
            ])
        },
        methods: {
            ...mapActions({
                fetchReceiversList: 'fetchReceiversList',
                sendDeletedReceiverData: 'sendDeletedReceiver',
                deletedReceiverData: 'deleteReceiver'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchReceiversList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedReceiverData(item.id);
                this.deletedReceiverData(item);
                if (this.receivers.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchReceiversList(this.currentPage);
            }
        },
        created: function () {
            this.fetchReceiversList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
