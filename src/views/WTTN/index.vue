<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-ttn-list-page'>
        <h1>List of TTN</h1>
        <b-row>
          <b-col lg="12" sm="12">
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
          ></w-list>
        </div>
        <b-row>
          <b-col lg="12" sm="12">
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
                fetchTTNList: 'fetchTTNList'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchTTNList(this.currentPage);
            }
        },
        created: function () {
            this.fetchTTNList();
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
