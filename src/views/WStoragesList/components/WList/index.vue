<template>
  <b-spinner
    v-if="loading"
    style="width: 4rem; height: 4rem;"
    label="Large Spinner"
  ></b-spinner>
  <div v-else>
    <b-row v-if="isItemsExists">
      <b-col lg="3" sm="6" v-for="storage in storagesList" v-bind:key="storage.id">
        <b-card no-body class="overflow-hidden w-storage-card">
          <div class="rounded-0 w-storage-card-header">
            <div class="w-storage-card-header-text">
              {{storage.storageCapacity}} m<sup><small>2</small></sup>
            </div>
          </div>
          <b-card-body>
            <b-card-title class="mb-0 w-storage-card-text">{{storage.StorageType.type}}</b-card-title>
          </b-card-body>
          <b-card-footer class="w-storage-card-footer"
                         v-if="hasPermissions(routesPermissions.storages.update)">
            <b-button
              class="w-storage-update-card-button"
              variant="dark"
              size="sm"
              @click="clickedUpdateButton(storage)">
              Update
            </b-button>
            <b-button
              variant="light"
              size="sm"
              @click="clickedDeleteButton(storage)">
              ✕
            </b-button>
          </b-card-footer>
        </b-card>
      </b-col>
    </b-row>
    <w-empty-table v-else></w-empty-table>
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import {
        BSpinner,
        BRow,
        BCol,
        BCard,
        BCardTitle,
        BCardBody,
        BCardFooter,
        BButton
    } from 'bootstrap-vue';

    import { validation } from '../../../../components/mixins/validation';
    import routesPermissions from '../../../../constants/routesPermissions';
    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';
    import WEmptyTable from '../../../../components/WEmptyTable';
    import helpers from '../../../../utils/helpers';

    export default {
        name: 'WList',
        mixins: [validation],
        components: {
            BSpinner,
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardBody,
            BCardFooter,
            BButton,
            WEmptyTable
        },
        props: ['storagesList'],
        computed: {
            ...mapState([
                'loading'
            ]),
            routesPermissions: function() {
              return routesPermissions;
            },
            isItemsExists() {
                return helpers.isItemsExists(this.storagesList);
            }
        },
        methods: {
            clickedUpdateButton(item) {
                router.push(`storages/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.STORAGE_TEXT, {
                    title: `${modal.STORAGE_TITLE}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteStorage(item));
            },
            deleteStorage(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
