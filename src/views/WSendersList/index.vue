<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-senders-list-page'>
        <h1>List of Senders</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              to="/senders/add"
              class="w-senders-add-button"
            >add sender
            </b-button>
          </b-col>
        </b-row>
        <div class="w-senders-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :senders="senders"
          ></w-list>
        </div>
        <b-row>
          <b-col lg="12" sm="12">
            <div class="w-senders-list-pagination">
              <w-pagination
                v-if="sendersPageLimit > 1"
                :current="currentPage"
                :pageLimit="sendersPageLimit"
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
        name: 'WSenderListPage',
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
                'senders',
                'sendersPageLimit'
            ])
        },
        methods: {
            ...mapActions({
                fetchSendersList: 'fetchSendersList',
                sendDeletedSenderData: 'sendDeletedSender',
                deletedSenderData: 'deleteSender'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchSendersList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedSenderData(item.id);
                this.deletedSenderData(item);
                if (this.senders.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchSendersList(this.currentPage);
            }
        },
        created: function () {
            this.fetchSendersList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
