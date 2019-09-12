<template>
  <b-table
    head-variant="dark"
    borderless
    hover
    responsive
    :items="warehousesList"
    :fields="fields">

    <template
      slot="[active]"
      slot-scope="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
    <template
      slot="[update]"
      slot-scope="data">
      <b-button
        variant="warning"
        size="sm"
        @click="clickedUpdateButton(data.item)">
        Update
      </b-button>
    </template>
    <template
      slot="[delete]"
      slot-scope="data">
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
    import { mapActions } from 'vuex';
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
        data: function () {
            return {
                fields: [
                    'active', 'warehouseName', 'companyName', 'address', 'type',
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedWarehouseData: 'getUpdatedWarehouse',
                sendDeletedWarehouseData: 'deleteWarehouse',
            }),
            clickedUpdateButton(item) {
                this.getUpdatedWarehouseData(item);
                router.push('/warehouses/update');
            },
            clickedDeleteButton(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
