<template>
  <b-row>
    <b-col>
      <div class='w-ttn-list-page'>
        <h1>List of TTN</h1>
        <b-row>
          <b-col>
            <b-button
              variant="dark"
              to="/ttn/add"
              class="w-ttn-add-button"
            >add TTN
            </b-button>
          </b-col>
        </b-row>
        <div class="w-ttn-list">
          <w-list
            :TTN="TTN"
            @delete-button-clicked="clickedDeleteButton"
            @take-out-button-clicked="clickedTakeOutButton"
          ></w-list>
        </div>
        <b-row>
          <b-col>
            <div class="w-ttn-list-pagination">
              <w-pagination
                v-if="TTNPageLimit > 1"
                :current="currentPage"
                :pageLimit="TTNPageLimit"
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
        name: 'WTTNListPage',
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
                'TTN',
                'TTNPageLimit'
            ])
        },
        methods: {
            ...mapActions({
                fetchTTNList: 'fetchTTNList',
                sendDeletedTTNData: 'sendDeletedTTN',
                deletedTTNData: 'deleteTTN',
                sendTakeOutTTNData: 'takeOutTTN'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchTTNList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                await this.sendDeletedTTNData(item.id);
                this.deletedTTNData(item);
                if (this.TTN.length === 0 && this.currentPage > 1) {
                    this.currentPage -= 1;
                }
                this.fetchTTNList(this.currentPage);
            },
            async clickedTakeOutButton(item) {
                await this.sendTakeOutTTNData(item);
                this.fetchTTNList();
            }
        },
        created: async function () {
            await this.fetchTTNList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
