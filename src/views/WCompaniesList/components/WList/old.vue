<template>
  <b-table
    head-variant="dark"
    borderless
    stacked="sm"
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
        props: ['companiesList'],
        computed: {
            ...mapState([
                'modalValue'
            ])
        },
        watch: {
            modalValue(newVal, oldVal) {
                if (newVal) {
                    this.clickedDeleteButton(this.clickedCompany);
                    this.setModalValue(false);
                }
            }
        },
        data: function () {
            return {
                fields: [
                    'active', 'companyName', 'address', 'description', 'date',
                    { key: 'warehouses', label: '' },
                    { key: 'update', label: '' },
                    { key: 'delete', label: '' }
                ],
                modal: {},
                clickedCompany: {}
            };
        },
        methods: {
            ...mapActions({
                getUpdatedCompanyData: 'getUpdatedCompany',
                sendDeletedCompanyData: 'deleteCompany',
                setCurrentCompany: 'setCurrentCompany',
                createModal: 'createModal',
                setModalValue: 'setModalValue'
            }),
            clickedWarehousesButton(item) {
                this.setCurrentCompany(item.companyName);
                router.push('/warehouses');
            },
            clickedUpdateButton(item) {
                this.getUpdatedCompanyData(item);
                router.push('/companies/update');
            },
            clickedDeleteModal(item) {
                this.clickedCompany = item;
                this.modal = {
                    text: 'Please confirm that you want to delete the company.',
                    title: `Delete company ${item.companyName}`,
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
