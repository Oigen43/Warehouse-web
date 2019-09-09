<template>
  <b-table
    head-variant="dark"
    borderless
    hover
    responsive
    :items="companiesList"
    :fields="fields"
  >
    <template
      slot="[is_active]"
      slot-scope="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
    <template
      slot="[warehouses]"
      slot-scope="data">
      <b-button
        variant="light"
        size="sm"
        @click="clickedWarehousesButton(data.item)">
        Warehouses
      </b-button>
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
    import router from '../../../../router';
    import { BTable, BFormCheckbox, BButton } from 'bootstrap-vue';

    export default {
        name: 'WList',
        components: {
            BTable,
            BFormCheckbox,
            BButton
        },
        props: ['companiesList'],
        data: function () {
            return {
                fields: [
                    { key: 'is_active', label: 'Active' }, 'companyName', 'address', 'description', 'date',
                    { key: 'warehouses', label: '' },
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ]
            };
        },
        methods: {
            ...mapActions({
                getUpdatedCompanyData: 'getUpdatedCompany',
                sendDeletedCompanyData: 'deleteCompany',
            }),
            clickedWarehousesButton(item) {
            },
            clickedUpdateButton(item) {
                this.getUpdatedCompanyData(item);
                router.push('/companies/update');
            },
            clickedDeleteButton(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
