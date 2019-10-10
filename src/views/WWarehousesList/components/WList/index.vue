<template>
    <w-table
      :items="warehousesList"
      :fields="fields">
      <template
        v-slot:cell(active)="data">
        <b-form-checkbox
          v-model="data.value"
          disabled>
        </b-form-checkbox>
      </template>
      <template
        v-slot:cell(storages)="data">
        <b-button
          variant="light"
          size="sm"
          @click="clickedStoragesButton(data.item)">
          Storages
        </b-button>
      </template>
      <template
        v-slot:cell(buttons)="data"
        v-if="hasPermissions(routesPermissions.warehouses.update)">
        <b-button
          class="w-table-update-button"
          variant="dark"
          size="sm"
          @click="clickedUpdateButton(data.item)">
          Update
        </b-button>
        <b-button
          variant="light"
          size="sm"
          @click="clickedDeleteButton(data.item)">
          ✕
        </b-button>
      </template>
    </w-table>
</template>

<script>
    import { mapActions } from 'vuex';
    import { BFormCheckbox, BButton } from 'bootstrap-vue';

    import { validation } from '../../../../components/mixins/validation';
    import routesPermissions from '../../../../constants/routesPermissions';
    import WTable from '../../../../components/WTable';
    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        mixins: [validation],
        components: {
            WTable,
            BFormCheckbox,
            BButton
        },
        props: ['warehousesList'],
        data: function () {
            return {
                clickedWarehouse: {}
            };
        },
        computed: {
            fields: function() {
                const fieldList = [
                    'active', 'warehouseName', 'companyName', 'address',
                    { key: 'storages', label: '', class: 'w-list-button' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ];

                if (this.hasPermissions(routesPermissions.warehouses.update)) {
                    fieldList.splice(fieldList.length - 1, 0, { key: 'buttons', label: '', class: 'w-list-button' });
                }

                return fieldList;
            },
            routesPermissions: function() {
                return routesPermissions;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedWarehouseData: 'getUpdatedWarehouse',
                sendDeletedWarehouseData: 'deleteWarehouse',
                setCurrentWarehouse: 'setCurrentWarehouse'
            }),
            clickedStoragesButton(item) {
                this.setCurrentWarehouse({ id: item.id, warehouseName: item.warehouseName });
                router.push('/storages');
            },
            clickedUpdateButton(item) {
                this.getUpdatedWarehouseData(item);
                router.push('/warehouses/update');
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.WAREHOUSE_TEXT, {
                    title: `${modal.WAREHOUSE_TITLE} ${item.warehouseName}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteWarehouse(item));
            },
            deleteWarehouse(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss">
  @import './styles.scss';
</style>
