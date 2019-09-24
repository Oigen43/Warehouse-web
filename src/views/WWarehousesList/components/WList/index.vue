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
        @click="clickedDeleteModal(data.item)">
        ✕
      </b-button>
    </template>

  </b-table>
</template>

<script>
    import { mapState, mapActions } from 'vuex';
    import { BTable, BFormCheckbox, BButton } from 'bootstrap-vue';

    import router from '../../../../router';

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
                    this.clickedDeleteButton(this.clickedWarehouse);
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
                modal: {},
                clickedWarehouse: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedWarehouseData: 'getUpdatedWarehouse',
                sendDeletedWarehouseData: 'deleteWarehouse',
                createModal: 'createModal',
                setModalValue: 'setModalValue'
            }),
            clickedUpdateButton(item) {
                this.getUpdatedWarehouseData(item);
                router.push('/warehouses/update');
            },
            clickedDeleteModal(item) {
                this.clickedWarehouse = item;
                this.modal = {
                    text: 'Please confirm that you want to delete the warehouse.',
                    title: `Delete warehouse ${item.warehouseName}`,
                    size: 'md',
                    buttonSize: 'md',
                    okVariant: 'secondary',
                    cancelVariant: 'danger',
                    okTitle: 'YES',
                    cancelTitle: 'NO',
                    hideHeaderClose: false,
                    centered: true
                };
                this.createModal(this.modal);
            },
            clickedDeleteButton(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>

<style lang="scss" scoped>
  @import './styles.scss';
</style>
