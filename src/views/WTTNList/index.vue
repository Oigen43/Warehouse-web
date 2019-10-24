<template>
  <b-row v-if="TTN">
    <b-col>
      <div class='w-ttn-list-page'>
        <h1>List of GCN</h1>
        <b-row v-if="hasPermissions(routesPermissions.TTN.create)">
          <b-col>
            <b-button
              variant="dark"
              to="/ttn/add"
              v-if="hasPermissions(routesPermissions.TTN.create)"
              class="w-ttn-add-button"
            >add GCN
            </b-button>
          </b-col>
        </b-row>
        <div class="w-ttn-list">
          <w-list
            :TTN="TTN"
            @delete-button-clicked="clickedDeleteButton"
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

    import { validation } from '../../components/mixins/validation';
    import WList from './components/WList';
    import WPagination from '../../components/WPagination';
    import routesPermissions from '../../constants/routesPermissions';

    export default {
        name: 'WTTNListPage',
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
                'TTN',
                'TTNPageLimit'
            ]),
            routesPermissions: function () {
                return routesPermissions;
            }
        },
        methods: {
            ...mapActions({
                fetchTTNList: 'fetchTTNList',
                sendDeletedTTNData: 'sendDeletedTTN',
                deletedTTNData: 'deleteTTN'
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
