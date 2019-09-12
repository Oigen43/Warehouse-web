<template>
  <b-table
    head-variant="dark"
    borderless
    hover
    responsive
    :items="companiesList"
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
    import { BTable, BFormCheckbox, BButton } from 'bootstrap-vue';

    import router from '../../../../router';

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
                    'active', 'companyName', 'address', 'description', 'date',
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
                setCurrentCompany: 'setCurrentCompany'
            }),
            clickedWarehousesButton(item) {
              this.setCurrentCompany(item.companyName);
              router.push('/warehouses');
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
