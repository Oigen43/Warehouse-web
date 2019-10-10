<template>
  <w-table
    :items="companiesList"
    :fields="fields">
    <template
      v-slot:cell(active)="data">
      <b-form-checkbox
        v-model="data.value"
        disabled>
      </b-form-checkbox>
    </template>
    <template
      v-slot:cell(warehouses)="data">
      <b-button
        variant="light"
        size="sm"
        @click="clickedWarehousesButton(data.item)">
        Warehouses
      </b-button>
    </template>
    <template
      v-slot:cell(buttons)="data">
      <b-button
        class="w-table-update-button"
        variant="dark"
        size="sm"
        @click="clickedUpdateButton(data.item)"
        v-if="hasPermissions(routesPermissions.companies.update)">
        Update
      </b-button>
      <b-button
        variant="light"
        size="sm"
        @click="clickedDeleteButton(data.item)"
        v-if="hasPermissions(routesPermissions.companies.delete)">
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
        props: ['companies'],
        data: function() {
            return {
                fields: [
                    'active', 'companyName', 'address', 'description',
                    {
                        key: 'date',
                        label: 'Date',
                        formatter: value => {
                            return value.slice(0, 10);
                        }
                    },
                    { key: 'warehouses', label: '', class: 'w-list-button' },
                    { key: 'buttons', label: '', class: 'w-list-button' },
                    { key: 'blank', label: '', class: 'w-blank-column' }
                ]
            };
        },
        computed: {
            routesPermissions: function() {
                return routesPermissions;
            },
            companiesList: function() {
                if (!(Array.isArray(this.companies))) {
                    return new Array(this.companies);
                }
                return this.companies;
            }
        },
        methods: {
            ...mapActions({
                getUpdatedCompanyData: 'getUpdatedCompany',
                sendDeletedCompanyData: 'deleteCompany'
            }),
            clickedWarehousesButton(item) {
                router.push(`companies/${item.id}/warehouses`);
            },
            clickedUpdateButton(item) {
                router.push(`/companies/${item.id}/update`);
            },
            clickedDeleteButton(item) {
                this.$bvModal.msgBoxConfirm(modal.COMPANY_TEXT, {
                    title: `${modal.COMPANY_TITLE} ${item.companyName}`,
                    ...modal.CONFIRM_MODAL_OPTIONS
                })
                    .then(value => value && this.deleteCompany(item));
            },
            deleteCompany(item) {
                this.$emit('delete-button-clicked', item);
            }
        }
    };
</script>
