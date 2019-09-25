<template>
  <b-table
    head-variant="dark"
    class="w-warehouses-list-table"
    bordered
    stacked="md"
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
      v-slot:cell(update)="data">
      <b-button
        variant="warning"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
    </template>
    <template
      v-slot:cell(delete)="data">
      <b-button
        variant="outline-dark"
        size="sm"
        @click="clickedDeleteButton(data.item)">
        ✕
      </b-button>
    </template>

  </b-table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BTable, BFormCheckbox, BButton } from 'bootstrap-vue';

    import router from '../../../../router';
    import * as modal from '../../../../constants/modal';

    export default {
        name: 'WList',
        components: {
            BTable,
            BFormCheckbox,
            BButton
        },
        props: ['warehousesList'],
        computed: {
            ...mapState([
                'modalValue'
            ])
        },
        watch: {
            modalValue(newVal, oldVal) {
                if (newVal) {
                    this.deleteWarehouse(this.clickedWarehouse);
                    this.setModalValue(false);
                }
            }
        },
        data: function () {
            return {
                fields: [
                    'active', 'warehouseName', 'companyName', 'address', 'type',
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ],
                clickedWarehouse: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedWarehouseData: 'getUpdatedWarehouse',
                sendDeletedWarehouseData: 'deleteWarehouse',
                setModalValue: 'setModalValue'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedWarehouseData(item);
                router.push('/warehouses/update');
            },
            clickedDeleteButton(item) {
                this.clickedWarehouse = item;
                this.$bvModal.msgBoxConfirm(modal.WAREHOUSE_TEXT, {
                    title: `${modal.WAREHOUSE_TITLE} ${item.warehouseName}`,
                    size: modal.SIZE,
                    buttonSize: modal.BUTTON_SIZE,
                    okVariant: modal.OK_VARIANT,
                    cancelVariant: modal.CANCEL_VARIANT,
                    okTitle: modal.OK_TITLE,
                    cancelTitle: modal.CANCEL_TITLE,
                    hideHeaderClose: modal.HIDE_HEADER_CLOSE,
                    centered: modal.CENTERED
                })
                    .then(value => {
                        this.setModalValue(value);
                    });
            },
            deleteWarehouse(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
