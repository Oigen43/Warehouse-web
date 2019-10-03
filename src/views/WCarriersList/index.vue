<template>
  <b-row>
    <b-col lg="12" sm="12">
      <div class='w-companies-list-page'>
        <h1>List of Carriers</h1>
        <b-row>
          <b-col lg="12" sm="12">
            <b-button
              variant="dark"
              to="/carriers/add"
              class="w-carriers-add-button"
            >add company
            </b-button>
          </b-col>
        </b-row>
        <div class="carriers-list">
          <w-list
            @delete-button-clicked="clickedDeleteButton"
            :carriers="carriers"
          ></w-list>
        </div>
        <b-row>
          <b-col lg="12" sm="12">
            <div class="carriers-list-pagination">
              <w-pagination
                v-if="carriersPageLimit > 1"
                :current="currentPage"
                :pageLimit="carriersPageLimit"
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
        name: 'WCarriersListPage',
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
                'carriers',
                'carriersPageLimit'
            ])
        },
        methods: {
            ...mapActions({
                fetchCarriersList: 'fetchCarriersList',
                sendDeletedCarrierData: 'sendDeletedCarrier',
                deletedCarrierData: 'deleteCarrier'
            }),
            sendRequest(page) {
                this.currentPage = page;
                this.fetchCarriersList(this.currentPage);
            },
            async clickedDeleteButton(item) {
                console.log(item);
                await this.sendDeletedCarrierData(item.id);
                this.deletedCarrierData(item);
                if (this.carriers.length === 0) {
                    this.currentPage -= 1;
                }
                this.fetchCarriersList(this.currentPage);
            }
        },
        created: function () {
            this.fetchCarriersList();
        }
    }
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
