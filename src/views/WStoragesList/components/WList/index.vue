<template>
    <b-row v-if="isItemsExists">
      <b-col lg="3" sm="6" v-for="storage in storagesList" v-bind:key="storage.id">
        <b-card no-body class="overflow-hidden w-storage-card">
          <div class="rounded-0 w-storage-card-header">
            <div class="w-storage-card-header-text">
              {{storage.currentCapacity}}/{{storage.storageCapacity}} m<sup><small>3</small></sup>
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
    <w-empty-table
      :insert="hasPermissions(routesPermissions.storages.create)"
      v-else></w-empty-table>
</template>

<script>
    import {
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
    import helpers from '../../../../utils/helpers';
    import WEmptyTable from '../../../../components/WEmptyTable';

    export default {
        name: 'WList',
        mixins: [validation],
        components: {
            WEmptyTable,
            BRow,
            BCol,
            BCard,
            BCardTitle,
            BCardBody,
            BCardFooter,
            BButton
        },
        props: ['storagesList'],
        computed: {
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
